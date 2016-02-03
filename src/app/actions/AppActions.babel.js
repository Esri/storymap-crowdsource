import AppStore from 'babel/store/AppStore';
import { DISPLAY_MAIN_ERROR } from 'babel/constants/actionsTypes/App';

const dispatch = AppStore.dispatch;

export const displayMainError = function (message) {
  return {
    type: DISPLAY_MAIN_ERROR,
    message
  };
};

export const boundActions = {
  displayMainError: (message) => dispatch(displayMainError(message))
};

export default boundActions;
