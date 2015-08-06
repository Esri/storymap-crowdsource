var Hoek = require('hoek');
var App = require('./app');
var Require = require('./require');
var Server = require('./server');

var internals = {};

exports = module.exports = internals.Config = function(options){

  Hoek.assert(this.constructor === internals.Config, 'Config must be instantiated using new');

  var defaults = {
    mode: process.env.MODE
  };

  options = typeof options === 'object' ? options : {};

  var settings = Hoek.applyToDefaults(defaults,options);

  this.environment = settings.mode;

  this.app = App.get('/',{mode: settings.mode});
  this.require = Require.get('/',{mode: settings.mode});
  this.server = Server.get('/',{mode: settings.mode});
};