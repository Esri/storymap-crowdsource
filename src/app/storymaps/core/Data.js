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

  internals.Data = declare([Evented],{

    constructor: function(options) {
      internals.self = this;
      lang.mixin(this,options);
    },

    init: function() {
      console.log('Loading Data');

      arcgisUtils.getItem(app.indexCfg.appid).then(function(res) {
        if (res.item && res.itemData && res.itemData.values) {
          internals.appItem = res.item;
          internals.appData = res.itemData.values;
          internals.onReady();
        } else {
          internals.onError(res);
        }
      },internals.onError);
    },

    getWebmap: function() {
      return internals.appData.webmap;
    },

    getMapOptions: function() {
      return internals.appData.settings.mapOptions;
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
