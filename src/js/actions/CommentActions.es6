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
