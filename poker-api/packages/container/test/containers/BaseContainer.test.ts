import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { injectable } from 'inversify';

import { BaseContainer } from '../../src';

chai.use(chaiAsPromised);

@injectable()
class Book {
    public title: string;
    public author: string;
}

describe('BaseContainer', () => {
    const container: BaseContainer = new BaseContainer();

    beforeEach(() => {
        container.snapshot();
    });

    afterEach(() => {
        container.restore();
    });

    it('should automatically bind injectable classes', done => {
        chai.expect(container.isBound(Book)).to.be.false;
        chai.expect(container.get(Book)).to.be.instanceof(Book);
        chai.expect(container.isBound(Book)).to.be.true;
        done();
    });

    it('should bind classes as singletons by default', done => {
        const book: Book = container.get(Book);
        chai.expect(container.get(Book)).to.be.equal(book);
        done();
    });
});
