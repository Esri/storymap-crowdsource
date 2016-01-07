import $ from 'jquery';
import Immutable from 'lib/immutable/dist/immutable';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import AppDataStore from 'babel/stores/AppDataStore';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import BuilderConstants from 'babel/constants/CrowdsourceBuilderAppConstants';
import {Events} from 'babel/constants/CrowdsourceBuilderAppConstants';
import {builderDefaults} from 'babel/builderOptionsConfig';

let _activeModal = '';
let _authourized = false;
let _bannerVisible = false;

let _scratchAppDataVersions = [];
let _scratchAppDataDefaults = builderDefaults;

const _getCurrentScratchAppData = function getCurrentScratchAppData(toJS){
  const current = _scratchAppDataVersions[_scratchAppDataVersions.length -1];

  if (current && toJS) {
    return current.toJS();
  } else if (current) {
    return current;
  } else {
    return;
  }

};

const _updateScratchAppData = function updateScratchAppData(newData) {
  let appData;
  const previous = _getCurrentScratchAppData();

  if (!previous) {
    const withDefaults = $.extend(true,{}, _scratchAppDataDefaults, newData);

    appData = Immutable.fromJS(withDefaults);
  } else {
    appData = previous.mergeDeep(newData);
  }
  _scratchAppDataVersions.push(appData);
};

const _CrowdsourceBuilderAppStoreClass = class CrowdsourceBuilderAppStoreClass extends AppStore {

  constructor() {
    super();
  }

  get activeModal() {
    if (_activeModal && _activeModal.length > 0) {
      return _activeModal;
    } else {
      return false;
    }
  }

  get authorized() {
    return _authourized;
  }

  get bannerVisible() {
    return _bannerVisible;
  }

  get scratchAppData() {
    if (!AppDataStore.appData && window.app.mode.fromScratch) {
      const current = _getCurrentScratchAppData(true);

      if (current) {
        return current;
      } else {
        return _scratchAppDataDefaults;
      }
    } else {
      return false;
    }
  }

};

export const CrowdsourceBuilderAppStore = new _CrowdsourceBuilderAppStoreClass();

CrowdsourceBuilderAppStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.app.AUTHORIZATION:
      if (window.app.mode.fromScratch && !AppDataStore.appData && payload.authorized) {
        _activeModal = 'layoutScratch';
        _authourized = true;
        CrowdsourceBuilderAppStore.emitChange(Events.appState.SETTINGS_VIEW);
      }
      break;
    case BuilderConstants.ActionTypes.app.UPDATE_APP_DATA:
      if (payload.appData) {
        _updateScratchAppData(payload.appData);
      }
      console.log(_getCurrentScratchAppData(true));
      CrowdsourceBuilderAppStore.emitChange(BuilderConstants.ActionTypes.app.UPDATE_APP_DATA);
      break;
    case BuilderConstants.ActionTypes.app.SETTINGS_NEXT:
      switch (_activeModal) {
        case 'layoutScratch':
          _activeModal = 'itemNameScratch';
          break;
        default:
          _activeModal = '';
      }
      CrowdsourceBuilderAppStore.emitChange(BuilderConstants.ActionTypes.app.SETTINGS_NEXT);
      break;
  }

});

export default CrowdsourceBuilderAppStore;
