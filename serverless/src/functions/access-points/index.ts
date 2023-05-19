import { handlerPath } from '@libs/handler-resolver';

export const submitAccessPointInfo = {
  handler: `${handlerPath(__dirname)}/handler.submitAccessPointInfo`,
  events: [
    {
      http: {
        method: 'post',
        path: 'accessPointInfo',
      },
    },
  ],
};
