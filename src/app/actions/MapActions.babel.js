import AppStore from 'babel/store/AppStore';
import {
  UPDATE_MAP_REFERENCES,
  UPDATE_MAP_FEATURES_IN_EXTENT,
  UPDATE_MAP_SELECTED_FEATURES
} from 'babel/constants/actionsTypes/Map';

const dispatch = AppStore.dispatch;

export const updateMapReferences = function (references) {
  return {
    type: UPDATE_MAP_REFERENCES,
    references
  };
};

export const updateFeaturesInExtent = function (features) {
  return {
    type: UPDATE_MAP_FEATURES_IN_EXTENT,
    features
  };
};

export const selectFeature = function (feature) {
  return {
    type: UPDATE_MAP_SELECTED_FEATURES,
    feature
  };
};

export const boundActions = {
  updateMapReferences: (references) => dispatch(updateMapReferences(references)),
  updateFeaturesInExtent: (features) => dispatch(updateFeaturesInExtent(features)),
  selectFeature: (features) => dispatch(selectFeature(features))
};

export default boundActions;
