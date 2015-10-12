define.amd.jQuery = true;

require([
  'babel/App'
],function(
  App
) {

  var internals = {
    app: new App()
  };

  internals.app.init();
});
