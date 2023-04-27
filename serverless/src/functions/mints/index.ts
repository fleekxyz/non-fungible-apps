import { handlerPath } from '@libs/handler-resolver';

export const newMint = {
  handler: `${handlerPath(__dirname)}/handler.newMint`,
  events: [
    {
      http: {
        method: 'post',
        path: 'mint',
      },
    },
  ],
};
