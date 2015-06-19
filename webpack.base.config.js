'use strict';

module.exports = {
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.es6']
  },
  module: {
    loaders: [
      { test: /\.es6$/, loader: 'babel-loader' }
    ]
  }
};
