## Step4: Use ES6 syntax by Babel

1. Install babel-loader by npm

  ```bash
  npm install --save-dev babel-loader
  ```

2. rename index.js and change content

  ```bash
  mv index.js index.es6
  ```

  index.es6
  ```javascript
  import _ from 'underscore';

  export default function helloWorld() {
    _.times(10, (index) => {
      console.log(`[${index}] hello world!`);
    });
  }
  ```

3. change webpack config

  webpack.config.js
  ```javascript
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
  ```

4. build source code by webpack

  ```bash
  webpack
  ```

5. test browser-side and node-side

  test.html
  ```html
  <html>
    <body>
      <script src='./dist/index.js'></script>
      <script> MyLib(); </script>
    </body>
  </html>
  ```

  ```bash
  node test.js  # [0] hello world! ...
  ```

### Related links

+ [es6features](https://github.com/lukehoban/es6features)
+ [babel](https://github.com/babel/babel)
+ [webpack loader](http://webpack.github.io/docs/using-loaders.html)
