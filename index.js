'use strict';

var _ = require('underscore');

module.exports = function helloWorld() {
  _.times(10, function (index) {
    console.log('[' + index + '] hello world!');
  });
};
