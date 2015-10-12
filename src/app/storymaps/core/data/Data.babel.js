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

    this._settings = $.extend(true,{},defaults,options);
  }

  init() {
    internals.logger.logMessage({
      debugOnly: true,
      type: 'status',
      message: 'Loading'
    });
    internals.loadAppItemData(this);
  }

  getComponentSettings(options) {
    let self = this;

    if (options) {
      // Start with component defaults
      let settings = this._appData.settings[options.component];

      if (options.globals === true) {
        settings.globals = this._appData.globals;
      } else if ($.isArray(options.globals)) {
        $.each(options.globals, function() {
          var prop = this.valueOf();

          settings[prop] = self._appData.settings.globals[prop];
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

internals.loadAppItemData = function(self) {
  arcgisUtils.getItem(app.indexCfg.appid).then(function(res) {
    if (res.item && res.itemData && res.itemData.values) {
      self._appItemOriginal = res.item;
      self._appDataOriginal = res.itemData.values;

      if (app.cfg && app.cfg.defaults) {
        self._appData = $.extend(true, {}, app.cfg.defaults.appData, self._appDataOriginal);
        internals.onReady(self);
      } else {
        internals.onError({message: 'Missing App Config or App Defaults'});
      }

    } else {
      internals.onError(res);
    }
  },internals.onError);
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
