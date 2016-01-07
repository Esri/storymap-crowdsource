import keyMirror from 'babel/utils/helper/objects/KeyMirror';

const app = keyMirror({
  AUTHORIZATION: null,
  COMPONENT_LOADED: null,
  LOADING_ERROR: null,
  SCRIPTS_LOADED: null,
  SET_LAYOUT: null,
  SET_VIEW: null
},'lower-dashed');

const arcgis = keyMirror({
  RECEIVE_APP_ITEM: null
},'lower-dashed');

const forms = keyMirror({
  VALIDATION_FINISHED: null
},'lower-dashed');

const map = keyMirror({
  RECEIVE_FEATURES: null
},'lower-dashed');

export const ActionTypes = {
  app,
  arcgis,
  forms,
  map
};
export default ActionTypes;
