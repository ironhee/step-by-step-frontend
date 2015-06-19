'use strict';

var _ = require('underscore');
var pkg = require('./package.json');

module.exports = {
  entry: {
    'index': './index.es6'
  },
  output: {
    path: 'dist/',
    filename: '[name].js',
    library: 'MyLib',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.es6$/, loader: 'babel-loader' }
    ]
  }
};
