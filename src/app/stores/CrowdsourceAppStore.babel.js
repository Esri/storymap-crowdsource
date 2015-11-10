import AppStore from 'babel/stores/AppStore';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import {Events} from 'babel/constants/CrowdsourceAppConstants';
import viewerText from 'i18n!translations/viewer/nls/template';
import {Components} from 'babel/constants/CrowdsourceAppConstants';

let _features = [];
let _viewState = {
  current: Components.names.INTRO
};

const _CrowdsourceAppStoreClass = class CrowdsourceAppStoreClass extends AppStore {

  constructor() {
    super();

    this._loadedComponents = {
      appData: false,
      map: false
    };
  }

  get features() {
    return _features;
  }

  get viewState() {
    return _viewState;
  }

  get loadState() {
    const isReady = this.isReady;
    let loadingMessage;

    if (!this._loadedComponents.appData && !this._loadedComponents.map) {
      loadingMessage = viewerText.loading.initializing;
    } else {
      loadingMessage = viewerText.loading.map;
    }

    return {isReady,loadingMessage};
  }

  addViewStateListener(callback) {
    this.on(Events.appState.VIEW_STATE, callback);
  }

  removeViewStateListener(callback) {
    this.removeListener(Events.appState.VIEW_STATE, callback);
  }

  emitViewState() {
    this.emit(Events.appState.VIEW_STATE);
  }

};

export const CrowdsourceAppStore = new _CrowdsourceAppStoreClass();

CrowdsourceAppStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.app.COMPONENT_LOADED:
      CrowdsourceAppStore._loadedComponents[payload.component] = true;
      CrowdsourceAppStore.emitLoadState();
      break;
    case ActionTypes.arcgis.RECEIVE_APP_ITEM:
      if (!CrowdsourceAppStore._loadedComponents.appData && payload.response && payload.response.item && payload.response.itemData){
        CrowdsourceAppStore._loadedComponents.appData = true;
        CrowdsourceAppStore.emitLoadState();
      }
      break;
    case ActionTypes.map.RECEIVE_FEATURES:
      _features = payload.features;
      CrowdsourceAppStore.emitChange();
      break;
    case ActionTypes.app.SET_VIEW:
      _viewState.previous = _viewState.current;
      _viewState.current = payload.component;
      CrowdsourceAppStore.emitViewState();
      break;
  }

});

export default CrowdsourceAppStore;
