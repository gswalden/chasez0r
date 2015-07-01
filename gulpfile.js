var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber');

gulp.task('develop', function () {
  nodemon({
    script: 'bot',
    ext: 'js',
  });
});

gulp.task('default', [
  'develop'
]);
