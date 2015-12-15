import keyMirror from 'babel/utils/helper/objects/KeyMirror';

const appState = keyMirror({
  SETTINGS_VIEW: null
},'lower-dashed');

export const Events = {
  appState
};
export default Events;
