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
  'babel/components/crowdsource/CrowdsourceContainer',
  'babel/controllers/CrowdsourceController',
  'babel/config'
], function(
  //----------------------------------------------
  // Development - TODO to be removed for release
  //----------------------------------------------
  testCredentials,  // eslint-disable-line no-unused-vars
  //----------------------------------------------
  React,
  ReactDOM,
  CrowdsourceApp,
  CrowdsourceController
) {
  'use strict';
  ReactDOM.render(React.createElement(CrowdsourceApp), document.getElementById('app'));
  new CrowdsourceController();
});
