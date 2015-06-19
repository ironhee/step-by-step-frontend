Step7: Manage task by Gulp
---
1. Install gulp by npm

  ```bash
  npm install -g gulp
  npm install --save-dev gulp
  ```

2. Install webpack and plugin by npm

  ```bash
  npm install --save-dev webpack
  npm install --save-dev webpack-gulp-logger
  ```

3. create gulp config file (gulpfile.js)

  gulpfile.js
  ```javascript
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
  ```

4. run gulp task

  for build
  ```bash
  gulp build
  ```

  for watch
  ```bash
  gulp watch
  ```

Related links
---
+ [airbnb javascript style guide](https://github.com/airbnb/javascript)
+ [eslint](http://eslint.org/)
+ [eslint config](http://eslint.org/docs/user-guide/configuring.html)
+ [atom](https://atom.io/)
+ [sublimt text](http://www.sublimetext.com/)
