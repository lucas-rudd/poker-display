const serverlessWebpackTsConfig = require('@poker-api-utils/webpack');
const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(serverlessWebpackTsConfig, {
    output: {
        path: path.join(__dirname, '.webpack')
    }
});
