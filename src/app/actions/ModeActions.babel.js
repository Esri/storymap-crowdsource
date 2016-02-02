import AppStore from 'babel/store/AppStore';
import { UPDATE_MODE } from 'babel/constants/actionsTypes/Mode';

const dispatch = AppStore.dispatch;

export const updateMode = function (mode) {
  return {
    type: UPDATE_MODE,
    mode
  };
};

export const boundActions = {
  updateMode: (mode) => dispatch(updateMode(mode))
};

export default boundActions;
