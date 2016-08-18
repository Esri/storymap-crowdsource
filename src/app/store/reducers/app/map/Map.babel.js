import { combineReducers } from 'redux';
import {
  UPDATE_MAP_REFERENCES,
  UPDATE_MAP_FEATURES_IN_EXTENT,
  UPDATE_MAP_SELECTED_FEATURES
} from 'babel/constants/actionsTypes/Map';

const itemInfo = function(state = false, action) {
  switch (action.type) {
    case UPDATE_MAP_REFERENCES:
      if (action.references.itemInfo) {
        return action.references.itemInfo;
      } else {
        return state;
      }
      break;
    default:
      return state;
  }
};

const layer = function(state = false, action) {
  switch (action.type) {
    case UPDATE_MAP_REFERENCES:
      if (action.references.layer) {
        return action.references.layer;
      } else {
        return state;
      }
      break;
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
      break;
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

const selectedFeatureId = function(state = false, action) {
  switch (action.type) {
    case UPDATE_MAP_SELECTED_FEATURES:
      return action.id;
    default:
      return state;
  }
};

export const map = combineReducers({
  itemInfo,
  layer,
  originalObject,
  featuresInExtent,
  selectedFeatureId
});

export default map;
