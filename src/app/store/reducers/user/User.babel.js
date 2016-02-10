import $ from 'jquery';
import {
  AUTHENTICATE_USER,
  USER_START_LOGIN,
  USER_FINISH_LOGIN,
  USER_SIGN_OUT
} from 'babel/constants/actionsTypes/User';

const defaultUser = {
  authenticated: false,
  pendingLogin: false,
  editor: false,
  publisher: false,
  contributor: false
};

export const user = function(state = defaultUser, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return $.extend(true,{},state,{
        authenticated: true
      }, action.user);
    case USER_START_LOGIN:
      if (action.method === 'oauth') {
        return $.extend(true,{},state,{
          pendingLogin: {
            method: action.method,
            service: action.service
          }
        });
      } else {
        return state;
      }
      break;
    case USER_FINISH_LOGIN:
      return $.extend(true,{},state,{
        pendingLogin: false
      });
    case USER_SIGN_OUT:
      return defaultUser;
    default:
      return state;
  }
};

export default user;
