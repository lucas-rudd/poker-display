const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
    entry: slsw.lib.entries,
    devtool: 'source-map',
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx'
        ]
    },
    optimization: {
        minimize: false
    },
    externals: ['aws-sdk'],
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
        sourceMapFilename: '[file].map'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, // disable type checker - we will manually type check
                            happyPackMode: true
                        }
                    }
                ]
            }
        ]
    },
};
