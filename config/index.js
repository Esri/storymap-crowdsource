/*eslint-env node*/
var Hoek = require('hoek');
// var Server = require('./server');
var Fonts = require('./fonts');
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
  this.fonts = new Fonts();
  // this.server = Server.get('/',{mode: settings.mode});
  this.pkg = Pkg;
  this.pathMods = {
    resourcePath: settings.mode === 'dev' ? 'build/' : '',
    minPath: settings.mode === 'dev' ? '' : '.min'
  };
  this.versionStr = envString + Pkg.version + dateStr;

};
