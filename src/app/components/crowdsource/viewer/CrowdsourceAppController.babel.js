import $ from 'jquery';
import 'velocity';
import EventsEmitter from 'lib/eventEmitter/EventEmitter';
import AppDataStore from 'babel/stores/AppDataStore';
import CrowdsourceAppStore from 'babel/stores/CrowdsourceAppStore';
import CrowdsourceBuilderAppStore from 'mode!isBuilder?babel/stores/CrowdsourceBuilderAppStore';
import {Components} from 'babel/constants/CrowdsourceAppConstants';
import {Events} from 'babel/constants/CrowdsourceAppConstants';

const _animationDefaults = {
  duration: 1000,
  easing: 'easeInOutQuart'
};

const _showIntro = function showIntro(options) {
  const settings = $.extend(true,{},_animationDefaults,options);

  $('.crowdsource-app .splash').velocity({
    top: '0'
  },settings);
};

const _hideIntro = function hideIntro(options) {
  const settings = $.extend(true,{},_animationDefaults,options);

  $('.crowdsource-app .splash').velocity({
    top: '-100vh'
  },settings);
};

const _showMap = function showIntro(options) {
  const defaults = {
    container: $('.main-content')
  };
  const settings = $.extend(true,{},defaults,_animationDefaults,options);

  $('.content-pane.map-view').velocity('scroll',settings);
};

const _showGallery = function showIntro(options) {
  const defaults = {
    container: $('.main-content')
  };
  const settings = $.extend(true,{},defaults,_animationDefaults,options);

  $('.content-pane.gallery-view').velocity('scroll',settings);
};

export const CrowdsourceAppController = class CrowdsourceAppController extends EventsEmitter {

  constructor(options) {
    super(options);

    this.onChange = this.onChange.bind(this);
    this.updateAppView = this.updateAppView.bind(this);

    const defaults = {};

    this._settings = $.extend(true, {}, defaults, options);
  }

  get appState(){
    const appData = AppDataStore.appData;
    const loadState = CrowdsourceAppStore.loadState;
    const builderBannerVisible = CrowdsourceBuilderAppStore ? CrowdsourceBuilderAppStore.bannerVisible : false;

    if (!this._ready && loadState.isReady) {
      this.onAppReady();
    }

    return {
      appData,
      builderBannerVisible,
      features: CrowdsourceAppStore.features,
      contributing: CrowdsourceAppStore.contributing,
      loadState
    };
  }

  mount() {
    // Add listeners
    $(window).on('resize',this.updateAppView.bind(this,{duration: 0}));
    AppDataStore.addChangeListener(this.onChange);
    CrowdsourceAppStore.addChangeListener(this.onChange);
    if (CrowdsourceBuilderAppStore) {
      CrowdsourceBuilderAppStore.addChangeListener(this.onChange);
    }
  }

  unmount() {
    // Remover listeners
    $(window).off('resize',this.updateAppView);
    AppDataStore.removeChangeListener(this.onChange);
    CrowdsourceAppStore.removeChangeListener(this.onChange);
    if (CrowdsourceBuilderAppStore) {
      CrowdsourceBuilderAppStore.addChangeListener(this.onChange);
    }
  }

  onAppReady() {
    this._ready = true;
    $('#loadingOverlay').hide();
  }

  onChange(type) {
    if (type === Events.appState.VIEW_STATE || type === Events.appState.CONTRIBUTE) {
      this.updateAppView();
    }
    if (type !== Events.appState.VIEW_STATE) {
      const state = this.appState;

      this.emit('state-change',state);
    }
  }

  updateAppView(options) {
    const viewState = CrowdsourceAppStore.viewState;

    switch (viewState.current) {
      case Components.names.INTRO:
        _showIntro(options);
        break;
      case Components.names.MAP:
        if (viewState.previous === Components.names.INTRO) {
          _showMap({duration: 0});
          _hideIntro(options);
        } else {
          _showMap(options);
        }
        break;
      case Components.names.GALLERY:
        if (viewState.previous === Components.names.INTRO) {
          _showGallery({duration: 0});
          _hideIntro(options);
        } else {
          _showGallery(options);
        }
        break;
    }
  }

};

export default CrowdsourceAppController;
