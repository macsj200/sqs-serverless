import type { AWS } from '@serverless/typescript';

import { handlerPath } from '@libs/handlerResolver';

export const webhookAddToQueue: AWS['functions'][keyof AWS['functions']] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [],
};
