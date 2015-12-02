import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import {Portal} from 'babel/utils/arcgis/Arcgis';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
// import {Components} from 'babel/constants/CrowdsourceAppConstants';
// import {Events} from 'babel/constants/CrowdsourceAppConstants';

let _portal = false;

const _CrowdsourceBuilderStoreClass = class CrowdsourceBuilderStoreClass extends AppStore {

  constructor() {
    super();
  }
};

export const CrowdsourceBuilderStore = new _CrowdsourceBuilderStoreClass();

CrowdsourceBuilderStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.app.SCRIPTS_LOADED:
      const portal = new Portal(window.app.indexCfg.sharingurl.split('/sharing/')[0],{
        signInOnLoad: true
      });

      portal.on('sign-in',() => {
        _portal = portal;
      });
      break;
    }

});

export default CrowdsourceBuilderStore;
