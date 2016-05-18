import { combineReducers } from 'redux';
import {
  APP_LAYOUT_SHOW_COMPONENT,
  APP_LAYOUT_HIDE_COMPONENT,
  APP_LAYOUT_HIDE_COMPONENT_BY_STRING_MATCH,
  APP_LAYOUT_TOGGLE_COMPONENT,
  APP_LAYOUT_CHANGE_COMPONENT_VISIBILITY
} from 'babel/constants/actionsTypes/App';

const defaultFontCss = "DEFAULT_FONT_CSS_APPENDED_HERE";

export const fontCss = function (state = defaultFontCss, action) {
  switch (action.type) {
    case 'UPDATE_APP_LAYOUT_FONT_CSS':
      return action.fontCss;
    default:
      return state;
  }
};

export const visibleComponents = function (state = [], action) {
  switch (action.type) {
    case APP_LAYOUT_SHOW_COMPONENT:
      return [].concat(action.component).reduce((prev,current) => {
        if (prev.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },state);
    case APP_LAYOUT_HIDE_COMPONENT:
      return state.reduce((prev,current) => {
        if ([].concat(action.component).indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },[]);
    case APP_LAYOUT_HIDE_COMPONENT_BY_STRING_MATCH:
      const newState = state.reduce((prev,current) => {
        if ([].concat(action.component).filter((fC) => {
          return current.search(fC) >= 0;
        }).length === 0) {
          return prev.concat(current);
        }
        return prev;
      },[]);

      return newState;
    case APP_LAYOUT_TOGGLE_COMPONENT:
      Object.freeze(state);
      const removedState = state.reduce((prev,current) => {
        if ([].concat(action.component).indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },[]);

      return [].concat(action.component).reduce((prev,current) => {
        if (prev.indexOf(current) < 0 && state.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },removedState);
    case APP_LAYOUT_CHANGE_COMPONENT_VISIBILITY:
      let shows = [].concat(action.show);
      let hides = [].concat(action.hide);
      const added = shows.reduce((prev,current) => {
        if (prev.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },state);

      return added.reduce((prev,current) => {
        if (hides.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },[]);
    default:
      return state;
  }
};

export const layout = combineReducers({
  fontCss,
  visibleComponents
});

export default layout;
