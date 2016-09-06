import $ from 'jquery';
import { combineReducers } from 'redux';
import settings from './settings/Settings';

const defaultProperties = {
  version: window.app.version
};

export const properties = function (state = defaultProperties, action) {
  switch (action.type) {
    case 'UPDATE_ITEM_APP_DATA_PROPERTIES':
      return $.extend(true,{},state,action.properties);
    default:
      return state;
  }
};

export const _ssl = function (state = false, action) {
  switch (action.type) {
    case 'UPDATE_ITEM_APP_DATA_SSL':
      return action.ssl;
    default:
      return state;
  }
};

export const source = function (state = 'StoryMap_Crowdsource_Builder', action) {
  switch (action.type) {
    case 'UPDATE_ITEM_APP_DATA_SSL':
      return action.ssl;
    default:
      return state;
  }
};

export const values = combineReducers({
  settings,
  properties
});

export const data = combineReducers({
  _ssl,
  source,
  values
});

export default data;
