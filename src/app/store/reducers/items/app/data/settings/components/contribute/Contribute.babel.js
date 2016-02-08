import { combineReducers } from 'redux';
import fields from './fields/Fields';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';

const defaultTitle = builderText ? builderText.contribute.defaultTitle : '';

export const title = function (state = defaultTitle, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_CONTRIBUTE_TITLE':
      return action.title;
    default:
      return state;
  }
};

export const contribute = combineReducers({
  title,
  fields
});

export default contribute;
