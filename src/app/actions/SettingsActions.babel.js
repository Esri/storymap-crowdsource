import AppStore from 'babel/store/AppStore';
import {
  UPDATE_SETTINGS_INTRO_TITLE,
  UPDATE_SETTINGS_INTRO_SUBTITLE,
  UPDATE_SETTINGS_HEADER_TITLE
} from 'babel/constants/actionsTypes/Settings';

const dispatch = AppStore.dispatch;

// Components

// Intro Components
export const updateIntroTitle = function (title) {
  return {
    type: UPDATE_SETTINGS_INTRO_TITLE,
    title
  };
};

export const updateIntroSubtitle = function (subtitle) {
  return {
    type: UPDATE_SETTINGS_INTRO_SUBTITLE,
    subtitle
  };
};

// Header Components
export const updateHeaderTitle = function (title) {
  return {
    type: UPDATE_SETTINGS_HEADER_TITLE,
    title
  };
};

export const boundActions = {
  updateIntroTitle: (title) => dispatch(updateIntroTitle(title)),
  updateIntroSubtitle: (subtitle) => dispatch(updateIntroSubtitle(subtitle)),
  updateHeaderTitle: (title) => dispatch(updateHeaderTitle(title))
};

export default boundActions;
