import $ from 'jquery';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

export const MapActions = {

  receiveFeatures: function(options) {

    let features = options.features;
    const isArray = $.isArray(features);

    if (!isArray) {
      features = [];
    }

    AppDispatcher.dispatch({
      type: ActionTypes.map.RECEIVE_FEATURES,
      features
    });

  },

  receiveFieldDefinitions: function receiveFieldDefinitions(fields) {
    if ($.isArray(fields)) {
      AppDispatcher.dispatch({
        type: ActionTypes.map.RECEIVE_FIELD_DEFINITIONS,
        fields
      });
    }
  }

};
export default MapActions;
