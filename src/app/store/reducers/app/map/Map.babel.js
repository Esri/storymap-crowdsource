import $ from 'jquery';
import { combineReducers } from 'redux';
import {
  UPDATE_MAP_REFERENCES,
  UPDATE_MAP_FEATURES_IN_EXTENT,
  UPDATE_MAP_SELECTED_FEATURES_IDS
} from 'babel/constants/actionsTypes/Map';

const layer = function(state = false, action) {
  switch (action.type) {
    case UPDATE_MAP_REFERENCES:
      if (action.references.layer) {
        return action.references.layer;
      } else {
        return state;
      }
      return action.dialog;
    default:
      return state;
  }
};

const originalObject = function(state = false, action) {
  switch (action.type) {
    case UPDATE_MAP_REFERENCES:
      if (action.references.map) {
        return action.references.map;
      } else {
        return state;
      }
      return action.dialog;
    default:
      return state;
  }
};

const featuresInExtent = function(state = [], action) {
  switch (action.type) {
    case UPDATE_MAP_FEATURES_IN_EXTENT:
      return action.features;
    default:
      return state;
  }
};

const selectedIds = function(state = [], action) {
  switch (action.type) {
    case UPDATE_MAP_SELECTED_FEATURES_IDS:
      if (action.features === false) {
        return [];
      } else if ($.isArray(action.features)) {
        return action.features;
      } else {
        return [action.features];
      }
      break;
    default:
      return state;
  }
};

export const map = combineReducers({
  layer,
  originalObject,
  featuresInExtent,
  selectedIds
});

export default map;
