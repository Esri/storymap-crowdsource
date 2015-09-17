var Confidence = require('confidence');

var internals = {};

exports.get = internals.Require = function (key, criteria) {

  this.store = new Confidence.Store({
    baseUrl: {
      $filter: 'mode',
      dist: 'src/',
      default: ''
    },
    paths: {
      'app': 'javascript',
      'jquery': 'lib/jquery/dist/jquery.min'
    }
  });

  return this.store.get(key, criteria);
};