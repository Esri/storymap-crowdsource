import AppStore from 'babel/store/AppStore';
import { RECEIVE_APP_ITEM } from 'babel/constants/actionsTypes/Arcgis';

const dispatch = AppStore.dispatch;

export const receiveAppItem = function (response) {
  return {
    type: RECEIVE_APP_ITEM,
    response
  };
};

export const boundActions = {
  receiveAppItem: (response) => dispatch(receiveAppItem(response))
};

export default boundActions;
