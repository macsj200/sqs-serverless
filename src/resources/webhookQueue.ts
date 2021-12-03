import type { AWS } from '@serverless/typescript';

export const webhookQueue: AWS['resources']['Resources'] = {
  WebhookQueue: {
    Type: 'AWS::SQS::Queue',
    Properties: {},
  },
};
