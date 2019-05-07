import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import * as chaiAsPromised from 'chai-as-promised';

import { BaseContainer, useContainer, getContainer, resolve } from '../../src';

chai.use(chaiAsPromised);

class TestDependency {}

describe('linkContainer', () => {
    let sandbox: sinon.SinonSandbox;
    let containerInstance;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(BaseContainer.prototype, 'get').returns(new TestDependency());
        containerInstance = new BaseContainer();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should support getting and setting the linked container', async () => {
        useContainer(containerInstance);

        const container = getContainer();

        return chai.expect(container).to.deep.equal(containerInstance);
    });

    it('should be able to get instance of container without linking', async () => {
        const container = getContainer();

        return chai.expect(container).to.be.an.instanceOf(BaseContainer);
    });

    it('should successfully resolve dependencies with the container initially linked', async () => {
        useContainer(containerInstance);

        const dependency = resolve(TestDependency);

        return chai.expect(dependency).to.be.an.instanceOf(TestDependency);
    });

    it('should successfully resolve dependencies with the container not initially linked', async () => {
        const dependency = resolve(TestDependency);

        return chai.expect(dependency).to.be.an.instanceOf(TestDependency);
    });
});
