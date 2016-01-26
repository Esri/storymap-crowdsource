import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import Graphic from 'esri/graphic';
import esriRequest from 'esri/request';
import Helper from 'babel/utils/helper/Helper';
import AppDispatcher from 'babel/dispatcher/AppDispatcher';
import AppStore from 'babel/stores/AppStore';
import AppDataStore from 'babel/stores/AppDataStore';
import ViewerText from 'i18n!translations/viewer/nls/template';
import Logger from 'babel/utils/logging/Logger';
import {ActionTypes} from 'babel/constants/CrowdsourceAppConstants';
import {Components} from 'babel/constants/CrowdsourceAppConstants';
import {Events} from 'babel/constants/CrowdsourceAppConstants';

const _logger = new Logger({source: 'CrowdsourceAppStore'});

const _onError = function onError(error) {
  _logger.logMessage({
    type: 'error',
    error
  });
};

const _onStatus = function onStatus(message,debugOnly) {
  _logger.logMessage({
    type: 'status',
    debugOnly,
    message
  });
};

let _features = [];
let _formErrors = {};
let _viewState = {
  current: Components.names.INTRO
};
let _loadingErrorMessage = '';
let _map = false;
let _layer = false;
let _contributeGraphic = false;
let _contributeSaving = false;

const _updateContributeGraphic = function updateContributeGraphic(data) {
  $.extend(true,_contributeGraphic,data);
};

const _saveGraphic = function saveGraphic () {
  const dfd = new Deferred();
  let g = $.extend(true,{},_contributeGraphic);
  let attachments = [];

  if (g.attributes) {
    $.each(g.attributes, (key,value) => {
      if (typeof value === 'object' && value.attachment && value.type) {
        switch (value.type) {
          case 'photo':
            g.attributes[key] = 'ATTACHMENT_' + key;
            attachments.push({
              field: key,
              filename: key + value.ext,
              attachment: Helper.attachmentUtils.dataURItoBlob(value.source)
            });
            break;
        }
      } else if (typeof value === 'object') {
        g.attributes[key] = JSON.stringify(value);
      }
    });
  }

  const graphic = new Graphic(g);

  const uploadAttachments = function uploadAttachments(oid) {
    const dfd = new Deferred();
    let uploadsFinished = 0;

    const url = _layer.url + (_layer.url.slice(-1) !== '/' ? '/' : '') + oid + '/addAttachment';

    attachments.map((current) => {
      const formdata = new FormData();

      formdata.append('attachment', current.attachment, current.filename);
      formdata.append('f', 'json');

      esriRequest({
        url,
        handleAs: 'json',
        form: formdata
      },{
        usePost: true
      }).then((res) => {
        _onStatus(res,true);
        ++uploadsFinished;
        if (uploadsFinished === attachments.length) {
          dfd.resolve();
        }
      },(err) => {
        _onError(err);
        dfd.reject();
      });
    });

    return dfd;

  };

  _layer.applyEdits([graphic],null,null,(res) => {
    if ($.isArray(res) && res[0] && res[0].success) {
      const oid = res[0].objectId;

      uploadAttachments(oid).then(() => {
        dfd.resolve();
      },() => {
        // TODO Handle Attachment errors
      });
    }
  },(err) => {
    // TODO error handling
    _onError(err);
    dfd.reject(err);
  });

  return dfd;
};

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
    if (_contributeGraphic && _layer && _layer.fields && _map) {

      const checkCompleteState = function checkCompleteState() {
        const appData = AppDataStore.appData;

        if (appData && appData.app && appData.app.data && appData.app.data.values && appData.app.data.values.settings && appData.app.data.values.settings.contribute && appData.app.data.values.settings.contribute.fields) {
          let ready = true;

          appData.app.data.values.settings.contribute.fields.map((field) => {
            if (field.required && field.fieldID && _contributeGraphic.attributes && _contributeGraphic.attributes[field.fieldID] === undefined) {
              ready = false;
            }
          });
          if (!_contributeGraphic.geometry){
            ready = false;
          }
          return ready;
        } else {
          return false;
        }
      };

      return {
        formComplete: checkCompleteState(),
        fieldDefinitions: _layer.fields,
        map: _map,
        graphic: _contributeGraphic,
        saving: _contributeSaving
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
    case ActionTypes.map.STORE_MAP_OBJECTS:
      _map = payload.map;
      _layer = payload.layer;
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
      _contributeGraphic = {
        attributes: {
          hidden: 0,
          vetted: 0
        }
      };
      if (_viewState.current !== Components.names.MAP) {
        _viewState.previous = _viewState.current;
        _viewState.current = Components.names.MAP;
      }
      CrowdsourceAppStore.emitChange(Events.appState.CONTRIBUTE);
      break;
    case ActionTypes.contribute.UPDATE_CONTRIBUTION:
      _updateContributeGraphic(payload.graphic);
      CrowdsourceAppStore.emitChange(Events.appState.CONTRIBUTE);
      break;
    case ActionTypes.contribute.SAVE:
      _contributeSaving = true;
      _saveGraphic().then(() => {
        _contributeSaving = false;
        _contributeGraphic = false;
        CrowdsourceAppStore.emitChange(Events.appState.CONTRIBUTE);
      });
      CrowdsourceAppStore.emitChange(Events.appState.CONTRIBUTE);
      break;
  }

});

export default CrowdsourceAppStore;
