import $ from 'jquery';
import lang from 'dojo/_base/lang';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceBuilderAppConstants';
// import Logger from 'babel/utils/logging/Logger';
// import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';

// const _logger = new Logger({source: 'BuilderActions'});

// const _onError = function onError(err) {
//   _logger.logMessage({
//     type: 'error',
//     error: err
//   });
// };

export const BuilderActions = {

  updateAppData: function updateAppData(keyString,value) {
    const appData = {};

    lang.setObject(keyString,value,appData);

    AppDispatcher.dispatch({
      type: ActionTypes.app.UPDATE_APP_DATA,
      appData
    });
  },

  saveItemNames: function saveItemNames(options) {
    const defaults = {};
    const settings = $.extend(true, {}, defaults, options);
    const appData = {};
    const appItem = {};
    const firstSaveData = {};

    if (settings.appName) {
      lang.setObject('values.settings.intro.title',settings.appName,appData);
      lang.setObject('values.settings.header.title',settings.appName,appData);
      lang.setObject('title',settings.appName,appItem);
    }
    if (settings.layerName) {
      lang.setObject('layerName',settings.layerName,firstSaveData);
    }
    if (settings.folderId) {
      lang.setObject('ownerFolder',settings.folderId,appItem);
      lang.setObject('ownerFolder',settings.folderId,firstSaveData);
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
