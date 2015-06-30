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
