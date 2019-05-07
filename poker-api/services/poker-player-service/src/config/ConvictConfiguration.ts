import * as convict from 'convict';

export const config: convict.Config<{}> = convict({
    env: {
        doc: 'API Environment',
        format: String,
        default: 'test',
        env: 'NODE_ENV'
    },
    database: {
        mongodb: {
            connection: {
                doc: 'Encrypted Mongodb database connection',
                format: String,
                default: '',
                env: 'ENCRYPTED_DATABASE_CONNECTION'
            }
        }
    }
});
