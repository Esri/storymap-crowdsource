import $ from 'jquery';
import { combineReducers } from 'redux';
import {
  UPDATE_SETTINGS_HEADER_TITLE,
  UPDATE_SETTINGS_HEADER_LOGO_TYPE,
  UPDATE_SETTINGS_HEADER_LOGO_URL,
  UPDATE_SETTINGS_HEADER_LOGO_LINK
} from 'babel/constants/actionsTypes/Settings';

const defaultLogo = {
  type: 'esri',
  source: 'resources/images/logo/esri-logo-reversed.svg',
  link: 'http://www.esri.com/'
};

export const title = function (state = '', action) {
  switch (action.type) {
    case UPDATE_SETTINGS_HEADER_TITLE:
      return action.title;
    default:
      return state;
  }
};

export const logo = function (state = defaultLogo, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_HEADER_LOGO_TYPE:
      return $.extend(true,{},state,{type: action.logoType});
    case UPDATE_SETTINGS_HEADER_LOGO_URL:
      return $.extend(true,{},state,{source: action.url});
    case UPDATE_SETTINGS_HEADER_LOGO_LINK:
      return $.extend(true,{},state,{link: action.link});
    default:
      return state;
  }
};

export const header = combineReducers({
  logo,
  title
});

export default header;
