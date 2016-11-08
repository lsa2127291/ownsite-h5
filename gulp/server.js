var nodemon = require('gulp-nodemon');
var env = require('gulp-env');
module.exports = function (gulp) {
  gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
      script: 'server/index.js',
      watch: ["src", "server"],
      ignore: ["src/page"],
      env: {
        NODE_ENV: 'development'
      },
      verbose: true,
      "execMap": {
        "js": "babel-node"
      }
    }).on('start', function () {
      if (!started) {
        started = true;
        cb();
      }
    })
  });
  gulp.task('server:dev', ['nodemon']);
};
