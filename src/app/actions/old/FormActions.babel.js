import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

export const MapActions = {

  formCreated: function formCreated(formId) {
    if (formId && typeof formId === 'string') {
      AppDispatcher.dispatch({
        type: ActionTypes.forms.FORM_CREATED,
        formId
      });
    }
  },

  formCompleted: function formCompleted(formId) {
    if (formId && typeof formId === 'string') {
      AppDispatcher.dispatch({
        type: ActionTypes.forms.FORM_COMPLETED,
        formId
      });
    }
  },

  validationFinished: function validationFinished(formId,node,valid) {
    if (formId && typeof formId === 'string' && node) {
      AppDispatcher.dispatch({
        type: ActionTypes.forms.VALIDATION_FINISHED,
        formId,
        node,
        valid
      });
    }

  },

  validationStarted: function validationStarted(formId,node) {
    if (formId && typeof formId === 'string' && node) {
      AppDispatcher.dispatch({
        type: ActionTypes.forms.VALIDATION_STARTED,
        formId,
        node
      });
    }
  }

};
export default MapActions;
