import { combineReducers } from 'lib/redux/index';
import lang from 'dojo/_base/lang';
import settings from './settings/Settings';

const defaultProperties = {
  version: window.app.version
};

export const properties = function (state = defaultProperties, action) {
  switch (action.type) {
    case 'UPDATE_ITEM_APP_DATA_PROPERTIES':
      return lang.extend({},state,action.properties);
    default:
      return state;
  }
};

export const data = combineReducers({
  settings,
  properties
});

export default data;
