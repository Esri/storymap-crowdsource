import $ from 'jquery';
import { combineReducers } from 'redux';
import {
  DISPLAY_MAIN_ERROR
} from 'babel/constants/actionsTypes/App';
import {
  RECEIVE_APP_ITEM
} from 'babel/constants/actionsTypes/Arcgis';

const defaultLoading = {
  data: false,
  map: false
};

export const mainError = function (state = false, action) {
  switch (action.type) {
    case DISPLAY_MAIN_ERROR:
      return action.message;
    default:
      return state;
  }
};

export const loading = function (state = defaultLoading, action) {
  switch (action.type) {
    case RECEIVE_APP_ITEM:
      return $.extend(true,{},state,{data: true});
    default:
      return state;
  }
};

export const app = combineReducers({
  mainError,
  loading
});

export default app;
