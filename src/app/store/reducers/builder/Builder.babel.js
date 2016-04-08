import { combineReducers } from 'redux';
import {
  CHANGE_BUIDER_DIALOG,
  UPDATE_BUILDER_SAVE_STATUS
} from 'babel/constants/actionsTypes/Builder';

const activeDialog = function(state = '', action) {
  switch (action.type) {
    case CHANGE_BUIDER_DIALOG:
      return action.dialog;
    default:
      return state;
  }
};

const saving = function(state = false, action) {
  switch (action.type) {
    case UPDATE_BUILDER_SAVE_STATUS:
      return action.saving;
    default:
      return state;
  }
};

export const builder = combineReducers({
  activeDialog,
  saving
});

export default builder;
