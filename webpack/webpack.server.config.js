var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules').filter(function (x) {
  return ['.bin'].indexOf(x) === -1;
}).forEach(function (mod) {
  nodeModules[mod] = 'commonjs' + mod;
});
var cssModulesLoader = ['style',
      'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'resolve-url',
      'sass'].join('!');
module.exports = {
  entry: {
    server: [
      'webpack/hot/poll?1000', // 轮询更新内容的代码
      './server/index.js'
    ]
  },
  output: {
    path: path.resolve('./build'),
    filename: 'server.js'
  },
  target: 'node',
  externals: nodeModules,
  resolve: {
    root: [
      path.resolve('./src/modules')
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.scss$/,
      loader: cssModulesLoader
    }]
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
    new webpack.HotModuleReplacementPlugin({ quiet: true })
  ],
  devtool: 'sourcemap'
};
