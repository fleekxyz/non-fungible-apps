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
