import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import esriRequest from 'esri/request';
import Graphic from 'esri/graphic';
import Helper from 'babel/utils/helper/Helper';
import AppStore from 'babel/store/AppStore';
import AppActions from 'babel/actions/AppActions';
import MapActions from 'babel/actions/MapActions';
import Logger from 'babel/utils/logging/Logger';
import 'babel/utils/helper/strings/StringUtils';

const _logger = new Logger({source: 'Contribute Controller'});

const _onError = function onError(error) {
  _logger.logMessage({
    type: 'error',
    error
  });
};

// const _onStatus = function onStatus(message,debugOnly) {
//   _logger.logMessage({
//     type: 'status',
//     debugOnly,
//     message
//   });
// };

export default class ContributeController {

  constructor() {

    this.savingGraphic = false;

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.checkContributeView = this.checkContributeView.bind(this);
    this.saveGraphic = this.saveGraphic.bind(this);
    this.finishSave = this.finishSave.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);
  }

  updateAppState() {
    this.appState = AppStore.getState();

    this.checkContributeView();
    this.saveGraphic();
  }

  checkContributeView() {
    if (lang.getObject('appState.app.contributing.active',false,this) && lang.getObject('appState.app.contributing.view',false,this) === 'login' && lang.getObject('appState.user.contributor',false,this)) {
      AppActions.updateContributeState({
        view: 'form'
      });
    }
  }

  saveGraphic() {
    if (!this.savingGraphic && lang.getObject('appState.app.contributing.saving',false,this) && typeof lang.getObject('appState.app.contributing.graphic',false,this) === 'object') {
      this.savingGraphic = true;
      const self = this;
      const layer = lang.getObject('appState.app.map.layer',false,this);
      const graphic = $.extend(true,{},lang.getObject('appState.app.contributing.graphic',false,this));
      const attachments = [];

      const uploadAttachments = function uploadAttachments(oid) {
        const dfd = new Deferred();
        let uploadsFinished = 0;

        const url = layer.url.stripTrailingSlash() + '/' + oid + '/addAttachment';

        attachments.forEach((current) => {
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
            if (res.addAttachmentResult && res.addAttachmentResult.success) {
              ++uploadsFinished;
              if (uploadsFinished === attachments.length) {
                dfd.resolve();
              }
            } else {
              _onError(res);
              dfd.reject();
            }
          },(err) => {
            _onError(err);
            dfd.reject();
          });
        });

        return dfd;

      };

      Object.keys(graphic.attributes).forEach((key) => {
        const value = graphic.attributes[key];

        if (typeof value === 'object' && value.attachment && value.type) {
          switch (value.type) {
            case 'photo':
              attachments.push({
                field: key,
                filename: key + value.ext,
                attachment: Helper.attachmentUtils.dataURItoBlob(value.source),
                url: false
              });
              delete graphic.attributes[key];
              break;
            default:

          }
        } else if (typeof value === 'object') {
          graphic.attributes[key] = JSON.stringify(value);
        } else if (typeof value === 'string') {
          graphic.attributes[key] = value.sanitizeHtml();
        }
      });

      const esriGraphic = new Graphic(graphic);

      layer.applyEdits([esriGraphic],null,null,(res) => {
        if ($.isArray(res) && res[0] && res[0].success) {
          const oid = res[0].objectId;

          MapActions.selectFeatures(oid);
          uploadAttachments(oid).then(self.finishSave,_onError);
        }
      },(err) => {
        // TODO Handle errors in crowdsource form
        AppActions.updateContributeState({
          saving: false
        });
        _onError(err);
      });
    }
  }

  finishSave() {
    AppActions.updateContributeState({
      active: false,
      saving: false,
      graphic: false
    });
    this.savingGraphic = false;

    if (lang.getObject('appState.app.map.originalObject.refreshCrowdsourceLayer',false,this)) {
        this.appState.app.map.originalObject.refreshCrowdsourceLayer();
    }
  }

}
