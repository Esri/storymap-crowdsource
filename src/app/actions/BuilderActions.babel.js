import AppStore from 'babel/store/AppStore';
import {
  BUILDER_ADD_APP_ITEM_ATTACHMENT,
  BUILDER_REMOVE_APP_ITEM_ATTACHMENT,
  UPDATE_BUILDER_APP_SHARE,
  UPDATE_BUILDER_APP_SHARE_STATUS,
  CHANGE_BUIDER_DIALOG,
  UPDATE_BUILDER_SAVE_STATUS
} from 'babel/constants/actionsTypes/Builder';

const dispatch = AppStore.dispatch;

export const addAppItemAttatchment = function(data) {
  return {
    type: BUILDER_ADD_APP_ITEM_ATTACHMENT,
    data
  };
};

export const removeAppItemAttatchment = function(id) {
  return {
    type: BUILDER_REMOVE_APP_ITEM_ATTACHMENT,
    id
  };
};

export const updateShare = function (sharing) {
  return {
    type: UPDATE_BUILDER_APP_SHARE,
    sharing
  };
};

export const updateSharingStatus = function (sharing) {
  return {
    type: UPDATE_BUILDER_APP_SHARE_STATUS,
    sharing
  };
};

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
  addAppItemAttatchment: (data) => dispatch(addAppItemAttatchment(data)),
  removeAppItemAttatchment: (id) => dispatch(removeAppItemAttatchment(id)),
  updateShare: (sharing) => dispatch(updateShare(sharing)),
  updateSharingStatus: (sharing) => dispatch(updateSharingStatus(sharing)),
  changeDialog: (dialog) => dispatch(changeDialog(dialog)),
  updateSaveStatus: (saving) => dispatch(updateSaveStatus(saving))
};

export default boundActions;
