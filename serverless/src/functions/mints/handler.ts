import {
    APIGatewayProxyResult,
    APIGatewayEvent,
    ///APIGatewayEventRequestContext,
  } from 'aws-lambda';
  import { formatJSONResponse } from '@libs/api-gateway';
  
  import { v4 } from 'uuid';
  
  export const submitMintInfo = async (
    event: APIGatewayEvent,
    ///context: APIGatewayEventRequestContext
  ): Promise<APIGatewayProxyResult> => {
    try {
      const id = v4();
  
      /**if (!verifyAlchemySig(event.headers.xalchemywork)) {
        throw new Error('Invalid sig');
      }**/
  
      const mintInfo = {
        buildId: id,
        createdAt: new Date().toISOString(),
        tokenId: event.body,
      };
  
      // check if we have it in mongo
      // if so, trigger verification call
      // if not, add to mongo
  
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
  