import { Context, createContext } from '@functions/utils/context';
import { WebhookQueueMessage } from './webhookQueue';

let context: Context;

beforeEach(() => {
  context = createContext();
  jest.mock('@functions/utils/context', () => ({
    createContext: () => context,
  }));
});

describe('Webhook queue', () => {
  describe('send message', () => {
    it('sends a message', async () => {
      const sendSpy = jest
        .spyOn(context.dataSources.sqsClient, 'send')
        // @ts-ignore
        .mockResolvedValue({} as any);
      const message: WebhookQueueMessage = {
        message: 'Hello world',
      };
      await context.dataSources.webhookQueue.sendMessage(message);
      expect(sendSpy).toHaveBeenCalled();
    });
  });
});
