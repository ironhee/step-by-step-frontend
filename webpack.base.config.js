'use strict';

module.exports = {
  resolve: {
    extensions: ['', '.js', '.es6']
  },
  module: {
    loaders: [
      { test: /\.es6$/, loader: 'babel-loader' }
    ]
  }
};
