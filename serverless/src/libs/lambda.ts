import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';
import { Handler } from 'aws-lambda';

export const middyfy = (handler: Handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(
      httpResponseSerializer({
        defaultContentType: 'application/json',
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: (res) => JSON.stringify(res.body || res),
          },
        ],
      })
    );
};
