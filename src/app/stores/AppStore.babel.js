import $ from 'jquery';
import Store from 'babel/stores/Store';
import {Events} from 'babel/constants/CrowdsourceAppConstants';

export const AppStoreClass = class AppStoreClass extends Store {
  constructor() {
    super();

    this._checkReadyState = this._checkReadyState.bind(this);
    this._appReady = false;
    this._loadedComponents = {};
  }

  _checkReadyState() {
    let ready = true;

    $.each(this._loadedComponents, function() {
      if (!this) {
        ready = false;
      }
    });

    this._appReady = ready;
    return ready;
  }

  get isReady() {
    return this._appReady || this._checkReadyState();
  }

  addLoadStateListener(callback) {
    this.on(Events.appState.LOAD_STATE, callback);
  }

  removeLoadStateListener(callback) {
    this.removeListener(Events.appState.LOAD_STATE, callback);
  }

  emitLoadState() {
    this.emit(Events.appState.LOAD_STATE);
  }
};

export default AppStoreClass;
