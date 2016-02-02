import $ from 'jquery';
import { UPDATE_CONFIG } from 'babel/constants/actionsTypes/Config';

export const mode = function (state = false, action) {
  switch (action.type) {
    case UPDATE_CONFIG:
      return $.extend(true,{},state,action.config);
    default:
      return state;
  }
};

export default mode;
