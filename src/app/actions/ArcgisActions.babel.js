import $ from 'jquery';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

export const ArcgisActions = {

  receiveAppItem: function(arg) {

    const defaults = {
      item: false,
      itemData: false
    };
    const response = $.extend(true, {}, defaults, arg);

    AppDispatcher.dispatch({
      type: ActionTypes.arcgis.RECEIVE_APP_ITEM,
      response
    });

  }

};
export default ArcgisActions;
