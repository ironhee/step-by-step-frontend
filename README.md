# Intro
This tutorial is created to introduce some frontend libraries & frameworks.

To avoid confusion, This tutorial is written simply and exclude optimization.

if you want more information, look 'Related Links' placed at bottom of each tutorial.

## Table of Contents
1. [STEP1: Initialize node package](#step1-initialize-node-package)
2. [STEP2: Use another node package](#step2-use-another-node-package)
3. [STEP3: Make my package browser-executable by Webpack](#step3-make-my-package-browser-executable-by-webpack)
4. [STEP4: Use ES6 syntax by Babel](#step4-use-es6-syntax-by-babel)
5. [STEP5: Use React](#step5-use-react)
6. [STEP6: Use Style Guide by ESLint](#step6-use-style-guide-by-eslint)
7. [STEP7: Manage task by Gulp](#step7-manage-task-by-gulp)
8. [STEP8: Add Sourcemaps by Webpack](#step8-add-sourcemaps-by-webpack)
9. [STEP9: Create Simple app with Reflux & React](#step9-create-simple-app-with-reflux--react)
10. [STEP10: Make your app sync with REST API server with json-server & jquery](#step10-make-your-app-sync-with-rest-api-server-with-json-server--jquery)

## Step1: Initialize node package

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

  index.js
  ```javascript
  'use strict';  

  module.exports = function helloWorld() {
    console.log('hello world!');
  };
  ```

4. load & run your module.

  test.js
  ```javascript
  'use strict';

  var helloWorld = require('./');
  helloWorld();
  ```

  ```bash
  node test.js  # hello world!
  ```

### Related links

+ [strict mode ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
+ [npm init](https://docs.npmjs.com/cli/init)
+ [package.json](https://docs.npmjs.com/files/package.json)
+ [modules](https://nodejs.org/api/modules.html)

## Step2: Use another node package

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

  index.js
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

  test.js
  ```javascript
  'use strict';

  var helloWorld = require('./');
  helloWorld();
  ```

  ```bash
  node test.js  # [0] hello world! ...
  ```

5. create .gitignore

  .gitignore
  ```
  node_modules
  ```

### Related links

+ [require](https://nodejs.org/api/modules.html)
+ [npm install](https://docs.npmjs.com/cli/install)
+ [dependencies](https://docs.npmjs.com/files/package.json#dependencies)

## Step3: Make my package browser-executable by Webpack

1. Install & Initailize bower package.

  ```bash
  npm install -g bower
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

### Related links

+ [bower](https://github.com/bower/bower)
+ [webpack](https://github.com/webpack/webpack)
+ [webpack config](http://webpack.github.io/docs/configuration.html)

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

## Step5: Use React

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


### Related links

+ [react](https://github.com/facebook/react)

## Step6: Use Style Guide by ESLint

1. Install eslint and plugins by npm

  ```bash
  npm install --save-dev eslint babel-eslint eslint-plugin-react
  ```

2. make eslint configs

  .eslintrc
  ```json
  {
    "env": {
      "browser": true,
      "node": true
    },
    "rules": {
      "strict": [2, "global"],
      "no-shadow": 2,
      "no-shadow-restricted-names": 2,
      "no-unused-vars": [2, {
        "vars": "local",
        "args": "after-used"
      }],
      "no-use-before-define": 2,
      "comma-dangle": [2, "never"],
      "no-cond-assign": [2, "always"],
      "no-console": 1,
      "no-debugger": 1,
      "no-alert": 1,
      "no-constant-condition": 1,
      "no-dupe-keys": 2,
      "no-duplicate-case": 2,
      "no-empty": 2,
      "no-ex-assign": 2,
      "no-extra-boolean-cast": 0,
      "no-extra-semi": 2,
      "no-func-assign": 2,
      "no-inner-declarations": 2,
      "no-invalid-regexp": 2,
      "no-irregular-whitespace": 2,
      "no-obj-calls": 2,
      "no-reserved-keys": 2,
      "no-sparse-arrays": 2,
      "no-unreachable": 2,
      "use-isnan": 2,
      "block-scoped-var": 2,
      "consistent-return": 2,
      "curly": [2, "multi-line"],
      "default-case": 2,
      "dot-notation": [2, {
        "allowKeywords": true
      }],
      "eqeqeq": 2,
      "guard-for-in": 2,
      "no-caller": 2,
      "no-else-return": 2,
      "no-eq-null": 2,
      "no-eval": 2,
      "no-extend-native": 2,
      "no-extra-bind": 2,
      "no-fallthrough": 2,
      "no-floating-decimal": 2,
      "no-implied-eval": 2,
      "no-lone-blocks": 2,
      "no-loop-func": 2,
      "no-multi-str": 2,
      "no-native-reassign": 2,
      "no-new": 2,
      "no-new-func": 2,
      "no-new-wrappers": 2,
      "no-octal": 2,
      "no-octal-escape": 2,
      "no-param-reassign": 2,
      "no-proto": 2,
      "no-redeclare": 2,
      "no-return-assign": 2,
      "no-script-url": 2,
      "no-self-compare": 2,
      "no-sequences": 2,
      "no-throw-literal": 2,
      "no-with": 2,
      "radix": 2,
      "vars-on-top": 2,
      "wrap-iife": [2, "any"],
      "yoda": 2,
      "indent": [2, 2],
      "brace-style": [2,
        "1tbs", {
        "allowSingleLine": true
      }],
      "quotes": [
        2, "single", "avoid-escape"
      ],
      "camelcase": [2, {
        "properties": "never"
      }],
      "comma-spacing": [2, {
        "before": false,
        "after": true
      }],
      "comma-style": [2, "last"],
      "eol-last": 2,
      "func-names": 1,
      "key-spacing": [2, {
          "beforeColon": false,
          "afterColon": true
      }],
      "new-cap": [2, {
        "newIsCap": true
      }],
      "no-multiple-empty-lines": [2, {
        "max": 2
      }],
      "no-nested-ternary": 2,
      "no-new-object": 2,
      "no-spaced-func": 2,
      "no-trailing-spaces": 2,
      "no-wrap-func": 2,
      "no-underscore-dangle": 0,
      "one-var": [2, "never"],
      "padded-blocks": [2, "never"],
      "semi": [2, "always"],
      "semi-spacing": [2, {
        "before": false,
        "after": true
      }],
      "space-after-keywords": 2,
      "space-before-blocks": 2,
      "space-before-function-paren": [2, "never"],
      "space-infix-ops": 2,
      "space-return-throw-case": 2,
      "spaced-line-comment": 2,
    }
  }
  ```

  src/js/.estlinrc
  ```json
  {
    "parser": "babel-eslint",
    "plugins": [
      "react"
    ],
    "ecmaFeatures": {
      "arrowFunctions": true,
      "blockBindings": true,
      "classes": true,
      "defaultParams": true,
      "destructuring": true,
      "forOf": true,
      "generators": false,
      "modules": true,
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": false,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "spread": true,
      "superInFunctions": true,
      "templateStrings": true,
      "jsx": true
    },
    "rules": {
      "strict": [2, "never"],
      "no-var": 2,
      "react/display-name": 0,
      "react/jsx-boolean-value": 2,
      "react/jsx-quotes": [2, "double"],
      "react/jsx-no-undef": 2,
      "react/jsx-sort-props": 0,
      "react/jsx-sort-prop-types": 0,
      "react/jsx-uses-react": 2,
      "react/jsx-uses-vars": 2,
      "react/no-did-mount-set-state": [2, "allow-in-func"],
      "react/no-did-update-set-state": 2,
      "react/no-multi-comp": 2,
      "react/no-unknown-property": 2,
      "react/prop-types": 2,
      "react/react-in-jsx-scope": 2,
      "react/self-closing-comp": 2,
      "react/wrap-multilines": 2,
      "react/sort-comp": [2, {
        "order": [
          "displayName",
          "mixins",
          "statics",
          "propTypes",
          "getDefaultProps",
          "getInitialState",
          "componentWillMount",
          "componentDidMount",
          "componentWillReceiveProps",
          "shouldComponentUpdate",
          "componentWillUpdate",
          "componentWillUnmount",
          "/^on.+$/",
          "/^get.+$/",
          "/^render.+$/",
          "render"
        ]
      }]
    }
  }
  ```

3. install editor plugin
  - sublime text: Install SublimeLinter & SublimeLinter-eslint
  - atom: Install linter & linter-eslint

### Related links

+ [airbnb javascript style guide](https://github.com/airbnb/javascript)
+ [eslint](http://eslint.org/)
+ [eslint config](http://eslint.org/docs/user-guide/configuring.html)
+ [atom](https://atom.io/)
+ [sublimt text](http://www.sublimetext.com/)

## Step7: Manage task by Gulp

1. Install gulp by npm

  ```bash
  npm install -g gulp
  npm install --save-dev gulp
  ```

2. Install webpack and plugin by npm

  ```bash
  npm install --save-dev webpack
  npm install --save-dev webpack-gulp-logger
  ```

3. create gulp config file (gulpfile.js)

  gulpfile.js
  ```javascript
  'use strict';

  var gulp = require('gulp');
  var webpack = require('webpack');
  var webpackLogger = require('webpack-gulp-logger');
  var libWebpackConfig = require('./webpack.config');
  var mainWebpackConfig = require('./webpack.main.config');

  gulp.task('default', [
    'watch'
  ]);

  gulp.task('watch', [
    'watch-lib',
    'watch-main'
  ]);

  gulp.task('build', [
    'build-lib',
    'build-main'
  ]);

  gulp.task('watch-lib', function() {
    webpack(libWebpackConfig).watch({}, webpackLogger());
  });

  gulp.task('watch-main', function() {
    webpack(mainWebpackConfig).watch({}, webpackLogger());
  });

  gulp.task('build-lib', function(callback) {
    webpack(libWebpackConfig).run(webpackLogger(callback));
  });

  gulp.task('build-main', function(callback) {
    webpack(mainWebpackConfig).run(webpackLogger(callback));
  });
  ```

4. run gulp task

  for build
  ```bash
  gulp build
  ```

  for watch
  ```bash
  gulp watch
  ```

### Related links

+ [gulp](https://github.com/gulpjs/gulp)
+ [webpack api](http://webpack.github.io/docs/node.js-api.html)

## Step8: Add Sourcemaps by Webpack

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


### Related links

+ [sourcemap](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/?redirect_from_locale=ko)
+ [devtool option](http://webpack.github.io/docs/configuration.html#devtool)

## Step9: Create Simple app with Reflux & React

1. add resolve.modulesDirectories option to webpack config for convenience

  webpack.base.config
  ```javascript
  'use strict';

  module.exports = {
    devtool: 'eval-source-map',
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
  ```

2. create Commment.es6 and CommentSite.es6

  src/js/components/Comment.es6
  ```javascript
  import React from 'react';

  export default React.createClass({

    propTypes: {
      comment: React.PropTypes.shape({
        content: React.PropTypes.string.isRequired,
        updatedAt: React.PropTypes.object.isRequired
      }).isRequired
    },

    render() {
      return (
        <div>
          { this.props.comment.content } -
          { this.props.comment.updatedAt.toDateString() }
          <a href="#">remove</a>
        </div>
      );
    }

  });
  ```

  src/js/components/CommentSite.es6
  ```javascript
  import React from 'react';
  import _ from 'underscore';
  import Comment from 'components/Comment';

  export default React.createClass({

    getInitialState() {
      return {
        comments: [{
          id: 1,
          content: 'this is comment1!',
          updatedAt: new Date(Date.now())
        }, {
          id: 2,
          content: 'this is comment2!',
          updatedAt: new Date(Date.now())
        }]
      };
    },

    render() {
      return (
        <div>
          <h3>Comments</h3>
          { _.map(this.state.comments, comment => (
            <Comment comment={ comment } key={ comment.id } />
          )) }
          <form>
            <textarea ref="newComment"></textarea>
            <button>Comment!</button>
          </form>
        </div>
      );
    }

  });
  ```

3. add CommentSite to app.es6

  src/js/app.es6
  ```javascript
  import MyComponent from 'components/MyComponent';
  import CommentSite from 'components/CommentSite';

  export default {
    MyComponent,
    CommentSite
  };
  ```

4. change main.es6

  main.es6
  ```javascript
  import React from 'react';
  import { CommentSite } from 'app';

  React.render(<CommentSite/>, document.body);
  ```

5. open demo.index.html in browser and check components are correctly rendered

6. install reflux, q, underscore-db by npm

  ```bash
  npm install --save reflux q@~1.0 underscore-db
  ```

7. add node.fs option to webpack config

  webpack.base.config
  ```javascript
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
  ```

8. define comment actions

  src/js/actions/CommentActions.es6
  ```javascript
  import Reflux from 'reflux';

  export default Reflux.createActions({

    createComment: {
      asyncResult: true
    },

    removeComment: {
      asyncResult: true
    }

  });
  ```

9. set reflux promise factory to Q.Promise

  src/js/app.es6
  ```javascript
  import Reflux from 'reflux';
  import Q from 'q';
  Reflux.setPromiseFactory(Q.Promise);

  import MyComponent from 'components/MyComponent';
  import CommentSite from 'components/CommentSite';

  export default {
    MyComponent,
    CommentSite
  };
  ```

10. create comment store

  src/js/mixins/DBMixin.es6
  ```javascript
  import underscoreDB from 'underscore-db';
  import _ from 'underscore';

  _.mixin(underscoreDB);

  export default function DBMixin() {
    let result = {
      db: []
    };

    _.extend(result, _(result.db));
    return result;
  }
  ```

  src/js/stores/CommentStore.es6
  ```javascript
  import Reflux from 'reflux';
  import CommentActions from 'actions/CommentActions';
  import DBMixin from 'mixins/DBMixin';
  import { Promise } from 'q';

  export default Reflux.createStore({

    mixins: [new DBMixin()],

    listenables: [CommentActions],

    onCreateComment(content) {
      CommentActions.createComment.promise(
        new Promise((resolve) => {
          let comment = this.insert({
            content,
            updatedAt: new Date(Date.now())
          });
          resolve(comment);
          this.trigger();
        })
      );
    },

    onRemoveComment(commentID) {
      CommentActions.removeComment.promise(
        new Promise((resolve) => {
          let comment = this.removeById(commentID);
          resolve(comment);
          this.trigger();
        })
      );
    }

  });
  ```

11. make Commment.es6 and CommentSite.es6 use store & actions

  src/js/components/Comment.es6
  ```javascript
  import React from 'react';
  import CommentActions from 'actions/CommentActions';

  export default React.createClass({

    propTypes: {
      comment: React.PropTypes.shape({
        content: React.PropTypes.string.isRequired,
        updatedAt: React.PropTypes.object.isRequired
      }).isRequired
    },

    onRemove() {
      CommentActions.removeComment(this.props.comment.id)
      .then(() => {
        alert('removed!');
      });
      return false;
    },

    render() {
      return (
        <div>
          { this.props.comment.content } -
          { this.props.comment.updatedAt.toDateString() }
          <a href="#" onClick={ this.onRemove }>remove</a>
        </div>
      );
    }

  });
  ```

  src/js/components/CommentSite.es6
  ```javascript
  import React from 'react';
  import Reflux from 'reflux';
  import _ from 'underscore';
  import Comment from 'components/Comment';
  import CommentStore from 'stores/CommentStore';
  import CommentActions from 'actions/CommentActions';

  function getStoreState() {
    return {
      comments: CommentStore.value()
    };
  }

  export default React.createClass({

    mixins: [
      Reflux.listenTo(CommentStore, 'onStoreChange')
    ],

    getInitialState() {
      return getStoreState();
    },

    onStoreChange() {
      this.setState(getStoreState());
    },

    onCreateComment() {
      let content = React.findDOMNode(this.refs.newComment).value;
      CommentActions.createComment(content)
      .then(() => {
        alert('created!');
      });
      return false;
    },

    render() {
      return (
        <div>
          <h3>Comments</h3>
          { _.map(this.state.comments, comment => (
            <Comment comment={ comment } key={ comment.id } />
          )) }
          <form onSubmit={ this.onCreateComment }>
            <textarea ref="newComment"></textarea>
            <button>Comment!</button>
          </form>
        </div>
      );
    }

  });
  ```

12. open demo.index.html in browser and check components are correctly operated

### Related links

+ [modulesDirectories option](http://webpack.github.io/docs/configuration.html#resolve-modulesdirectories)
+ [promise](http://www.html5rocks.com/ko/tutorials/es6/promises/)
+ [q](http://documentup.com/kriskowal/q/)
+ [flux](https://github.com/facebook/flux)
+ [reflux](https://github.com/spoike/refluxjs)
+ [react](https://github.com/facebook/react)
+ [underscore-db](https://github.com/typicode/underscore-db)
+ [reflux-todo](https://github.com/spoike/refluxjs-todo)
+ [Cannot resolve module 'fs'](https://github.com/webpack/jade-loader/issues/8)

## STEP10: Make your app sync with REST API server with json-server & jquery

1. Install json-server globally by npm

  ```bash
  npm install -g json-server
  ```

2. Create directory for json-server

  ```bash
  mkdir public
  ```

3. Move demo/index.html to public/index.html

  ```bash
  mv demo/index.html public
  rm -rf demo
  ```

4. Change content of public/index.html

  public/index.html
  ```html
  <html>
    <body>
      <script src='/static/main.js'></script>
    </body>
  </html>
  ```

5. Make symbolic link of static files.

  ```
  ln -s ../dist/ public/static
  ```

6. create db.json

  db.json
  ```json
  {}
  ```

7. Run json-server

  ```bash
  json-server db.json
  #  {^_^} Hi!
  #  
  # Loading database from db.json
  #
  #
  # You can now go to http://localhost:3000
  #
  # Enter s at any time to create a snapshot # of the db
  ```

8. Open http://localhost:3000 in browser. and check your app is correctly operated.

9. Install jquery, url-join by npm

  ```bash
  npm install -S jquery url-join
  ```

10. Make CommentStore use Ajax Request.

  src/js/mixins/DBMixin.es6
  ```javascript
  import underscoreDB from 'underscore-db';
  import _ from 'underscore';
  import $ from 'jquery';
  import urlJoin from 'url-join';
  import { Promise } from 'q';

  _.mixin(underscoreDB);

  function ajaxRequest(options) {
    return new Promise((resolve, reject) => {
      $.ajax(options)
        .then(resolve)
        .fail(reject);
    });
  }

  export default function DBMixin(type) {
    let result = {
      db: []
    };
    let methods = _(result.db);
    _.extend(result, methods);
    _.extend(result, {
      insert(attributes) {
        return ajaxRequest({
          type: 'POST',
          url: urlJoin(type),
          data: attributes
        })
        .then(response => {
          return response;
        })
        .then(response => methods.insert(response));
      },
      removeById(id) {
        return ajaxRequest({
          type: 'DELETE',
          url: urlJoin(type, id)
        })
        .then(() => methods.removeById(id));
      }
    });

    return result;
  }
  ```

  src/js/stores/CommentStore.es6
  ```javascript
  import Reflux from 'reflux';
  import CommentActions from 'actions/CommentActions';
  import DBMixin from 'mixins/DBMixin';
  import { Promise } from 'q';

  export default Reflux.createStore({

    mixins: [new DBMixin('comments')],

    listenables: [CommentActions],

    onCreateComment(content) {
      CommentActions.createComment.promise(
        new Promise((resolve, reject) => {
          this.insert({
            content,
            updatedAt: new Date().getTime()
          })
          .then(comment => resolve(comment))
          .then(() => this.trigger())
          .catch(reject);
        })
      );
    },

    onRemoveComment(commentID) {
      CommentActions.removeComment.promise(
        new Promise((resolve, reject) => {
          this.removeById(commentID)
          .then(comment => resolve(comment))
          .then(() => this.trigger())
          .catch(reject);
        })
      );
    }

  });
  ```

  Warning: comment.updatedAt field's type is change.

11. Apply comment.updatedAt field's type change.

  src/js/components/Comment.es6
  ```javascript
  import React from 'react';
  import CommentActions from 'actions/CommentActions';

  export default React.createClass({

    propTypes: {
      comment: React.PropTypes.shape({
        content: React.PropTypes.string.isRequired,
        updatedAt: React.PropTypes.number.isRequired
      }).isRequired
    },

    onRemove() {
      CommentActions.removeComment(this.props.comment.id)
      .then(() => {
        alert('removed!');
      });
      return false;
    },

    render() {
      return (
        <div>
          { this.props.comment.content } -
          { new Date(this.props.comment.updatedAt).toDateString() }
          <a href="#" onClick={ this.onRemove }>remove</a>
        </div>
      );
    }

  });
  ```

12. Open http://localhost:3000 in browser. and check your app make ajax request correctly.

14. add fetchComments action to CommentActions

  src/js/actions/CommentActions.es6
  ```javascript
  import Reflux from 'reflux';

  export default Reflux.createActions({

    fetchComments: {
      asyncResult: true
    },

    createComment: {
      asyncResult: true
    },

    removeComment: {
      asyncResult: true
    }

  });
  ```

15. make CommentSite trigger fetchComment action after rendered. (componentDidMount)

  src/js/components/CommentSite.es6
  ```javascript
  import React from 'react';
  import Reflux from 'reflux';
  import _ from 'underscore';
  import Comment from 'components/Comment';
  import CommentStore from 'stores/CommentStore';
  import CommentActions from 'actions/CommentActions';

  function getStoreState() {
    return {
      comments: CommentStore.value()
    };
  }

  export default React.createClass({

    mixins: [
      Reflux.listenTo(CommentStore, 'onStoreChange')
    ],

    getInitialState() {
      return getStoreState();
    },

    componentDidMount() {
      CommentActions.fetchComments();
    },

    onStoreChange() {
      this.setState(getStoreState());
    },

    onCreateComment() {
      let content = React.findDOMNode(this.refs.newComment).value;
      CommentActions.createComment(content)
      .then(() => {
        alert('created!');
      });
      return false;
    },

    render() {
      return (
        <div>
          <h3>Comments</h3>
          { _.map(this.state.comments, comment => (
            <Comment comment={ comment } key={ comment.id } />
          )) }
          <form onSubmit={ this.onCreateComment }>
            <textarea ref="newComment"></textarea>
            <button>Comment!</button>
          </form>
        </div>
      );
    }

  });
  ```

16. implement fetch method

  src/js/mixins/DBMixin.es6
  ```javascript
  import underscoreDB from 'underscore-db';
  import _ from 'underscore';
  import $ from 'jquery';
  import urlJoin from 'url-join';
  import { Promise } from 'q';

  _.mixin(underscoreDB);

  function ajaxRequest(options) {
    return new Promise((resolve, reject) => {
      $.ajax(options)
        .then(resolve)
        .fail(reject);
    });
  }

  export default function DBMixin(type) {
    let result = {
      db: []
    };
    let methods = _(result.db);
    _.extend(result, methods);
    _.extend(result, {
      insert(attributes) {
        return ajaxRequest({
          type: 'POST',
          url: urlJoin(type),
          data: attributes
        })
        .then(response => {
          return response;
        })
        .then(response => methods.insert(response));
      },
      removeById(id) {
        return ajaxRequest({
          type: 'DELETE',
          url: urlJoin(type, id)
        })
        .then(() => methods.removeById(id));
      },
      fetch(id) {
        return ajaxRequest({
          type: 'GET',
          url: urlJoin(type, id)
        })
        .then(response => _.isArray(response) ?
          _.map(response, _response => methods.insert(_response)) :
          methods.insert(response)
        );
      }
    });

    return result;
  }
  ```

  src/js/stores/CommentStore.es6
  ```javascript
  import Reflux from 'reflux';
  import CommentActions from 'actions/CommentActions';
  import DBMixin from 'mixins/DBMixin';
  import { Promise } from 'q';

  export default Reflux.createStore({

    mixins: [new DBMixin('comments')],

    listenables: [CommentActions],

    onFetchComments() {
      CommentActions.fetchComments.promise(
        new Promise((resolve, reject) => {
          this.fetch()
          .then(comments => resolve(comments))
          .then(() => this.trigger())
          .catch(reject);
        })
      );
    },

    onCreateComment(content) {
      CommentActions.createComment.promise(
        new Promise((resolve, reject) => {
          this.insert({
            content,
            updatedAt: new Date().getTime()
          })
          .then(comment => resolve(comment))
          .then(() => this.trigger())
          .catch(reject);
        })
      );
    },

    onRemoveComment(commentID) {
      CommentActions.removeComment.promise(
        new Promise((resolve, reject) => {
          this.removeById(commentID)
          .then(comment => resolve(comment))
          .then(() => this.trigger())
          .catch(reject);
        })
      );
    }

  });
  ```

17. Open http://localhost:3000 in browser. and check your app make get request after initial rendering and your comments is correctly rendered.

18. add db.json to .gitignore

  .gitignore
  ```
  node_modules
  db.json
  ```

### Related links

+ [url-join](https://github.com/jfromaniello/url-join)
+ [json-server](https://github.com/typicode/json-server)
+ [jquery](https://github.com/jquery/jquery)
+ [ajax](https://developer.mozilla.org/en-US/docs/AJAX)
+ [what-exactly-is-restful-programming](http://stackoverflow.com/questions/671118/what-exactly-is-restful-programming)
+ [RFC2616 - Method](http://tools.ietf.org/html/rfc2616#section-9)
+ [jsonapi](http://jsonapi.org/)
