import 'reflect-metadata';
import { injectable } from 'inversify';
import * as AWS from 'aws-sdk';
import { config } from './ConvictConfiguration';

const DATABASE_CONNECTION: string = config.get('database.mongodb.connection');
const ENV: string = config.get('env');

@injectable()
export class MongoDBConnectionConfiguration {
    public get databaseConnectionEncrypted(): string {
        return DATABASE_CONNECTION;
    }

    public async databaseConnection(): Promise<string> {
        if (ENV === 'local' || ENV === 'test') return this.databaseConnectionEncrypted;

        const kms = new AWS.KMS({ region: 'us-east-1' });
        return kms
            .decrypt({
                CiphertextBlob: new Buffer(DATABASE_CONNECTION, 'base64')
            })
            .promise()
            .then(data => {
                const decrypted = String(data.Plaintext);
                return decrypted;
            })
            .catch(e => {
                console.log(e);
                throw e;
            });
    }
}
