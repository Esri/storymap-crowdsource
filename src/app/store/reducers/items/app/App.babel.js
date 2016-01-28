import { combineReducers } from 'lib/redux/index';
import lang from 'dojo/_base/lang';
import data from './data/Data';

const defaultItem = {
  extent: '-125,-40,70,70',
  title: '',
  tags: ['Story Map,Story Maps,Crowdsource'],
  type: 'Web Mapping Application',
  typeKeywords: ['Story Map','Story Maps','Crowdsource','StoryMap-Crowdsource','JavaScript','Map','Mapping Site','Online Map','Ready To Use','selfConfigured','Web Map']
};

export const item = function (state = defaultItem, action) {
  switch (action.type) {
    case 'UPDATE_ITEM_APP_ITEM':
      return lang.extend({},state,action.parameters);
    default:
      return state;
  }
};

export const appCombined = combineReducers({
  data,
  item
});

export const app = function(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_APP_ITEM_FROM_PORTAL':
      return lang.extend({},state,action.response);
    default:
      return appCombined(state, action);
  }
};

export default app;
