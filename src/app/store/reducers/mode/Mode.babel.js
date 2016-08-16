import $ from 'jquery';
import { UPDATE_MODE } from 'babel/constants/actionsTypes/Mode';

const defaultMode = {
  isDev: window.app.version.search('dev') === 0
};

export const mode = function (state = defaultMode, action) {
  switch (action.type) {
    case UPDATE_MODE:
      return $.extend(true,{},state,action.mode);
    default:
      return state;
  }
};

export default mode;
