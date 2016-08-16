/*eslint prefer-arrow-callback: 0*/
window.define.amd.jQuery = true;

require([
  'dojo/_base/kernel',
  'react',
  'reactDom',
  'babel/components/crowdsource/CrowdsourceContainer',
  'babel/controllers/CrowdsourceController',
  'babel/config'
], function(
  kernel,
  React,
  ReactDOM,
  CrowdsourceApp,
  CrowdsourceController
) {
  'use strict';
  document.documentElement.lang = kernel.locale;
  ReactDOM.render(React.createElement(CrowdsourceApp), document.getElementById('app'));
  new CrowdsourceController();
});
