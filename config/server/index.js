/*eslint-env node*/
var Confidence = require('confidence');

var internals = {};

exports.get = internals.Server = function(key, criteria) {

  this.store = new Confidence.Store({
    staticPaths: {
      root: {
        $filter: 'mode',
        dist: 'dist/',
        $default: 'src/'
      },
      build: {
        $filter: 'mode',
        dist: '',
        $default: 'build/'
      }
    },
    manifest: {
      server: {
        app: {
          mode: {
            $filter: 'mode',
            dist: 'distribution',
            $default: 'development'
          }
        }
      },
      connections: [
        {
          port: 3000,
          labels: [ 'http' ],
          router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
          }
        }
      ],
      plugins: {
        inert: null
      }
    }
  });

  return this.store.get(key, criteria);

};
