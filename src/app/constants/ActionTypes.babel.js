import keyMirror from 'babel/utils/helper/objects/KeyMirror';

const arcgis = keyMirror({
  RECEIVE_APP_ITEM: null
},'lower-dashed');

const map = keyMirror({
  RECEIVE_FEATURES: null
},'lower-dashed');

export const ActionTypes = {
  arcgis,
  map
};
export default ActionTypes;
