import Store from 'babel/stores/Store';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';

let _features = [];

const _FeatureStoreClass = class FeatureStoreClass extends Store {

  constructor() {
    super();
  }

  // TODO Use es6 getters
  getFeatures() {
    return _features;
  }

};

export const FeatureStore = new _FeatureStoreClass();

FeatureStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.map.RECEIVE_FEATURES:
      _features = payload.features;
      FeatureStore.emitChange();
      break;
    default:

  }

});

export default FeatureStore;
