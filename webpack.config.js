var webpack = require('webpack');


// webpack.config.js
module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        path: __dirname + '/lib',
        filename: 'bundle.js',
        library: "twitterIntegration",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
        ],
        postLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // do not lint third-party code
                loader: 'jshint-loader'
            }
        ],
        jshint: {
            // Display JSHint messages as webpack errors
            emitErrors: true,

            // fail the build on JSHInt errors
            failOnHint: false,
        }
    },
    plugins: [

    ]
};