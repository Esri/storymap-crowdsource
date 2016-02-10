import AppStore from 'babel/store/AppStore';
import {
  AUTHENTICATE_USER,
  USER_START_LOGIN,
  USER_SIGN_OUT
} from 'babel/constants/actionsTypes/User';

const dispatch = AppStore.dispatch;

export const authenticateUser = function (user) {
  return {
    type: AUTHENTICATE_USER,
    user
  };
};

export const loginOAuth = function (service) {
  return {
    type: USER_START_LOGIN,
    method: 'oauth',
    service: service
  };
};

export const signOutUser = function () {
  return {
    type: USER_SIGN_OUT
  };
};

export const boundActions = {
  authenticateUser: (user) => dispatch(authenticateUser(user)),
  loginOAuth: (service) => dispatch(loginOAuth(service)),
  signOutUser: () => dispatch(signOutUser())
};

export default boundActions;
