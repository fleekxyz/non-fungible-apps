import { handlerPath } from '@libs/handler-resolver';

export const submitNFA = {
  handler: `${handlerPath(__dirname)}/handler.submitNFA`,
  events: [
    {
      http: {
        method: 'post',
        path: 'submitNFA',
      },
    },
  ],
};
