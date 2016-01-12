import $ from 'jquery';
import React from 'react'; //eslint-disable-line no-unused-vars
import EventsEmitter from 'lib/eventEmitter/EventEmitter';
import AppDataStore from 'babel/stores/AppDataStore';
import PortalStore from 'babel/stores/PortalStore';
import CrowdsourceAppStore from 'babel/stores/CrowdsourceAppStore';
import CrowdsourceBuilderAppStore from 'babel/stores/CrowdsourceBuilderAppStore';
// import {Components} from 'babel/constants/CrowdsourceAppConstants';
// import {Events} from 'babel/constants/CrowdsourceAppConstants';

export const CrowdsourceAppController = class CrowdsourceAppController extends EventsEmitter {

  constructor(options) {
    super(options);

    this.onChange = this.onChange.bind(this);

    const defaults = {};

    this._settings = $.extend(true, {}, defaults, options);
  }

  get appState() {
    const activeModal = CrowdsourceBuilderAppStore.activeModal;
    const appData = CrowdsourceBuilderAppStore.scratchAppData || AppDataStore.appData;
    const itemNameErrors = CrowdsourceAppStore ? CrowdsourceAppStore.getFormErrors('BUILDER_SETTINGS_ITEM_NAMES') : false;
    const authorized = PortalStore.isAuthorized;
    let continueDisabled = false;
    let hideBannerContent = false;

    if (activeModal) {
      hideBannerContent = true;
    }
    if (!authorized) {
      hideBannerContent = true;
    }
    if (activeModal === 'itemNameScratch' && ((itemNameErrors && itemNameErrors > 0) || !appData.app.item.title || !appData.webmap.item.title || !appData.layer.item.title)) {
      continueDisabled = true;
    }

    return {
      appData: appData.values || appData,
      activeModal,
      continueDisabled,
      hideBannerContent,
      portal: PortalStore.portalInstance,
      userFolders: PortalStore.userFolders
    };
  }

  mount() {
    // Add listeners
    AppDataStore.addChangeListener(this.onChange);
    PortalStore.addChangeListener(this.onChange);
    CrowdsourceAppStore.addChangeListener(this.onChange);
    CrowdsourceBuilderAppStore.addChangeListener(this.onChange);
  }

  unmount() {
    // Remover listeners
    AppDataStore.removeChangeListener(this.onChange);
    PortalStore.removeChangeListener(this.onChange);
    CrowdsourceAppStore.addChangeListener(this.onChange);
    CrowdsourceBuilderAppStore.addChangeListener(this.onChange);
  }

  onChange(type) {
    switch (type) {
      default:
        const state = this.appState;

        if (state.activeModal === 'itemNameScratch' ) {
          // Remove Loader
          $('#loadingIndicator').remove();
        }

        this.emit('state-change',state);
    }
  }

};

export default CrowdsourceAppController;
