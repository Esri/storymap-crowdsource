import { combineReducers } from 'redux';
import {
  BUILDER_ADD_APP_ITEM_ATTACHMENT,
  BUILDER_REMOVE_APP_ITEM_ATTACHMENT,
  CHANGE_BUIDER_DIALOG,
  UPDATE_BUILDER_SAVE_STATUS
} from 'babel/constants/actionsTypes/Builder';

const appItemAttatchments = function(state = [],action) {
  switch (action.type) {
    case BUILDER_ADD_APP_ITEM_ATTACHMENT:
      return [].concat(action.data).reduce((prev,current) => {
        if (prev.filter((fC) => {
            return current.id === fC.id;
          }).length > 0) {
          return prev;
        }
        return prev.concat(current);
      },state);
    case BUILDER_REMOVE_APP_ITEM_ATTACHMENT:
      return state.filter((current) => {
        return [].concat(action.id).indexOf(current.id) < 0;
      });
    default:
      return state;
  }
};

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
  appItemAttatchments,
  activeDialog,
  saving
});

export default builder;
