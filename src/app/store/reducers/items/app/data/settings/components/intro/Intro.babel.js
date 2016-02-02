import $ from 'jquery';
import { combineReducers } from 'redux';
import Helper from 'babel/utils/helper/Helper';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';
import {
  UPDATE_SETTINGS_INTRO_TITLE,
  UPDATE_SETTINGS_INTRO_SUBTITLE
} from 'babel/constants/actionsTypes/Settings';

const defaultSubtitle = builderText ? builderText.appDataPlaceholderText.intro.subtitle : '';

const defaultBackground = {
  type: 'photo',
  source: 'resources/images/splash/splash' + Helper.mathUtils.getRandomIntInclusive(1,12) + '.jpg'
};

export const title = function (state = '', action) {
  switch (action.type) {
    case UPDATE_SETTINGS_INTRO_TITLE:
      return action.title;
    default:
      return state;
  }
};

export const subtitle = function (state = defaultSubtitle, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_INTRO_SUBTITLE:
      return action.subtitle;
    default:
      return state;
  }
};

export const background = function (state = defaultBackground, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_HEADER_BACKGROUND':
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
