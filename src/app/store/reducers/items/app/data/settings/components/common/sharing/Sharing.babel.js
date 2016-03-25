import $ from 'jquery';
import { combineReducers } from 'redux';
import {
  UPDATE_SETTINGS_COMMON_SHARING_TWITTER
} from 'babel/constants/actionsTypes/Component';

const defaultServices = {
  facebook: true,
  twitter: true,
  link: true
};

const defaultTwitter = {
  text: '',
  hashtags: 'storymaps',
  twitterHandle: ''
};

export const services = function (state = defaultServices, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_COMMON_SHARING_SERVICES':
      // TODO check available services and that they are boolean
      return $.extend(true,{},state,action.services);
    default:
      return state;
  }
};

export const twitter = function (state = defaultTwitter, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_COMMON_SHARING_TWITTER:
      // TODO check available services and that they are boolean
      return $.extend(true,{},state,action.services);
    default:
      return state;
  }
};

export const sharing = combineReducers({
  services,
  twitter
});

export default sharing;
