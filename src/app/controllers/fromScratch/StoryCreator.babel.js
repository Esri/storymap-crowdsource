import $ from 'jquery';
import lang from 'dojo/_base/lang';
import UrlUtils from 'esri/urlUtils';
import Logger from 'babel/utils/logging/Logger';
import AppStore from 'babel/store/AppStore';
import ModeActions from 'babel/actions/ModeActions';
import ItemActions from 'babel/actions/ItemActions';
import SettingsActions from 'babel/actions/SettingsActions';
import BuilderActions from 'babel/actions/BuilderActions';
import ArcgisAppItem from 'babel/utils/arcgis/appItems/AppItem';
import builderText from 'i18n!translations/builder/nls/template';

const _logger = new Logger({source: 'StoryCreator'});

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

export default class StoryCreator {

  constructor() {

    this.itemCreationPending = false;

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.createFeatureService = this.createFeatureService.bind(this);
    this.createWebmap = this.createWebmap.bind(this);
    this.createApp = this.createApp.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    // TODO dynamic start
    this.openItemNameDialog();
  }

  updateAppState() {
    this.appState = AppStore.getState();

    if (lang.getObject('appState.builder.activeDialog',false,this) === 'savingFromScratch' && !this.itemCreationPending) {
      this.createFeatureService();
    }
  }

  openItemNameDialog() {
    BuilderActions.changeDialog('itemNameScratch');
  }

  createFeatureService() {
    const portal = lang.getObject('appState.builder.portal',false,this);

    this.itemCreationPending = true;
    portal.createService().then((res) => {
      if (res.crowdsourceLayerUrl && res.crowdsourceLayerItemId) {
        _onStatus('Feature Service Created: ' + JSON.stringify(res),true);

        const layerId = 'crowdsource-layer-' + new Date().getTime();

        ItemActions.updateFeatureServiceItem({
          id: res.crowdsourceLayerItemId,
          url: res.crowdsourceLayerUrl
        });
        ItemActions.updateWebmapCrowdsourceLayer({
          id: layerId,
          title: builderText.fromScratchMessage.layerNameInWebmap,
          url: res.crowdsourceLayerUrl,
          itemId: res.crowdsourceLayerItemId,
          visibility: true,
          opacity: 1,
          mode: 0
        });
        SettingsActions.updateMapCrowdsourceLayer({id: layerId});
        this.createWebmap();
      }
      // TODO add visibile error dialog to user
    },_onError);
  }

  createWebmap() {
    const portal = lang.getObject('appState.builder.portal',false,this);

    portal.saveWebmap().then((res) => {
      if (res.createResponse && res.createResponse.success) {
        _onStatus('Webmap Created: ' + JSON.stringify(res),true);
        SettingsActions.updateMapWebmapId(res.createResponse.id);
        this.createApp();
      }
      // TODO add visibile error dialog to user
    },_onError);
  }

  createApp() {
    const portal = lang.getObject('appState.builder.portal',false,this);

    portal.saveApp().then((res) => {
      if (res.success) {
        _onStatus('App Created: ' + JSON.stringify(res),true);

        const currentQuery = UrlUtils.urlToObject(window.location.href).query;
        const urlQuery = $.extend(currentQuery,{
          appid: res.id,
          edit: true
        });

        delete urlQuery.fromScratch;

        const urlParams = $.param(urlQuery);

        ModeActions.updateMode({
          fromScratch: false
        });
        window.history.replaceState({},lang.getObject('appState.items.app.item.title',false,this),'?' + urlParams);
        ArcgisAppItem.getDataById(res.id);
      }
      // TODO add visibile error dialog to user
    },_onError);
  }

}
