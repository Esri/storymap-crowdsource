import AppStore from 'babel/store/AppStore';
import {
  AUTHENTICATE_USER,
  USER_SIGN_OUT
} from 'babel/constants/actionsTypes/User';

const dispatch = AppStore.dispatch;

export const authenticateUser = function (user) {
  return {
    type: AUTHENTICATE_USER,
    user
  };
};

export const signOutUser = function () {
  return {
    type: USER_SIGN_OUT
  };
};

export const boundActions = {
  authenticateUser: (user) => dispatch(authenticateUser(user)),
  signOutUser: () => dispatch(signOutUser())
};

export default boundActions;
