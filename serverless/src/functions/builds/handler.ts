import { APIGatewayEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { v4 } from 'uuid';

export const submitBuildInfo = middyfy(
  async (
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    try {
      const id = v4();
      const buildInfo = {
        event,
        buildId: id,
        createdAt: new Date().toISOString(),
      };
      return formatJSONResponse({
        buildInfo,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
