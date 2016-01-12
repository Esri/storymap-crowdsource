import $ from 'jquery';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import ViewerText from 'i18n!translations/viewer/nls/template';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import {Components} from 'babel/constants/CrowdsourceAppConstants';
import {Events} from 'babel/constants/CrowdsourceAppConstants';

let _features = [];
let _formErrors = {};
let _viewState = {
  current: Components.names.INTRO
};
let _loadingErrorMessage = '';
let _fieldDefinitions = false;
let _contributeSession = false;

const _CrowdsourceAppStoreClass = class CrowdsourceAppStoreClass extends AppStore {

  constructor() {
    super();

    this._loadedComponents = {
      appData: false,
      map: false
    };
  }

  get features() {
    return _features;
  }

  get loadState() {
    const isReady = this.isReady;
    let loadingMessage;

    if (this._loadedComponents.appData && !this._loadedComponents.map) {
      loadingMessage = ViewerText.loading.map;
    } else {
      loadingMessage = ViewerText.loading.initializing;
    }

    return {isReady,loadingMessage,error: _loadingErrorMessage};
  }

  get viewState() {
    return _viewState;
  }

  get contributing() {
    if (_contributeSession && _fieldDefinitions) {
      return {
        fieldDefinitions: _fieldDefinitions
      };
    } else {
      return false;
    }
  }

  getFormErrors(formId) {
    if (formId && $.isArray(_formErrors[formId])) {
      return _formErrors[formId].length;
    } else {
      return 0;
    }
  }
};

export const CrowdsourceAppStore = new _CrowdsourceAppStoreClass();

CrowdsourceAppStore.dispatchToken = AppDispatcher.register((payload) => {

  const action = payload.type;

  switch (action) {
    case ActionTypes.app.LOADING_ERROR:
      _loadingErrorMessage = payload.message;
      CrowdsourceAppStore.emitChange(Events.appState.LOAD_STATE);
      break;
    case ActionTypes.app.COMPONENT_LOADED:
      CrowdsourceAppStore._loadedComponents[payload.component] = true;
      CrowdsourceAppStore.emitChange(Events.appState.LOAD_STATE);
      break;
    case ActionTypes.arcgis.RECEIVE_APP_ITEM:
      if (!CrowdsourceAppStore._loadedComponents.appData && (payload.response && payload.response.item && payload.response.itemData)){
        CrowdsourceAppStore._loadedComponents.appData = true;
        CrowdsourceAppStore.emitChange(Events.appState.LOAD_STATE);
      }
      break;
    case ActionTypes.map.RECEIVE_FEATURES:
      _features = payload.features;
      CrowdsourceAppStore.emitChange();
      break;
    case ActionTypes.app.SET_VIEW:
      _viewState.previous = _viewState.current;
      _viewState.current = payload.component;
      CrowdsourceAppStore.emitChange(Events.appState.VIEW_STATE);
      break;
    case ActionTypes.map.RECEIVE_FIELD_DEFINITIONS:
      _fieldDefinitions = payload.fields;
      CrowdsourceAppStore.emitChange();
      break;
    case ActionTypes.forms.FORM_CREATED:
      _formErrors[payload.formId] = [];
      break;
    case ActionTypes.forms.FORM_COMPLETED:
      delete _formErrors[payload.formId];
      break;
    case ActionTypes.forms.VALIDATION_STARTED:
    case ActionTypes.forms.VALIDATION_FINISHED:
      const errorArray = _formErrors[payload.formId];
      const nodeIndex = $.inArray(payload.node,errorArray);

      if (errorArray) {
        if (action === ActionTypes.forms.VALIDATION_FINISHED && nodeIndex > -1 && payload.valid) {
          errorArray.splice(nodeIndex,1);
        } else if (nodeIndex === -1 && !payload.valid) {
          errorArray.push(payload.node);
        }
        CrowdsourceAppStore.emitChange(Events.forms.VALIDATION_EVENT);
      }
      break;
    case ActionTypes.contribute.START:
      _contributeSession = true;
      if (_viewState.previous !== Components.names.MAP) {
        _viewState.previous = _viewState.current;
        _viewState.current = Components.names.MAP;
      }
      CrowdsourceAppStore.emitChange(Events.appState.CONTRIBUTE);
      break;
  }

});

export default CrowdsourceAppStore;
