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
  'babel/components/crowdsource/CrowdsourceApp'
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
  Arcgis.getAppItem();
  ReactDOM.render(React.createElement(CrowdsourceApp), document.getElementById('app'));
});
