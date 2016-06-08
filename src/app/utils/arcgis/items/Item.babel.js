import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import esriRequest from 'esri/request';
import IdentityManager from 'esri/IdentityManager';
import AppStore from 'babel/store/AppStore';
import Logger from 'babel/utils/logging/Logger';
import ArcgisActions from 'babel/actions/ArcgisActions';
import AppActions from 'babel/actions/AppActions';
import viewerText from 'i18n!translations/viewer/nls/template';
import 'babel/utils/helper/strings/StringUtils';

const _logger = new Logger({source: 'ArcGIS - Item'});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

const _onStatus = function onStatus(message,debugOnly) {
  _logger.logMessage({
    type: 'status',
    debugOnly,
    message
  });
};

export const getDataById = function getDataById(options) {
  const appState = AppStore.getState();
  const defaults = {
    item: 'app',
    id: lang.getObject('config.appid',false,appState),
    portal: lang.getObject('app.portal',false,appState)
  };
  const settings = $.extend(true,{},defaults,options);
  const itemUrl = settings.portal.portalUrl.stripTrailingSlash() + '/content/items/' + settings.id;

  const response = {
    item: false,
    data: false
  };

  const onError = function(err) {
    if (settings.item === 'app') {
      if (err.toString().search('You do not have access') > -1) {
        AppActions.displayMainError(viewerText.errors.loading.notAuthorizedApp);
      } else if (err.toString().search('Item does not exist or is inaccessible') > -1) {
        AppActions.displayMainError(viewerText.errors.loading.inaccessibleApp);
      } else {
        AppActions.displayMainError(viewerText.errors.loading.appLoadingFail);
      }
    }
    _onError(err);
  };

  const checkUserLogin = function() {
    const dfd = new Deferred();

    if (settings.requiresLogin) {
      settings.portal.signIn().then(dfd.resolve);
    } else {
      IdentityManager.checkSignInStatus(settings.portal.url).then((res) => {
        if (res) {
          settings.portal.signIn().then(dfd.resolve);
        } else {
          dfd.resolve();
        }
      },(err) => {
        dfd.resolve();
        _onStatus(err.message,true);
      });
    }

    return dfd;
  };

  const getItem = function(token) {

    const content = {
      f: 'json',
      token
    };

    esriRequest({
      url: itemUrl,
      content,
      handleAs: 'json'
    }).then((res) => {
      if (res.id && res.id === settings.id) {
        response.item = res;
        if (settings.item === 'app') {
          ArcgisActions.receiveAppItem(response);
        }
        if (settings.item === 'webmap') {
          ArcgisActions.receiveWebmapItem(response);
        }
      } else {
        if (settings.item === 'app') {
          AppActions.displayMainError(viewerText.errors.loading.appLoadingFail);
        }
        _onError(res);
      }
    },onError);
  };

  const getItemData = function() {

    const content = {
      f: 'json'
    };

    esriRequest({
      url: itemUrl + '/data',
      content,
      handleAs: 'json'
    }).then((res) => {
      if (settings.item === 'app' && res.values && res.values.settings) {
        response.data = res;
        checkUserLogin().then(getItem);
      } else if (settings.item === 'app' && res.values && !res.values.settings) {
        response.data = res;
        checkUserLogin().then(getItem);
      } else if (settings.item === 'webmap' && res.version) {
        response.data = res;
        checkUserLogin().then(getItem);
      } else {
        if (settings.item === 'app') {
          AppActions.displayMainError(viewerText.errors.loading.appLoadingFail);
        }
        _onError(res);
      }
    },onError);
  };

  getItemData();
};

export default {
  getDataById
};
