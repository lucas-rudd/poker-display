import { MockContext } from '@poker-api-utils/test-utils';
import { Context, APIGatewayProxyEvent } from 'aws-lambda';
import { describe, it, beforeEach, afterEach } from 'mocha';
import * as Promise from 'bluebird';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';

import {
    getPokerPlayers,
    putPokerPlayer,
    deletePokerPlayer,
    PokerPlayerService,
    SortingOptions,
    IPokerPlayer
} from '../../src/';

import getRequest from '../json/handler/getRequest.json';
import getRequestWithQueryStringParams from '../json/handler/getRequestWithQueryStringParams.json';
import getResponse from '../json/handler/getResponse.json';

import putRequest from '../json/handler/putRequest.json';
import putRequestWithNoBody from '../json/handler/putRequestWithNoBody.json';
import putResponse from '../json/handler/putResponse.json';

import deleteResponse from '../json/handler/deleteRequest.json';

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
            pokerPlayerServiceStub = sandbox
                .stub(PokerPlayerService.prototype, 'getPokerPlayers')
                .resolves(getResponse);

            const promise: Promise<APIGatewayProxyEvent> = getPokerPlayers(getRequest as APIGatewayProxyEvent, ctx);

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 200);
                chai.expect(response.body).to.eql(JSON.stringify(getResponse));

                chai.expect(response).to.have.property('headers');
            });
        });

        it('should call service with sorting options if passed in', () => {
            pokerPlayerServiceStub = sandbox
                .stub(PokerPlayerService.prototype, 'getPokerPlayers')
                .resolves(getResponse as IPokerPlayer[]);
            const sortingOptions: SortingOptions = getRequestWithQueryStringParams.queryStringParameters;

            const promise: Promise<APIGatewayProxyEvent> = getPokerPlayers(
                (getRequestWithQueryStringParams as any) as APIGatewayProxyEvent,
                ctx
            );

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 200);
                chai.expect(response).to.have.property('body', JSON.stringify(getResponse));
                chai.expect(response).to.have.property('headers');

                sinon.assert.calledWith(pokerPlayerServiceStub, {}, sortingOptions);
            });
        });

        it('should return an error on failure', () => {
            pokerPlayerServiceStub = sandbox.stub(PokerPlayerService.prototype, 'getPokerPlayers').rejects(error);

            const promise: Promise<APIGatewayProxyEvent> = getPokerPlayers(getRequest as APIGatewayProxyEvent, ctx);

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

        beforeEach(() => {
            ctx = MockContext;
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return a successful response object on success', () => {
            sandbox.stub(PokerPlayerService.prototype, 'putPokerPlayer').resolves(putResponse as IPokerPlayer);

            const promise: Promise<APIGatewayProxyEvent> = putPokerPlayer(putRequest as APIGatewayProxyEvent, ctx);

            return chai.expect(promise).to.be.fulfilled.then(response => {
                console.log('RESPONSE', response);
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 201);
                chai.expect(response.body).to.eql(JSON.stringify(putResponse));

                chai.expect(response).to.have.property('headers');
            });
        });

        it('should return an error on failure', () => {
            sandbox.stub(PokerPlayerService.prototype, 'putPokerPlayer').rejects(error);

            const promise: Promise<APIGatewayProxyEvent> = putPokerPlayer(putRequest as APIGatewayProxyEvent, ctx);

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 500);

                chai.expect(response).to.have.property('headers');

                const body: { error: string } = JSON.parse(response.body);
                chai.expect(body).to.have.property('error', error.message);
            });
        });

        it('should return an error if no request body is passed in', () => {
            sandbox.stub(PokerPlayerService.prototype, 'putPokerPlayer').resolves(putResponse as IPokerPlayer);

            const promise: Promise<APIGatewayProxyEvent> = putPokerPlayer(
                (putRequestWithNoBody as any) as APIGatewayProxyEvent,
                ctx
            );

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 500);

                chai.expect(response).to.have.property('headers');

                const body: { error: string } = JSON.parse(response.body);
                chai.expect(body).to.have.property('error', 'Must specify a request body');
            });
        });
    });

    describe('deletePokerPlayer', () => {
        let ctx: Context;
        let sandbox: sinon.SinonSandbox;

        beforeEach(() => {
            ctx = MockContext;
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should return a successful response object on success', () => {
            sandbox.stub(PokerPlayerService.prototype, 'deletePokerPlayer').resolves(deleteResponse as IPokerPlayer);

            const promise: Promise<APIGatewayProxyEvent> = deletePokerPlayer(putRequest as APIGatewayProxyEvent, ctx);

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 202);
                chai.expect(response).to.have.property('body', JSON.stringify(putResponse));

                chai.expect(response).to.have.property('headers');
            });
        });

        it('should return an error on failure', () => {
            sandbox.stub(PokerPlayerService.prototype, 'deletePokerPlayer').rejects(error);

            const promise: Promise<APIGatewayProxyEvent> = deletePokerPlayer(putRequest as APIGatewayProxyEvent, ctx);

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 500);

                chai.expect(response).to.have.property('headers');

                const body: { error: string } = JSON.parse(response.body);
                chai.expect(body).to.have.property('error', error.message);
            });
        });

        it('should return an error if no request body is passed in', () => {
            sandbox.stub(PokerPlayerService.prototype, 'deletePokerPlayer').resolves();

            const promise: Promise<APIGatewayProxyEvent> = deletePokerPlayer(
                (putRequestWithNoBody as any) as APIGatewayProxyEvent,
                ctx
            );

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.have.property('statusCode', 500);

                chai.expect(response).to.have.property('headers');

                const body: { error: string } = JSON.parse(response.body);
                chai.expect(body).to.have.property('error', 'Must specify a request body');
            });
        });
    });
});
