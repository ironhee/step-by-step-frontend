'use strict';

var gulp = require('gulp');
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
  'build-main'
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
