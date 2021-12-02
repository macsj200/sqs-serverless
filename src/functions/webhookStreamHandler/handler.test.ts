import { Context, createContext } from '@functions/utils/context';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import { main } from './handler';

let context: Context;

beforeEach(() => {
  context = createContext();
  jest.mock('@functions/utils/context', () => ({
    createContext: () => context,
  }));
});

describe('SQS handler', () => {
  it('processes SQS event', async () => {
    const event: SQSEvent = {
      Records: [{} as SQSRecord],
    };
    await expect(main(event, {} as any, {} as any)).resolves.toBeUndefined();
  });
});
