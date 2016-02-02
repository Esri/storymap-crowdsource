import AppStore from 'babel/store/AppStore';
import { SET_PORTAL_INSTANCE } from 'babel/constants/actionsTypes/Portal';

const dispatch = AppStore.dispatch;

export const setPortalInstance = function (portal) {
  return {
    type: SET_PORTAL_INSTANCE,
    portal
  };
};

export const boundActions = {
  setPortalInstance: (portal) => dispatch(setPortalInstance(portal))
};

export default boundActions;
