import AppStore from 'babel/store/AppStore';
import {
  UPDATE_ITEM_APP_ITEM,
  UPDATE_ITEM_APP_ITEM_TITLE,
  UPDATE_ITEM_APP_ITEM_SUBTITLE,
  UPDATE_ITEM_WEBMAP_ITEM,
  UPDATE_ITEM_WEBMAP_ITEM_TITLE,
  UPDATE_ITEM_WEBMAP_DATA,
  UPDATE_ITEM_WEBMAP_CROWDSOURCE_LAYER,
  UPDATE_ITEM_FEATURE_SERVICE_ITEM,
  UPDATE_ITEM_FEATURE_SERVICE_ITEM_TITLE,
  UPDATE_ITEM_FEATURE_SERVICE_DEFINITION,
  UPDATE_ITEM_FEATURE_SERVICE_LAYER_DEFINITION
} from 'babel/constants/actionsTypes/Items';

const dispatch = AppStore.dispatch;

// App Items
export const updateAppItem = function (parameters) {
  return {
    type: UPDATE_ITEM_APP_ITEM,
    parameters
  };
};

export const updateAppItemTitle = function (title) {
  return {
    type: UPDATE_ITEM_APP_ITEM_TITLE,
    title
  };
};

export const updateAppItemSubtitle = function (subtitle) {
  return {
    type: UPDATE_ITEM_APP_ITEM_SUBTITLE,
    subtitle
  };
};

// Webmap Items
export const updateWebmapItem = function (parameters) {
  return {
    type: UPDATE_ITEM_WEBMAP_ITEM,
    parameters
  };
};

export const updateWebmapItemTitle = function (title) {
  return {
    type: UPDATE_ITEM_WEBMAP_ITEM_TITLE,
    title
  };
};

export const updateWebmapData = function (data) {
  return {
    type: UPDATE_ITEM_WEBMAP_DATA,
    data
  };
};

export const updateWebmapCrowdsourceLayer = function (layer) {
  return {
    type: UPDATE_ITEM_WEBMAP_CROWDSOURCE_LAYER,
    layer
  };
};

// Feature Service Items
export const updateFeatureServiceItem = function (parameters) {
  return {
    type: UPDATE_ITEM_FEATURE_SERVICE_ITEM,
    parameters
  };
};

export const updateFeatureServiceItemTitle = function (title) {
  return {
    type: UPDATE_ITEM_FEATURE_SERVICE_ITEM_TITLE,
    title
  };
};

export const updateFeatureServiceDefinition = function (parameters) {
  return {
    type: UPDATE_ITEM_FEATURE_SERVICE_DEFINITION,
    parameters
  };
};

export const updateFeatureServiceLayerDefinition = function (parameters) {
  return {
    type: UPDATE_ITEM_FEATURE_SERVICE_LAYER_DEFINITION,
    parameters
  };
};

export const boundActions = {
  updateAppItem: (parameters) => dispatch(updateAppItem(parameters)),
  updateAppItemTitle: (title) => dispatch(updateAppItemTitle(title)),
  updateAppItemSubtitle: (subtitle) => dispatch(updateAppItemSubtitle(subtitle)),
  updateWebmapItem: (parameters) => dispatch(updateWebmapItem(parameters)),
  updateWebmapItemTitle: (title) => dispatch(updateWebmapItemTitle(title)),
  updateWebmapData: (data) => dispatch(updateWebmapData(data)),
  updateWebmapCrowdsourceLayer: (layer) => dispatch(updateWebmapCrowdsourceLayer(layer)),
  updateFeatureServiceItem: (parameters) => dispatch(updateFeatureServiceItem(parameters)),
  updateFeatureServiceItemTitle: (title) => dispatch(updateFeatureServiceItemTitle(title)),
  updateFeatureServiceDefinition: (parameters) => dispatch(updateFeatureServiceDefinition(parameters)),
  updateFeatureServiceLayerDefinition: (parameters) => dispatch(updateFeatureServiceLayerDefinition(parameters))
};

export default boundActions;
