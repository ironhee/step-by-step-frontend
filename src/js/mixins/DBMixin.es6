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
