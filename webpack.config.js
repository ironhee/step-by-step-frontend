'use strict';

var _ = require('underscore');
var pkg = require('./package.json');

module.exports = {
  entry: {
    'index': './index.js'
  },
  output: {
    path: 'dist/',
    filename: '[name].js',
    library: 'MyLib',
    libraryTarget: 'umd'
  }
};
