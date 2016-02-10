import $ from 'jquery';
import lang from 'dojo/_base/lang';
import Portal from 'babel/utils/arcgis/portal/Portal';
import CrowdsourceBuilderController from 'mode!isBuilder?./CrowdsourceBuilderController';
import AppStore from 'babel/store/AppStore';
import AppMode from './mode/AppMode';
import AppConfig from './config/AppConfig';
import Layout from './layouts/Layout';
import User from './user/User';
import ContrbuteController from './contribute/ContrbuteController';
import EnvironmentConfig from 'babel/utils/arcgis/config/EnvironmentConfig';
import PortalActions from 'babel/actions/PortalActions';

export default class CrowdsourceController {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.createPortal = this.createPortal.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    // TODO configure from app state
    EnvironmentConfig.configSharingUrl();

    this.appMode = new AppMode();
    this.appConfig = new AppConfig();
    this.createPortal();
    this.layout = new Layout();
    this.user = new User();
    this.contrbuteController = new ContrbuteController();

    // Remove Loader
    $('#loadingIndicator').remove();

    if (lang.exists('appState.mode.isBuilder',this)) {
      this.builderController = new CrowdsourceBuilderController();
    }
  }

  updateAppState() {
    this.appState = AppStore.getState();
    this.updatePageTitle();
  }

  updatePageTitle() {
    const title = lang.getObject('appState.items.app.data.settings.components.header.title',false,this);

    if (title !== this.htmlTitle) {
      this.htmlTitle = title;
      $('title').html(title);
    }
  }

  createPortal() {
    if (lang.exists('appState.config.sharingurl',this)) {
      const portal = new Portal(this.appState.config.sharingurl.split('/sharing/')[0]);

      PortalActions.setPortalInstance(portal);
    }
  }

}
