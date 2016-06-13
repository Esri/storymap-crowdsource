import $ from 'jquery';
import AppStore from 'babel/store/AppStore';
import lang from 'dojo/_base/lang';
import esriRequest from 'esri/request';
import Logger from 'babel/utils/logging/Logger';
import ReviewActions from 'babel/actions/ReviewActions';
import 'babel/utils/helper/strings/StringUtils';

const _logger = new Logger({source: 'Contribute Controller'});

const _onError = function onError(error) {
  _logger.logMessage({
    type: 'error',
    error
  });
};

export default class CrowdsourceReviewController {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.editReviewedFeatures = this.editReviewedFeatures.bind(this);

    this.approved = JSON.stringify([]);
    this.rejected = JSON.stringify([]);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);
  }

  updateAppState() {
    this.appState = AppStore.getState();

    this.editReviewedFeatures();
  }

  editReviewedFeatures() {
    const approved = lang.getObject('appState.review.approved',false,this);
    const rejected = lang.getObject('appState.review.rejected',false,this);

    if ((approved.length > 0 || rejected.length > 0) && (JSON.stringify(approved) !== this.approved || JSON.stringify(rejected) !== this.rejected)) {
      this.approved = JSON.stringify(approved);
      this.rejected = JSON.stringify(rejected);

      const idField = lang.getObject('appState.items.app.data.values.settings.components.map.crowdsourceLayer.idField',false,this);
      const vettedField = lang.getObject('appState.items.app.data.values.settings.components.map.crowdsourceLayer.vettedField',false,this);

      const approvedFeatures = approved.reduce((prev,current) => {
        const ftr = {
          attributes: {}
        };

        ftr.attributes[idField] = current;
        ftr.attributes[vettedField] = 1;

        return prev.concat(ftr);
      },[]);

      const rejectedFeatures = rejected.reduce((prev,current) => {
        const ftr = {
          attributes: {}
        };

        ftr.attributes[idField] = current;
        ftr.attributes[vettedField] = 2;

        return prev.concat(ftr);
      },[]);

      const updates = JSON.stringify([].concat(approvedFeatures).concat(rejectedFeatures));
      const token = lang.getObject('appState.app.portal.user.credential.token',false,this);
      const layer = lang.getObject('appState.app.map.layer',false,this);
      const url = layer.url.stripTrailingSlash() + '/applyEdits';
      const content = {
        f: 'json',
        token, 
        updates
      };

      esriRequest({
        url,
        handleAs: 'json',
        content
      },{
        usePost: true
      }).then((res) => {
        if (res.updateResults) {
          const updateResults = res.updateResults;

          if ($.isArray(updateResults)) {
            const removeApproved = updateResults.reduce((prev,current) => {
              if (current.success && approved.indexOf(current.objectId) >= 0) {
                return prev.concat(current.objectId);
              }
              return prev;
            },[]);
            const removeRejected = updateResults.reduce((prev,current) => {
              if (current.success && rejected.indexOf(current.objectId) >= 0) {
                return prev.concat(current.objectId);
              }
              return prev;
            },[]);
            const map = lang.getObject('appState.app.map.originalObject',false,this);

            ReviewActions.approveFeatures({remove: removeApproved});
            ReviewActions.rejectFeatures({remove: removeRejected});
            map.refreshCrowdsourceLayer();
          }
        } else {
          _onError(res);
        }
      },_onError);

    }
  }
}
