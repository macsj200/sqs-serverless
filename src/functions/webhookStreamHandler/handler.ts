import { SQSHandler } from 'aws-lambda';

export const main: SQSHandler = async (event) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const record of event.Records) {
    console.log('SQS Record: ', record);
  }
};
