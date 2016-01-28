import { combineReducers } from 'lib/redux/index';
import lang from 'dojo/_base/lang';

const defaultLogo = {
  source: 'resources/images/logo/esri-logo-reversed.svg',
  link: 'http://www.esri.com/'
};

export const title = function (state = '', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_HEADER_TITLE':
      return action.title;
    default:
      return state;
  }
};

export const logo = function (state = defaultLogo, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_HEADER_LOGO':
      return lang.extend({},state,action.logo);
    default:
      return state;
  }
};

export const header = combineReducers({
  logo,
  title
});

export default header;
