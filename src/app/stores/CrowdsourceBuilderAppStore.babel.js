import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import AppDataStore from 'babel/stores/AppDataStore';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import {Events} from 'babel/constants/CrowdsourceBuilderAppConstants';

let _activeModal = '';
let _authourized = false;
let _bannerVisible = false;

const _CrowdsourceBuilderAppStoreClass = class CrowdsourceBuilderAppStoreClass extends AppStore {

  constructor() {
    super();
  }

  get settingsModal() {
    switch (_activeModal) {
      case 'layout':
        return 'layout';
      default:
        return false;
    }
  }

  get authorized() {
    return _authourized;
  }

  get bannerVisible() {
    return _bannerVisible;
  }

};

export const CrowdsourceBuilderAppStore = new _CrowdsourceBuilderAppStoreClass();

CrowdsourceBuilderAppStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.app.AUTHORIZATION:
      if (window.app.mode.fromScratch && !AppDataStore.appData && payload.authorized) {
        _activeModal = 'layout';
        _authourized = true;
        CrowdsourceBuilderAppStore.emitChange(Events.appState.SETTINGS_VIEW);
      }
      break;
    }

});

export default CrowdsourceBuilderAppStore;
