import lang from 'dojo/_base/lang';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceBuilderAppConstants';

export const BuilderActions = {

  updateAppData: function updateAppData(keyString,value) {
    const appData = {};
    const appItem = {};
    const firstSaveData = {};

    switch (keyString) {
      case 'values.settings.intro.title':
        lang.setObject('values.settings.intro.title',value,appData);
        lang.setObject('values.settings.header.title',value,appData);
        lang.setObject('title',value,appItem);
        break;
      case 'WEBMAP_ITEM.title':
        lang.setObject('webmapName',value,firstSaveData);
        break;
      case 'LAYER_ITEM.title':
        lang.setObject('layerName',value,firstSaveData);
        break;
      case 'APP_ITEM.ownerFolder':
        const folder = value === 'false' ? '' : value;

        lang.setObject('ownerFolder',folder,appItem);
        lang.setObject('ownerFolder',folder,firstSaveData);
        break;
      default:
        lang.setObject(keyString,value,appData);
    }

    AppDispatcher.dispatch({
      type: ActionTypes.app.UPDATE_APP_DATA,
      appData,
      appItem,
      firstSaveData
    });
  },

  settingsNext: function settingsNext() {
    AppDispatcher.dispatch({
      type: ActionTypes.app.SETTINGS_NEXT
    });
  }

};
export default BuilderActions;
