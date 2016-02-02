import $ from 'jquery';
import { combineReducers } from 'redux';
import {
  UPDATE_ITEM_FEATURE_SERVICE_ITEM,
  UPDATE_ITEM_FEATURE_SERVICE_ITEM_TITLE
} from 'babel/constants/actionsTypes/Items';

const defaultItem = {
  extent: '-125,-40,70,70',
  title: '',
  tags: ['Story Map,Story Maps,Crowdsource'],
  type: 'Web Map',
  typeKeywords: ['Story Map','Story Maps','Crowdsource','StoryMap-Crowdsource-Layer','Feature Service']
};

export const item = function (state = defaultItem, action) {
  switch (action.type) {
    case UPDATE_ITEM_FEATURE_SERVICE_ITEM:
      return $.extend(true,{},state,action.parameters);
    case UPDATE_ITEM_FEATURE_SERVICE_ITEM_TITLE:
      return $.extend(true,{},state,{title: action.title});
    default:
      return state;
  }
};

export const featureService = combineReducers({
  item
});

export default featureService;
