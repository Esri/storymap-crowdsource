import $ from 'jquery';
import Store from 'babel/stores/Store';

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
};

export default AppStoreClass;
