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

let _scratchAppItemVersions = [];
let _scratchAppItemDefaults = builderDefaults.appItem;
let _scratchAppDataVersions = [];
let _scratchAppDataDefaults = builderDefaults.appData;
let _scratchFirstSaveDataVersions = [];
let _scratchFirstSaveDataDefaults = {};

const _getCurrentScratchAppItem = function getCurrentScratchAppItem(toJS){
  const current = _scratchAppItemVersions[_scratchAppItemVersions.length -1];

  if (current && toJS) {
    return current.toJS();
  } else if (current) {
    return current;
  } else {
    return;
  }

};

const _updateScratchAppItem = function updateScratchAppItem(newData) {
  let appData;
  const previous = _getCurrentScratchAppItem();

  if (!previous) {
    const withDefaults = $.extend(true,{}, _scratchAppItemDefaults, newData);

    appData = Immutable.fromJS(withDefaults);
  } else {
    appData = previous.mergeDeep(newData);
  }
  _scratchAppItemVersions.push(appData);
};

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

const _getCurrentScratchFirstSaveData = function getCurrentScratchFirstSaveData(toJS){
  const current = _scratchFirstSaveDataVersions[_scratchFirstSaveDataVersions.length -1];

  if (current && toJS) {
    return current.toJS();
  } else if (current) {
    return current;
  } else {
    return;
  }

};

const _updateScratchFirstSaveData = function updateScratchFirstSaveData(newData) {
  let appData;
  const previous = _getCurrentScratchFirstSaveData();

  if (!previous) {
    const withDefaults = $.extend(true,{}, _scratchFirstSaveDataDefaults, newData);

    appData = Immutable.fromJS(withDefaults);
  } else {
    appData = previous.mergeDeep(newData);
  }
  _scratchFirstSaveDataVersions.push(appData);
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
      if (payload.appItem) {
        _updateScratchAppItem(payload.appItem);
      }
      if (payload.firstSaveData) {
        _updateScratchFirstSaveData(payload.firstSaveData);
      }
      console.log(_getCurrentScratchAppData(true),_getCurrentScratchAppItem(true),_getCurrentScratchFirstSaveData(true));
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
