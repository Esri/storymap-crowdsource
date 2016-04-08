import $ from 'jquery';
import lang from 'dojo/_base/lang';
import Logger from 'babel/utils/logging/Logger';
import StoryCreator from './fromScratch/StoryCreator';
import BuilderActions from 'babel/actions/BuilderActions';
import AppStore from 'babel/store/AppStore';
import builderText from 'i18n!translations/builder/nls/template';

const _logger = new Logger({source: 'Crowdsource Builder Controller'});

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

export default class CrowdsourceBuilderController {

  constructor(options) {

    const defaults = {};

    this.settings = $.extend(true,{},defaults,options);

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.createNewStory = this.createNewStory.bind(this);
    this.checkAppStateChange = this.checkAppStateChange.bind(this);

    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    window.onbeforeunload = () => {
      if (lang.getObject('appState.builder.saving',false,this) || this.lastSaveAppData !== JSON.stringify(lang.getObject('appState.items.app',false,this))) {
        return builderText.banner.hintText.leavingBeforeSave;
      }
    };
  }

  updateAppState() {
    this.appState = AppStore.getState();
    const fromScratch =lang.getObject('appState.mode.fromScratch',false,this);

    if (!this.loadStarted && lang.getObject('appState.user.publisher',false,this) && fromScratch) {
      this.createNewStory();
    } else if (!fromScratch && lang.getObject('appState.app.loading.data',false,this)) {
      this.checkAppStateChange();
    }
  }

  createNewStory() {
    this.loadStarted = true;
    new StoryCreator();
  }

  checkAppStateChange() {
    const appDataFromState = JSON.stringify(lang.getObject('appState.items.app',false,this));

    if (this.currentAppData === undefined) {
      this.currentAppData = appDataFromState;
      this.lastSaveAppData = appDataFromState;
    } else if ((appDataFromState !== this.currentAppData || this.currentAppData !== this.lastSaveAppData) && !lang.getObject('appState.builder.saving',false,this)) {
      this.currentAppData = appDataFromState;
      this.lastSaveAppData = appDataFromState;
      BuilderActions.updateSaveStatus(true);

      const portal = lang.getObject('appState.app.portal',false,this);

      portal.saveApp().then((res) => {
        if (res.success) {
          BuilderActions.updateSaveStatus(false);
          this.checkAppStateChange();
        }
        // TODO add visibile error dialog to user
      },_onError);

    } else if (appDataFromState !== this.currentAppData) {
      this.currentAppData = appDataFromState;
    }
  }
}
