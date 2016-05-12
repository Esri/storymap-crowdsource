import $ from 'jquery';
import { combineReducers } from 'redux';
import components from './components/Components';
import layout from './layout/Layout';
import {
  UPDATE_SETTINGS_OAUTH
} from 'babel/constants/actionsTypes/Settings';

const defaultOAuth = {
  clientId: ''
};

export const oauth = function (state = defaultOAuth, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_OAUTH:
      return $.extend(true,{},state,action.options);
    default:
      return state;
  }
};

export const settings = combineReducers({
  components,
  layout,
  oauth
});

export default settings;
