import $ from 'jquery';
import lang from 'dojo/_base/lang';
import Portal from 'babel/utils/arcgis/portal/Portal';
import StoryCreator from './fromScratch/StoryCreator';
import AppStore from 'babel/store/AppStore';
import PortalActions from 'babel/actions/PortalActions';
import UserActions from 'babel/actions/UserActions';

export default class CrowdsourceBuilderController {

  constructor(options) {

    const defaults = {};

    this.settings = $.extend(true,{},defaults,options);

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.verifyUserCredentials = this.verifyUserCredentials.bind(this);

    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    this.createPortal();
  }

  updateAppState() {
    this.appState = AppStore.getState();
  }

  createPortal() {
    if (this.settings.indexCfg) {
      const portal = new Portal(this.settings.indexCfg.sharingurl.split('/sharing/')[0],{
        signInOnLoad: true
      });

      portal.on('sign-in',() => {
        this.portal = portal;
        PortalActions.setPortalInstance(portal);
        this.verifyUserCredentials();
        if (lang.getObject('appState.mode.fromScratch',false,this)) {
          this.storyCreator = new StoryCreator();
        }
      });

    }
  }

  verifyUserCredentials() {
    if (this.portal) {
      // Check publisher permissions
      if (lang.getObject('appState.mode.isBuilder',false,this) && this.portal.userIsAppPublisher()) {
        UserActions.authenticateUser({
          publisher: true
        });
      } else {
        UserActions.authenticateUser({
          publisher: false
        });
      }
      // Check editor permissions
      if (!lang.getObject('appState.mode.fromScratch',false,this) && lang.getObject('appState.mode.isBuilder',false,this) && this.portal.userIsAppEditor()) {
        UserActions.authenticateUser({
          editor: true
        });
      } else {
        UserActions.authenticateUser({
          editor: false
        });
      }
    }
  }
}
