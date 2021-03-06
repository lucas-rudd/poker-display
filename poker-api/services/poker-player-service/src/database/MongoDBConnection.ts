import 'reflect-metadata';
import { connect as mongooseConnect, Mongoose, ConnectionOptions } from 'mongoose';
import { MongoDBConnectionConfiguration } from '../config';
import { injectable } from 'inversify';
import { rdsCert } from '../certs';

@injectable()
export class MongoDBConnection {
    private dbInstance: Mongoose | undefined;

    constructor(private readonly databaseConfiguration: MongoDBConnectionConfiguration) {}

    public async connect() {
        const connectionUrl = await this.databaseConfiguration.databaseConnection();
        /**
         * I need typescript to ignore type-checking on the next line
         * rdsCert is a string, and not assignable to ReadonlyArray<string>
         * this is due to the fact that I have saved the cert in a ts file instead
         * of a pem file to reduce overhead in webpack transpilation.
         **/
        return await mongooseConnect(
            connectionUrl,
            // @ts-ignore
            { sslCA: rdsCert, sslValidate: true, useNewUrlParser: false } as ConnectionOptions
        ).then((db: Mongoose) => {
            this.dbInstance = db;
        });
    }

    public async getDbInstance() {
        if (!this.dbInstance) {
            await this.connect();
        }
        return this.dbInstance;
    }
}
