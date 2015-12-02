import $ from 'jquery';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import Logger from 'babel/utils/logging/Logger';
import viewerText from 'i18n!translations/viewer/nls/template';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';

let _loadingErrors = viewerText.errors.loading;

if (builderText && builderText.errors && builderText.errors.loading) {
  $.extend(true,_loadingErrors,builderText.errors.loading);
}

const _logger = new Logger({source: 'AppActions'});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

export const AppActions = {

  componentLoaded: function componentLoaded(component) {

    if (typeof component === 'string') {
      AppDispatcher.dispatch({
        type: ActionTypes.app.COMPONENT_LOADED,
        component
      });
    } else {
      _onError('Component name must be a string');
    }

  },

  showLoadingError: function showLoadingError(error) {
    let message = '';

    if (_loadingErrors[error]) {
      message = _loadingErrors[error];
    } else {
      message = _loadingErrors.appLoadingFail;
    }

    AppDispatcher.dispatch({
      type: ActionTypes.app.LOADING_ERROR,
      message
    });

    _onError(message);
  },

  scriptsLoaded: function scriptsLoaded() {
    AppDispatcher.dispatch({
      type: ActionTypes.app.SCRIPTS_LOADED
    });
  },

  setView: function componentLoaded(component) {
    if (typeof component === 'string') {
      AppDispatcher.dispatch({
        type: ActionTypes.app.SET_VIEW,
        component
      });
    } else {
      _onError('Component name must be a string');
    }
  }

};
export default AppActions;
