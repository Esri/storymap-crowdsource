import keyMirror from 'babel/utils/helper/objects/KeyMirror';

const names = keyMirror({
  GALLERY: null,
  INTRO: null,
  MAP: null
},'lower-dashed');

export const Components = {
  names
};
export default Components;
