'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var webpack = require('webpack');
var webpackLogger = require('webpack-gulp-logger');
var libWebpackConfig = require('./webpack.config');
var mainWebpackConfig = require('./webpack.main.config');

gulp.task('default', [
  'watch'
]);

gulp.task('watch', [
  'watch-lib',
  'watch-main'
]);

gulp.task('build', [
  'build-lib',
  'build-main',
  'build-readme'
]);

gulp.task('watch-lib', function() {
  webpack(libWebpackConfig).watch({}, webpackLogger());
});

gulp.task('watch-main', function() {
  webpack(mainWebpackConfig).watch({}, webpackLogger());
});

gulp.task('build-lib', function(callback) {
  webpack(libWebpackConfig).run(webpackLogger(callback));
});

gulp.task('build-main', function(callback) {
  webpack(mainWebpackConfig).run(webpackLogger(callback));
});

gulp.task('build-readme', function(callback) {
  return gulp.src([
      'DOC/INTRO.md',
      'DOC/STEP1.md',
      'DOC/STEP2.md',
      'DOC/STEP3.md',
      'DOC/STEP4.md',
      'DOC/STEP5.md',
      'DOC/STEP6.md',
      'DOC/STEP7.md',
      'DOC/STEP8.md',
      'DOC/STEP9.md',
      'DOC/STEP10.md',
    ])
    .pipe(concat('README.md'))
    .pipe(gulp.dest('./'));
});
