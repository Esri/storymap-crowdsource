import AppStore from 'babel/store/AppStore';
import {
  RECEIVE_APP_ITEM,
  RECEIVE_SCRATCH_CREATION_APP_ITEM,
  RECEIVE_WEBMAP_ITEM
} from 'babel/constants/actionsTypes/Arcgis';

const dispatch = AppStore.dispatch;

export const receiveAppItem = function (response) {
  return {
    type: RECEIVE_APP_ITEM,
    response
  };
};

export const receiveScratchCreationAppItem = function (response) {
  return {
    type: RECEIVE_SCRATCH_CREATION_APP_ITEM,
    response
  };
};

export const receiveWebmapItem = function (response) {
  return {
    type: RECEIVE_WEBMAP_ITEM,
    response
  };
};

export const boundActions = {
  receiveAppItem: (response) => dispatch(receiveAppItem(response)),
  receiveScratchCreationAppItem: (response) => dispatch(receiveScratchCreationAppItem(response)),
  receiveWebmapItem: (response) => dispatch(receiveWebmapItem(response))
};

export default boundActions;
