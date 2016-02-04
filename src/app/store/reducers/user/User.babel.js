import $ from 'jquery';
import {
  AUTHENTICATE_USER,
  USER_SIGN_OUT
} from 'babel/constants/actionsTypes/User';

const defaultUser = {
  authenticated: false,
  editor: false,
  publisher: false
};

export const user = function(state = defaultUser, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return $.extend(true,{},state,{
        authenticated: true
      }, action.user);
    case USER_SIGN_OUT:
      return defaultUser;
    default:
      return state;
  }
};

export default user;
