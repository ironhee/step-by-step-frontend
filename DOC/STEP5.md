Step5: Use React
---
1. Install React by npm

  ```bash
  npm install --save react
  ```

2. make some directories

  ```bash
  mkdir -p src/js/components
  ```

3. create modules and rendering script

  src/js/components/MyComponent.es6
  ```javascript
  import React from 'react';

  export default React.createClass({

    render() {
      return (
        <div>
          <h1>Hello world!</h1>
        </div>
      );
    }

  });
  ```

  src/js/app.es6
  ```javascript
  import MyComponent from './components/MyComponent';

  export default {
    MyComponent
  };
  ```

  src/js/main.es6
  ```javascript
  import React from 'react';
  import { MyComponent } from './app';

  React.render(<MyComponent/>, document.body);
  ```

4. remove old files and change webpack config

  ```bash
  rm -rf test.js test.html index.es6 dist/index.js
  ```

5. separate webpack config

  webpack.base.config.js
  ```javascript
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
  ```

  webpack.config.js
  ```javascript
  'use strict';

  var _ = require('underscore');
  var baseConfig = require('./webpack.base.config');

  module.exports = _.extend({}, baseConfig, {
    entry: {
      'app': './src/js/app.es6'
    },
    output: {
      path: 'dist/',
      filename: 'index.js',
      library: 'MyLib',
      libraryTarget: 'umd'
    }
  });
  ```

  webpack.main.config.js
  ```javascript
  'use strict';

  var _ = require('underscore');
  var baseConfig = require('./webpack.base.config');

  module.exports = _.extend({}, baseConfig, {
    entry: {
      'main': './src/js/main.es6'
    },
    output: {
      path: 'dist/',
      filename: 'main.js',
      libraryTarget: 'umd'
    }
  });
  ```

6. build by webpack

  ```bash
  webpack  # build library code
  webpack --config webpack.main.config # build rendering code
  ```

7. check in node and browser

  ```bash
  node -e 'console.log(require("./"))'
  # { MyComponent: { [Function] displayName: 'MyComponent' } }
  ```

  demo/index.html
  ```html
  <html>
    <body>
      <script src='../dist/index.js'></script>
      <script> console.log(MyLib) </script>
    </body>
  </html>
  ```

8. use main.js (rendering logic) in browser

  demo/index.html
  ```html
  <html>
    <body>
      <script src='../dist/index.js'></script>
      <script> console.log(MyLib) </script>
      <script src='../dist/main.js'></script>
    </body>
  </html>
  ```


Related links
---
+ [react](https://github.com/facebook/react)
