import arcgisUtils from 'esri/arcgis/utils';

export const _configSharingUrl = function configSharingUrl() {

  if (!window.app.indexCfg.sharingurl) {
    // Determine if hosted or on a Portal
    let appLocation = document.location.pathname.indexOf('/apps/');

    if (appLocation === -1) {
      appLocation = document.location.pathname.indexOf('/home/');
    }

    if (appLocation !== -1) {

      // Get the portal instance name
      const instance = location.pathname.substr(0, appLocation);

      window.app.indexCfg.sharingurl = '//' + location.host + instance + '/sharing/content/items';
      window.app.indexCfg.proxyurl = '//' + location.host + instance + '/sharing/proxy';
    } else {
      window.app.indexCfg.sharingurl = window.app.cfg.DEFAULT_SHARING_URL;
    }

  }

  if (window.app.indexCfg.sharingurl.match(/^http/)) {
    arcgisUtils.arcgisUrl = window.app.indexCfg.sharingurl;
  } else {
    arcgisUtils.arcgisUrl = location.protocol + window.app.indexCfg.sharingurl;
  }

};

export default {
  configSharingUrl: _configSharingUrl
};
