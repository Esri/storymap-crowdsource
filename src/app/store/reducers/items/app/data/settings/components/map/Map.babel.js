import { combineReducers } from 'lib/redux/index';
import lang from 'dojo/_base/lang';

const defaultCrowdsourceLayer = {
  id: 'crowdsource-layer-1453838538759'
};

const defaultWebmapOptions = {
  ignorePopups: true,
  mapOptions: {}
};

export const crowdsourceLayer = function (state = defaultCrowdsourceLayer, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER':
      return lang.extend({},state,action.options);
    default:
      return state;
  }
};

export const webmap = function (state = '', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_WEBMAP':
      return action.webmap;
    default:
      return state;
  }
};

export const webmapOptions = function (state = defaultWebmapOptions, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_WEBMAP_OPTIONS':
      return lang.extend({},state,action.options);
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
