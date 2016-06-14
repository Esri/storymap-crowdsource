import fields from './fields/Fields';
import { combineReducers } from 'redux';
import {
  UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VISIBLE_FEATURES_QUERY_ADD,
  UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VISIBLE_FEATURES_QUERY_REMOVE
} from 'babel/constants/actionsTypes/Settings';

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

export const hiddenField = function (state = 'Hidden', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_HIDDEN_FIELD':
      return action.field;
    default:
      return state;
  }
};

export const vettedField = function (state = 'Vetted', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VETTED_FIELD':
      return action.field;
    default:
      return state;
  }
};

export const visibleFeaturesQuery = function (state = ['vetted:new','vetted:approved'], action) {
  switch (action.type) {
    case UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VISIBLE_FEATURES_QUERY_ADD:
      return [].concat(action.query).reduce((prev,current) => {
        if (prev.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },state);
    case UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VISIBLE_FEATURES_QUERY_REMOVE:
      return state.reduce((prev,current) => {
        if ([].concat(action.query).indexOf(current) < 0 && prev.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },[]);
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_VISIBLE_FEATURES_QUERY':
      let adds = [].concat(action.add);
      let removes = [].concat(action.remove);
      const added = adds.reduce((prev,current) => {
        if (prev.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },state);

      return added.reduce((prev,current) => {
        if (removes.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },[]);
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
  hiddenField,
  vettedField,
  fields,
  visibleFeaturesQuery
});

export default crowdsourceLayer;
