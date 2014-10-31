// Sass compilation task
var gulp = require('gulp');
var compass = require('gulp-compass');
var handleErrors = require('./handleErrors');

gulp.task('compass', function () {
  gulp.src('sass/*.scss')
  .pipe(compass({
    config_file: './config.rb',
    sass: 'sass',
    css: 'css'
  }))
  .on('error',handleErrors)
  .pipe(gulp.dest('./css'));
});
