define([
  'dojo/Evented',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/Deferred',
  'esri/arcgis/Portal'
],function(
  Evented,
  declare,
  lang,
  Deferred,
  arcgisPortal
) {

  var internals = {};

  internals.Portal = declare([Evented],{

    constructor: function(options) {
      internals.self = this;
      lang.mixin(this,options);
    },

    init: function() {
      console.log('Loading Portal');

      internals.portal = app.portal;
      if (internals.portal) {
        internals.onReady();
      } else {
        internals.createNewPortalObj().then(function(res) {
          internals.portal = app.portal = res;
          internals.onReady();
        });
      }

    }

  });

  internals.createNewPortalObj = function() {
    var deferred = new Deferred();
    var portal = new arcgisPortal.Portal(app.indexCfg.sharingurl.split('/sharing/')[0]);

    portal.on('load',deferred.resolve);

    return deferred.promise;
  };

  internals.onReady = function() {
    console.log('Portal Ready');
    internals.self.emit('load');
  };

  internals.onError = function(err) {
    console.log('Portal Error',err);
    internals.self.emit('error',err);
  };

  return internals.Portal;

});
