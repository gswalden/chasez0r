var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber');

var config;
try {
  config = require('./nodemon.json');
} catch(err) {
  config = {
    script: 'bot.js',
    ext: 'js',
    "env": {
      "SLACK_TOKEN": "slack-token-here"
    }
  };
}

gulp.task('develop', function () {
  nodemon(config);
});

gulp.task('default', [
  'develop'
]);
