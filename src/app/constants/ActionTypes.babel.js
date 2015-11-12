import keyMirror from 'babel/utils/helper/objects/KeyMirror';

const app = keyMirror({
  COMPONENT_LOADED: null,
  SET_LAYOUT: null,
  SET_VIEW: null
},'lower-dashed');

const arcgis = keyMirror({
  RECEIVE_APP_ITEM: null
},'lower-dashed');

const map = keyMirror({
  RECEIVE_FEATURES: null
},'lower-dashed');

export const ActionTypes = {
  app,
  arcgis,
  map
};
export default ActionTypes;
