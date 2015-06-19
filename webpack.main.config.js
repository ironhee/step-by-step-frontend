'use strict';

var _ = require('underscore');
var baseConfig = require('./webpack.base.config');

module.exports = _.extend({}, baseConfig, {
  entry: {
    'main': './src/js/main.es6'
  },
  output: {
    path: 'dist/',
    filename: 'main.js',
    libraryTarget: 'umd'
  }
});
