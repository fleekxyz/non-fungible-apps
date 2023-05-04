import {
  APIGatewayProxyResult,
  APIGatewayEvent,
  ///APIGatewayEventRequestContext,
} from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';

import { v4 } from 'uuid';
import { initPrisma, prisma } from '@libs/prisma';
import { account, nfaContract, web3 } from '@libs/nfa-contract';

export const submitMintInfo = async (
  event: APIGatewayEvent
  ///context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.body === null) {
      return formatJSONResponse({
        status: 422,
        message: 'Required parameters were not passed.',
      });
    }
    const id = v4();

    /**if (!verifyAlchemySig(event.headers.xalchemywork)) {
        throw new Error('Invalid sig');
      }**/

    let topics = [
      JSON.parse(event.body).event.data.block.logs[1].topics[1],
      JSON.parse(event.body).event.data.block.logs[1].topics[2],
      JSON.parse(event.body).event.data.block.logs[1].topics[3],
    ];
    const hexCalldata = JSON.parse(event.body).event.data.block.logs[1].data;

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
    };

    initPrisma();

    const token = await prisma.tokens.findMany({
      where: {
        tokenId: Number(mintInfo.tokenId),
      },
    });

    if (token.length == 0) {
      // Add the token to the database
      await prisma.tokens
        .create({
          data: {
            tokenId: Number(mintInfo.tokenId),
            github_url: mintInfo.githubRepository,
            commit_hash: mintInfo.commit_hash,
            owner: mintInfo.owner,
          },
        })
        .catch((e) => {
          throw e;
        })
        .finally(async () => {});
    }

    // Check if there is any build associated with the repository, commit hash, and tokenId

    const build = await prisma.builds.findMany({
      where: {
        tokenId: Number(mintInfo.tokenId),
        githubRepository: mintInfo.githubRepository,
        commitHash: mintInfo.commit_hash,
      },
    });

    if (build.length > 0) {
      // Mark the token as verified in the contract
      try {
        // call the `setTokenVerified` method
        await nfaContract.methods
          .setTokenVerified(mintInfo.tokenId, true)
          .send({
            from: account.address,
            gas: '1000000',
          });
      } catch (error) {
        // catch transaction error
        console.error(error);
      }
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
