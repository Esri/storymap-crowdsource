import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import AppDataStore from 'babel/stores/AppDataStore';
import AppActions from 'babel/actions/AppActions';
import Logger from 'babel/utils/logging/Logger';
import {Portal} from 'babel/utils/arcgis/Arcgis';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

const _logger = new Logger({source: 'PortalStore'});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
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
