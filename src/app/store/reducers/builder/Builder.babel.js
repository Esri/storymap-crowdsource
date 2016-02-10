import { combineReducers } from 'redux';
import { CHANGE_BUIDER_DIALOG } from 'babel/constants/actionsTypes/Builder';

const activeDialog = function(state = '', action) {
  switch (action.type) {
    case CHANGE_BUIDER_DIALOG:
      return action.dialog;
    default:
      return state;
  }
};

export const builder = combineReducers({
  activeDialog
});

export default builder;
