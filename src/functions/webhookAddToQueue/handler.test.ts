// eslint-disable-next-line import/no-extraneous-dependencies
import { Context, createContext } from '../utils/context';
import { main } from './handler';

let context: Context;

beforeEach(() => {
  context = createContext();
  jest.mock('../utils/context', () => ({
    createContext: () => context,
  }));
});

describe('Webhook add to queue', () => {
  it('adds an event to the queue', async () => {
    const sendMessageSpy = jest
      .spyOn(context.dataSources.webhookQueue, 'sendMessage')
      .mockResolvedValue({} as any);
    await expect(main()).resolves.toBeUndefined();
    expect(sendMessageSpy).toHaveBeenCalled();
  });
});
