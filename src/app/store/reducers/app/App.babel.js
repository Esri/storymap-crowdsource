import { combineReducers } from 'redux';
import { DISPLAY_MAIN_ERROR } from 'babel/constants/actionsTypes/App';

export const mainError = function (state = false, action) {
  switch (action.type) {
    case DISPLAY_MAIN_ERROR:
      return action.message;
    default:
      return state;
  }
};

export const app = combineReducers({
  mainError
});

export default app;
