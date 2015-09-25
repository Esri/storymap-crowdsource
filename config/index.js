var Hoek = require('hoek');
var Server = require('./server');
var Pkg = require('../package.json');
var moment = require('moment');

var internals = {};

module.exports = internals.Config = function(options) {

  Hoek.assert(this.constructor === internals.Config, 'Config must be instantiated using new');

  var defaults = {
    mode: process.env.MODE
  };

  options = typeof options === 'object' ? options : {};

  var settings = Hoek.applyToDefaults(defaults,options);

  var envString = settings.mode === 'dev' ? 'dev' : '';
  var dateStr = settings.mode === 'dev' ? '-' + moment().format('DDMMYY') : '';

  this.environment = settings.mode;
  this.server = Server.get('/',{mode: settings.mode});
  this.pkg = Pkg;
  this.versionStr = envString + Pkg.version + dateStr;

};
