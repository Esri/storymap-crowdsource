import $ from 'jquery';
import URI from 'lib/urijs/src/URI';
import UrlUtils from 'esri/urlUtils';
import ConfigActions from 'babel/actions/ConfigActions';

export default class AppConfig {
  constructor () {

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

    this.defaultConfig = $.extend(true,{},window.app.indexCfg,window.app.cfg);
    this.updateConfigWithUrlQuery(this.urlQuery);

  }

  updateConfigWithUrlQuery() {
    const urlConfig = {};
    const urlQuery = UrlUtils.urlToObject(window.location.href).query;
    const uri = new URI(window.location.href);
    const currentQuery = uri.query();

    if (urlQuery) {
      Object.keys(urlQuery).forEach((current) => {
        switch (current.toLowerCase()) {
          case 'appid':
            urlConfig.appid = urlQuery[current];
            break;
          case 'webmap':
            urlConfig.webmap = urlQuery[current];
            break;
          case 'folderid':
            urlConfig.folderid = urlQuery[current];
            break;
          case 'oauthappid':
            urlConfig.oAuthAppId = urlQuery[current];
            break;
          case 'portal':
          case 'portalurl':
          case 'sharinghost':
          case 'sharingurl':
            // Make sure url is encoded
            if (new URI(urlQuery[current]).hostname() !== '') {
              uri.setQuery(current,encodeURIComponent(urlQuery[current]));
              urlConfig.sharingurl = urlQuery[current];
            } else {
              urlConfig.sharingurl = decodeURIComponent(urlQuery[current]);
            }
            break;
        }
      });
    }

    if (currentQuery !== uri.query()) {
      window.history.replaceState({},null,'?' + uri.query());
    }

    const config = $.extend(true,{},this.defaultConfig,urlConfig);

    ConfigActions.updateConfig(config);
  }

}
