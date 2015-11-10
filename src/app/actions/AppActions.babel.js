import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import Logger from 'babel/utils/logging/Logger';

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
