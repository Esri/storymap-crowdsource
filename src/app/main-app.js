/*eslint prefer-arrow-callback: 0*/
window.define.amd.jQuery = true;

require([
  //----------------------------------------------
  // Development - TODO to be removed for release
  //----------------------------------------------
  'babel/testCredentials',
  //----------------------------------------------
  'jquery',
  'react',
  'reactDom',
  'babel/actions/AppActions',
  'babel/utils/arcgis/Arcgis',
  'babel/components/crowdsource/viewer/CrowdsourceApp',
  'esri/urlUtils',
  'babel/config'
], function(
  //----------------------------------------------
  // Development - TODO to be removed for release
  //----------------------------------------------
  testCredentials,  // eslint-disable-line no-unused-vars
  //----------------------------------------------
  $,
  React,
  ReactDOM,
  AppActions,
  Arcgis,
  CrowdsourceApp,
  UrlUtils
) {
  'use strict';

  window.app.urlCfg = UrlUtils.urlToObject(window.location.href).query;
  $.extend(true,window.app.indexCfg,window.app.urlCfg);

  AppActions.default.scriptsLoaded();
  if (!window.app.mode.fromScratch) {
    if (window.app.indexCfg.appid) {
      Arcgis.AppItem.getDataById(window.app.indexCfg.appid);
    } else {
      AppActions.default.showLoadingError('invalidConfigNoApp');
    }
  }
  ReactDOM.render(React.createElement(CrowdsourceApp), document.getElementById('app'));
});
