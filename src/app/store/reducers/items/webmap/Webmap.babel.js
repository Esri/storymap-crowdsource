import $ from 'jquery';
import { combineReducers } from 'redux';
import {
  UPDATE_ITEM_WEBMAP_ITEM,
  UPDATE_ITEM_WEBMAP_ITEM_TITLE,
  UPDATE_ITEM_WEBMAP_DATA,
  UPDATE_ITEM_WEBMAP_CROWDSOURCE_LAYER
} from 'babel/constants/actionsTypes/Items';
import {
  RECEIVE_WEBMAP_ITEM
} from 'babel/constants/actionsTypes/Arcgis';

const defaultItem = {
  extent: '-125,-40,70,70',
  title: '',
  tags: ['Story Map','Story Maps','Crowdsource'],
  type: 'Web Map',
  typeKeywords: ['Story Map','Story Maps','Crowdsource','StoryMap-Crowdsource-Webmap','Web Map']
};

// Webmap JSON
const defaultData = {
  operationalLayers: [],
  baseMap: {
		baseMapLayers: [{
      id: 'VectorTile_4183',
      type: 'VectorTileLayer',
      layerType: 'VectorTileLayer',
      title: 'Light Gray Canvas',
      styleUrl: 'https://www.arcgis.com/sharing/rest/content/items/0e02e6f86d02455091796eaae811d9b5/resources/styles/root.json',
      visibility: true,
      opacity: 1
    }],
		title: 'Light Gray Canvas'
	},
  spatialReference: {
    wkid: 102100
  },
  version: '2.4'
};

export const data = function (state = defaultData, action) {
  switch (action.type) {
    case UPDATE_ITEM_WEBMAP_DATA:
      return $.extend(true,{},state,action.data);
    case UPDATE_ITEM_WEBMAP_CROWDSOURCE_LAYER:
      let index = state.operationalLayers.length;

      state.operationalLayers.forEach((current,i) => {
        if (current.id.match('crowdsource-layer')) {
          index = i;
        }
      });

      const operationalLayers = [
        ...state.operationalLayers.slice(0, index),
        $.extend(true,{},state.operationalLayers[index],action.layer),
        ...state.operationalLayers.slice(index + 1)
      ];

      return $.extend(true,{},state,{operationalLayers});
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

export const webmapCombined = combineReducers({
  data,
  item
});

export const webmap = function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_WEBMAP_ITEM:
      return $.extend(true,{},state,action.response);
    default:
      return webmapCombined(state, action);
  }
};

export default webmap;
