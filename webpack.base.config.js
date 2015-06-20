'use strict';

module.exports = {
  devtool: 'eval-source-map',
  node: {
    fs: 'empty'
  },
  resolve: {
    modulesDirectories: ['src/js/', 'node_modules'],
    extensions: ['', '.js', '.es6']
  },
  module: {
    loaders: [
      { test: /\.es6$/, loader: 'babel-loader' }
    ]
  }
};
