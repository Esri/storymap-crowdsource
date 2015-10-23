import $ from 'jquery';
import arcgisUtils from 'esri/arcgis/utils';
import Logger from 'babel/utils/logging/Logger';

const _logger = new Logger({
  source: 'WebmapController'
});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

export const WebmapController = class WebmapController {

  constructor(options) {
    let defaults = {
      mapDiv: 'map'
    };

    this._settings = $.extend(true, {}, defaults, options);
  }

  createMap(options) {
    const mapDiv = this._settings.node || this._settings.mapDiv;
    const defaults = {};
    const mapSettings = $.extend(true, {}, defaults, options);

    if (mapSettings.webmap && (!this._map || (this._map.webmapId && this._map.webmapId !== mapSettings.webmap))) {
      if (this._map) {
        this._map.destroy();
        this._map = null;
      }

      arcgisUtils.createMap(mapSettings.webmap, mapDiv, mapSettings.mapOptions).then((response) => {
        this._map = response.map;
        this._map.webmapId = mapSettings.webmap;
      },(error) => {
        _onError(error);
      });
    }
  }

};

export default WebmapController;
