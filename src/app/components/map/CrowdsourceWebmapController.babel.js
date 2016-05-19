import $ from 'jquery';
import on from 'dojo/on';
import Logger from 'babel/utils/logging/Logger';
import WebmapController from 'babel/components/map/WebmapController';
import ClusterFeatureLayer from 'lib/cluster-layer-js/src/clusterfeaturelayer';
// TODO Move actions out at a prop
import MapActions from 'babel/actions/MapActions';
import AppActions from 'babel/actions/AppActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import viewerText from 'i18n!translations/viewer/nls/template';

const _logger = new Logger({
  source: 'Crowdsource Webmap Controller'
});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

export const CrowdsourceWebmapController = class CrowdsourceWebmapController extends WebmapController {

  updateMap(options) {
    super.updateMap(options);

    if (this._map && this._map.setClusterLayerQueryWhere && this.crowdsourceLayerWhere !== this._settings.crowdsourceLayer.where) {
      this.crowdsourceLayerWhere = this._settings.crowdsourceLayer.where;
      this._map.setClusterLayerQueryWhere(this.crowdsourceLayerWhere);
    }
  }

  onMapLoad() {
    super.onMapLoad();
    this.createClusterLayer();
  }

  createClusterLayer() {
    const map = this._map;

    if (this._settings.crowdsourceLayer && this._settings.crowdsourceLayer.id && map.getLayer(this._settings.crowdsourceLayer.id)) {
      const layer = map.getLayer(this._settings.crowdsourceLayer.id);
      const url = layer ? layer.url : null;
      const objectIdField = layer.objectIdField;

      if (url) {
        const clusterDefaults = {
          objectIdField,
          disablePopup: true,
          distance: 125,
          id: 'crowdsourceClusters',
          labelColor: '#fff',
          resolution: map.extent.getWidth() / map.width,
          where: this._settings.crowdsourceLayer.where,
          url
        };
        const clusterOptions = $.extend(true, {}, clusterDefaults, this._settings.crowdsourceLayer.clusterOptions);
        const clusterLayer = new ClusterFeatureLayer(clusterOptions);

        if (layer) {
          MapActions.updateMapReferences({
            itemInfo: this._itemInfo,
            map,
            layer
          });
        }

        on.once(clusterLayer,'ids-returned',(e) => {
          if (e.results.length === 0){
            this.onLoad();
          }
        });

        on.once(clusterLayer,'clusters-shown', () => {
          this.onLoad();
        });

        // Map ready when cluster are first shown
        clusterLayer.on('clusters-shown', () => {
          // Get original features in current extent
          const features = clusterLayer._inExtent();

          MapActions.updateFeaturesInExtent(features);
        });

        clusterLayer.on('singles-click', (e) => {
          const ids = [].concat(e.singles).reduce((prev,current) => {
            return prev.concat(current.attributes[layer.objectIdField]);
          },[]);

          MapActions.selectFeatures(ids);
        });

        map.on('click', () => {
          MapActions.selectFeatures([]);
        });

        // Hide original layer
        layer.hide();

        // Add cluster layer
        map.addLayer(clusterLayer);

        // Create cluster layer refresh method in Map
        map.refreshCrowdsourceLayer = function () {
          clusterLayer._visitedExtent = null;
          clusterLayer.updateClusters();
        };

        map.setClusterLayerQueryWhere = function (where) {
          clusterLayer._where = where || '1=1';
          MapActions.updateFeaturesInExtent([]);
          map.refreshCrowdsourceLayer();
        };

      } else if (layer)  {
        _onError('Layer ' + this._settings.crowdsourceLayer.id + ' does not exist in map.');
      }
    } else if (window.app.mode.fromScratch) {
      this.onLoad();
    } else {
      _onError('Crowdsource layer not found. Check layer ID and make sure you have permission to access the feature layer.');
      AppActions.displayMainError(viewerText.errors.loading.crowdsourceLayerNotFound);
    }
  }

  onLoad() {
    if (!this.loaded) {
      this.loaded = true;
      this.emit('load');
      AppActions.componentLoaded(componentNames.MAP);
    }
  }

};

export default CrowdsourceWebmapController;
