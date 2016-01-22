import $ from 'jquery';
import Immutable from 'lib/immutable/dist/immutable';
import Store from 'babel/stores/Store';
import lang from 'dojo/_base/lang';
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

  if (newData && newData.app && newData.app.data && newData.app.data.values && newData.app.data.values.settings && newData.app.data.values.settings.header) {
    $('title').text(newData.app.data.values.settings.header.title);
  }
};

const _AppDataStoreClass = class AppDataStoreClass extends Store {

  constructor() {
    super();

    window.app.data = this.appData;
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
      let appData = {};

      if (payload.response && payload.response.item) {
        _originialItem = Immutable.fromJS(payload.response.item);
        lang.setObject('app.item',payload.response.item,appData);
      }
      if (payload.response && payload.response.itemData) {
        _originialItemData = Immutable.fromJS(payload.response.itemData);
        lang.setObject('app.data',payload.response.itemData,appData);
      }
      _updateAppData(appData);
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
