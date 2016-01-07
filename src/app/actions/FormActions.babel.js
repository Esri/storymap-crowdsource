import $ from 'jquery';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

export const MapActions = {

  validationFinished: function(node,valid) {

    AppDispatcher.dispatch({
      type: ActionTypes.forms.VALIDATION_FINISHED,
      node,
      valid
    });

  }

};
export default MapActions;
