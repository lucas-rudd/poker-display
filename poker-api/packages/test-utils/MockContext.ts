import { Context } from 'aws-lambda';
import * as sinon from 'sinon';
import * as faker from 'faker';

export const MockContext: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: faker.random.word(),
    functionVersion: faker.random.alphaNumeric(),
    invokedFunctionArn: faker.random.alphaNumeric(),
    memoryLimitInMB: faker.random.number(),
    awsRequestId: faker.random.uuid(),
    logGroupName: faker.random.alphaNumeric(),
    logStreamName: faker.random.alphaNumeric(),
    getRemainingTimeInMillis: sinon.stub(),
    done: sinon.stub(),
    succeed: sinon.stub(),
    fail: sinon.stub()
};
