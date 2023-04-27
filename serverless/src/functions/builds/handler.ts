import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';

import { v4 } from 'uuid';
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

    const id = v4();
    const buildInfo = {
      buildId: id,
      createdAt: new Date().toISOString(),
      submittedData: JSON.parse(event.body),
    };

    // place holder call
    // nfaContract.methods
    //   .setTokenBuild(1, 'hash', 'repo')
    //   .call((err: string | undefined, res: any) => {
    //     if (err) throw new Error(err);
    //     console.log('result');
    //     console.log(res);
    //   });

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
