import 'reflect-metadata';
import { Container as InversifyContainer, interfaces } from 'inversify';

const defaultContainerOptions: interfaces.ContainerOptions = {
    autoBindInjectable: true,
    defaultScope: 'Singleton'
};

export class BaseContainer extends InversifyContainer {
    constructor(containerOptions?: interfaces.ContainerOptions) {
        super(containerOptions || defaultContainerOptions);
    }
}
