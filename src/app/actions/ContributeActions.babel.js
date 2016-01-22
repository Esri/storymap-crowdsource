import $ from 'jquery';
import lang from 'dojo/_base/lang';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

export const ContributeActions = {

  startContributing: function startContributing() {

    AppDispatcher.dispatch({
      type: ActionTypes.contribute.START
    });

  },

  save: function save() {
    AppDispatcher.dispatch({
      type: ActionTypes.contribute.SAVE
    });
  },

  updateContribution: function updateContribution(options) {
    let graphic = {};
    const defaults = {};
    const settings = $.extend(true,{},defaults,options);

    if (settings.value !== undefined && settings.fieldId) {

      const attributesPath = 'attributes.';
      const geometryPath = 'geometry';
      const fieldPath = attributesPath + settings.fieldId;

      if (settings.extras && settings.extras.dataType) {
        switch (settings.extras.dataType) {
          case 'photo':
            if (settings.value.optimized) {
              const value = {
                attachment: true,
                type: 'photo',
                source: settings.value.optimized
              };

              lang.setObject(fieldPath,value,graphic);
            }
            if (settings.value.thumbnail && settings.extras.storeAsThumbnail) {
              const value = {
                attachment: true,
                type: 'photo',
                source: settings.value.thumbnail
              };

              lang.setObject(attributesPath + settings.extras.storeAsThumbnail,value,graphic);
            }
            break;
          case 'location':
            if (settings.value.dataVal && settings.value.dataVal.name) {
              lang.setObject(fieldPath,settings.value.dataVal.name,graphic);
            }
            if (settings.extras.storeGeometry && settings.value.dataVal && settings.value.dataVal.geometry) {
              lang.setObject(geometryPath,settings.value.dataVal.geometry,graphic);
            }
            break;
        }
      } else if (settings.value && !settings.value.inputVal) {
        lang.setObject(fieldPath,settings.value,graphic);
      }

      AppDispatcher.dispatch({
        type: ActionTypes.contribute.UPDATE_CONTRIBUTION,
        graphic
      });

    }
  }

};
export default ContributeActions;
