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
      'jquery': 'lib/jquery/dist/jquery.min',
      'leaflet': 'lib/leaflet/leaflet',
      'esri-leaflet': 'lib/esri-leaflet/dist/esri-leaflet'
    },
    shim: {
      'leaflet': {
        exports: 'L'
      },
      'esri-leaflet': {
        deps: ['leaflet'],
        exports: 'L'
      }
    }
  });

  return this.store.get(key, criteria);
};