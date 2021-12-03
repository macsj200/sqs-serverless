import { SQSClient } from '@aws-sdk/client-sqs';
import { WebhookQueue } from './webhookQueue';

export type DataSources = {
  sqsClient: SQSClient;
  webhookQueue: WebhookQueue;
};

// eslint-disable-next-line arrow-body-style
export const buildDataSources = (): DataSources => {
  // Create SQS service object.
  const sqsClient = new SQSClient({});
  const webhookQueue = new WebhookQueue(sqsClient);
  return {
    sqsClient,
    webhookQueue,
  };
};
