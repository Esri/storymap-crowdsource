import $ from 'jquery';
import lang from 'dojo/_base/lang';
import esriRequest from 'esri/request';
import AppStore from 'babel/store/AppStore';
import Logger from 'babel/utils/logging/Logger';
import ArcgisActions from 'babel/actions/ArcgisActions';
import AppActions from 'babel/actions/AppActions';
import viewerText from 'i18n!translations/viewer/nls/template';

const _logger = new Logger({source: 'ArcGIS - AppItem'});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

export const getDataById = function getDataById(options) {
  const appState = AppStore.getState();
  const defaults = {
    id: lang.getObject('config.appid',false,appState),
    portal: lang.getObject('app.portal',false,appState)
  };
  const settings = $.extend(true,{},defaults,options);
  const itemUrl = settings.portal.portalUrl + (settings.portal.portalUrl.slice(-1) !== '/' ? '/' : '') + 'content/items/' + settings.id;

  const response = {
    item: false,
    data: false
  };

  const onError = function(err) {
    if (err.toString().search('You do not have access') > -1) {
      AppActions.displayMainError(viewerText.errors.loading.notAuthorizedApp);
    } else if (err.toString().search('Item does not exist or is inaccessible') > -1) {
      AppActions.displayMainError(viewerText.errors.loading.inaccessibleApp);
    } else {
      AppActions.displayMainError(viewerText.errors.loading.appLoadingFail);
    }
    _onError(err);
  };

  const getAppData = function() {

    const content = {
      f: 'json',
      token: settings.token
    };

    esriRequest({
      url: itemUrl + '/data',
      content,
      handleAs: 'json'
    }).then((res) => {
      if (res.settings) {
        response.data = res;
        ArcgisActions.receiveAppItem(response);
      } else {
        AppActions.displayMainError(viewerText.errors.loading.appLoadingFail);
        _onError(res);
      }
    },onError);
  };

  const getAppItem = function() {

    const content = {
      f: 'json',
      token: settings.token
    };

    esriRequest({
      url: itemUrl,
      content,
      handleAs: 'json'
    }).then((res) => {
      if (res.id && res.id === settings.id) {
        response.item = res;
        getAppData();
      } else {
        AppActions.displayMainError(viewerText.errors.loading.appLoadingFail);
        _onError(res);
      }
    },onError);
  };

  getAppItem();
};

export default {
  getDataById
};
