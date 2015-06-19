Step2: Use another node package
---
1. Install another node package.

  ```bash
  npm install --save underscore
  ```

  package.json

  ```json
  {
    "name": "step-by-step-frontend",
    "version": "0.0.0",
    "description": "step by step learning about frontend",
    "main": "index.js",
    "author": "ironhee <leechulhee95@gmail.com>",
    "license": "MIT",
    "dependencies": {
      "underscore": "^1.8.3"
    }
  }

  ```

3. update your node module.

  ```javascript
  'use strict';

  var _ = require('underscore');

  module.exports = function helloWorld() {
    _.times(10, function (index) {
      console.log('[' + index + '] hello world!');
    });
  };
  ```

4. load & run your module.

  ```javascript
  'use strict';

  var helloWorld = require('./');
  helloWorld();
  ```

  ```bash
  node test.js  # [0] hello world! ...
  ```

5. create .gitignore

  ```
  node_modules
  ```

Related links
---
+ [require](https://nodejs.org/api/modules.html)
+ [npm install](https://docs.npmjs.com/cli/install)
+ [dependencies](https://docs.npmjs.com/files/package.json#dependencies)
