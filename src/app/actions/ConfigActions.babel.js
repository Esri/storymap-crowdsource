import AppStore from 'babel/store/AppStore';
import { UPDATE_CONFIG } from 'babel/constants/actionsTypes/Config';

const dispatch = AppStore.dispatch;

export const updateConfig = function (config) {
  return {
    type: UPDATE_CONFIG,
    config
  };
};

export const boundActions = {
  updateConfig: (config) => dispatch(updateConfig(config))
};

export default boundActions;
