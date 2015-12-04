import $ from 'jquery';
import Immutable from 'lib/immutable/dist/immutable';
import Store from 'babel/stores/Store';
// import Logger from 'babel/utils/logging/Logger';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

// const _logger = new Logger({source: 'AppDataStore'});

// const _onError = function onError(err) {
//   _logger.logMessage({
//     type: 'error',
//     error: err
//   });
// };

let _originialItem;
let _originialItemData;
let _appDataVersions = [];
let _appDataDefaults = false;
let _loadingErrors = false;

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
    if (_originialItem) {
      return {
        item: _originialItem.toJS(),
        itemData: _originialItemData.toJS()
      };
    } else {
      return false;
    }

  }

  get appData() {
    if (!_loadingErrors) {
      const current = _getCurrentAppData(true);

      if (current) {
        return current;
      } else {
        return _appDataDefaults;
      }
    } else {
      return false;
    }
  }

};

export const AppDataStore = new _AppDataStoreClass();

AppDataStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.arcgis.RECEIVE_APP_ITEM:
      if (payload.response.defaultData) {
        _updateAppData(payload.response.defaultData);
      }
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
    case ActionTypes.app.AUTHORIZATION:
      AppDataStore.emitChange();
      break;
    case ActionTypes.app.LOADING_ERROR:
      _loadingErrors = true;
      AppDataStore.emitChange();
      break;
  }

});

export default AppDataStore;
