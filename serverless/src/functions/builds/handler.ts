import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { v4 } from 'uuid';
import { prisma } from '@libs/prisma';
import { contractInstance } from '@libs/nfa-contract';

export const submitBuildInfo = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (event.body === null) {
      return formatJSONResponse(422, {
        message: 'The request body is not configured properly.',
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
      verificationTransactionHash: 'Not verified.',
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
      await prisma.builds.create({
        data: {
          githubRepository: buildInfo.githubRepository,
          commitHash: buildInfo.commitHash,
          ipfsHash: buildInfo.ipfsHash,
          domain: buildInfo.domain,
        },
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
      // Mark the token as verified in the contract
      // call the `setTokenVerified` method
      const transaction = await contractInstance.setTokenVerified(
        mintRecord[0].tokenId,
        true
      );
      buildInfo.verificationTransactionHash = transaction.hash;
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

    return formatJSONResponse(200, {
      buildInfo,
    });
  } catch (e) {
    return formatJSONResponse(500, {
      message: e,
    });
  }
};
