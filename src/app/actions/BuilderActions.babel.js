// import $ from 'jquery';
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

window.lang = lang;

export const BuilderActions = {

  updateAppData: function authorization(keyString,value) {
    const data = {};

    lang.setObject(keyString,value,data);

    AppDispatcher.dispatch({
      type: ActionTypes.app.UPDATE_APP_DATA,
      data
    });
  }

};
export default BuilderActions;
