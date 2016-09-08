import $ from 'jquery';
import React from 'react'; //eslint-disable-line no-unused-vars
import lang from 'dojo/_base/lang';
import URI from 'lib/urijs/src/URI';
import Logger from 'babel/utils/logging/Logger';
import ArcgisItem from 'babel/utils/arcgis/items/Item';
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
    this.startSaving = this.startSaving.bind(this);
    this.finishSaving = this.finishSaving.bind(this);
    this.checkAppStateChange = this.checkAppStateChange.bind(this);
    this.checkAppShareChange = this.checkAppShareChange.bind(this);
    this.checkWebmapStateChange = this.checkWebmapStateChange.bind(this);

    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    // Load extra builder controllers
    new AppItemAttachments();
    new CrowdsourceReviewController();
    new ComponentsController();

    window.onbeforeunload = () => {
      if (!lang.getObject('appState.mode.fromScratch',false,this) && (this.lastSaveAppData || this.lastSaveWebmapData)
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
      this.checkWebmapStateChange();
    }

    if (!this.webmapLoaded && lang.getObject('appState.app.loading.data',false,this) && lang.getObject('appState.items.app.data.values.settings.components.map.webmap',false,this)) {
      this.webmapLoaded = true;
      ArcgisItem.getDataById({
        item: 'webmap',
        id: lang.getObject('appState.items.app.data.values.settings.components.map.webmap',false,this)
      });
    }
  }

  createNewStory() {
    this.loadStarted = true;
    new StoryCreator();
  }

  startSaving(item) {
    if (!this.itemsSaving) {
      this.itemsSaving = {};
    }

    this.itemsSaving[item] = true;
    BuilderActions.updateSaveStatus(true);
  }

  finishSaving(item) {
    if (this.itemsSaving) {
      this.itemsSaving[item] = false;

      const stillSaving = Object.keys(this.itemsSaving).filter((current) => {
        return this.itemsSaving[current] === true;
      });

      if (stillSaving.length === 0) {
        BuilderActions.updateSaveStatus(false);
      }
    }
  }

  checkAppStateChange(force) {
    const appDataFromState = JSON.stringify(lang.getObject('appState.items.app',false,this));

    if (this.currentAppData === undefined) {
      this.currentAppData = appDataFromState;
      this.lastSaveAppData = appDataFromState;
      const updatedDate = lang.getObject('appState.items.app.data.values.properties.versionUpdated',false,this);
      const currentDate = new Date().getTime();

      if (currentDate - updatedDate < 60000) {
        this.checkAppStateChange(true);
      }
    } else if (force || ((appDataFromState !== this.currentAppData || this.currentAppData !== this.lastSaveAppData) && !lang.getObject('appState.builder.saving',false,this))) {
      this.currentAppData = appDataFromState;
      this.lastSaveAppData = appDataFromState;
      this.startSaving('app');

      const portal = lang.getObject('appState.app.portal',false,this);

      portal.saveApp().then((res) => {
        if (res.success) {
          AppActions.removeNotifications({
            id: 'builderNotfication_saveAppError'
          });
          this.finishSaving('app');
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
          const baseURL = new URI(portal.urlKey + '.' + portal.customBaseUrl + '/home/item.html').protocol('https');
          let errorItemsString = '';

          const hideShareErrorMessage = function() {
            AppActions.removeNotifications({
              id: 'builderNotfication_shareAppError'
            });
          };

          errors.forEach((item,index) => {
            if (index === 0) {
              errorItemsString =  '<a href="' + baseURL.search({id: item}).href() + '" target="_blank">' + item + '</a>';
            } else if (index === errors.length - 1) {
              errorItemsString =  '<a href="' + baseURL.search({id: item}).href() + '" target="_blank">' + item + '</a>';
            } else {
              errorItemsString =  ', <a href="' + baseURL.search({id: item}).href() + '" target="_blank">' + item + '</a>';
            }
          });

          AppActions.addNotifications({
            id: 'builderNotfication_shareAppError',
            type: 'error',
            content: (
              <div>
                <p><strong>{builderText.errors.shareItems.notShared.title}</strong></p>
                <p>
                  {builderText.errors.shareItems.notShared.body + ': '}
                  <span dangerouslySetInnerHTML={{__html: errorItemsString}}></span>
                </p>
                <button className="btn btn-primary" onClick={hideShareErrorMessage}>{builderText.errors.shareItems.notShared.confirmBtn}</button>
              </div>
            )
          });

          if (errors.indexOf(lang.getObject('appState.items.app.item.id',false,this)) >= 0) {
            BuilderActions.updateShare(this.prevShare);
            this.currentShare = this.prevShare;
          }
        }

        BuilderActions.updateSharingStatus(false);
      });

    }
  }

  checkWebmapStateChange(force) {
    const webmapDataFromState = JSON.stringify(lang.getObject('appState.items.webmap',false,this));

    if (this.currentWebmapData === undefined || !lang.getObject('item.access',false,JSON.parse(this.currentWebmapData))) {
      this.currentWebmapData = webmapDataFromState;
      this.lastSaveWebmapData = webmapDataFromState;
    } else if (force || ((webmapDataFromState !== this.currentWebmapData || this.currentWebmapData !== this.lastSaveWebmapData) && !lang.getObject('appState.builder.saving',false,this))) {
      this.currentWebmapData = webmapDataFromState;
      this.lastSaveWebmapData = webmapDataFromState;
      this.startSaving('webmap');

      const portal = lang.getObject('appState.app.portal',false,this);

      portal.saveWebmap().then((res) => {
        if (res.success) {
          AppActions.removeNotifications({
            id: 'builderNotfication_saveWebmapError'
          });
          this.finishSaving('webmap');
          this.checkWebmapStateChange();
        }
        // TODO add visibile error dialog to user
      }, (err) => {
        if (err.toString().search('Unable to load')) {
          AppActions.addNotifications({
            id: 'builderNotfication_saveWebmapError',
            type: 'error',
            content: builderText.errors.saving.checkInternet
          });
          setTimeout(this.checkWebmapStateChange.bind(this,true),10000);
        } else {
          AppActions.addNotifications({
            id: 'builderNotfication_saveWebmapError',
            type: 'error',
            content: builderText.errors.saving.unknown
          });
        }
        _onError(err);
      });

    } else if (webmapDataFromState !== this.currentWebmapData) {
      this.currentWebmapData = webmapDataFromState;
    }
  }
}
