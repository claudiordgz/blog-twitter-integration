var webpack = require('webpack'),
    path = require('path');


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
            {
                loader: "babel-loader",
                // Skip any files outside of your project's `src` directory
                include: [
                    path.resolve(__dirname, "src")
                ],
                // Only run `.js` and `.jsx` files through Babel
                test: /\.js?$/,
                // Options to configure babel with
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0']
                }
            }
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