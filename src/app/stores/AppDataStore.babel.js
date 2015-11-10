import $ from 'jquery';
import Immutable from 'lib/immutable/dist/immutable';
import Store from 'babel/stores/Store';
import Helper from 'babel/utils/helper/Helper';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

let _originialItem;
let _originialItemData;
let _appDataVersions = [];
const _appDataDefaults = window.app.cfg.defaults.appData  || {};

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
      let defaultsClone = $.extend(true,{}, _appDataDefaults);

      return Helper.objectUtils.clean(defaultsClone);
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
