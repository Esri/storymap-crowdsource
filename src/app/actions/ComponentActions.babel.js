import AppStore from 'babel/store/AppStore';
import { UPDATE_SETTINGS_COMMON_SHARING_TWITTER } from 'babel/constants/actionsTypes/Component';

const dispatch = AppStore.dispatch;

export const updateCommonSharingTwitter = function (settings) {
  return {
    type: UPDATE_SETTINGS_COMMON_SHARING_TWITTER,
    settings
  };
};

export const boundActions = {
  updateCommonSharingTwitter: (settings) => dispatch(updateCommonSharingTwitter(settings))
};

export default boundActions;
