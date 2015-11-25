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
  'babel/utils/arcgis/Arcgis',
  'babel/components/crowdsource/viewer/CrowdsourceApp'
], function(
  //----------------------------------------------
  // Development - TODO to be removed for release
  //----------------------------------------------
  testCredentials, /*eslint no-unused-vars: 0*/
  //----------------------------------------------
  React,
  ReactDOM,
  Arcgis,
  CrowdsourceApp
) {
  'use strict';
  // TODO require config so we can be sure its loaded
  Arcgis.AppItem.getDataById(window.app.indexCfg.appid);
  ReactDOM.render(React.createElement(CrowdsourceApp), document.getElementById('app'));
});
