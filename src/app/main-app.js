/*eslint prefer-arrow-callback: 0*/
window.define.amd.jQuery = true;

require([
  'babel/App'
], function(
  App
) {
  'use strict';

  var internals = {
    app: new App()
  };

  internals.app.init();
});
