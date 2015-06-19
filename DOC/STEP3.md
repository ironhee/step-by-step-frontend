Step3: Make my package browser-excutable by Webpack
---
1. Initailize bower package.

  ```bash
  bower init  # This command make bower.json
  ```

  bower.json
  ```json
  {
    "name": "step-by-step-frontend",
    "version": "0.0.0",
    "description": "step by step learning about frontend",
    "main": "dist/index.js",
    "authors": [
      "ironhee <iron@ediket.com>"
    ],
    "license": "MIT"
  }
  ```

2. Install webpack

  ```bash
  npm install -g webpack
  ```

3. create webpack config

  webpack.config.js
  ```javascript
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
  ```

4. build source code by webpack

  ```bash
  webpack  # use webpack.config.js by default
  ```

  if you want to rebuild on file change, use --watch option
  ```bash
  webpack --watch  # ctrl-c to exit
  ```

5. load & run your module.

  test.html
  ```html
  <html>
    <body>
      <script src='./dist/index.js'></script>
      <script> MyLib(); </script>
    </body>
  </html>
  ```

6. change package.json 'main' property

  package.json
  ```json
  {
    "name": "step-by-step-frontend",
    "version": "0.0.0",
    "description": "step by step learning about frontend",
    "main": "dist/index.js",
    "author": "ironhee <leechulhee95@gmail.com>",
    "license": "MIT",
    "dependencies": {
      "underscore": "^1.8.3"
    }
  }
  ```

7. load & run your node module.

  test.js
  ```javascript
  'use strict';

  var helloWorld = require('./');
  helloWorld();
  ```

  ```bash
  node test.js  # [0] hello world! ...
  ```

Related links
---
+ [bower](https://github.com/bower/bower)
+ [webpack](https://github.com/webpack/webpack)
+ [webpack config](http://webpack.github.io/docs/configuration.html)
