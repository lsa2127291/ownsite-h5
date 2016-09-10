var webpack = require('webpack');
module.exports = function (gulp) {
  gulp.task('set-env', function (cb) {
    process.env.NODE_ENV = 'production';
    cb();
  });
  gulp.task('webpack', function (cb) {
    webpack(require('../webpack.config'), cb);
  });
  gulp.task('build', ['set-env', 'webpack']);
};
