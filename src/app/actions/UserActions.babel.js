import AppStore from 'babel/store/AppStore';
import { AUTHENTICATE_USER } from 'babel/constants/actionsTypes/User';

const dispatch = AppStore.dispatch;

export const authenticateUser = function (user) {
  return {
    type: AUTHENTICATE_USER,
    user
  };
};

export const boundActions = {
  authenticateUser: (user) => dispatch(authenticateUser(user))
};

export default boundActions;
