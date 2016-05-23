/*eslint prefer-arrow-callback: 0*/
window.define.amd.jQuery = true;

require([
  'react',
  'reactDom',
  'babel/components/crowdsource/CrowdsourceContainer',
  'babel/controllers/CrowdsourceController',
  'babel/config'
], function(
  React,
  ReactDOM,
  CrowdsourceApp,
  CrowdsourceController
) {
  'use strict';
  ReactDOM.render(React.createElement(CrowdsourceApp), document.getElementById('app'));
  new CrowdsourceController();
});
