import $ from 'jquery';
import { UPDATE_MODE } from 'babel/constants/actionsTypes/Mode';

export const mode = function (state = {}, action) {
  switch (action.type) {
    case UPDATE_MODE:
      return $.extend(true,{},state,action.mode);
    default:
      return state;
  }
};

export default mode;
