import { SET_PORTAL_INSTANCE } from 'babel/constants/actionsTypes/Portal';

export const portal = function(state = false, action) {
  switch (action.type) {
    case SET_PORTAL_INSTANCE:
      return action.portal;
    default:
      return state;
  }
};

export default portal;
