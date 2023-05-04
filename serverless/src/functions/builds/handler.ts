import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';

import { v4 } from 'uuid';
import { prisma } from '@libs/prisma';
import { account, nfaContract } from '@libs/nfa-contract';
// import { nfaContract } from '@libs/nfa-contract';

export const submitBuildInfo = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.body === null) {
      return formatJSONResponse({
        status: 422,
        message: 'Required parameters were not passed.',
      });
    }

    const data = JSON.parse(event.body);

    const id = v4();
    const buildInfo = {
      buildId: id,
      createdAt: new Date().toISOString(),
      githubRepository: data.githubRepository,
      commitHash: data.commitHash,
      ipfsHash: data.ipfsHash,
      domain: data.domain,
    };

    // Add build record to the database, if it's not already added
    const buildRecord = await prisma.builds.findMany({
      where: {
        commitHash: buildInfo.commitHash,
        githubRepository: buildInfo.githubRepository,
        ipfsHash: buildInfo.ipfsHash,
        domain: buildInfo.domain,
      },
    });

    if (buildRecord.length == 0) {
      await prisma.builds
        .create({
          data: {
            githubRepository: buildInfo.githubRepository,
            commitHash: buildInfo.commitHash,
            ipfsHash: buildInfo.ipfsHash,
            domain: buildInfo.domain,
          },
        })
        .catch((e) => {
          throw e;
        });
    }

    const mintRecord = await prisma.tokens.findMany({
      where: {
        ipfsHash: buildInfo.ipfsHash,
        domain: buildInfo.domain,
        commitHash: buildInfo.commitHash,
        githubRepository: buildInfo.githubRepository,
        verified: false,
      },
    });

    if (mintRecord.length > 0) {
      // Trigger verification

      // Mark the token as verified in the contract
      try {
        // call the `setTokenVerified` method
        await nfaContract.methods
          .setTokenVerified(mintRecord[0].tokenId, true)
          .send({
            from: account.address,
            gas: '1000000',
          });
      } catch (error) {
        // catch transaction error
        console.error(error);
      }

      // Update the database record in the tokens collection
      await prisma.tokens.updateMany({
        where: {
          ipfsHash: buildInfo.ipfsHash,
          domain: buildInfo.domain,
          commitHash: buildInfo.commitHash,
          githubRepository: buildInfo.githubRepository,
          verified: false,
        },
        data: {
          verified: true,
        },
      });
    }

    return formatJSONResponse({
      buildInfo,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};
