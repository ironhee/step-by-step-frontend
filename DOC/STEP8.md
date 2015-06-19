Step8: Add Sourcemaps by Webpack
---
1. set devtool property in webpack config

  webpack.base.config.js
  ```javascript
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
  ```

2. build by gulp

  ```bash
  gulp build
  ```

  now you can distinguish source code.


Related links
---
+ [sourcemap](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/?redirect_from_locale=ko)
+ [devtool option](http://webpack.github.io/docs/configuration.html#devtool)
