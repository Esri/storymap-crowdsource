/*eslint prefer-arrow-callback: 0*/
window.define.amd.jQuery = true;

require([
  //----------------------------------------------
  // Development - TODO to be removed for release
  //----------------------------------------------
  'babel/testCredentials',
  //----------------------------------------------
  'react',
  'reactDom',
  'babel/actions/AppActions',
  'babel/utils/arcgis/Arcgis',
  'babel/components/crowdsource/viewer/CrowdsourceApp',
  'babel/config'
], function(
  //----------------------------------------------
  // Development - TODO to be removed for release
  //----------------------------------------------
  testCredentials,  // eslint-disable-line no-unused-vars
  //----------------------------------------------
  React,
  ReactDOM,
  AppActions,
  Arcgis,
  CrowdsourceApp
) {
  'use strict';

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
