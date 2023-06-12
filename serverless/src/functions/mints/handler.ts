import {
  APIGatewayProxyResult,
  APIGatewayEvent,
  ///APIGatewayEventRequestContext,
} from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { v4 } from 'uuid';
import { initPrisma, prisma } from '@libs/prisma';
import { contractInstance, web3 } from '@libs/nfa-contract';
import * as crypto from "crypto";

function isTheSignatureValid(
  body: string, // must be raw string body, not json transformed version of the body
  signature: string, // the "x-alchemy-signature" from header
  signingKey: string, // taken from dashboard for specific webhook
) {
  const hmac = crypto.createHmac("sha256", signingKey); // Create a HMAC SHA256 hash using the signing key
  hmac.update(body, "utf8"); // Update the token hash with the request body using utf8
  const digest = hmac.digest("hex");
  if (signature !== digest) {
    // the request is not valid
    return formatJSONResponse({
      status: 401,
      message: 'Unauthorized',
    });
  }
}

export const submitMintInfo = async (
  event: APIGatewayEvent
  ///context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.body === null || event.body === undefined) {
      return formatJSONResponse({
        status: 422,
        message: 'Required parameters were not passed.',
      });
    }

    // Check the alchemy signature and confirm the value of the ALCHEMY_SIGNING_KEY env variable.
    // If both are valid, verify the authenticity of the request.
    if (event.headers["X-Alchemy-Signature"] === undefined) throw Error("Header field 'X-Alchemy-Signature' was not found.");
    
    if (process.env.ALCHEMY_SIGNING_KEY === undefined) throw Error("ALCHEMY_SIGNING_KEY env variable not found.");
    else { isTheSignatureValid(event.body, event.headers["X-Alchemy-Signature"], process.env.ALCHEMY_SIGNING_KEY); };

    const id = v4();

    const eventBody = JSON.parse(event.body);
    const topics = eventBody.event.data.block.logs[1].topics.slice(1, 4);
    const hexCalldata = eventBody.event.data.block.logs[1].data;
    const decodedLogs = web3.eth.abi.decodeLog(
      [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'description',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'externalURL',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'ENS',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'commitHash',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'gitRepository',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'ipfsHash',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'logo',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint24',
          name: 'color',
          type: 'uint24',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'accessPointAutoApproval',
          type: 'bool',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'verifier',
          type: 'address',
        },
      ],
      hexCalldata,
      topics
    );

    const mintInfo = {
      mintId: id,
      createdAt: new Date().toISOString(),
      tokenId: decodedLogs.tokenId,
      githubRepository: decodedLogs.gitRepository,
      commit_hash: decodedLogs.commitHash,
      owner: decodedLogs.owner,
      ipfsHash: decodedLogs.ipfsHash,
      domain: decodedLogs.externalURL,
      verificationTransactionHash: 'Not verified'
    };

    initPrisma();

    // Check if there is any build associated with the repository, commit hash, tokenId, and ipfsHash

    const build = await prisma.builds.findMany({
      where: {
        githubRepository: mintInfo.githubRepository,
        commitHash: mintInfo.commit_hash,
        ipfsHash: mintInfo.ipfsHash,
        domain: mintInfo.domain,
      },
    });

    let verified = false;

    if (build.length > 0) {
      // Mark the token as verified in the contract
      try {
        // what if the token has been burned?
        // call the `setTokenVerified` method
        const transaction = await contractInstance.setTokenVerified(
          mintInfo.tokenId,
          true
        );
        mintInfo.verificationTransactionHash = transaction.hash;
        verified = true;
      } catch (error) {
        // catch transaction error
        console.error(error);
      }
    }

    // Add the record to the database

    const token = await prisma.tokens.findMany({
      where: {
        tokenId: Number(mintInfo.tokenId),
      },
    });

    if (token.length == 0) {
      await prisma.tokens.create({
        data: {
          tokenId: Number(mintInfo.tokenId),
          githubRepository: mintInfo.githubRepository,
          commitHash: mintInfo.commit_hash,
          owner: mintInfo.owner,
          ipfsHash: mintInfo.ipfsHash,
          verified: verified,
          domain: mintInfo.domain,
        },
      });
    }

    return formatJSONResponse({
      mintInfo,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};
