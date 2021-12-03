import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

export type WebhookQueueMessage = any; // TODO type

export class WebhookQueue {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public sqsClient: SQSClient,
    public queueUrl = process.env.WEBHOOK_QUEUE_URL!
  ) {
    console.log('WebhookQueue constructor', queueUrl);
  }

  async sendMessage(
    message: WebhookQueueMessage
  ): Promise<WebhookQueueMessage> {
    // https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/sqs-examples-send-receive-messages.html
    // Set the parameters
    const params = {
      DelaySeconds: 10,
      MessageAttributes: {
        // Title: {
        //   DataType: 'String',
        //   StringValue: 'The Whistler',
        // },
        // Author: {
        //   DataType: 'String',
        //   StringValue: 'John Grisham',
        // },
        // WeeksOn: {
        //   DataType: 'Number',
        //   StringValue: '6',
        // },
      },
      MessageBody: JSON.stringify(message),
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      // MessageGroupId: "Group1",  // Required for FIFO queues
      QueueUrl: this.queueUrl,
    };
    await this.sqsClient.send(new SendMessageCommand(params));
    return message;
  }
}
