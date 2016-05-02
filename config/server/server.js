/*eslint-env node*/
/*eslint prefer-arrow-callback: 0*/
/*eslint no-unused-vars: 0*/
/*eslint no-console: 0*/
'use strict';

var _ = require('lodash');
const Hapi = require('hapi');
var Path = require('path');
var FS = require('fs');

const server = new Hapi.Server();

server.connection({
  port: 3000,
  labels: ['http'],
  router: {
    isCaseSensitive: false,
    stripTrailingSlash: true
  }
});
server.connection({
  port: 4000,
  labels: ['https'],
  router: {
    isCaseSensitive: false,
    stripTrailingSlash: true
  },
  tls: {
    key: FS.readFileSync(__dirname + '/dev_ssl/key.pem'),
    cert: FS.readFileSync(__dirname + '/dev_ssl/cert.pem')
  }
});

server.ext('onRequest', function (request, reply) {
  var host = request.headers.host;

  if (host.match(':3000')) {

    host = host.replace(':3000', ':4000');
    return reply('Forwarding to secure route')
      .redirect('https://' + host + request.url.path);
  }
  reply.continue();
});

server.register(require('inert'), (err) => {

  if (err) {
      throw err;
  }

  server.route({
    method: 'GET',
    path: '/ping',
    handler: function (request, reply) {
        reply('pong');
    }
  });

  server.route({
    method: 'GET',
    path: '/build/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname,'../../build/'),
        listing: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: Path.join(__dirname,'../../build/index.html')
    }
  });

  server.route({
    method: 'GET',
    path: '/index.html',
    handler: {
      file: Path.join(__dirname,'../../build/index.html')
    }
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname,'../../src/'),
        listing: true
      }
    }
  });

});

server.start(function (err) {
  if (err) {
    throw err;
  }

  _.forEach(server.connections,function(connection){
    console.log('App running at: '
      + connection.info.uri
      + ' (' + connection.settings.labels.toString()
      + ')');
  });

});
