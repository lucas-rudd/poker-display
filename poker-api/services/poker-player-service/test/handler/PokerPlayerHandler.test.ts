import { MockContext } from '@poker-api-utils/test-utils';
import { Context } from 'aws-lambda';
import { describe, it, beforeEach, afterEach } from 'mocha';
import * as Promise from 'bluebird';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';

import { getPokerPlayers, putPokerPlayer, PokerPlayerService, SortingOptions } from '../../src/';


const getRequest = require('../json/handler/pokerPlayerHandler/getRequest.json');
const getRequestWithQueryStringParams = require('../json/handler/pokerPlayerHandler/getRequestWithQueryStringParams.json');
const getResponse = require('../json/handler/pokerPlayerHandler/getResponse.json');

const putRequest = require('../json/handler/pokerPlayerHandler/putRequest.json');
const putRequestWithNoBody = require('../json/handler/pokerPlayerHandler/putRequestWithNoBody.json');
const putResponse = require('../json/handler/pokerPlayerHandler/putResponse.json');


const error = new Error();

chai.use(chaiAsPromised);

describe('PokerPlayerHandler', () => {

    describe('getPokerPlayers', () => {
        let ctx: Context;
        let sandbox: sinon.SinonSandbox;
        let pokerPlayerServiceStub: sinon.SinonStub;

        beforeEach(() => {
            ctx = MockContext;
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return a successful response object on success', () => {
            pokerPlayerServiceStub = sandbox.stub(PokerPlayerService.prototype, 'getPokerPlayers').resolves(getResponse);

            const promise: Promise<{}> = Promise.fromCallback(cb => getPokerPlayers(getRequest, ctx, cb));

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 200);
                chai.expect(response).to.have.property('body', JSON.stringify(getResponse));

                chai.expect(response).to.have.property('headers');
            });
        });

        it('should call service with sorting options if passed in', () => {
            pokerPlayerServiceStub = sandbox.stub(PokerPlayerService.prototype, 'getPokerPlayers').resolves(getResponse);
            const sortingOptions: SortingOptions = getRequestWithQueryStringParams.queryStringParameters;

            const promise: Promise<{}> = Promise.fromCallback(cb => getPokerPlayers(getRequestWithQueryStringParams, ctx, cb));

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 200);
                chai.expect(response).to.have.property('body', JSON.stringify(getResponse));
                chai.expect(response).to.have.property('headers');

                sinon.assert.calledWith(pokerPlayerServiceStub, sortingOptions)
            });
        });

        it('should return an error on failure', () => {
            pokerPlayerServiceStub = sandbox.stub(PokerPlayerService.prototype, 'getPokerPlayers').rejects(error);

            const promise: Promise<{}> = Promise.fromCallback(cb => getPokerPlayers(getRequest, ctx, cb));

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 500);

                chai.expect(response).to.have.property('headers');

                const body: { error: string } = JSON.parse(response.body);
                chai.expect(body).to.have.property('error', error.message);
            });
        });
    });

    describe('putPokerPlayer', () => {
        let ctx: Context;
        let sandbox: sinon.SinonSandbox;
        let pokerPlayerServiceStub: sinon.SinonStub;

        beforeEach(() => {
            ctx = MockContext;
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return a successful response object on success', () => {
            pokerPlayerServiceStub = sandbox.stub(PokerPlayerService.prototype, 'putPokerPlayer').resolves(putResponse);

            const promise: Promise<{}> = Promise.fromCallback(cb => putPokerPlayer(putRequest, ctx, cb));

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 201);
                chai.expect(response).to.have.property('body', JSON.stringify(putResponse));

                chai.expect(response).to.have.property('headers');
            });
        });

        it('should return an error on failure', () => {
            pokerPlayerServiceStub = sandbox.stub(PokerPlayerService.prototype, 'putPokerPlayer').rejects(error);

            const promise: Promise<{}> = Promise.fromCallback(cb => putPokerPlayer(putRequest, ctx, cb));

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 500);

                chai.expect(response).to.have.property('headers');

                const body: { error: string } = JSON.parse(response.body);
                chai.expect(body).to.have.property('error', error.message);
            });
        });

        it('should return an error if no request body is passed in', () => {
            pokerPlayerServiceStub = sandbox.stub(PokerPlayerService.prototype, 'putPokerPlayer').resolves(putResponse);

            const promise: Promise<{}> = Promise.fromCallback(cb => putPokerPlayer(putRequestWithNoBody, ctx, cb));

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 500);

                chai.expect(response).to.have.property('headers');

                const body: { error: string } = JSON.parse(response.body);
                chai.expect(body).to.have.property('error', 'Must specify a request body');
            });
        })
    });
});
