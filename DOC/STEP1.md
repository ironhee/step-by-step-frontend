Step1: Initialize node package
---
1. Initailize node package.

  ```bash
  npm init  # This command make package.json
  ```

  package.json

  ```json
  {
    "name": "step-by-step-frontend",
    "version": "0.0.0",
    "description": "step by step learning about frontend",
    "main": "index.js",
    "author": "ironhee <leechulhee95@gmail.com>",
    "license": "MIT"
  }
  ```

3. Write your node module.

  ```javascript
  'use strict';  

  module.exports = function helloWorld() {
    console.log('hello world!');
  };
  ```

4. load & run your module.


  ```javascript
  'use strict';

  var helloWorld = require('./');
  helloWorld();
  ```

  ```bash
  node test.js  # hello world!
  ```

Related links
---
+ [strict mode ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
+ [npm init](https://docs.npmjs.com/cli/init)
+ [package.json](https://docs.npmjs.com/files/package.json)
+ [modules](https://nodejs.org/api/modules.html)
