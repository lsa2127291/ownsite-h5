module.exports = function (gulp) {
  gulp.task('move:static', function (cb) {
    gulp.src('./static/**/*').pipe(gulp.dest('./build/static'));
    cb();
  });
};
