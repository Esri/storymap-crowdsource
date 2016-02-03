import $ from 'jquery';
import lang from 'dojo/_base/lang';
import CrowdsourceBuilderController from 'mode!isBuilder?./CrowdsourceBuilderController';
import AppStore from 'babel/store/AppStore';
import AppMode from './mode/AppMode';
import AppConfig from './config/AppConfig';
import EnvironmentConfig from 'babel/utils/arcgis/config/EnvironmentConfig';
import ArcgisAppItem from 'babel/utils/arcgis/appItems/AppItem';

export default class CrowdsourceController {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    this.appMode = new AppMode();
    this.appConfig = new AppConfig();
    // TODO configure from app state
    EnvironmentConfig.configSharingUrl();

    // Remove Loader
    $('#loadingIndicator').remove();

    if (lang.exists('appState.config.appid',this)) {
      ArcgisAppItem.getDataById(this.appState.config.appid);
    }

    if (lang.exists('appState.mode.isBuilder',this)) {
      this.builderController = new CrowdsourceBuilderController({
        indexCfg: window.app.indexCfg
      });
    }
  }

  updateAppState() {
    this.appState = AppStore.getState();
  }

}
