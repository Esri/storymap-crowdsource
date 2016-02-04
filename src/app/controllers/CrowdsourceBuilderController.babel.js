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

    if (lang.getObject('appState.mode.isBuilder',false,this) && !lang.getObject('appState.user.editor',false,this) && !lang.getObject('appState.mode.fromScratch',false,this) && lang.getObject('appState.app.loading.data',false,this)) {
      this.verifyUserCredentials();
    }
  }

  createPortal() {
    if (this.appState.config) {
      const portal = new Portal(this.appState.config.sharingurl.split('/sharing/')[0],{
        signInOnLoad: true
      });

      portal.on('sign-in',() => {
        this.portal = portal;
        PortalActions.setPortalInstance(portal);
        if (lang.getObject('appState.mode.fromScratch',false,this)) {
          this.verifyUserCredentials();
          this.storyCreator = new StoryCreator();
        }
      });

    }
  }

  verifyUserCredentials() {
    if (this.portal) {
      const userPermissions = {
        publisher: false,
        editor: false
      };

      if (!lang.getObject('appState.mode.fromScratch',false,this) && lang.getObject('appState.mode.isBuilder',false,this) && this.portal.userIsAppEditor() && this.portal.userIsAppPublisher()) {
        userPermissions.publisher = true;
        userPermissions.editor = true;
      } else if (!lang.getObject('appState.mode.fromScratch',false,this) && lang.getObject('appState.mode.isBuilder',false,this) && this.portal.userIsAppEditor()) {
        userPermissions.editor = true;
      } else if (lang.getObject('appState.mode.isBuilder',false,this) && this.portal.userIsAppPublisher()) {
        userPermissions.publisher = true;
      }

      if (lang.getObject('appState.user.editor',false,this) !== userPermissions.editor || lang.getObject('appState.user.publisher',false,this) !== userPermissions.publisher) {
        UserActions.authenticateUser(userPermissions);
      }
    }
  }
}
