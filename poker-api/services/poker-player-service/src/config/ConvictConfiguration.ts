import * as convict from 'convict';

export const config: convict.Config<{}> = convict({
    database: {
        mongodb: {
            connection: {
                doc: 'Encrypted Mongodb database connection',
                format: String,
                default: '',
                env: 'ENCRYPTED_DATABASE_CONNECTION'
            }
        }
    },
});
