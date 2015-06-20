import Reflux from 'reflux';
import CommentActions from 'actions/CommentActions';
import DBMixin from 'mixins/DBMixin';

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
