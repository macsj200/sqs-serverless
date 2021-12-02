import type { AWS } from '@serverless/typescript';

import { webhookQueue } from '@resources/webhookQueue';
import { webhookStreamHandler } from '@functions/webhookStreamHandler';

const serverlessConfiguration: AWS = {
  service: 'sqs-serverless',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      // TODO scope per-function
    ],
  },
  // import the function via paths
  functions: {
    webhookStreamHandler,
  },
  resources: {
    Resources: {
      ...webhookQueue,
    },
  },
};

module.exports = serverlessConfiguration;
