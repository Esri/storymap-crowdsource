import $ from 'jquery';
import { combineReducers } from 'redux';
import {
  UPDATE_SETTINGS_CONTRIBUTE_PARTICIPATION_ALLOWED,
  UPDATE_SETTINGS_CONTRIBUTE_LOGIN_OPTIONS,
  UPDATE_SETTINGS_CONTRIBUTE_TERMS_AND_CONDITIONS
} from 'babel/constants/actionsTypes/Settings';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';

const defaultTitle = builderText ? builderText.contribute.defaultTitle : '';
const defaultTermsAndCondtions = builderText ? builderText.contribute.defaultForm.termsAndConditions.legal : '';

const defaultLoginOptions = {
  arcgis: true,
  facebook: true,
  google: true,
  guest: true
};

export const title = function (state = defaultTitle, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_CONTRIBUTE_TITLE':
      return action.title;
    default:
      return state;
  }
};

export const participationAllowed = function (state = true, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_CONTRIBUTE_PARTICIPATION_ALLOWED:
      return action.allowed;
    default:
      return state;
  }
};

export const loginOptions = function (state = defaultLoginOptions, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_CONTRIBUTE_LOGIN_OPTIONS:
      return $.extend(true,{},state,action.options);
    default:
      return state;
  }
};

export const termsAndConditions = function (state = defaultTermsAndCondtions, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_CONTRIBUTE_TERMS_AND_CONDITIONS:
      return action.terms;
    default:
      return state;
  }
};

export const contribute = combineReducers({
  title,
  participationAllowed,
  loginOptions,
  termsAndConditions
});

export default contribute;
