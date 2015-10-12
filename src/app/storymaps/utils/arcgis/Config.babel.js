import arcgisUtils from 'esri/arcgis/utils';

var internals = {};

internals.configSharingUrl = function() {

  if (!app.indexCfg.sharingurl) {
    // Determine if hosted or on a Portal
    let appLocation = document.location.pathname.indexOf('/apps/');

    if (appLocation === -1) {
      appLocation = document.location.pathname.indexOf('/home/');
    }

    if (appLocation !== -1) {

      // Get the portal instance name
      var instance = location.pathname.substr(0,appLocation);

      app.indexCfg.sharingurl = '//' + location.host + instance + '/sharing/content/items';
      app.indexCfg.proxyurl = '//' + location.host + instance + '/sharing/proxy';
    } else {
      app.indexCfg.sharingurl = app.cfg.DEFAULT_SHARING_URL;
    }

  }

  if (app.indexCfg.sharingurl.match(/^http/)) {
    arcgisUtils.arcgisUrl = app.indexCfg.sharingurl;
  } else {
    arcgisUtils.arcgisUrl = location.protocol + app.indexCfg.sharingurl;
  }

};

export default {
  configSharingUrl: internals.configSharingUrl
};
