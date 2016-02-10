import AppStore from 'babel/store/AppStore';
import {
  AUTHENTICATE_USER,
  USER_START_LOGIN,
  USER_FINISH_LOGIN,
  USER_SIGN_OUT
} from 'babel/constants/actionsTypes/User';

const dispatch = AppStore.dispatch;

export const authenticateUser = function (user) {
  return {
    type: AUTHENTICATE_USER,
    user
  };
};

export const loginOAuthStart = function (service) {
  return {
    type: USER_START_LOGIN,
    method: 'oauth',
    service: service
  };
};

export const loginOAuthFinish = function () {
  return {
    type: USER_FINISH_LOGIN
  };
};

export const signOutUser = function () {
  return {
    type: USER_SIGN_OUT
  };
};

export const boundActions = {
  authenticateUser: (user) => dispatch(authenticateUser(user)),
  loginOAuthStart: (service) => dispatch(loginOAuthStart(service)),
  loginOAuthFinish: (service) => dispatch(loginOAuthFinish(service)),
  signOutUser: () => dispatch(signOutUser())
};

export default boundActions;
