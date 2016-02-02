import $ from 'jquery';
import { combineReducers } from 'redux';
import data from './data/Data';
import {
  UPDATE_ITEM_APP_ITEM,
  UPDATE_ITEM_APP_ITEM_TITLE
} from 'babel/constants/actionsTypes/Items';

const defaultItem = {
  extent: '-125,-40,70,70',
  ownerFolder: false,
  title: '',
  tags: ['Story Map,Story Maps,Crowdsource'],
  type: 'Web Mapping Application',
  typeKeywords: ['Story Map','Story Maps','Crowdsource','StoryMap-Crowdsource','JavaScript','Map','Mapping Site','Online Map','Ready To Use','selfConfigured','Web Map']
};

export const item = function (state = defaultItem, action) {
  switch (action.type) {
    case UPDATE_ITEM_APP_ITEM:
      return $.extend(true,{},state,action.parameters);
    case UPDATE_ITEM_APP_ITEM_TITLE:
      return $.extend(true,{},state,{title: action.title});
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
      return $.extend(true,{},state,action.response);
    default:
      return appCombined(state, action);
  }
};

export default app;
