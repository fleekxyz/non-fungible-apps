import { handlerPath } from '@libs/handlerResolver';

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
