import $ from 'jquery';
import Evented from 'dojo/Evented';
import on from 'dojo/on';
import arcgisUtils from 'esri/arcgis/utils';
import Logger from 'babel/utils/logging/Logger';
import ClusterFeatureLayer from 'lib/cluster-layer-js/src/clusterfeaturelayer';

var internals = {
  logger: new Logger({source: 'MapView'})
};

export default internals.MapView = class MapView extends Evented {

  constructor(options) {
    super(options);

    let defaults = {
      mapDiv: 'map'
    };

    this._settings = $.extend(true,{},defaults,options);
  }

  init() {
    internals.logger.logMessage({
      debugOnly: true,
      type: 'status',
      message: 'Loading'
    });
    internals.createMap(this);
  }

};

internals.createMap = function(self) {
  let mapDiv = self._settings.node || self._settings.mapDiv;
  let webmap = self._settings.data.getWebmap();
  let options = self._settings.data.getMapOptions();
  let crowdsourceLayer = self._settings.data.getCrowdsourceLayer();

  if (webmap && options && crowdsourceLayer) {
    arcgisUtils.createMap(webmap,mapDiv,options).then(function(response) {
      let map = internals.map = response.map;

      if (map.loaded) {
        mapLoaded(map);
      } else {
        map.on('load',function() {
          mapLoaded(map);
        });
      }
    });
  }

  var mapLoaded = function(map) {

    if (crowdsourceLayer.id) {
      let originalLayer = map.getLayer(crowdsourceLayer.id);
      let url = originalLayer.url;

      originalLayer.hide();
      addCluserLayer(map,url);
    }

  };

  var addCluserLayer = function(map,url) {

    if (map && url) {

      var clusterLayer = new ClusterFeatureLayer({
        url: url,
        distance: 100,
        id: 'crowdsourceClusters',
        labelColor: '#fff',
        resolution: map.extent.getWidth() / map.width,
        useDefaultSymbol: false,
        zoomOnClick: true,
        showSingles: true,
        objectIdField: 'FID'
      });

      // Map ready when cluster are first shown
      on.once(clusterLayer,'clusters-shown',function() {
        internals.onReady(self);
      });

      // Add cluster layer
      map.addLayer(clusterLayer);

    } else {
      internals.onError('Map and feature service url must be provided');
    }

  };
};

internals.onReady = function(self) {
  internals.logger.logMessage({
    debugOnly: true,
    type: 'status',
    message: 'Ready'
  });
  self.emit('load');
};

internals.onError = function(/*[self],error*/) {
  let self = arguments.length === 2 ? arguments[0] : null;
  let err = arguments.length === 2 ? arguments[1] : arguments[0];

  internals.logger.logMessage({
    type: 'error',
    error: err
  });
  if (self) {
    self.emit('error',err);
  }
};
