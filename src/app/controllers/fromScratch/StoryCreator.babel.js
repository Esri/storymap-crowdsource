import $ from 'jquery';
import lang from 'dojo/_base/lang';
import URI from 'lib/urijs/src/URI';
import Helper from 'babel/utils/helper/Helper';
import UrlUtils from 'esri/urlUtils';
import Logger from 'babel/utils/logging/Logger';
import Validator from 'babel/utils/validations/Validator';
import AppStore from 'babel/store/AppStore';
import ConfigActions from 'babel/actions/ConfigActions';
import ModeActions from 'babel/actions/ModeActions';
import ItemActions from 'babel/actions/ItemActions';
import SettingsActions from 'babel/actions/SettingsActions';
import BuilderActions from 'babel/actions/BuilderActions';
import AppActions from 'babel/actions/AppActions';
import UserActions from 'babel/actions/UserActions';
import ArcgisItem from 'babel/utils/arcgis/items/Item';
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
    this.saveAppFromWebmapDefaults = this.saveAppFromWebmapDefaults.bind(this);
    this.saveAppFromScratchApp = this.saveAppFromScratchApp.bind(this);
    this.createFeatureService = this.createFeatureService.bind(this);
    this.createWebmap = this.createWebmap.bind(this);
    this.createApp = this.createApp.bind(this);
    this.saveApp = this.saveApp.bind(this);
    this.registerApp = this.registerApp.bind(this);
    this.redirectToEditor = this.redirectToEditor.bind(this);

    // Subscribe to state changes
    this.appState = AppStore.getState();
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    if (lang.getObject('appState.config.webmap',false,this)) {
      ArcgisItem.getDataById({
        id: lang.getObject('appState.config.webmap',false,this),
        item: 'webmap'
      });
    }

    this.openFirstDialog('betaMessage');

  }

  updateAppState() {
    this.appState = AppStore.getState();

    if (!this.savedOrgDefaults && lang.getObject('appState.app.portal',false,this)) {
      this.saveOrgDefaults();
    }
    if (!this.savedWebmapDefaults && typeof lang.getObject('appState.items.webmap.item.id',false,this) === 'string' && lang.getObject('appState.items.webmap.item.access',false,this) && !lang.getObject('appState.app.loading.map',false,this) && !lang.getObject('appState.app.loading.data',false,this)) {
      this.saveAppFromWebmapDefaults();
    }
    if (!this.savedAppFromScratchApp && lang.getObject('appState.config.appid',false,this) && typeof lang.getObject('appState.config.appid',false,this) === 'string' && lang.getObject('appState.config.appid',false,this).length === 32 && !lang.getObject('appState.app.loading.map',false,this) && !lang.getObject('appState.app.loading.data',false,this)) {
      this.saveAppFromScratchApp();
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

  openFirstDialog(dialog) {
    BuilderActions.changeDialog(dialog);
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

  saveAppFromWebmapDefaults() {
    this.savedWebmapDefaults = true;
    this.itemCreationPending = true;
    const webmapItem = lang.getObject('appState.items.webmap.item',false,this);
    const layerNameValidator = new Validator({
      validations: ['arcgisIsServiceName']
    });

    ItemActions.updateFeatureServiceItem({
      ownerFolder: webmapItem.ownerFolder,
      extent: webmapItem.extent.toString()
    });
    ItemActions.updateAppItem({
      ownerFolder: webmapItem.ownerFolder,
      title: webmapItem.title,
      snippet: webmapItem.snippet,
      description: webmapItem.description,
      extent: webmapItem.extent.toString()
    });
    SettingsActions.updateMapWebmapId(webmapItem.id);
    SettingsActions.updateIntroTitle(webmapItem.title);
    SettingsActions.updateIntroSubtitle(webmapItem.snippet);
    SettingsActions.updateHeaderTitle(webmapItem.title);

    layerNameValidator.validate(webmapItem.title).then((newRes) => {
      if (!newRes.isValid && newRes.errors && newRes.errors[0] && newRes.errors[0].fixValue) {
        const layerName = newRes.errors[0].fixValue;

        ItemActions.updateFeatureServiceItemTitle(layerName);
        ItemActions.updateFeatureServiceDefinition({name: layerName});
      } else {
        ItemActions.updateFeatureServiceItemTitle(webmapItem.title);
        ItemActions.updateFeatureServiceDefinition({name: webmapItem.title});
      }
      this.itemCreationPending = false;
    });
  }

  saveAppFromScratchApp() {
    this.savedAppFromScratchApp = true;
    this.savedWebmapDefaults = true;
    this.itemCreationPending = true;

    const self = this;
    const appItem = lang.getObject('appState.items.app.item',false,this);
    const layerNameValidator = new Validator({
      validations: ['arcgisIsServiceName']
    });
    const setLayerNameAndFinish = function() {
      layerNameValidator.validate(appItem.title).then((newRes) => {
        if (!newRes.isValid && newRes.errors && newRes.errors[0] && newRes.errors[0].fixValue) {
          const layerName = newRes.errors[0].fixValue;

          ItemActions.updateFeatureServiceItemTitle(layerName);
          ItemActions.updateFeatureServiceDefinition({name: layerName});
        } else {
          ItemActions.updateFeatureServiceItemTitle(appItem.title);
          ItemActions.updateFeatureServiceDefinition({name: appItem.title});
        }

        self.itemCreationPending = false;
      });
    };

    ItemActions.updateFeatureServiceItem({
      ownerFolder: appItem.ownerFolder
    });
    SettingsActions.updateIntroTitle(appItem.title);
    SettingsActions.updateIntroSubtitle(appItem.snippet);
    SettingsActions.updateHeaderTitle(appItem.title);

    ArcgisItem.getDataById().then((appResponse) => {
      if (appResponse.data && appResponse.data.values && appResponse.data.values.webmap) {
        ArcgisItem.getDataById({
          item: 'webmap',
          id: appResponse.data.values.webmap
        }).then(setLayerNameAndFinish);
      } else {
        ItemActions.updateWebmapItem({
          ownerFolder: appItem.ownerFolder,
          title: appItem.title
        });
        setLayerNameAndFinish();
      }
    });

  }

  createFeatureService() {
    const portal = lang.getObject('appState.app.portal',false,this);
    const isDev = lang.getObject('appState.mode.isDev',false,this);
    const isDevext = lang.getObject('appState.config.sharingurl',false,this) ? lang.getObject('appState.config.sharingurl',false,this).search('devext.arcgis.com') >= 0 : false;

    this.itemCreationPending = true;
    portal.createService({
      protectService: isDev || isDevext ? false : true
    }).then((res) => {
      if (res.crowdsourceLayerUrl && res.crowdsourceLayerItemId) {
        _onStatus('Feature Service Created: ' + JSON.stringify(res),true);

        const layerId = 'crowdsource-layer-' + new Date().getTime();
        const layerUrl = new URI(res.crowdsourceLayerUrl).protocol('https').href();

        ItemActions.updateFeatureServiceItem({
          id: res.crowdsourceLayerItemId,
          url: layerUrl
        });
        ItemActions.updateWebmapCrowdsourceLayer({
          id: layerId,
          title: builderText.fromScratchMessage.layerNameInWebmap,
          url: layerUrl,
          itemId: res.crowdsourceLayerItemId,
          visibility: true,
          opacity: 1,
          mode: 0
        });
        SettingsActions.updateMapCrowdsourceLayerId(layerId);
        this.createWebmap();
      }
    },(err) => {
      AppActions.displayMainError(builderText.errors.scratchCreation.unknown);
      _onError(err);
    });
  }

  createWebmap() {
    const portal = lang.getObject('appState.app.portal',false,this);

    portal.saveWebmap().then((res) => {
      if (res && res.success && res.id) {
        _onStatus('Webmap Created: ' + JSON.stringify(res),true);
        SettingsActions.updateMapWebmapId(res.id);
        this.createApp();
      }
    },(err) => {
      AppActions.displayMainError(builderText.errors.scratchCreation.unknown);
      _onError(err);
    });
  }

  createApp() {
    this.savedOrgDefaults = true;
    this.savedWebmapDefaults = true;
    this.savedAppFromScratchApp = true;
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
    },(err) => {
      AppActions.displayMainError(builderText.errors.scratchCreation.unknown);
      _onError(err);
    });
  }

  saveApp(callback) {
    const portal = lang.getObject('appState.app.portal',false,this);

    portal.saveApp().then((res) => {
      if (res.success) {
        callback();
      }
    },(err) => {
      AppActions.displayMainError(builderText.errors.scratchCreation.unknown);
      _onError(err);
    });
  }

  registerApp() {
    const portal = lang.getObject('appState.app.portal',false,this);

    portal.registerApp().then((res) => {
      if (res.client_id && res.redirect_uris) {
        SettingsActions.updateOAuthSettings({
          clientId: res.client_id
        });
        this.saveApp(this.redirectToEditor);
      }
    },(err) => {
      AppActions.displayMainError(builderText.errors.scratchCreation.unknown);
      _onError(err);
    });
  }

  redirectToEditor() {
    const appid = lang.getObject('appState.items.app.item.id',false,this);
    const currentQuery = UrlUtils.urlToObject(window.location.href).query;
    const urlQuery = $.extend(currentQuery,{
      appid,
      edit: true
    });

    Object.keys(urlQuery).forEach((current) => {
      if (current.toLowerCase() === 'fromscratch' || current.toLowerCase() === 'webmap' || current.toLowerCase() === 'folderid') {
        delete urlQuery[current];
      }
      if (current.toLowerCase() === 'debug') {
        urlQuery[current] = true;
      }
    });

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
    ArcgisItem.getDataById({
      id: appid
    });
  }

}
