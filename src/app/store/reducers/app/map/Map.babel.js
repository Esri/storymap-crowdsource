import { combineReducers } from 'redux';
import {
  UPDATE_MAP_REFERENCES,
  UPDATE_MAP_FEATURES_IN_EXTENT,
  UPDATE_MAP_SELECTED_FEATURES,
  UPDATE_MAP_HIGHLIGHTED_FEATURES,
  UPDATE_MAP_MOVING,
  UPDATE_MAP_ON_TOP
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

const clusterLayer = function(state = false, action) {
  switch (action.type) {
    case UPDATE_MAP_REFERENCES:
      if (action.references.clusterLayer) {
        return action.references.clusterLayer;
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

const highlightedFeatureId = function(state = false, action) {
  switch (action.type) {
    case UPDATE_MAP_HIGHLIGHTED_FEATURES:
      return action.id;
    case UPDATE_MAP_SELECTED_FEATURES:
      return false;
    default:
      return state;
  }
};

const mapMoving = function(state = false, action) {
  switch (action.type) {
    case UPDATE_MAP_MOVING:
      return action.moving ? true : false;
    default:
      return state;
  }
};

const forceToTop = function(state = false, action) {
  switch (action.type) {
    case UPDATE_MAP_ON_TOP:
      return action.showOnTop ? true : false;
    default:
      return state;
  }
};

export const map = combineReducers({
  itemInfo,
  clusterLayer,
  layer,
  originalObject,
  featuresInExtent,
  selectedFeatureId,
  highlightedFeatureId,
  mapMoving,
  forceToTop
});

export default map;
