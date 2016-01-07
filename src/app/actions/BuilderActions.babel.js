import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import AppDataStore from 'babel/stores/AppDataStore';
import CrowdsourceBuilderAppStore from 'babel/stores/CrowdsourceBuilderAppStore';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import Validator from 'babel/utils/validations/Validator';
import {ActionTypes} from 'babel/constants/CrowdsourceBuilderAppConstants';

export const BuilderActions = {

  updateAppData: function updateAppData(keyString,value) {
    const fromScratch = window.app.mode.fromScratch;
    const currentData = CrowdsourceBuilderAppStore.scratchAppData || AppDataStore.appData;
    const newAppData = {};

    let dfd = false;

    switch (keyString) {
      case 'COMMON_layout.id':
        lang.setObject('app.data.values.layout.id',value,newAppData);
        // TODO change to default theme style
        break;
      case 'COMMON_settings.appName':
        dfd = new Deferred();
        const layerNameValidator = new Validator({
          validations: ['arcgisIsServiceName']
        });

        lang.setObject('app.data.values.settings.intro.title',value,newAppData);

        if (currentData.app.data.values.settings.intro.title === currentData.app.data.values.settings.header.title) {
          lang.setObject('app.data.values.settings.header.title',value,newAppData);
        }
        if (currentData.app.data.values.settings.intro.title === currentData.app.item.title) {
          lang.setObject('app.item.title',value,newAppData);
        }
        if (fromScratch && currentData.app.data.values.settings.intro.title === currentData.webmap.item.title) {
          lang.setObject('webmap.item.title',value,newAppData);
        }
        if (fromScratch) {
          layerNameValidator.validate(currentData.app.data.values.settings.intro.title).then((res) => {

            const getFormatedLayerName = function getFormatedLayerName() {
              layerNameValidator.validate(value).then((newRes) => {
                if (newRes.isValid) {
                  lang.setObject('layer.item.title',value,newAppData);
                } else if (!newRes.isValid && newRes.errors && newRes.errors[0] && newRes.errors[0].fixValue) {
                  lang.setObject('layer.item.title',newRes.errors[0].fixValue,newAppData);
                }
                dfd.resolve();
              },() => {
                dfd.resolve();
              });
            };

            let currentTitleToLayerName = currentData.app.data.values.settings.intro.title;

            if (res.isValid && currentTitleToLayerName === currentData.layer.item.title) {
              getFormatedLayerName();
            } else if (!res.isValid && res.errors && res.errors[0] && res.errors[0].fixValue && res.errors[0].fixValue === currentData.layer.item.title) {
              getFormatedLayerName();
            } else {
              dfd.resolve();
            }

          },() => {
            dfd.resolve();
          });
        }
        break;
      case 'COMMON_settings.webmapName':
        lang.setObject('webmap.item.title',value,newAppData);
        break;
      case 'COMMON_settings.layerName':
        lang.setObject('layer.item.title',value,newAppData);
        break;
      case 'COMMON_settings.ownerFolder':
        lang.setObject('app.item.ownerFolder',value,newAppData);
        lang.setObject('webmap.item.ownerFolder',value,newAppData);
        lang.setObject('layer.item.ownerFolder',value,newAppData);
        break;
      default:
        lang.setObject(keyString,value,newAppData);
    }

    if (dfd && dfd.then) {
      dfd.then(() => {
        AppDispatcher.dispatch({
          type: ActionTypes.app.UPDATE_APP_DATA,
          appData: newAppData
        });
      });
    } else {
      AppDispatcher.dispatch({
        type: ActionTypes.app.UPDATE_APP_DATA,
        appData: newAppData
      });
    }
  },

  settingsNext: function settingsNext() {
    AppDispatcher.dispatch({
      type: ActionTypes.app.SETTINGS_NEXT
    });
  }

};
export default BuilderActions;
