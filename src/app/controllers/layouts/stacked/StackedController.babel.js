import $ from 'jquery';
import lang from 'dojo/_base/lang';
import AppStore from 'babel/store/AppStore';
import AppActions from 'babel/actions/AppActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import 'velocity';

const _animationDefaults = {
  duration: 1000,
  easing: 'easeInOutQuart'
};

export default class StackedController {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.updateAppView = this.updateAppView.bind(this);
    this.showIntro = this.showIntro.bind(this);
    this.hideIntro = this.hideIntro.bind(this);
    this.showMap = this.showMap.bind(this);
    this.showGallery = this.showGallery.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    AppActions.updateLayout({view: componentNames.INTRO});
    $(window).on('resize',this.updateAppView.bind(this,{duration: 0},true));
  }

  updateAppState() {
    this.appState = AppStore.getState();

    this.updateAppView();
  }

  updateAppView(options,forceUpdate) {
    const currentView = lang.getObject('appState.app.layoutState.view',false,this);
    const activeContribute = lang.getObject('appState.app.contributing.active',false,this);

    if (forceUpdate || this.view !== currentView || (activeContribute && currentView !== componentNames.MAP)) {
      this.prevView = this.view;
      // Set new current view
      if (activeContribute && currentView !== componentNames.MAP) {
        this.view = componentNames.MAP;
      } else {
        this.view = currentView;
      }

      switch (this.view) {
        case componentNames.INTRO:
          this.showIntro(options);
          break;
        case componentNames.MAP:
          if (this.prevView === componentNames.INTRO) {
            this.showMap({duration: 0});
            this.hideIntro(options);
          } else {
            this.showMap(options);
          }
          break;
        case componentNames.GALLERY:
          if (this.prevView === componentNames.INTRO) {
            this.showGallery({duration: 0});
            this.hideIntro(options);
          } else {
            this.showGallery(options);
          }
          break;
      }
      if (currentView !== this.view) {
        AppActions.updateLayout({view: this.view});
      }
    }
  }

  showIntro(options) {
    const settings = $.extend(true,{},_animationDefaults,options);

    $('.crowdsource-app .splash').velocity({
      top: '0'
    },settings);
  }

  hideIntro(options) {
    const settings = $.extend(true,{},_animationDefaults,options);

    $('.crowdsource-app .splash').velocity({
      top: '-100vh'
    },settings);
  }

  showMap(options) {
    const defaults = {
      container: $('.main-content')
    };
    const settings = $.extend(true,{},defaults,_animationDefaults,options);

    $('.content-pane.map-view').velocity('scroll',settings);
  }

  showGallery(options) {
    const defaults = {
      container: $('.main-content')
    };
    const settings = $.extend(true,{},defaults,_animationDefaults,options);

    $('.content-pane.gallery-view').velocity('scroll',settings);
  }

}
