define([
  'dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  'esri/arcgis/utils'
],function(
  Evented,
  declare,
  lang,
  on,
  arcgisUtils
) {

  var internals = {};

  internals.MapView = declare([Evented],{

    mapDiv: 'map',

    constructor: function(options) {
      internals.self = this;
      lang.mixin(this,options);
    },

    init: function () {
      console.log('Loading map');
      internals.createMap();
    }

  });

  internals.createMap = function() {

    var mapDiv = internals.self.mapDiv;
    var webmap = internals.self.data.getWebmap();
    var options = internals.self.data.getMapOptions();

    if (webmap && options) {
      arcgisUtils.createMap(webmap,mapDiv,options).then(function(response) {
        var map = internals.map = response.map;

        on.once(map,'update-end',function() {
          internals.onReady();
        });
      });
    }

  };

  internals.onReady = function() {

    console.log('Map Ready');
    internals.self.emit('load',{
      map: internals.map
    });

  };

  return internals.MapView;

});
