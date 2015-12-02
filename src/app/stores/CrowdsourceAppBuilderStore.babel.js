import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import AppActions from 'babel/actions/AppActions';
import ArcgisActions from 'babel/actions/ArcgisActions';
import {Portal} from 'babel/utils/arcgis/Arcgis';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import {builderDefaults} from 'babel/builderOptionsConfig';
// import {Components} from 'babel/constants/CrowdsourceAppConstants';
// import {Events} from 'babel/constants/CrowdsourceAppConstants';

let _portal = false;

const _loadPortal = function loadPortal() {
  const portal = new Portal(window.app.indexCfg.sharingurl.split('/sharing/')[0],{
    signInOnLoad: true
  });

  portal.on('sign-in',() => {

    if (window.app.mode.fromScratch) {
      if (portal.userIsAppPublisher()) {
        ArcgisActions.receiveAppItem({
          defaultData: builderDefaults.appData
        });
      } else {
        AppActions.showLoadingError('notAuthorizedCreateNew');
      }
    }

    _portal = portal;
  });
};

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
      if (!_portal) {
        _loadPortal();
      }
      break;
    }

});

export default CrowdsourceBuilderStore;
