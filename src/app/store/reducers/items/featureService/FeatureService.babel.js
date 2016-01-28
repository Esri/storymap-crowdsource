import { combineReducers } from 'lib/redux/index';
import lang from 'dojo/_base/lang';

const defaultItem = {
  extent: '-125,-40,70,70',
  title: '',
  tags: ['Story Map,Story Maps,Crowdsource'],
  type: 'Web Map',
  typeKeywords: ['Story Map','Story Maps','Crowdsource','StoryMap-Crowdsource-Layer','Feature Service']
};

export const item = function (state = defaultItem, action) {
  switch (action.type) {
    case 'UPDATE_ITEM_FEATURE_SERVICE_ITEM':
      return lang.extend({},state,action.parameters);
    default:
      return state;
  }
};

export const featureService = combineReducers({
  item
});

export default featureService;
