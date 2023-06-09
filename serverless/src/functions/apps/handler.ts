import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import * as dotenv from 'dotenv';
import { BunnyCdn, LoadFreeCertificateMethodArgs } from '@libs/bunnyCDN';

export const verifyApp = async (
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
