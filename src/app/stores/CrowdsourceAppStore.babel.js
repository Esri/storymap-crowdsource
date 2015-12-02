import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import ViewerText from 'i18n!translations/viewer/nls/template';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import {Components} from 'babel/constants/CrowdsourceAppConstants';
import {Events} from 'babel/constants/CrowdsourceAppConstants';

let _features = [];
let _viewState = {
  current: Components.names.INTRO
};
let _loadingErrorMessage = '';

const _CrowdsourceAppStoreClass = class CrowdsourceAppStoreClass extends AppStore {

  constructor() {
    super();

    this._loadedComponents = {
      appData: false,
      map: false
    };

    if (window.app.mode.fromScratch) {
      this._loadedComponents.appData = true;
    }
  }

  get features() {
    return _features;
  }

  get loadState() {
    const isReady = this.isReady;
    let loadingMessage;

    if (!this._loadedComponents.appData && !this._loadedComponents.map) {
      loadingMessage = ViewerText.loading.initializing;
    } else {
      loadingMessage = ViewerText.loading.map;
    }

    return {isReady,loadingMessage,error: _loadingErrorMessage};
  }

  get viewState() {
    return _viewState;
  }
};

export const CrowdsourceAppStore = new _CrowdsourceAppStoreClass();

CrowdsourceAppStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.app.LOADING_ERROR:
      _loadingErrorMessage = payload.message;
      CrowdsourceAppStore.emitChange(Events.appState.LOAD_STATE);
      break;
    case ActionTypes.app.COMPONENT_LOADED:
      CrowdsourceAppStore._loadedComponents[payload.component] = true;
      CrowdsourceAppStore.emitChange(Events.appState.LOAD_STATE);
      break;
    case ActionTypes.arcgis.RECEIVE_APP_ITEM:
      if (!CrowdsourceAppStore._loadedComponents.appData && payload.response && payload.response.item && payload.response.itemData){
        CrowdsourceAppStore._loadedComponents.appData = true;
        CrowdsourceAppStore.emitChange(Events.appState.LOAD_STATE);
      }
      break;
    case ActionTypes.map.RECEIVE_FEATURES:
      _features = payload.features;
      CrowdsourceAppStore.emitChange();
      break;
    case ActionTypes.app.SET_VIEW:
      _viewState.previous = _viewState.current;
      _viewState.current = payload.component;
      CrowdsourceAppStore.emitChange(Events.appState.VIEW_STATE);
      break;
    }

});

export default CrowdsourceAppStore;
