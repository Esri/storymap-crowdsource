import $ from 'jquery';
import Evented from 'dojo/Evented';
import arcgisUtils from 'esri/arcgis/utils';
import Logger from 'babel/utils/logging/Logger';

var internals = {
  logger: new Logger({source: 'Data'})
};

export default internals.Data = class Data extends Evented {

  constructor(options) {
    super(options);

    let defaults = {};

    this._settings = $.extend(true, {}, defaults, options);
  }

  init() {
    internals.logger.logMessage({
      debugOnly: true,
      type: 'status',
      message: 'Loading'
    });
    internals.loadAppItemData.call(this);
  }

  getComponentSettings(options) {
    if (options) {
      // Start with component defaults
      let settings = this._appData.settings[options.component];

      if (options.globals === true) {
        settings.globals = this._appData.globals;
      } else if ($.isArray(options.globals)) {
        $.each(options.globals, () => {
          var prop = this.valueOf();

          settings[prop] = this._appData.settings.globals[prop];
        });
      }

      return settings;
    }
  }

  getCrowdsourceLayer() {
    return this._appData.settings.crowdsourceLayer;
  }

  getMapOptions() {
    return this._appData.settings.mapOptions;
  }

  getWebmap() {
    return this._appData.webmap;
  }

};

internals.loadAppItemData = function() {
  arcgisUtils.getItem(window.app.indexCfg.appid).then((res) => {
    if (res.item && res.itemData && res.itemData.values) {
      this._appItemOriginal = res.item;
      this._appDataOriginal = res.itemData.values;

      if (window.app.cfg && window.app.cfg.defaults) {
        this._appData = $.extend(true, {}, window.app.cfg.defaults.appData, this._appDataOriginal);
        internals.onReady.call(this);
      } else {
        internals.onError({message: 'Missing App Config or App Defaults'});
      }

    } else {
      internals.onError(res);
    }
  }, internals.onError);
};

internals.onReady = function() {
  internals.logger.logMessage({
    debugOnly: true,
    type: 'status',
    message: 'Ready'
  });
  if (this.emit){
    this.emit('load');
  }
};

internals.onError = function(err) {
  internals.logger.logMessage({
    type: 'error',
    error: err
  });
  if (this) {
    this.emit('error', err);
  }
};
