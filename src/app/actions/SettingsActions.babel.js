import AppStore from 'babel/store/AppStore';
import {
  UPDATE_SETTINGS_OAUTH,
  UPDATE_SETTINGS_INTRO_TITLE,
  UPDATE_SETTINGS_INTRO_SUBTITLE,
  UPDATE_SETTINGS_HEADER_TITLE,
  UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER,
  UPDATE_SETTINGS_MAP_WEBMAP_ID,
  UPDATE_LAYOUT_ID
} from 'babel/constants/actionsTypes/Settings';

const dispatch = AppStore.dispatch;

// OAuth
export const updateOAuthSettings = function (options) {
  return {
    type: UPDATE_SETTINGS_OAUTH,
    options
  };
};

// Components

// Intro Components
export const updateIntroTitle = function (title) {
  return {
    type: UPDATE_SETTINGS_INTRO_TITLE,
    title
  };
};

export const updateIntroSubtitle = function (subtitle) {
  return {
    type: UPDATE_SETTINGS_INTRO_SUBTITLE,
    subtitle
  };
};

// Header Components
export const updateHeaderTitle = function (title) {
  return {
    type: UPDATE_SETTINGS_HEADER_TITLE,
    title
  };
};

// Map Components
export const updateMapCrowdsourceLayer = function (layer) {
  return {
    type: UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER,
    layer
  };
};

export const updateMapWebmapId = function (webmap) {
  return {
    type: UPDATE_SETTINGS_MAP_WEBMAP_ID,
    webmap
  };
};

// Layout Actions
export const updateLayoutId = function (id) {
  return {
    type: UPDATE_LAYOUT_ID,
    id
  };
};

export const boundActions = {
  updateOAuthSettings: (options) => dispatch(updateOAuthSettings(options)),
  updateIntroTitle: (title) => dispatch(updateIntroTitle(title)),
  updateIntroSubtitle: (subtitle) => dispatch(updateIntroSubtitle(subtitle)),
  updateHeaderTitle: (title) => dispatch(updateHeaderTitle(title)),
  updateMapCrowdsourceLayer: (updateMapWebmapId) => dispatch(updateMapCrowdsourceLayer(updateMapWebmapId)),
  updateMapWebmapId: (webmap) => dispatch(updateMapWebmapId(webmap)),
  updateLayoutId: (id) => dispatch(updateLayoutId(id))
};

export default boundActions;
