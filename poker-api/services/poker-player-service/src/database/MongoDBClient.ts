import { injectable } from 'inversify';
import { MongoDBConnection } from './MongoDBConnection';

@injectable()
export class MongoDBClient {

    constructor(private readonly connection: MongoDBConnection) {}

    public async init() {
        return await this.connection.connect();
    }

    public async getDbInstance() {
        return await this.connection.getDbInstance();
    }


}