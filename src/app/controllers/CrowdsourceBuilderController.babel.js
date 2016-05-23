import $ from 'jquery';
import lang from 'dojo/_base/lang';
import Logger from 'babel/utils/logging/Logger';
import StoryCreator from './fromScratch/StoryCreator';
import AppItemAttachments from './builder/appItemAttachments/AppItemAttachments';
import CrowdsourceReviewController from './builder/review/CrowdsourceReviewController';
import ComponentsController from './builder/components/Components';
import AppActions from 'babel/actions/AppActions';
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
    this.checkAppShareChange = this.checkAppShareChange.bind(this);

    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    // Load extra builder controllers
    new AppItemAttachments();
    new CrowdsourceReviewController();
    new ComponentsController();

    window.onbeforeunload = () => {
      if (!lang.getObject('appState.mode.fromScratch',false,this) && this.lastSaveAppData
        && (lang.getObject('appState.builder.saving',false,this)
          || this.lastSaveAppData !== JSON.stringify(lang.getObject('appState.items.app',false,this)))) {
        return builderText.banner.hintText.leavingBeforeSave;
      }
    };
  }

  updateAppState() {
    this.appState = AppStore.getState();
    const fromScratch = lang.getObject('appState.mode.fromScratch',false,this);

    if (!this.loadStarted && lang.getObject('appState.user.publisher',false,this) && fromScratch) {
      this.createNewStory();
    } else if (!fromScratch && lang.getObject('appState.app.loading.data',false,this)) {
      this.checkAppStateChange();
      this.checkAppShareChange();
    }
  }

  createNewStory() {
    this.loadStarted = true;
    new StoryCreator();
  }

  checkAppStateChange(force) {
    const appDataFromState = JSON.stringify(lang.getObject('appState.items.app',false,this));

    if (this.currentAppData === undefined) {
      this.currentAppData = appDataFromState;
      this.lastSaveAppData = appDataFromState;
    } else if (force || ((appDataFromState !== this.currentAppData || this.currentAppData !== this.lastSaveAppData) && !lang.getObject('appState.builder.saving',false,this))) {
      this.currentAppData = appDataFromState;
      this.lastSaveAppData = appDataFromState;
      BuilderActions.updateSaveStatus(true);

      const portal = lang.getObject('appState.app.portal',false,this);

      portal.saveApp().then((res) => {
        if (res.success) {
          AppActions.removeNotifications({
            id: 'builderNotfication_saveAppError'
          });
          BuilderActions.updateSaveStatus(false);
          this.checkAppStateChange();
        }
        // TODO add visibile error dialog to user
      }, (err) => {
        if (err.toString().search('Unable to load')) {
          AppActions.addNotifications({
            id: 'builderNotfication_saveAppError',
            type: 'error',
            content: builderText.errors.saving.checkInternet
          });
          setTimeout(this.checkAppStateChange.bind(this,true),10000);
        } else {
          AppActions.addNotifications({
            id: 'builderNotfication_saveAppError',
            type: 'error',
            content: builderText.errors.saving.unknown
          });
        }
        _onError(err);
      });

    } else if (appDataFromState !== this.currentAppData) {
      this.currentAppData = appDataFromState;
    }
  }

  checkAppShareChange() {
    const startingShare = lang.getObject('appState.items.app.item.access',false,this);
    const currentShare = lang.getObject('appState.builder.appShare',false,this);
    const sharePending = lang.getObject('appState.builder.appSharePending',false,this);

    if (this.currentShare === undefined && startingShare) {
      this.currentShare = startingShare;
      BuilderActions.updateShare(this.currentShare);
    } else if (this.currentShare !== currentShare && !sharePending) {
      this.prevShare = this.currentShare;
      this.currentShare = currentShare;

      BuilderActions.updateSharingStatus(true);

      const portal = lang.getObject('appState.app.portal',false,this);

      portal.shareItems({
        org: this.currentShare !== 'private' ? true : false,
        everyone: this.currentShare === 'public' ? true : false
      }).then((res) => {
        const errors = res.results.reduce((prev,current) => {
          if (current.success) {
            return prev;
          }
          return prev.concat(current.itemId);
        },[]);

        if (errors.length > 0){
          AppActions.addNotifications({
            id: 'builderNotfication_shareAppError',
            type: 'error',
            content: builderText.errors.shareItems.notShared + ': ' + errors.toString().replace(/,/g, ', ')
          });

          setTimeout(() => {
            AppActions.removeNotifications({
              id: 'builderNotfication_shareAppError'
            });
          },7000);

          if (errors.indexOf(lang.getObject('appState.items.app.item.id',false,this)) >= 0) {
            BuilderActions.updateShare(this.prevShare);
            this.currentShare = this.prevShare;
          }
        }

        BuilderActions.updateSharingStatus(false);
      });

    }
  }
}
