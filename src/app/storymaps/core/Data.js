define([
  'dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'esri/arcgis/utils'
],function(
  Evented,
  declare,
  lang,
  arcgisUtils
) {

  var internals = {};

  var sampleData = {
    webmap: '1970c1995b8f44749f4b9b6e81b5ba45',
    mapOptions: {}
  };

  internals.appData = sampleData;

  internals.Data = declare([Evented],{

    constructor: function(options) {
      internals.self = this;
      lang.mixin(this,options);
    },

    init: function() {
      console.log('Loading Data');

      arcgisUtils.getItem(app.indexCfg.appid).then(function(res) {
        console.log(res);
      },internals.onError);

      internals.onReady();
    },

    getWebmap: function() {
      return internals.appData.webmap;
    },

    getMapOptions: function() {
      return internals.appData.mapOptions;
    }

  });

  internals.onReady = function() {
    console.log('Data Ready');
    internals.self.emit('load');
  };

  internals.onError = function(err) {
    console.log('Portal Error',err);
    internals.self.emit('error',err);
  };

  return internals.Data;

});
