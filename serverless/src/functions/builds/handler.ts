import { APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';

import { v4 } from 'uuid';

export const submitBuildInfo = async (): Promise<APIGatewayProxyResult> => {
  try {
    const id = v4();
    const buildInfo = {
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
};
