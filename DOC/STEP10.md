STEP10: Make your app sync with REST API server with json-server & jquery
---
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

Related links
---
+ [url-join](https://github.com/jfromaniello/url-join)
+ [json-server](https://github.com/typicode/json-server)
+ [jquery](https://github.com/jquery/jquery)
+ [ajax](https://developer.mozilla.org/en-US/docs/AJAX)
+ [what-exactly-is-restful-programming](http://stackoverflow.com/questions/671118/what-exactly-is-restful-programming)
+ [RFC2616 - Method](http://tools.ietf.org/html/rfc2616#section-9)
+ [jsonapi](http://jsonapi.org/)
