# SQS Serverless

## About

This package uses the [Serverless Framework](https://serverless.com/) to define an SQS queue and a Lambda function that processes messages from the queue. It also defines a lambda function that sends messages to the queue.

## Setup

Install the [Serverless Framework](https://serverless.com/) and configure AWS credentials. You can set your credentials using env vars or by defining an AWS config file `~/.aws/config` and/or credentials file `~/.aws/credentials`. An easy way to configure these credentials is to set up the AWS CLI.

Additionally, run `yarn install` to install the package dependencies.

## Deploy

Running `sls deploy` will automatically build the project files and upload the bundle to AWS. Then, CloudFormation is triggered to provision the requested resources.

You can see the resource definitions in [`./serverless.ts`](./serverless.ts).

## Usage

After deploying the stack, you can manually invoke the [`./src/functions/webhookAddToQueue/handler.ts`](./src/functions/webhookAddToQueue/handler.ts) function to add a message to the queue by running `serverless invoke -f webhookAddToQueue`. This manually triggers the function that adds a message to the queue.

After inserting a message manually or via the lambda function the queue will be processed by the [`src/functions/webhookStreamHandler/handler.ts`](./src/functions/webhookStreamHandler/handler.ts) function. Currently, this function only logs the message to the console.

The logs for the queue processing lambda function can be viewed by running `serverless logs -f webhookStreamHandler`. This command loads the CloudWatch Logs and prints them to stdout. Alternatively, the CloudWatch Logs can be viewed in the AWS console. Note that this may take a few minutes to create the cloudwatch stream.

## Testing

This package is linted with `eslint` and unit tests are run via jest by running `yarn test`. This package strives for 100% code coverage.

## CI/CD

This package defines several Github Workflow scripts in [`./.github/workflows`](./.github/workflows). These scripts are used to automate running the lint/test checks and, subsequently, the deployment of the stack. This deployment script is currently manually hardcoded to deploy to a single `dev` environment.

[`./.github/workflows/nodejs-pr-ci.yml`](./.github/workflows/nodejs-pr-ci.yml) and [`./.github/workflows/nodejs-push-master-ci.yml`](./.github/workflows/nodejs-push-master-ci.yml) define scripts to run the `yarn ci` command. This command invokes the lint/type/build checks and runs the unit tests. The result of this script will appear in PRs or in the `master` branch build status. These are triggered when something is pushed to `master` or a PR branch.

After the `master` branch test job completes this triggers the deployment of the stack, defined in [`./.github/workflows/deploy-dev.yml`](./.github/workflows/deploy-dev.yml). This script runs `yarn deploy`. This script requires that the env vars `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are set. These can be configured as GitHub Secrets for the repo.
