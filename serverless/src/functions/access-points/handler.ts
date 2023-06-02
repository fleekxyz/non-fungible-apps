import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';
import { prisma } from '@libs/prisma';
import {
  BunnyCdn,
  CreatePullZoneMethodArgs,
  fetchPullZoneWhenNameAlreadyTaken,
} from '@libs/bunnyCDN';

export const submitAccessPointInfo = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Check the parameters and environment variables
    dotenv.config();
    if (event.body === null || process.env.BUNNY_CDN_ACCESS_KEY == undefined) {
      return formatJSONResponse({
        status: 422,
        message: 'Required parameters were not passed.',
      });
    }

    // Set up constants
    const bunnyCdn = new BunnyCdn(process.env.BUNNY_CDN_ACCESS_KEY);
    const data = JSON.parse(event.body);
    const id = v4();
    const accessPointInfo = {
      apId: id,
      createdAt: new Date().toISOString(),
      sourceDomain: data.sourceDomain,
      targetDomain: data.targetDomain,
    };

    // Create pull zone request
    const requestArgs: CreatePullZoneMethodArgs = {
      zoneId: accessPointInfo.targetDomain,
      originUrl: accessPointInfo.sourceDomain,
    };
    console.log(data);

    const pullZone = await bunnyCdn.createPullZone(requestArgs).catch(
      fetchPullZoneWhenNameAlreadyTaken({
        name: accessPointInfo.targetDomain,
      })
    );
    // const pullZone = await bunnyCdn.createPullZone(requestArgs).catch((e) => {
    //   console.log('errorrrr:' + e);
    // });

    //Add record to the database, if it's not been already added
    const zoneRecord = await prisma.zones.findMany({
      where: {
        name: accessPointInfo.targetDomain,
        sourceDomain: accessPointInfo.sourceDomain,
      },
    });

    if (zoneRecord.length == 0) {
      await prisma.zones.create({
        data: {
          name: accessPointInfo.targetDomain,
          sourceDomain: accessPointInfo.sourceDomain,
        },
      });
    }

    // Create custom hostname
    const hostname = await bunnyCdn.addCustomHostname({
      pullZoneId: accessPointInfo.targetDomain,
      hostname: accessPointInfo.targetDomain,
    });

    return formatJSONResponse({
      // accessPointInfo
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};
