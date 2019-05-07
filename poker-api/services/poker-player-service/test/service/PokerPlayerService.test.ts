import { Context } from 'aws-lambda';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import { Model } from 'mongoose';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { resolve } from '@poker-api/container';
import { PokerPlayerService, MongoDBClient, PokerPlayer, SortingOptions, IPokerPlayer } from '../../src';

const getResponse = require('../json/handler/getResponse.json');
const putResponse = require('../json/handler/putResponse.json');

chai.use(chaiAsPromised);

const error = new Error('failed');
const dbError = new Error('db error');

describe('PokerPlayerService', () => {
    let sandbox: sinon.SinonSandbox;
    let pokerPlayerService: PokerPlayerService;
    let pokerPlayerModelStub: sinon.SinonStub;
    let databaseStub: sinon.SinonStub;

    beforeEach(() => {
        pokerPlayerService = new PokerPlayerService(resolve(MongoDBClient));
        sandbox = sinon.createSandbox();
    });

    describe('Database initalization error', () => {
        beforeEach(() => {
            databaseStub = sandbox.stub(MongoDBClient.prototype, 'init').rejects(dbError);
        });

        afterEach(() => {
            sandbox.restore();
        });

        describe('getPokerPlayers', () => {
            it('should throw an exception if db fails to init', () => {
                const promise: Promise<IPokerPlayer[]> = pokerPlayerService.getPokerPlayers();
                return chai.expect(promise).to.be.rejected.then(err => {
                    chai.expect(err).to.deep.equal(dbError);
                });
            });
        });

        describe('putPokerPlayer', () => {
            it('should throw an exception if db fails to init', () => {
                const promise: Promise<IPokerPlayer> = pokerPlayerService.putPokerPlayer(putResponse as IPokerPlayer);
                return chai.expect(promise).to.be.rejected.then(err => {
                    chai.expect(err).to.deep.equal(dbError);
                });
            });
        });

        describe('deletePokerPlayer', () => {
            it('should throw an exception if db fails to init', () => {
                const promise: Promise<IPokerPlayer | null> = pokerPlayerService.deletePokerPlayer(
                    putResponse as IPokerPlayer
                );
                return chai.expect(promise).to.be.rejected.then(err => {
                    chai.expect(err).to.deep.equal(dbError);
                });
            });
        });
    });

    describe('getPokerPlayers', () => {
        // would be better to do with SinonStubbedInstance,
        // but was having trouble getting the PokerPlayer type to resolve
        let pokerPlayerSortStub: sinon.SinonStub;

        beforeEach(() => {
            pokerPlayerSortStub = sandbox.stub().resolves(getResponse);
            pokerPlayerModelStub = sandbox.stub(PokerPlayer, 'find').callsFake(() => {
                return {
                    sort: pokerPlayerSortStub
                };
            });
            databaseStub = sandbox.stub(MongoDBClient.prototype, 'init').resolves();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should call find on PokerPlayer model with empty sorting if no sort is passed in', () => {
            const promise: Promise<{}> = pokerPlayerService.getPokerPlayers();

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('array');
                chai.expect(response).to.deep.equal(getResponse);
                sinon.assert.calledWith(pokerPlayerSortStub, {
                    '': ''
                });
            });
        });

        it('should call find on PokerPlayer model with sorting options if options are passed in', () => {
            const sortingOptions: SortingOptions = {
                order: 'asc',
                sortField: 'test'
            };
            const promise: Promise<{}> = pokerPlayerService.getPokerPlayers(sortingOptions);

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('array');
                chai.expect(response).to.deep.equal(getResponse);
                sinon.assert.calledWith(pokerPlayerSortStub, {
                    test: 'asc'
                });
            });
        });
    });

    describe('putPokerPlayer', () => {
        let databaseStub: sinon.SinonStub;

        beforeEach(() => {
            pokerPlayerService = new PokerPlayerService(resolve(MongoDBClient));
            sandbox = sinon.createSandbox();
            databaseStub = sandbox.stub(MongoDBClient.prototype, 'init').resolves();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should call findOneAndUpdate on PokerPlayer model', () => {
            pokerPlayerModelStub = sandbox.stub(PokerPlayer, 'findOneAndUpdate').resolves(putResponse);
            const promise: Promise<IPokerPlayer> = pokerPlayerService.putPokerPlayer(putResponse as IPokerPlayer);

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.deep.equal(putResponse);
                sinon.assert.calledOnce(pokerPlayerModelStub);
            });
        });

        it('should throw and error if PokerPlayer model fails to save', () => {
            pokerPlayerModelStub = sandbox.stub(PokerPlayer, 'findOneAndUpdate').rejects(error);
            const promise: Promise<IPokerPlayer> = pokerPlayerService.putPokerPlayer(putResponse as IPokerPlayer);

            return chai.expect(promise).to.be.rejected.then(err => {
                chai.expect(err).to.deep.equal(error);
                sinon.assert.calledOnce(pokerPlayerModelStub);
            });
        });
    });

    describe('deletePokerPlayer', () => {
        let databaseStub: sinon.SinonStub;

        beforeEach(() => {
            pokerPlayerService = new PokerPlayerService(resolve(MongoDBClient));
            sandbox = sinon.createSandbox();
            databaseStub = sandbox.stub(MongoDBClient.prototype, 'init').resolves();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should call findOneAndDelete on PokerPlayer model', () => {
            pokerPlayerModelStub = sandbox.stub(PokerPlayer, 'findOneAndDelete').resolves(putResponse);
            const promise: Promise<IPokerPlayer | null> = pokerPlayerService.deletePokerPlayer(
                putResponse as IPokerPlayer
            );

            return chai.expect(promise).to.be.fulfilled.then(response => {
                chai.expect(response).to.be.an('object');
                chai.expect(response).to.deep.equal(putResponse);
                sinon.assert.calledOnce(pokerPlayerModelStub);
            });
        });

        it('should throw and error if PokerPlayer model fails to delete', () => {
            pokerPlayerModelStub = sandbox.stub(PokerPlayer, 'findOneAndDelete').rejects(error);
            const promise: Promise<IPokerPlayer | null> = pokerPlayerService.deletePokerPlayer(
                putResponse as IPokerPlayer
            );

            return chai.expect(promise).to.be.rejected.then(err => {
                chai.expect(err).to.deep.equal(error);
                sinon.assert.calledOnce(pokerPlayerModelStub);
            });
        });
    });
});
