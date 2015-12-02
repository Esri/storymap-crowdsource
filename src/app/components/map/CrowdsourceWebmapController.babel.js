import $ from 'jquery';
import Logger from 'babel/utils/logging/Logger';
import WebmapController from 'babel/components/map/WebmapController';
import ClusterFeatureLayer from 'lib/cluster-layer-js/src/clusterfeaturelayer';
import MapActions from 'babel/actions/MapActions';
import AppActions from 'babel/actions/AppActions';
import {Components} from 'babel/constants/CrowdsourceAppConstants';

const _logger = new Logger({
  source: 'CrowdsourceWebmapController'
});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

const _logStatus = function logStatus(message,debugOnly) {
  _logger.logMessage({
    type: 'status',
    debugOnly,
    message
  });
};

export const CrowdsourceWebmapController = class CrowdsourceWebmapController extends WebmapController {

  onMapLoad() {
    _logStatus('Webmap ' + this._map.webmapId + ' is loaded',true);
    this.createClusterLayer();
  }

  createClusterLayer() {
    if (this._settings.crowdsourceLayer && this._settings.crowdsourceLayer.id) {
      const map = this._map;
      const layer = map.getLayer(this._settings.crowdsourceLayer.id);
      const url = layer ? layer.url : null;
      const objectIdField = layer.objectIdField;

      if (url) {
        const clusterDefaults = {
          objectIdField,
          disablePopup: true,
          distance: 100,
          id: 'crowdsourceClusters',
          labelColor: '#fff',
          resolution: map.extent.getWidth() / map.width,
          url
        };
        const clusterOptions = $.extend(true, {}, clusterDefaults, this._settings.crowdsourceLayer.clusterOptions);
        const clusterLayer = new ClusterFeatureLayer(clusterOptions);

        window.cl = clusterLayer;

        // Map ready when cluster are first shown
        clusterLayer.on('clusters-shown', () => {
          this.onLoad();

          // Get original features in current extent
          const features = clusterLayer._inExtent();

          MapActions.receiveFeatures({
            features
          });
        });

        // Hide original layer
        layer.hide();

        // Add cluster layer
        this._map.addLayer(clusterLayer);

      } else if (layer)  {
        _onError('Layer ' + this._settings.crowdsourceLayer.id + ' does not exist in map.');
      }
    } else if (window.app.mode.fromScratch) {
      this.onLoad();
    } else {
      _onError('Crowdsource layer id not specified.');
    }
  }

  onLoad() {
    if (!this.loaded) {
      this.loaded = true;
      this.emit('load');
      AppActions.componentLoaded(Components.names.MAP);
    }
  }

};

export default CrowdsourceWebmapController;
