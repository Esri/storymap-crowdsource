var Glue = require('glue');
var Path = require('path');
var Config = require('./config');

var internals = {
  config: new Config()
};

internals.manifest = internals.config.server.manifest;
internals.rootPath = internals.config.server.staticPaths.root
internals.buildPath = internals.config.server.staticPaths.build

Glue.compose(internals.manifest,function(err,server){

  if (err){
    throw err;
  }

  if (internals.config.environment === 'development'){
    server.views({
      engines: {
        swig: require('swig')
      },
      relativeTo: internals.rootPath
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply.view('index',internals.config);
      }
    });

    // Path the build
    server.route({
      method: 'GET',
      path: '/' + internals.buildPath + '{param*}',
      handler: {
        directory: {
          path: internals.buildPath,
          listing: true
        }
      }
    });
  }
  else{
    server.route({
      method: 'GET',
      path: '/',
      handler: {
        file: Path.join(__dirname,internals.rootPath,'index.html')
      }
    });
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: internals.rootPath,
        listing: true
      }
    }
  });

  server.start(function() {
    console.log('Server running at:',server.info.uri);
  });

});