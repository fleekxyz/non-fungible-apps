import { handlerPath } from '@libs/handler-resolver';

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
