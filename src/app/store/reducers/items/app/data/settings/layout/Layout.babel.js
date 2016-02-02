import { combineReducers } from 'redux';

const defaultFont = "DEFAULT_FONT_CSS_APPENDED_HERE";
const defaultStyle = "DEFAULT_LAYOUT_CSS_APPENDED_HERE";
const defaultTheme = "DEFAULT_THEME_CSS_APPENDED_HERE";

export const id = function (state = 'stacked', action) {
  switch (action.type) {
    case 'UPDATE_LAYOUT_ID':
      return action.id;
    default:
      return state;
  }
};

export const font = function (state = defaultFont, action) {
  switch (action.type) {
    case 'UPDATE_LAYOUT_FONT':
      return action.id;
    default:
      return state;
  }
};

export const style = function (state = defaultStyle, action) {
  switch (action.type) {
    case 'UPDATE_LAYOUT_STYLE':
      return action.id;
    default:
      return state;
  }
};

export const theme = function (state = defaultTheme, action) {
  switch (action.type) {
    case 'UPDATE_LAYOUT_THEME':
      return action.id;
    default:
      return state;
  }
};

export const layout = combineReducers({
  id,
  font,
  style,
  theme
});

export default layout;
