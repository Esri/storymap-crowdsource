import AppStore from 'babel/store/AppStore';
import {
  UPDATE_ITEM_APP_ITEM,
  UPDATE_ITEM_APP_ITEM_TITLE,
  UPDATE_ITEM_WEBMAP_ITEM,
  UPDATE_ITEM_WEBMAP_ITEM_TITLE,
  UPDATE_ITEM_FEATURE_SERVICE_ITEM,
  UPDATE_ITEM_FEATURE_SERVICE_ITEM_TITLE
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

export const boundActions = {
  updateAppItem: (parameters) => dispatch(updateAppItem(parameters)),
  updateAppItemTitle: (title) => dispatch(updateAppItemTitle(title)),
  updateWebmapItem: (parameters) => dispatch(updateWebmapItem(parameters)),
  updateWebmapItemTitle: (title) => dispatch(updateWebmapItemTitle(title)),
  updateFeatureServiceItem: (parameters) => dispatch(updateFeatureServiceItem(parameters)),
  updateFeatureServiceItemTitle: (title) => dispatch(updateFeatureServiceItemTitle(title))
};

export default boundActions;
