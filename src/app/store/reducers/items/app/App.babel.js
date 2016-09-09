import $ from 'jquery';
import { combineReducers } from 'redux';
import data from './data/Data';
import {
  RECEIVE_APP_ITEM,
  RECEIVE_SCRATCH_CREATION_APP_ITEM
} from 'babel/constants/actionsTypes/Arcgis';
import {
  UPDATE_ITEM_APP_ITEM,
  UPDATE_ITEM_APP_ITEM_TITLE,
  UPDATE_ITEM_APP_ITEM_SUBTITLE
} from 'babel/constants/actionsTypes/Items';
import {
  UPDATE_LAYOUT_ID
} from 'babel/constants/actionsTypes/Settings';

const defaultItem = {
  extent: '-125,-40,70,70',
  title: '',
  tags: ['Story Map','Story Maps','Crowdsource'],
  type: 'Web Mapping Application',
  typeKeywords: ['Story Map','Story Maps','Crowdsource','StoryMapCrowdsource','layout-sidePanel','JavaScript','Map','Mapping Site','Online Map','Ready To Use','selfConfigured','Web Map']
};

export const item = function (state = defaultItem, action) {
  switch (action.type) {
    case UPDATE_ITEM_APP_ITEM:
      return $.extend(true,{},state,action.parameters);
    case UPDATE_ITEM_APP_ITEM_TITLE:
      return $.extend(true,{},state,{title: action.title});
    case UPDATE_ITEM_APP_ITEM_SUBTITLE:
      return $.extend(true,{},state,{snippet: action.subtitle});
    case UPDATE_LAYOUT_ID:
      let index = state.typeKeywords.length;

      state.typeKeywords.forEach((current,i) => {
        if (current.match('layout-')) {
          index = i;
        }
      });

      const typeKeywords = [
        ...state.typeKeywords.slice(0, index),
        'layout-' + action.id,
        ...state.typeKeywords.slice(index + 1)
      ];

      return $.extend(true,{},state,{typeKeywords});
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
    case RECEIVE_APP_ITEM:
      return $.extend(true,{},state,action.response);
    case RECEIVE_SCRATCH_CREATION_APP_ITEM:
      return $.extend(true,{},state,{
        item: action.response.item,
        data: {
          source: action.response.data.source,
          _ssl: action.response.data._ssl
        }
      });
    default:
      return appCombined(state, action);
  }
};

export default app;
