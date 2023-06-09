import { handlerPath } from '@libs/handler-resolver';

export const verifyApp = {
  handler: `${handlerPath(__dirname)}/handler.verifyApp`,
  events: [
    {
      http: {
        method: 'post',
        path: 'verifyApp',
      },
    },
  ],
};

export const submitAppInfo = {
  handler: `${handlerPath(__dirname)}/handler.submitAppInfo`,
  events: [
    {
      http: {
        method: 'post',
        path: 'app',
      },
    },
  ],
};
