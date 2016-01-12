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

const contribute = keyMirror({
  START: null
},'lower-dashed');

const forms = keyMirror({
  FORM_CREATED: null,
  FORM_COMPLETED: null,
  VALIDATION_FINISHED: null,
  VALIDATION_STARTED: null
},'lower-dashed');

const map = keyMirror({
  RECEIVE_FEATURES: null,
  RECEIVE_FIELD_DEFINITIONS: null
},'lower-dashed');

export const ActionTypes = {
  app,
  arcgis,
  contribute,
  forms,
  map
};
export default ActionTypes;
