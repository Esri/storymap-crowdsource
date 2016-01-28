import { combineReducers } from 'lib/redux/index';
import lang from 'dojo/_base/lang';
import Helper from 'babel/utils/helper/Helper';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';

const defaultSubtitle = builderText ? builderText.appDataPlaceholderText.intro.subtitle : '';

const defaultBackground = {
  type: 'photo',
  source: 'resources/images/splash/splash' + Helper.mathUtils.getRandomIntInclusive(1,12) + '.jpg'
};

export const title = function (state = '', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_INTRO_TITLE':
      return action.title;
    default:
      return state;
  }
};

export const subtitle = function (state = defaultSubtitle, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_INTRO_SUBTITLE':
      return action.title;
    default:
      return state;
  }
};

export const background = function (state = defaultBackground, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_HEADER_BACKGROUND':
      return lang.extend({},state,action.background);
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
