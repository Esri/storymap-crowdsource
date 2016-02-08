import AppStore from 'babel/store/AppStore';
import {
  UPDATE_MAP_REFERENCES,
  UPDATE_MAP_FEATURES_IN_EXTENT
} from 'babel/constants/actionsTypes/Map';

const dispatch = AppStore.dispatch;

export const updateMapReferences = function (references) {
  return {
    type: UPDATE_MAP_REFERENCES,
    references
  };
};

export const featuresInExtent = function (features) {
  return {
    type: UPDATE_MAP_FEATURES_IN_EXTENT,
    features
  };
};

export const boundActions = {
  updateMapReferences: (references) => dispatch(updateMapReferences(references)),
  featuresInExtent: (features) => dispatch(featuresInExtent(features))
};

export default boundActions;
