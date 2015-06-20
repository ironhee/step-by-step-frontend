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
