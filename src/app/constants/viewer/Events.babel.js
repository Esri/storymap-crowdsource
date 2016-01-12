import keyMirror from 'babel/utils/helper/objects/KeyMirror';

const appState = keyMirror({
  LAYOUT_STATE: null,
  LOAD_STATE: null,
  VIEW_STATE: null,
  CONTRIBUTE: null
},'lower-dashed');

const common = keyMirror({
  CHANGE: null
},'lower-dashed');

const forms = keyMirror({
  VALIDATION_EVENT: null
},'lower-dashed');

export const Events = {
  appState,
  common,
  forms
};
export default Events;
