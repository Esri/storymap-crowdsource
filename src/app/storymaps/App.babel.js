import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'reactDom';
import Logger from 'babel/utils/logging/Logger';
import ArcgisConfig from 'babel/utils/arcgis/Config';
import Data from 'babel/core/data/Data';
import Helper from 'babel/utils/helper/Helper';
import HeaderView from 'babel/ui/header/HeaderView';
import MapView from 'babel/ui/map/MapView';
import Evented from 'dojo/Evented';
import domConstruct from 'dojo/dom-construct';
//----------------------------------------------
// Development - TODO to be removed for release
//----------------------------------------------
import IdentityManager from 'esri/IdentityManager';
import on from 'dojo/on';
import cred from 'babel/core/testCredentials';
on(IdentityManager, 'dialog-create', () => {
  on(IdentityManager.dialog, 'show', () => {
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

    this._settings = $.extend(true, {}, defaults, options);
  }

  init() {
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

    data.on('load', internals.createApp.bind(this));

    helper.init();
    data.init();
  }

};

internals.createApp = function() {
  let self = this;

  ReactDOM.render(<HeaderView test="foo" />, self._settings.node);
  internals.loadMap.call(self);
};

// internals.loadHeader = function(self) {
//   ReactDOM.render(<HeaderView test="foo" />, self._settings.node);
// };
//
internals.loadMap = function() {

  let mapView = this._mapView = new MapView({
    data: this._data,
    node: domConstruct.create('div', {'class': 'map-view'}, this._settings.node)
  });

  // mapView.on('load', function() {
  //   self._appComponents.mapView.loaded = true;
  //   internals.appReady(self);
  // });

  mapView.init();

};

// internals.appReady = function(self) {
//
//   let ready = internals.checkReadyState(self._appComponents, 'loaded');
//   let introReady = internals.checkReadyState(self._appComponents, 'loaded', 'introComponent');
//
//   if (!self._readyState.introLoaded && introReady) {
//     self._readyState.introLoaded = true;
//     internals.onIntroReady(self);
//   }
//
//   if (!self._readyState.appLoaded && ready) {
//     self._readyState.appLoaded = true;
//     internals.onReady(self);
//   }
// };
//
// internals.checkReadyState = function(components, verifyKey, filterKey) {
//
//   var ready = true;
//
//   $.each(components, function() {
//     if ((!filterKey || this[filterKey]) && !this[verifyKey]) {
//       ready = false;
//     }
//   });
//
//   return ready;
//
// };

internals.onIntroReady = function() {
  internals.logger.logMessage({
    debugOnly: true,
    type: 'status',
    message: 'Intro Ready'
  });
  if (this.emit){
    this.emit('introReady');
  }
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
