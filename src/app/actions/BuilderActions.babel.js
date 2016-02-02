import AppStore from 'babel/store/AppStore';
import { CHANGE_BUIDER_DIALOG } from 'babel/constants/actionsTypes/Builder';

const dispatch = AppStore.dispatch;

export const changeDialog = function (dialog) {
  return {
    type: CHANGE_BUIDER_DIALOG,
    dialog
  };
};

export const boundActions = {
  changeDialog: (dialog) => dispatch(changeDialog(dialog))
};

export default boundActions;
