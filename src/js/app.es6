import Reflux from 'reflux';
import Q from 'q';
Reflux.setPromiseFactory(Q.Promise);

import MyComponent from 'components/MyComponent';
import CommentSite from 'components/CommentSite';

export default {
  MyComponent,
  CommentSite
};
