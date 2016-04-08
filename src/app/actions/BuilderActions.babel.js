import AppStore from 'babel/store/AppStore';
import {
  CHANGE_BUIDER_DIALOG,
  UPDATE_BUILDER_SAVE_STATUS
} from 'babel/constants/actionsTypes/Builder';

const dispatch = AppStore.dispatch;

export const changeDialog = function (dialog) {
  return {
    type: CHANGE_BUIDER_DIALOG,
    dialog
  };
};

export const updateSaveStatus = function (saving) {
  return {
    type: UPDATE_BUILDER_SAVE_STATUS,
    saving
  };
};

export const boundActions = {
  changeDialog: (dialog) => dispatch(changeDialog(dialog)),
  updateSaveStatus: (saving) => dispatch(updateSaveStatus(saving))
};

export default boundActions;
