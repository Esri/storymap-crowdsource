import $ from 'jquery';
import lang from 'dojo/_base/lang';
import URI from 'lib/urijs/src/URI';
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
import ConfigActions from 'babel/actions/ConfigActions';

export default class CrowdsourceController {

  constructor() {
    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.createPortal = this.createPortal.bind(this);
    this.disableGlobalDragAndDrop = this.disableGlobalDragAndDrop.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    const location = new URI(window.location);

    if (location.filename() !== 'index.html') {
      window.history.replaceState({},null,location.filename('index.html').href());
    }

    this.appMode = new AppMode();
    this.appConfig = new AppConfig();

    if (window.location.protocol === 'https:') {
      this.createPortal();
      this.layout = new Layout();
      this.user = new User();
      this.contrbuteController = new ContrbuteController();
    }

    this.disableGlobalDragAndDrop();

    // Remove Loader
    $('#loadingIndicator').remove();

    if (lang.exists('appState.mode.isBuilder',this)) {
      this.builderController = new CrowdsourceBuilderController();
    }
  }

  updateAppState() {
    this.appState = AppStore.getState();
    this.updatePageTitle();

    if (!this.environmentConfigured && lang.getObject('appState.config.sharingurl',false,this)) {
      this.environmentConfigured = true;
      EnvironmentConfig.configSharingUrl(lang.getObject('appState.config.sharingurl',false,this));
    }
  }

  updatePageTitle() {
    const title = lang.getObject('appState.items.app.data.values.settings.components.intro.title',false,this);

    if (title !== this.htmlTitle) {
      this.htmlTitle = title;
      $('title').html(title);
    }
  }

  createPortal() {
    if (lang.exists('appState.config.sharingurl',this)) {

      const loadPortal = function(portalUrl) {
        const portal = new Portal(portalUrl);

        portal.on('load',() => {

          const portalHost = new URI(portal.portalUrl).hostname();
          const portalRootHost = portal.portalHostname;

          if (portalHost === portalRootHost) {
            const socialAvailable = portalRootHost === 'qaext.arcgis.com' || portalRootHost === 'devext.arcgis.com' || portalRootHost === 'www.arcgis.com' ? true : false;

            PortalActions.setPortalInstance(portal);
            ConfigActions.updateConfig({
              allowSocialLogin: socialAvailable
            });
          } else {
            loadPortal(new URI(portalRootHost).protocol('https').href());
          }

        });
      };

      loadPortal(this.appState.config.sharingurl.split('/sharing/')[0]);

    }
  }

  disableGlobalDragAndDrop() {
    window.addEventListener('dragover',(e) => {
      if (e) {
        e.preventDefault();
      }
    });

    window.addEventListener('drop',(e) => {
      if (e) {
        e.preventDefault();
      }
    });
  }

}
