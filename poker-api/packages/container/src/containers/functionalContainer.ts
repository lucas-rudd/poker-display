import 'reflect-metadata';
import { interfaces } from 'inversify';
import { BaseContainer } from './BaseContainer';

let instance: BaseContainer = new BaseContainer();

export const useContainer = (container: BaseContainer) => {
    instance = container;
};

export const getContainer = (): BaseContainer => instance;

export const resolve = <T>(identifier: interfaces.ServiceIdentifier<T>) => {
    return getContainer().get<T>(identifier);
};
