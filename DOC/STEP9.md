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
