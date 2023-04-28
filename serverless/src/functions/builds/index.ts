import { handlerPath } from '@libs/handler-resolver';

export const submitBuildInfo = {
  handler: `${handlerPath(__dirname)}/handler.submitBuildInfo`,
  events: [
    {
      http: {
        method: 'post',
        path: 'buildInfo',
      },
    },
  ],
};
