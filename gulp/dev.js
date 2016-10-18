var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var ejs = require('gulp-ejs');
var gutil = require("gulp-util");
var path = require('path');
var injectSrc = require('./modules/injectSrc');
// 将webpack-dev-server runtime集成到模块打包文件里，可以实现浏览器与服务器的通信
module.exports = function (gulp) {
  var config = require('../webpack.config');
  gulp.task('webpack-dev-server', function (cb) {
    Object.keys(config.entry).forEach(function (name) {
      config.entry[name] = ["webpack-dev-server/client?http://0.0.0.0:8080",  "webpack/hot/dev-server"].concat(config.entry[name]);
    });
    var compiler = webpack(config);
    new WebpackDevServer(compiler, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000", "Access-Control-Allow-Credentials": "true" },
      contentBase: path.resolve('./build'),
      // 当浏览器不支持historyApi时采用回退方式实现api
      historyApiFallback: true,
      // 使用热加载模式
      hot: true,
      stats: {
        // 颜色标记
        colors: true,
        // 不打印块信息
        chunks: false
      }}).listen(8080, '0.0.0.0' ,function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://0.0.0.0:8080/webpack-dev-server/index.html");
      cb();
    });
  });
  gulp.task('generate-dev-template', function (cb) {
    gulp.src('./src/pages/*/index.html').pipe(ejs()).pipe(injectSrc(['index.js'], 'http://localhost:8080/pages')).pipe(gulp.dest('./build/pages/'));
    cb();
  });
  gulp.task('dev', ['webpack-dev-server', 'generate-dev-template']);
};
