import AppStore from 'babel/store/AppStore';
import {
  UPDATE_SETTINGS_OAUTH,
  UPDATE_SETTINGS_COMMON_PARTICIPATE_SHORT,
  UPDATE_SETTINGS_COMMON_EXPLORE_TEXT,
  UPDATE_SETTINGS_COMMON_SHARING_SERVICES,
  UPDATE_SETTINGS_COMMON_SHARING_TWITTER,
  UPDATE_SETTINGS_CONTRIBUTE_PARTICIPATION_ALLOWED,
  UPDATE_SETTINGS_CONTRIBUTE_LOGIN_OPTIONS,
  UPDATE_SETTINGS_CONTRIBUTE_TERMS_AND_CONDITIONS,
  UPDATE_SETTINGS_INTRO_TITLE,
  UPDATE_SETTINGS_INTRO_SUBTITLE,
  UPDATE_SETTINGS_INTRO_BACKGROUND,
  UPDATE_SETTINGS_HEADER_TITLE,
  UPDATE_SETTINGS_HEADER_LOGO_TYPE,
  UPDATE_SETTINGS_HEADER_LOGO_URL,
  UPDATE_SETTINGS_HEADER_LOGO_LINK,
  UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_ID,
  UPDATE_SETTINGS_MAP_WEBMAP_ID,
  UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VISIBLE_FEATURES_QUERY_ADD,
  UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VISIBLE_FEATURES_QUERY_REMOVE,
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

// Common Components
export const updateCommonParticipateShort = function (text) {
  return {
    type: UPDATE_SETTINGS_COMMON_PARTICIPATE_SHORT,
    text
  };
};

export const updateCommonExploreText = function (text) {
  return {
    type: UPDATE_SETTINGS_COMMON_EXPLORE_TEXT,
    text
  };
};

export const updateCommonSharingServices = function (settings) {
  return {
    type: UPDATE_SETTINGS_COMMON_SHARING_SERVICES,
    settings
  };
};

export const updateCommonSharingTwitter = function (settings) {
  return {
    type: UPDATE_SETTINGS_COMMON_SHARING_TWITTER,
    settings
  };
};

// Contribute Component
export const changeParticipationAllowed = function (allowed) {
  return {
    type: UPDATE_SETTINGS_CONTRIBUTE_PARTICIPATION_ALLOWED,
    allowed
  };
};

export const changeParticipantLoginOptions = function (options) {
  return {
    type: UPDATE_SETTINGS_CONTRIBUTE_LOGIN_OPTIONS,
    options
  };
};

export const updateContributeTermsAndCondtions = function (terms) {
  return {
    type: UPDATE_SETTINGS_CONTRIBUTE_TERMS_AND_CONDITIONS,
    terms
  };
};

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

export const updateIntroBackground = function (background) {
  return {
    type: UPDATE_SETTINGS_INTRO_BACKGROUND,
    background
  };
};

// Header Components
export const updateHeaderTitle = function (title) {
  return {
    type: UPDATE_SETTINGS_HEADER_TITLE,
    title
  };
};

export const updateHeaderLogoType = function (logoType) {
  return {
    type: UPDATE_SETTINGS_HEADER_LOGO_TYPE,
    logoType
  };
};

export const updateHeaderLogoUrl = function (url) {
  return {
    type: UPDATE_SETTINGS_HEADER_LOGO_URL,
    url
  };
};

export const updateHeaderLogoLink = function (link) {
  return {
    type: UPDATE_SETTINGS_HEADER_LOGO_LINK,
    link
  };
};

// Map Components
export const updateMapCrowdsourceLayerId = function (id) {
  return {
    type: UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_ID,
    id
  };
};

export const updateMapWebmapId = function (webmap) {
  return {
    type: UPDATE_SETTINGS_MAP_WEBMAP_ID,
    webmap
  };
};

export const addVisibleFeatureQuery = function (query) {
  return {
    type: UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VISIBLE_FEATURES_QUERY_ADD,
    query
  };
};

export const removeVisibleFeatureQuery = function (query) {
  return {
    type: UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VISIBLE_FEATURES_QUERY_REMOVE,
    query
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
  updateCommonParticipateShort: (text) => dispatch(updateCommonParticipateShort(text)),
  updateCommonExploreText: (text) => dispatch(updateCommonExploreText(text)),
  updateCommonSharingServices: (settings) => dispatch(updateCommonSharingServices(settings)),
  updateCommonSharingTwitter: (settings) => dispatch(updateCommonSharingTwitter(settings)),
  changeParticipationAllowed: (allowed) => dispatch(changeParticipationAllowed(allowed)),
  changeParticipantLoginOptions: (options) => dispatch(changeParticipantLoginOptions(options)),
  updateContributeTermsAndCondtions: (terms) => dispatch(updateContributeTermsAndCondtions(terms)),
  updateIntroTitle: (title) => dispatch(updateIntroTitle(title)),
  updateIntroSubtitle: (subtitle) => dispatch(updateIntroSubtitle(subtitle)),
  updateIntroBackground: (background) => dispatch(updateIntroBackground(background)),
  updateHeaderTitle: (title) => dispatch(updateHeaderTitle(title)),
  updateHeaderLogoType: (logoType) => dispatch(updateHeaderLogoType(logoType)),
  updateHeaderLogoUrl: (url) => dispatch(updateHeaderLogoUrl(url)),
  updateHeaderLogoLink: (link) => dispatch(updateHeaderLogoLink(link)),
  updateMapCrowdsourceLayerId: (id) => dispatch(updateMapCrowdsourceLayerId(id)),
  updateMapWebmapId: (webmap) => dispatch(updateMapWebmapId(webmap)),
  addVisibleFeatureQuery: (query) => dispatch(addVisibleFeatureQuery(query)),
  removeVisibleFeatureQuery: (query) => dispatch(removeVisibleFeatureQuery(query)),
  updateLayoutId: (id) => dispatch(updateLayoutId(id))
};

export default boundActions;
