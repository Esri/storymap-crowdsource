import $ from 'jquery';
import arcgisUtils from 'esri/arcgis/utils';
import EventsEmitter from 'lib/eventEmitter/EventEmitter';
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

const _logStatus = function logStatus(message,debugOnly) {
  _logger.logMessage({
    type: 'status',
    debugOnly,
    message
  });
};

export const WebmapController = class WebmapController extends EventsEmitter {

  constructor(options) {
    super(options);

    let defaults = {
      mapDiv: 'map'
    };

    this._settings = $.extend(true, {}, defaults, options);
  }

  createMap(options) {
    const mapDiv = this._settings.node || this._settings.mapDiv;
    const defaults = {};

    $.extend(true, this._settings, defaults, options);

    if (this._settings.webmap && (!this._map || (this._map.webmapId && this._map.webmapId !== this._settings.webmap))) {
      if (this._map) {
        this._map.destroy();
        this._map = null;
      }

      arcgisUtils.createMap(this._settings.webmap, mapDiv, this._settings.webmapOptions).then((response) => {
        this._map = response.map;
        this._map.webmapId = this._settings.webmap;

        if (this._map.loaded) {
          this.onMapLoad();
        } else {
          this._map.on('load', () => {
            this.onMapLoad();
          });
        }
      },(error) => {
        _onError(error);
      });
    }
  }

  onMapLoad() {
    _logStatus('Webmap ' + this._map.webmapId + ' is loaded',true);
    this.emit('load');
  }

};

export default WebmapController;
