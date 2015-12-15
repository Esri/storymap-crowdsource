import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import AppDataStore from 'babel/stores/AppDataStore';
import AppActions from 'babel/actions/AppActions';
// import ArcgisActions from 'babel/actions/ArcgisActions';
import {Portal} from 'babel/utils/arcgis/Arcgis';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
// import {builderDefaults} from 'babel/builderOptionsConfig';

let _portal = false;
let _isAuthorized = false;

const _loadPortal = function loadPortal() {
  _portal = new Portal(window.app.indexCfg.sharingurl.split('/sharing/')[0],{
    signInOnLoad: true
  });

  _portal.on('sign-in',() => {

    if (window.app.mode.fromScratch) {
      if (_portal.userIsAppPublisher()) {
        _isAuthorized = true;
        // ArcgisActions.receiveAppItem({
        //   defaultData: builderDefaults.appData
        // });
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
    case ActionTypes.arcgis.RECEIVE_APP_ITEM:
      AppDispatcher.waitFor([AppDataStore.dispatchToken]);
      if (!_portal) {
        _loadPortal();
      }
      break;
  }

});

export default PortalStore;
