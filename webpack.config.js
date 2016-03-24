var webpack = require('webpack'),
  path = require('path'),
  fs = require('fs'),
  nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

// webpack.config.js
module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  target: 'node',
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    reasons: true,
    hash: false,
    modulesSort: 'name'
  },
  output: {
    path: __dirname + '/lib',
    filename: 'bundle.js',
    library: "twitterIntegration",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: 'babel',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.json?$/,
        loader: "json-loader"
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", '.es6.js']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  eslint: {
    configFile: '.eslintrc'
  }
};