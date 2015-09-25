define([
  'jquery',
  'dojo/on',
  'storymaps/core/Data',
  'storymaps/ui/map/MapView',
  'storymaps/utils/arcgis/Config'
],
function(
  $,
  on,
  Data,
  MapView
) {

  var internals = {
    appLoaded: false
  };

  internals.loadedComponents = {
    mapView: false
  };

  internals.init = function() {

    var data = internals.data = new Data();

    data.on('load',function() {
      // Load UI Components
      internals.loadMap();
    });

    data.init();

  };

  internals.loadMap = function() {

    var mapView = internals.mapView = new MapView({
      data: internals.data
    });

    mapView.on('load', function() {
      internals.loadedComponents.mapView = true;
      internals.appReady();
    });

    mapView.init();

  };

  internals.appReady = function() {

    var ready = internals.checkReadyState();

    if (!internals.appLoaded && ready) {
      console.log('App Ready');
    }

  };

  internals.checkReadyState = function() {

    var ready = true;
    var components = internals.loadedComponents;

    $.each(components,function() {
      if (!this.valueOf()) {
        ready = false;
      }
    });

    return ready;

  };

  return {
    init: internals.init
  };

});
