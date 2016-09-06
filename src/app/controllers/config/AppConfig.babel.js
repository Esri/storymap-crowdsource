import $ from 'jquery';
import UrlUtils from 'esri/urlUtils';
import ConfigActions from 'babel/actions/ConfigActions';

export default class AppConfig {
  constructor () {

    this.defaultConfig = $.extend(true,{},window.app.indexCfg,window.app.cfg);
    this.updateConfigWithUrlQuery(this.urlQuery);

  }

  updateConfigWithUrlQuery() {
    const urlConfig = {};
    const urlQuery = UrlUtils.urlToObject(window.location.href).query;

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
        }
      });
    }

    const config = $.extend(true,{},this.defaultConfig,urlConfig);

    ConfigActions.updateConfig(config);
  }

}
