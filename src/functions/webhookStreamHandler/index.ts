import type { AWS } from '@serverless/typescript';

import { handlerPath } from '@libs/handlerResolver';

export const webhookStreamHandler: AWS['functions'][keyof AWS['functions']] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: { 'Fn::GetAtt': ['WebhookQueue', 'Arn'] },
      },
    },
  ],
};
