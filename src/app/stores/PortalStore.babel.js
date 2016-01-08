import $ from 'jquery';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import AppDataStore from 'babel/stores/AppDataStore';
import AppActions from 'babel/actions/AppActions';
import ArcgisUtil from 'babel/utils/arcgis/Arcgis';
import Logger from 'babel/utils/logging/Logger';
import {Portal} from 'babel/utils/arcgis/Arcgis';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

const _logger = new Logger({source: 'PortalStore'});

const _onError = function onError(error) {
  _logger.logMessage({
    type: 'error',
    error
  });
};

const _onStatus = function onStatus(message,debugOnly) {
  _logger.logMessage({
    type: 'status',
    debugOnly,
    message
  });
};

let _portal = false;
let _isAuthorized = false;
let _userFolders = [];

const _loadPortal = function loadPortal() {
  _portal = new Portal(window.app.indexCfg.sharingurl.split('/sharing/')[0],{
    signInOnLoad: true
  });

  _portal.on('sign-in',() => {

    if (window.app.mode.fromScratch) {
      if (_portal.userIsAppPublisher()) {
        _isAuthorized = true;
      } else {
        AppActions.showLoadingError('notAuthorizedCreateNew');
      }
    } else if (window.app.mode.isBuilder && !_portal.userIsAppEditor()) {
      AppActions.showLoadingError('notAuthorizedEdit');
    } else {
      _isAuthorized = true;
    }
    AppActions.authorization(_isAuthorized);
  });
};

const _PortalStoreClass = class PortalStoreClass extends AppStore {

  constructor() {
    super();
  }

  get isAuthorized() {
    return _isAuthorized;
  }

  get userFolders() {
    return _userFolders;
  }

  get portalInstance() {
    return _portal;
  }

  createAppItemsFromScratch(scratchData) {
    const saveFinished = function saveFinished(res) {
      const urlQuery = $.extend(window.app.urlCfg,{
        appid: res.id,
        edit: true
      });

      delete urlQuery.fromScratch;

      const urlParams = $.param(urlQuery);

      window.app.mode.fromScratch = false;
      window.history.replaceState({},scratchData.app.item.title,'?' + urlParams);
      ArcgisUtil.AppItem.getDataById(res.id);
    };

    const createApp = function createApp(webmapId,csLayerId) {
      _portal.saveApp({
        contentFolder: scratchData.app.item.ownerFolder,
        item: scratchData.app.item,
        data: scratchData.app.data,
        webmapId,
        csLayerId
      }).then((res) => {
        if (res.success) {
          _onStatus('App Item Created: ' + JSON.stringify(res),true);
          saveFinished(res);
        } else {
          _onError(res);
        }
      },_onError);
    };

    const createWebmap = function createWebmap(crowdsourceLayerItemId,crowdsourceLayerUrl) {
      _portal.saveWebmap({
        contentFolder: scratchData.webmap.item.ownerFolder,
        item: scratchData.webmap.item,
        crowdsourceLayerItemId,
        crowdsourceLayerUrl
      }).then((res) => {
        if (res.createResponse && res.createResponse.success) {
          _onStatus('Webmap Item Created: ' + JSON.stringify(res),true);
          createApp(res.createResponse.id,res.csLayerId);
        } else {
          _onError(res);
        }
      },_onError);
    };

    const createService = function() {
      _portal.createService({
        contentFolder: scratchData.layer.item.ownerFolder,
        item: scratchData.layer.item
      }).then((res) => {
        createWebmap(res.crowdsourceLayerItemId,res.crowdsourceLayerUrl);
        _onStatus('Feature Service Created: ' + JSON.stringify(res),true);
      },_onError);
    };

    createService();

  }

};

export const PortalStore = new _PortalStoreClass();

PortalStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.app.SCRIPTS_LOADED:
      if (!_portal && window.app.mode.fromScratch) {
        _loadPortal();
      }
      break;
    case ActionTypes.app.AUTHORIZATION:
      _portal.getUserFolders().then((folders) => {
        if (_userFolders !== folders) {
          _userFolders = folders;
          PortalStore.emitChange();
        }
      });
      break;
    case ActionTypes.arcgis.RECEIVE_APP_ITEM:
      AppDispatcher.waitFor([AppDataStore.dispatchToken]);
      if (!_portal) {
        _loadPortal();
      }
      break;
  }

});

export default PortalStore;
