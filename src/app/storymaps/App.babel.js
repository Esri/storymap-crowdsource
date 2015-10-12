import $ from 'jquery';
import Logger from 'babel/utils/logging/Logger';
import ArcgisConfig from 'babel/utils/arcgis/Config';
import Data from 'babel/core/data/Data';
import Helper from 'babel/utils/helper/Helper';
import Header from 'babel/ui/header/Header';
import MapView from 'babel/ui/map/MapView';
import Evented from 'dojo/Evented';
import domConstruct from 'dojo/dom-construct';
//----------------------------------------------
// Development - TODO to be removed for release
//----------------------------------------------
import IdentityManager from 'esri/IdentityManager';
import on from 'dojo/on';
import cred from 'babel/core/testCredentials';
on(IdentityManager, 'dialog-create', function() {
  on(IdentityManager.dialog, 'show', function() {
    IdentityManager.dialog.txtUser_.set('value', cred.user);
    IdentityManager.dialog.txtPwd_.set('value', cred.pw);
    IdentityManager.dialog.btnSubmit_.onClick();
  });
});
//----------------------------------------------
var internals = {
  logger: new Logger({source: 'App'})
};

export default internals.App = class App extends Evented {

  constructor(options) {
    super();

    let defaults = {
      node: document.getElementById('app')
    };

    this._settings = $.extend(true,{},defaults,options);
  }

  init() {
    let self = this;
    let data = this._data = new Data();
    let helper = this._helper = new Helper();

    this._appComponents = {
      mapView: {loaded: false},
      header: {loaded: false, introComponent: true}
    };
    this._readyState = {
      appLoaded: false,
      introLoaded: false
    };

    // Config ArcGIS Online
    ArcgisConfig.configSharingUrl();

    data.on('load',function() {
      internals.loadHeader(self);
      internals.loadMap(self);
    });

    helper.init();
    data.init();
  }

};

internals.loadHeader = function(self) {
  let header = self._header = new Header({
    data: self._data,
    node: domConstruct.create('header',{class: 'header navbar'},self._settings.node)
  });

  header.on('load', function() {
    self._appComponents.header.loaded = true;
    internals.appReady(self);
  });

  header.init();
};

internals.loadMap = function(self) {

  let mapView = self._mapView = new MapView({
    data: self._data,
    node: domConstruct.create('div',{class: 'map-view'},self._settings.node)
  });

  mapView.on('load', function() {
    self._appComponents.mapView.loaded = true;
    internals.appReady(self);
  });

  mapView.init();

};

internals.appReady = function(self) {

  let ready = internals.checkReadyState(self._appComponents,'loaded');
  let introReady = internals.checkReadyState(self._appComponents,'loaded','introComponent');

  if (!self._readyState.introLoaded && introReady) {
    self._readyState.introLoaded = true;
    internals.onIntroReady(self);
  }

  if (!self._readyState.appLoaded && ready) {
    self._readyState.appLoaded = true;
    internals.onReady(self);
  }
};

internals.checkReadyState = function(components,verifyKey,filterKey) {

  var ready = true;

  $.each(components,function() {
    if ((!filterKey || this[filterKey]) && !this[verifyKey]) {
      ready = false;
    }
  });

  return ready;

};

internals.onIntroReady = function(self) {
  internals.logger.logMessage({
    debugOnly: true,
    type: 'status',
    message: 'Intro Ready'
  });
  self.emit('introReady');
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
