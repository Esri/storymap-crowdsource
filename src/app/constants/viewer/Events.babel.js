import keyMirror from 'babel/utils/helper/objects/KeyMirror';

const appState = keyMirror({
  LAYOUT_STATE: null,
  LOAD_STATE: null,
  VIEW_STATE: null
},'lower-dashed');

const common = keyMirror({
  CHANGE: null
},'lower-dashed');

export const Events = {
  appState,
  common
};
export default Events;
