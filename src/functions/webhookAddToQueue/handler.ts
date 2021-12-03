import 'source-map-support/register';

import { createContext } from '@functions/utils/context';

export const main = async () => {
  const context = createContext();

  console.log('Adding to queue...');

  await context.dataSources.webhookQueue.sendMessage({
    message: 'Hello from the webhook queue!',
  });
};
