var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var env = process.env.NODE_ENV || 'development';
// 生成环境是否需要sourceMap
var sourceMap = process.env.SOURCE_MAP || true;
var js = glob.sync('./src/pages/**/index.js').reduce(function (prev, curr) {
  prev[curr.slice(6, -3)] = [curr];
  return prev;
}, {});
var html = glob.sync('./src/pages/**/*.html').map(function (item) {
  return new HtmlWebpackPlugin({
    filename: item.substr(6),
    template: 'ejs-compiled!' + item,
    inject: true,
    minify: (env === 'production' && {
      removeComments: true,
      collapseWhitespace: true,
      preserveLineBreaks: true,
      collapseInlineTagWhitespace: true,
      collapseBooleanAttributes: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      caseSensitive: true,
      minifyJS: true,
      minifyCSS: true,
      quoteCharacter: '"'
    })
  });
});
var cssModulesLoader = (function () {
  var enableSourceMap = sourceMap ? '?sourceMap' : '';
  if (env === 'production') {
    return ExtractTextPlugin.extract(
      'style' + enableSourceMap,
      'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url!sass' + enableSourceMap);
  } else {
    return ['style',
      'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'resolve-url',
      'sass'].join('!');
  }

})();
var config = {
  entry: js,
  resolve: {
    root: [
      path.resolve('./src/modules')
    ]
  },
  output: {
    path: path.resolve('./build'),
    filename: '[name].js'
  },
  module: {
    preLoaders: [{
      test: /\.js/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
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
    }, {
      test: /\.(png|PNG|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash:7]'
      }
    }]
  },
  plugins: ([
    new ProgressBarPlugin(),
    // 将环境变量注入到打包的js中，在打包时可以使用变量判断打包环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.DllReferencePlugin({
        context: __dirname,
        /**
         * 在这里引入 manifest 文件
         */
        manifest: require('./build/vendor/react-manifest.json')
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      })
    ].concat(html)
  ),
  bail: true,
  debug: false
};

if (env === 'production') {
  config.devtool = sourceMap? '#source-map' : false;
  config.output.filename = '[name].[chunkhash].js';
  config.output.chunkFilename = '[id].[chunkhash].js';
  config.plugins = config.plugins.concat([
    // 优化id顺序
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 不重复生成模块
    new webpack.optimize.DedupePlugin(),
    // 合并块
    new webpack.optimize.AggressiveMergingPlugin(),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: sourceMap,
      compress: {
        // 不考虑对象的边际作用
        pure_getters: true,
        // 不支持ie8
        screw_ie8: true,
        // 进行一些可能会破坏代码的压缩,如new Array会装换为 [1,2,3]
        unsafe: true,
        // 对<,<=转换为 >,>=
        unsafe_comps: true,
        // 不对删除一些unused的代码进行警告
        warnings: false
      },
      output: {
        // 不会将注释带入压缩文件
        comments: false
      }
    }),
    new ExtractTextPlugin('[name].[contenthash].css')
  ]);
}

if (env === 'development') {
  config.debug = true;
  // 只返回首个构建错误的信息, 同时终止webpack运行
  config.bail = false;
  config.devtool = '#cheap-module-eval-source-map';
  config.plugins = config.plugins.concat([
    // 热加载
    new webpack.HotModuleReplacementPlugin(),
    // 不会让错误代码阻碍构建执行
    new webpack.NoErrorsPlugin()
  ]);
  config.devServer = {
    host: '0.0.0.0',
    contentBase: path.resolve('./build'),
    // 当浏览器不支持historyApi时采用回退方式实现api
    historyApiFallback: true,
    // 将webpack-dev-server runtime集成到模块打包文件里，可以实现浏览器与服务器的通信
    inline: true,
    // 使用热加载模式
    hot: true,
    stats: {
      // 颜色标记
      colors: true,
      // 不打印块信息
      chunks: false
    }
  };
}
module.exports = config;
