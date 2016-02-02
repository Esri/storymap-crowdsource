import $ from 'jquery';
import { combineReducers } from 'redux';
import {
  UPDATE_ITEM_WEBMAP_ITEM,
  UPDATE_ITEM_WEBMAP_ITEM_TITLE
} from 'babel/constants/actionsTypes/Items';

const defaultItem = {
  extent: '-125,-40,70,70',
  title: '',
  tags: ['Story Map,Story Maps,Crowdsource'],
  type: 'Web Map',
  typeKeywords: ['Story Map','Story Maps','Crowdsource','StoryMap-Crowdsource-Webmap','Web Map']
};

// Webmap JSON
const defaultData = {
  operationalLayers: [],
  basemap: {
		baseMapLayers: [{
			id: 'World_Light_Gray_Base_7270',
			opacity: 1,
			visibility: true,
			url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer'
		}, {
			id: 'World_Light_Gray_Reference_6243',
			isReference: true,
			opacity: 1,
			visibility: true,
			url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer'
		}],
		title: "Light Gray Canvas"
	},
  version: '2.3'
};

export const data = function (state = defaultData, action) {
  switch (action.type) {
    case 'UPDATE_ITEM_WEBMAP_DATA':
      return $.extend(true,{},state,action.data);
    default:
      return state;
  }
};

export const item = function (state = defaultItem, action) {
  switch (action.type) {
    case UPDATE_ITEM_WEBMAP_ITEM:
      return $.extend(true,{},state,action.parameters);
    case UPDATE_ITEM_WEBMAP_ITEM_TITLE:
      return $.extend(true,{},state,{title: action.title});
    default:
      return state;
  }
};

export const webmap = combineReducers({
  data,
  item
});

export default webmap;
