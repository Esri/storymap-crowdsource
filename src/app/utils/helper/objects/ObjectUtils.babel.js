import KeyMirror from 'babel/utils/helper/objects/KeyMirror';

export const clean = function clean(obj,deleteEmptyKeys) {
  for (let key in obj) {
    if (typeof obj[key] === 'object'
        && obj[key] !== null
        && !(obj[key] instanceof Array)
        && !(obj[key] instanceof String)
        && !(obj[key] instanceof Number)) {

        clean(obj[key]);
        continue;
    }

    switch (typeof obj[key]) {
      case 'boolean':
        if (deleteEmptyKeys) {
          delete obj[key];
        } else {
          obj[key] = false;
        }
        break;
      case 'string':
        if (deleteEmptyKeys) {
          delete obj[key];
        } else {
          obj[key] = '';
        }
        break;
      case 'number':
        if (deleteEmptyKeys) {
          delete obj[key];
        } else {
          obj[key] = 0;
        }
        break;
      default:
        obj[key] = [];
    }
  }

  return obj;
};

export const getDescendentProperty = function getDescendentProperty(obj, str) {
  // Get Object Properties Using Dot Notation String
  return str.split('.').reduce((o, x) => {
    return o[x];
  }, obj);
};

export default {
  clean,
  getDescendentProperty,
  KeyMirror
};
