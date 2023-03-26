import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { Handler } from 'aws-lambda';

export const middyfy = (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser());
};
