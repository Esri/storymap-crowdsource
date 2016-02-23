import fields from './fields/Fields';
import { combineReducers } from 'redux';

export const id = function (state = '', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_ID':
      return action.id;
    default:
      return state;
  }
};

export const attributePath = function (state = 'attributes', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_ATTRIBUTE_PATH':
      return action.path;
    default:
      return state;
  }
};

export const idField = function (state = 'FID', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_ID_FIELD':
      return action.field;
    default:
      return state;
  }
};

export const primaryField = function (state = 'Name', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_PRIMARY_FIELD':
      return action.field;
    default:
      return state;
  }
};

export const secondaryField = function (state = 'LocationName', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_SECONDARY_FIELD':
      return action.field;
    default:
      return state;
  }
};

export const crowdsourceLayer = combineReducers({
  id,
  attributePath,
  idField,
  primaryField,
  secondaryField,
  fields
});

export default crowdsourceLayer;
