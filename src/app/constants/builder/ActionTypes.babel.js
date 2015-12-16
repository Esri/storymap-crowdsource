import keyMirror from 'babel/utils/helper/objects/KeyMirror';

const app = keyMirror({
  UPDATE_APP_DATA: null
},'lower-dashed');

export const ActionTypes = {
  app
};
export default ActionTypes;
