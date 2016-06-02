import $ from 'jquery';
import crowdsourceLayer from './crowdsourceLayer/CrowdsourceLayer';
import { combineReducers } from 'redux';
import {
  // UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER,
  UPDATE_SETTINGS_MAP_WEBMAP_ID
} from 'babel/constants/actionsTypes/Settings';

const defaultWebmapOptions = {
  ignorePopups: true,
  usePopupManager: false,
  mapOptions: {}
};

export const webmap = function (state = '', action) {
  switch (action.type) {
    case UPDATE_SETTINGS_MAP_WEBMAP_ID:
      return action.webmap;
    default:
      return state;
  }
};

export const webmapOptions = function (state = defaultWebmapOptions, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_WEBMAP_OPTIONS':
      return $.extend(true,{},state,action.options);
    default:
      return state;
  }
};

export const map = combineReducers({
  crowdsourceLayer,
  webmap,
  webmapOptions
});

export default map;
