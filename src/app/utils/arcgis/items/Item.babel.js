import $ from 'jquery';
import React from 'react'; //eslint-disable-line no-unused-vars
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import esriRequest from 'esri/request';
import IdentityManager from 'esri/IdentityManager';
import URI from 'lib/urijs/src/URI';
import AppStore from 'babel/store/AppStore';
import Logger from 'babel/utils/logging/Logger';
import crowdsourceVersionUpdate from 'babel/utils/appData/CrowdsourceVersionUpdate';
import ArcgisActions from 'babel/actions/ArcgisActions';
import AppActions from 'babel/actions/AppActions';
import ModeActions from 'babel/actions/ModeActions';
import viewerText from 'i18n!translations/viewer/nls/template';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';
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
  const deferred = new Deferred();
  const defaults = {
    item: 'app',
    id: lang.getObject('config.appid',false,AppStore.getState()),
    portal: lang.getObject('app.portal',false,AppStore.getState())
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

  const displayDifferentWebmapOwnerMessage = function() {
    const removeDifferentWebmapOwnerMessage = function() {
      AppActions.removeNotifications({
        id: 'scratchCreation_differentWebmapOwnerMessage'
      });
    };

    AppActions.addNotifications({
      id: 'scratchCreation_differentWebmapOwnerMessage',
      type: 'info',
      content: (
        <div>
          <p><strong>{builderText.messages.arcgisItems.webmapNotOwned.title}</strong></p>
          <p>{builderText.messages.arcgisItems.webmapNotOwned.body}</p>
          <button className="btn btn-primary" onClick={removeDifferentWebmapOwnerMessage}>{builderText.messages.arcgisItems.webmapNotOwned.confirmBtn}</button>
        </div>
      )
    });
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

  const getItem = function(user) {

    const token = lang.getObject('credential.token',false,user);
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
        if (settings.deferredResponseOnly) {
          deferred.resolve(response);
        } else if (settings.item === 'app' && response.data.values.settings) {
          crowdsourceVersionUpdate(response);
        } else if (settings.item === 'app') {
          ArcgisActions.receiveScratchCreationAppItem(response);
        } else if (settings.item === 'webmap') {
          if (lang.getObject('mode.fromScratch',false,AppStore.getState()) && lang.getObject('app.portal.user.username',false,AppStore.getState()) !== res.owner) {
            // If owned by another user, remove id information so app will create a copy of the original webmap in author's content
            $.extend(true,response.item,{
              id: '',
              extent: res.extent.toString(),
              orgId: '',
              owner: '',
              ownerFolder: ''
            });
            ArcgisActions.receiveWebmapItem(response);
            displayDifferentWebmapOwnerMessage();
          } else {
            $.extend(true,response.item,{
              extent: res.extent.toString()
            });
            ArcgisActions.receiveWebmapItem(response);
          }
        }
        deferred.resolve(response);
      } else {
        if (settings.item === 'app') {
          AppActions.displayMainError(viewerText.errors.loading.appLoadingFail);
        }
        _onError(res);
        deferred.reject(res);
      }
    },(err) => {
      onError(err);
      deferred.reject(err);
    });
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
      if (settings.item === 'app' && res.values) {
        if (!res.values.settings && builderText) {
          ModeActions.updateMode({
            fromScratch: true
          });
        } else if (!res.values.settings && !builderText) {
          const newUrl = new URI(window.location.href);

          newUrl.addSearch('edit');
          window.history.replaceState({},null,newUrl.href());
          window.location.reload();
        }
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
        deferred.reject(res);
      }
    },(err) => {
      onError(err);
      deferred.reject(err);
    });
  };

  getItemData();

  return deferred;
};

export default {
  getDataById
};
