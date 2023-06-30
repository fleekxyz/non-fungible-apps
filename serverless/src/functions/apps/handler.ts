import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import * as dotenv from 'dotenv';
import { v4 } from 'uuid';
import { prisma } from '@libs/prisma';
import {
  BunnyCdn,
  // BunnyCdnError,
  CreatePullZoneMethodArgs,
  LoadFreeCertificateMethodArgs,
} from '@libs/bunnyCDN';
import { isTheSignatureValid } from '@libs/verify-signature';

export const verifyApp = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Check the parameters and environment variables
    dotenv.config();
    if (event.body === null || process.env.BUNNY_CDN_ACCESS_KEY === undefined) {
      return formatJSONResponse({
        status: 422,
        message: 'Required parameters were not passed.',
      });
    }

    // Check the lambda-signature and confirm the value of the FE_SIGNING_KEY env variable.
    // If both are valid, verify the authenticity of the request.
    if (event.headers['lambda-signature'] === undefined)
      throw Error("Header field 'lambda-signature' was not found.");

    if (process.env.FE_SIGNING_KEY === undefined)
      throw Error('FE_SIGNING_KEY env variable not found.');
    else if (
      !isTheSignatureValid(
        event.body,
        event.headers['lambda-signature'],
        process.env.FE_SIGNING_KEY
      )
    ) {
      return formatJSONResponse({
        status: 401,
        message: 'Unauthorized',
      });
    }

    // Set up constants
    const bunnyCdn = new BunnyCdn(process.env.BUNNY_CDN_ACCESS_KEY);
    const hostname = JSON.parse(event.body).hostname;

    let args: LoadFreeCertificateMethodArgs = {
      hostname,
    };

    await bunnyCdn.loadFreeCertificate(args);

    return formatJSONResponse({
      status: true,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};

export const submitAppInfo = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Check the parameters and environment variables
    dotenv.config();
    if (event.body === null || process.env.BUNNY_CDN_ACCESS_KEY === undefined) {
      return formatJSONResponse({
        status: 422,
        message: 'Required parameters were not passed.',
      });
    }

    // Check the lambda-signature and confirm the value of the FE_SIGNING_KEY env variable.
    // If both are valid, verify the authenticity of the request.
    if (event.headers['lambda-signature'] === undefined)
      throw Error("Header field 'lambda-signature' was not found.");

    if (process.env.FE_SIGNING_KEY === undefined)
      throw Error('FE_SIGNING_KEY env variable not found.');
    else if (
      !isTheSignatureValid(
        event.body,
        event.headers['lambda-signature'],
        process.env.FE_SIGNING_KEY
      )
    ) {
      return formatJSONResponse({
        status: 401,
        message: 'Unauthorized',
      });
    }

    // Set up constants
    const bunnyCdn = new BunnyCdn(process.env.BUNNY_CDN_ACCESS_KEY);
    const data = JSON.parse(event.body);
    const appInfo = {
      apId: 'null',
      createdAt: new Date().toISOString(),
      sourceDomain: data.sourceDomain,
      hostname: data.targetDomain,
    };

    // let maxTries = 5;
    let pullZone: {
      id: any;
      name?: string;
      originUrl?: string;
      hostname?: string;
    };

    // do {
      let id = v4();
      let requestArgs: CreatePullZoneMethodArgs = {
        zoneId: id, // this is technically the zone name. It should be unique.
        originUrl: appInfo.sourceDomain,
      };

      try {
        pullZone = await bunnyCdn.createPullZone(requestArgs);
        appInfo.apId = id;
        // break;
      } catch (error) {
        // maxTries -= 1;
        // if (
        //   error instanceof BunnyCdnError &&
        //   error.name === 'pullzone.name_taken'
        // ) {
        //   continue;
        // } else if (maxTries == 0) {
        //   throw 'Max number of tries for creating pullzone was reached.';
        // } else {
          throw error;
        // }
      }
    // } while (maxTries > 0);

    // Create custom hostname
    await bunnyCdn
      .addCustomHostname({
        pullZoneId: pullZone!.id,
        hostname: appInfo.hostname,
      })
      .catch((e) => {
        throw e;
      });

    // Add record to the database, if it's not been already added
    const zoneRecord = await prisma.zones.findMany({
      where: {
        zoneId: pullZone!.id,
        name: appInfo.apId,
        sourceDomain: appInfo.sourceDomain,
      },
    });

    if (zoneRecord.length == 0) {
      await prisma.zones.create({
        data: {
          zoneId: pullZone!.id,
          name: appInfo.apId,
          hostname: appInfo.hostname,
          sourceDomain: appInfo.sourceDomain,
        },
      });
    }

    return formatJSONResponse({
      appInfo,
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e,
    });
  }
};
