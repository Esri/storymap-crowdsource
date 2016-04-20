import AppStore from 'babel/store/AppStore';
import {
  DISPLAY_MAIN_ERROR,
  APP_COMPONTENT_LOADED,
  APP_LAYOUT_CHANGE_COMPONENT_VISIBILITY,
  APP_LAYOUT_SHOW_COMPONENT,
  APP_LAYOUT_HIDE_COMPONENT,
  APP_LAYOUT_HIDE_COMPONENT_BY_STRING_MATCH,
  APP_LAYOUT_TOGGLE_COMPONENT,
  UPDATE_APP_CONTRIBUTE_STATE,
  APP_NOTIFICATIONS_ADD,
  APP_NOTIFICATIONS_REMOVE
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

export const changeComponentsVisibility = function (changes) {
  return {
    type: APP_LAYOUT_CHANGE_COMPONENT_VISIBILITY,
    show: changes.show,
    hide: changes.hide
  };
};

export const showComponent = function (component) {
  return {
    type: APP_LAYOUT_SHOW_COMPONENT,
    component
  };
};

export const hideComponent = function (component) {
  return {
    type: APP_LAYOUT_HIDE_COMPONENT,
    component
  };
};

export const hideComponentByStringMatch = function (component) {
  return {
    type: APP_LAYOUT_HIDE_COMPONENT_BY_STRING_MATCH,
    component
  };
};

export const toggleComponent = function (component) {
  return {
    type: APP_LAYOUT_TOGGLE_COMPONENT,
    component
  };
};

export const updateContributeState = function (options) {
  return {
    type: UPDATE_APP_CONTRIBUTE_STATE,
    options
  };
};

export const addNotifications = function (notifications) {
  return {
    type: APP_NOTIFICATIONS_ADD,
    notifications
  };
};

export const removeNotifications = function (notifications) {
  return {
    type: APP_NOTIFICATIONS_REMOVE,
    notifications
  };
};

export const boundActions = {
  displayMainError: (message) => dispatch(displayMainError(message)),
  componentLoaded: (component) => dispatch(componentLoaded(component)),
  changeComponentsVisibility: (changes) => dispatch(changeComponentsVisibility(changes)),
  showComponent: (component) => dispatch(showComponent(component)),
  hideComponent: (component) => dispatch(hideComponent(component)),
  hideComponentByStringMatch: (component) => dispatch(hideComponentByStringMatch(component)),
  toggleComponent: (component) => dispatch(toggleComponent(component)),
  updateContributeState: (options) => dispatch(updateContributeState(options)),
  addNotifications: (notifications) => dispatch(addNotifications(notifications)),
  removeNotifications: (notifications) => dispatch(removeNotifications(notifications))
};

window.boundTest = boundActions.toggleComponent;

export default boundActions;
