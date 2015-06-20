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
