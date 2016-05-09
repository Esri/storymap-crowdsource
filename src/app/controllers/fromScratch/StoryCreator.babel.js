import $ from 'jquery';
import lang from 'dojo/_base/lang';
import Helper from 'babel/utils/helper/Helper';
import UrlUtils from 'esri/urlUtils';
import Logger from 'babel/utils/logging/Logger';
import AppStore from 'babel/store/AppStore';
import ConfigActions from 'babel/actions/ConfigActions';
import ModeActions from 'babel/actions/ModeActions';
import ItemActions from 'babel/actions/ItemActions';
import SettingsActions from 'babel/actions/SettingsActions';
import BuilderActions from 'babel/actions/BuilderActions';
import AppActions from 'babel/actions/AppActions';
import UserActions from 'babel/actions/UserActions';
import ArcgisAppItem from 'babel/utils/arcgis/appItems/AppItem';
import componentNames from 'babel/constants/componentNames/ComponentNames';
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

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.saveOrgDefaults = this.saveOrgDefaults.bind(this);
    this.createFeatureService = this.createFeatureService.bind(this);
    this.createWebmap = this.createWebmap.bind(this);
    this.createApp = this.createApp.bind(this);
    this.saveApp = this.saveApp.bind(this);
    this.registerApp = this.registerApp.bind(this);
    this.redirectToEditor = this.redirectToEditor.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    // TODO dynamic start
    this.openItemNameDialog();
  }

  updateAppState() {
    this.appState = AppStore.getState();

    if (lang.getObject('appState.app.portal',false,this) && !this.savedOrgDefaults) {
      this.saveOrgDefaults();
    }
    if (lang.getObject('appState.builder.activeDialog',false,this) === 'savingFromScratch' && !this.itemCreationPending) {
      this.createFeatureService();
    }
    if (this.showCoverPageSettingsOnLoad && lang.getObject('appState.app.loading.data',false,this) && lang.getObject('appState.app.loading.map',false,this)) {
      this.showCoverPageSettingsOnLoad = false;
      setTimeout(() => {
        AppActions.showComponent([componentNames.SIDE_PANEL_SETTINGS,componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH + componentNames.SPS_INTRO_SPLASH]);
      },1000);
    }
  }

  openItemNameDialog() {
    BuilderActions.changeDialog('itemNameScratch');
  }

  saveOrgDefaults() {
    this.savedOrgDefaults = true;
    const portal = lang.getObject('appState.app.portal',false,this);
    const extent = Helper.mapUtils.serializeExtentToItem({
      extent: portal.defaultExtent,
      type: 'string'
    });

    ItemActions.updateFeatureServiceItem({
      extent
    });
    ItemActions.updateWebmapItem({
      extent
    });
    ItemActions.updateAppItem({
      extent
    });
  }

  createFeatureService() {
    const portal = lang.getObject('appState.app.portal',false,this);

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
        SettingsActions.updateMapCrowdsourceLayerId(layerId);
        this.createWebmap();
      }
      // TODO add visibile error dialog to user
    },_onError);
  }

  createWebmap() {
    const portal = lang.getObject('appState.app.portal',false,this);

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
    const portal = lang.getObject('appState.app.portal',false,this);

    portal.saveApp().then((res) => {
      if (res.success) {
        _onStatus('App Created: ' + JSON.stringify(res),true);
        const url = window.location.origin + window.location.pathname + '?appid=' + res.id;

        ItemActions.updateAppItem({
          id: res.id,
          url
        });

        this.saveApp(this.registerApp);
      }
      // TODO add visibile error dialog to user
    },_onError);
  }

  saveApp(callback) {
    const portal = lang.getObject('appState.app.portal',false,this);

    portal.saveApp().then((res) => {
      if (res.success) {
        callback();
      }
      // TODO add visibile error dialog to user
    },_onError);
  }

  registerApp() {
    const portal = lang.getObject('appState.app.portal',false,this);

    portal.registerApp().then((res) => {
      if (res.client_id && res.redirect_uris) {
        SettingsActions.updateOAuthSettings({
          clientId: res.client_id,
          redirectUris: res.redirect_uris
        });
        this.saveApp(this.redirectToEditor);
      }
      // TODO add visibile error dialog to user
    },_onError);
  }

  redirectToEditor() {
    const appid = lang.getObject('appState.items.app.item.id',false,this);
    const currentQuery = UrlUtils.urlToObject(window.location.href).query;
    const urlQuery = $.extend(currentQuery,{
      appid,
      edit: true
    });

    delete urlQuery.fromScratch;

    const urlParams = $.param(urlQuery);

    window.history.replaceState({},lang.getObject('appState.items.app.item.title',false,this),'?' + urlParams);
    BuilderActions.changeDialog('');
    ConfigActions.updateConfig({
      appid
    });
    ModeActions.updateMode({
      fromScratch: false
    });
    UserActions.signOutUser();
    this.showCoverPageSettingsOnLoad = true;
    ArcgisAppItem.getDataById(appid);
  }

}
