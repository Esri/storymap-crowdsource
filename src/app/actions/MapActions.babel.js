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

export const selectFeatures = function (features) {
  console.log(features);
  return {
    type: UPDATE_MAP_SELECTED_FEATURES,
    features
  };
};

export const boundActions = {
  updateMapReferences: (references) => dispatch(updateMapReferences(references)),
  updateFeaturesInExtent: (features) => dispatch(updateFeaturesInExtent(features)),
  selectFeatures: (features) => dispatch(selectFeatures(features))
};

export default boundActions;
