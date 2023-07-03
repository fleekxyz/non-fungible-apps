import {
  APIGatewayProxyResult,
  APIGatewayEvent,
  ///APIGatewayEventRequestContext,
} from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { v4 } from 'uuid';
import { initPrisma, prisma } from '@libs/prisma';
import { contractInstance, web3 } from '@libs/nfa-contract';
import { isTheSignatureValid } from '@libs/verify-signature';
import { ethers } from 'ethers';

export const submitMintInfo = async (
  event: APIGatewayEvent
  ///context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.body === null || event.body === undefined) {
      return formatJSONResponse(422, {
        message: 'Required parameters were not passed.',
      });
    }

    // Check the alchemy signature and confirm the value of the ALCHEMY_SIGNING_KEY env variable.
    // If both are valid, verify the authenticity of the request.
    if (event.headers['x-alchemy-signature'] === undefined)
      throw Error("Header field 'x-alchemy-signature' was not found.");

    if (process.env.ALCHEMY_SIGNING_KEY === undefined)
      throw Error('ALCHEMY_SIGNING_KEY env variable not found.');
    else if (
      !isTheSignatureValid(
        event.body,
        event.headers['x-alchemy-signature'],
        process.env.ALCHEMY_SIGNING_KEY
      )
    ) {
      return formatJSONResponse(401, {
        message: 'Unauthorized',
      });
    }

    const id = v4();

    const eventBody = JSON.parse(event.body);

    if (
      eventBody.event.data.block.logs[1].topics[0] !=
      ethers.utils.id(
        'NewMint(uint256,string,string,string,string,string,string,string,string,uint24,bool,address,address,address)'
      ) // The first topic should be equal to the hash of the event name and its parameter types
    ) {
      throw Error(
        'The emitted event is not `NewMint`. This request is ignored.'
      );
    }

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
      verificationTransactionHash: 'Not verified',
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

    return formatJSONResponse(200, {
      mintInfo,
    });
  } catch (e) {
    return formatJSONResponse(500, {
      message: e,
    });
  }
};
