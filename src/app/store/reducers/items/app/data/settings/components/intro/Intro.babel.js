import $ from 'jquery';
import { combineReducers } from 'redux';
import Helper from 'babel/utils/helper/Helper';

import {
  UPDATE_SETTINGS_INTRO_TITLE,
  UPDATE_SETTINGS_INTRO_SUBTITLE,
  UPDATE_SETTINGS_INTRO_BACKGROUND
} from 'babel/constants/actionsTypes/Settings';

const defaultBackground = {
  type: 'photo',
  source: 'resources/images/splash/splash' + Helper.mathUtils.getRandomIntInclusive(1,17) + '.jpg'
};

export const title = function (state = '', action) {
  switch (action.type) {
    case UPDATE_SETTINGS_INTRO_TITLE:
      return action.title;
    default:
      return state;
  }
};

export const subtitle = function (state = '', action) {
  switch (action.type) {
    case UPDATE_SETTINGS_INTRO_SUBTITLE:
      return action.subtitle;
    default:
      return state;
  }
};

export const background = function (state = defaultBackground, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_INTRO_BACKGROUND:
      return $.extend(true,{},state,action.background);
    default:
      return state;
  }
};

export const intro = combineReducers({
  background,
  title,
  subtitle
});

export default intro;
