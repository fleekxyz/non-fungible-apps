import { handlerPath } from '@libs/handler-resolver';

export const verifyAccessPoint = {
  handler: `${handlerPath(__dirname)}/handler.verifyAccessPoint`,
  events: [
    {
      http: {
        method: 'post',
        path: 'verifyAccessPoint',
      },
    },
  ],
};
