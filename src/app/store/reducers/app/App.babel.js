import $ from 'jquery';
import { combineReducers } from 'redux';
import map from './map/Map';
import layout from './layout/Layout';
import portal from './portal/Portal';
import {
  DISPLAY_MAIN_ERROR,
  APP_COMPONTENT_LOADED,
  UPDATE_APP_CONTRIBUTE_STATE,
  APP_NOTIFICATIONS_ADD,
  APP_NOTIFICATIONS_REMOVE
} from 'babel/constants/actionsTypes/App';
import {
  RECEIVE_APP_ITEM
} from 'babel/constants/actionsTypes/Arcgis';

const defaultLoading = {
  data: false,
  map: false
};

const defaultContributing = {
  active: false,
  saving: false,
  graphic: false,
  view: 'login'
};

export const mainError = function (state = false, action) {
  switch (action.type) {
    case DISPLAY_MAIN_ERROR:
      return action.message;
    default:
      return state;
  }
};

export const notifications = function (state = [], action) {
  switch (action.type) {
    case APP_NOTIFICATIONS_ADD:
      return [].concat(action.notifications).reduce((prev,current) => {
        if (prev.filter((fC) => {
            return fC.id === current.id;
          }).length === 0) {

          return prev.concat(current);
        }
        return prev;
      },state);
    case APP_NOTIFICATIONS_REMOVE:
      return state.reduce((prev,current) => {
        if ([].concat(action.notifications).filter((fC) => {
            return fC.id === current.id;
          }).length === 0) {

          return prev.concat(current);
        }
        return prev;
      },[]);
    default:
      return state;
  }
};

export const loading = function (state = defaultLoading, action) {
  switch (action.type) {
    case RECEIVE_APP_ITEM:
      return $.extend(true,{},state,{data: true});
    case APP_COMPONTENT_LOADED:
      const loadedComponents = {};

      loadedComponents[action.component] = true;
      return $.extend(true,{},state,loadedComponents);
    default:
      return state;
  }
};

export const contributing = function (state = defaultContributing, action) {
  switch (action.type) {
    case UPDATE_APP_CONTRIBUTE_STATE:
      return $.extend(true,{},state,action.options);
    default:
      return state;
  }
};

export const app = combineReducers({
  contributing,
  map,
  mainError,
  notifications,
  loading,
  layout,
  portal
});

export default app;
