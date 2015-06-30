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
