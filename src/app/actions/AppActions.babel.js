import AppStore from 'babel/store/AppStore';
import {
  DISPLAY_MAIN_ERROR,
  APP_COMPONTENT_LOADED,
  UPDATE_APP_LAYOUT_STATE,
  UPDATE_APP_CONTRIBUTE_STATE
} from 'babel/constants/actionsTypes/App';

const dispatch = AppStore.dispatch;

export const displayMainError = function (message) {
  return {
    type: DISPLAY_MAIN_ERROR,
    message
  };
};

export const componentLoaded = function (component) {
  return {
    type: APP_COMPONTENT_LOADED,
    component
  };
};

export const updateLayout = function (options) {
  return {
    type: UPDATE_APP_LAYOUT_STATE,
    options
  };
};

export const updateContributeState = function (options) {
  return {
    type: UPDATE_APP_CONTRIBUTE_STATE,
    options
  };
};

export const boundActions = {
  displayMainError: (message) => dispatch(displayMainError(message)),
  componentLoaded: (component) => dispatch(componentLoaded(component)),
  updateLayout: (options) => dispatch(updateLayout(options)),
  updateContributeState: (options) => dispatch(updateContributeState(options))
};

export default boundActions;
