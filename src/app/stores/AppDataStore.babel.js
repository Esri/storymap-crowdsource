import $ from 'jquery';
import Immutable from 'lib/immutable/dist/immutable';
import Store from 'babel/stores/Store';
import Logger from 'babel/utils/logging/Logger';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import builderOptionsConfig from 'mode!isBuilder?babel/builderOptionsConfig';

const _logger = new Logger({source: 'AppDataStore'});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

let _originialItem;
let _originialItemData;
let _appDataVersions = [];
let _appDataDefaults = false;

if (window.app.mode.fromScratch && builderOptionsConfig && builderOptionsConfig.builderDefaults) {
  _appDataDefaults = builderOptionsConfig.builderDefaults.defaults.appData;
} else if (window.app.mode.fromScratch) {
  _onError('The default configuration is missing from the codebase.');
}

const _getCurrentAppData = function getCurrentAppData(toJS){
  const current = _appDataVersions[_appDataVersions.length -1];

  if (current && toJS) {
    return current.toJS();
  } else if (current) {
    return current;
  } else {
    return;
  }

};

const _updateAppData = function updateAppData(newData) {
  let appData;
  const previous = _getCurrentAppData();

  if (!previous) {
    const withDefaults = $.extend(true,{}, _appDataDefaults, newData);

    appData = Immutable.fromJS(withDefaults);
  } else {
    appData = previous.mergeDeep(newData);
  }
  _appDataVersions.push(appData);
};

const _AppDataStoreClass = class AppDataStoreClass extends Store {

  constructor() {
    super();
  }

  get originalItem() {
    return {
      item: _originialItem,
      itemData: _originialItemData
    };
  }

  get appData() {
    const current = _getCurrentAppData(true);

    if (current) {
      return current;
    } else {
      return _appDataDefaults;
    }
  }

};

export const AppDataStore = new _AppDataStoreClass();

AppDataStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.arcgis.RECEIVE_APP_ITEM:
      if (payload.response && payload.response.item) {
        _originialItem = Immutable.fromJS(payload.response.item);
      }
      if (payload.response && payload.response.itemData) {
        const appData = payload.response.itemData;

        _originialItemData = Immutable.fromJS(appData);
        _updateAppData(appData);

      }
      AppDataStore.emitChange();
      break;
  }

});

export default AppDataStore;
