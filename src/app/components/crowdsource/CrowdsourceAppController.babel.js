import $ from 'jquery';
import 'velocity';
import EventsEmitter from 'lib/eventEmitter/EventEmitter';
import AppDataStore from 'babel/stores/AppDataStore';
import CrowdsourceAppStore from 'babel/stores/CrowdsourceAppStore';
import {Components} from 'babel/constants/CrowdsourceAppConstants';

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

    this.onStateChange = this.onStateChange.bind(this);
    this.updateAppView = this.updateAppView.bind(this);

    const defaults = {};

    this._settings = $.extend(true, {}, defaults, options);
  }

  get appState(){
    const appData = AppDataStore.appData;
    const features = CrowdsourceAppStore.features;
    const loadState = CrowdsourceAppStore.loadState;

    if (!this._ready && loadState.isReady) {
      this.onAppReady();
    }

    return {
      appData: appData.values,
      features,
      loadState
    };
  }

  mount() {
    $(window).on('resize',this.updateAppView.bind(this,{duration: 0}));
    AppDataStore.addChangeListener(this.onStateChange);
    CrowdsourceAppStore.addLoadStateListener(this.onStateChange);
    CrowdsourceAppStore.addChangeListener(this.onStateChange);
    CrowdsourceAppStore.addViewStateListener(this.updateAppView);
  }

  unmount() {
    $(window).off('resize',this.updateAppView);
    AppDataStore.removeChangeListener(this.onStateChange);
    CrowdsourceAppStore.removeLoadStateListener(this.onStateChange);
    CrowdsourceAppStore.removeChangeListener(this.onStateChange);
    CrowdsourceAppStore.removeViewStateListener(this.updateAppView);
  }

  onAppReady() {
    this._ready = true;
    CrowdsourceAppStore.removeLoadStateListener(this.onStateChange);
    $('#loadingOverlay').hide();
  }

  onStateChange() {
    const state = this.appState;

    this.emit('state-change',state);
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
