import $ from 'jquery';
import lang from 'dojo/_base/lang';
import AppStore from 'babel/store/AppStore';
import AppActions from 'babel/actions/AppActions';
import MapActions from 'babel/actions/MapActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import 'velocity';

const _animationDefaults = {
  duration: 1000,
  easing: 'easeInOutQuart'
};

export default class SidePanelController {

  constructor() {

    this.enabled = false;

    // Autobind methods
    this.enable = this.enable.bind(this);
    this.disable = this.disable.bind(this);
    this.checkOverlayComponentVisibility = this.checkOverlayComponentVisibility.bind(this);
    this.updateAppState = this.updateAppState.bind(this);
    this.updateAppView = this.updateAppView.bind(this);
    this.refreshDisplay = this.refreshDisplay.bind(this);
    this.showIntro = this.showIntro.bind(this);
    this.hideIntro = this.hideIntro.bind(this);
    this.showMap = this.showMap.bind(this);
    this.showGallery = this.showGallery.bind(this);

    // Subscribe to state changes
    this.visibleComponents = [];

    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);
  }

  enable() {
    this.enabled = true;

    // Initial State
    AppActions.showComponent(componentNames.INTRO);

    $(window).on('resize',this.refreshDisplay.bind(this,{duration: 0}));
    this.updateAppState();
  }

  disable() {
    this.enabled = false;
    $(window).off('resize',this.refreshDisplay);
  }

  updateAppState() {
    if (this.enabled) {
      this.appState = AppStore.getState();

      this.updateAppView();
      this.checkOverlayComponentVisibility();
    }
  }

  checkOverlayComponentVisibility() {
    const featuresInExtent = lang.getObject('appState.app.map.featuresInExtent',false,this);
    const selectedFeatureId = lang.getObject('appState.app.map.selectedFeatureId',false,this);
    const contributing = lang.getObject('appState.app.contributing.active',false,this);

    if (!contributing && selectedFeatureId && featuresInExtent.length > 0 && this.visibleComponents.indexOf(componentNames.SELECTED_SHARES) < 0) {
      AppActions.changeComponentsVisibility({show: componentNames.SELECTED_SHARES, hide: componentNames.INTRO});
    } else if (!selectedFeatureId && this.visibleComponents.indexOf(componentNames.SELECTED_SHARES) >= 0) {
      AppActions.hideComponent(componentNames.SELECTED_SHARES);
    }

    if (contributing && this.visibleComponents.indexOf(componentNames.CONTRIBUTE) < 0) {
      AppActions.changeComponentsVisibility({show: [componentNames.CONTRIBUTE,componentNames.MAP], hide: [componentNames.INTRO, componentNames.SELECTED_SHARES]});
    } else if (!contributing && this.visibleComponents.indexOf(componentNames.CONTRIBUTE) >= 0) {
      AppActions.hideComponent(componentNames.CONTRIBUTE);
    }
  }

  refreshDisplay(options) {
    this.visibleComponents.forEach((component) => {

      switch (component) {
        case componentNames.INTRO:
          this.showIntro(options);
          break;
        case componentNames.MAP:
          this.showMap(options);
          break;
        case componentNames.GALLERY:
          this.showGallery(options);
          break;
      }

    });
  }

  updateAppView(options) {
    const visibleComponents = lang.getObject('appState.app.layout.visibleComponents',false,this);
    const isMobile = lang.getObject('appState.mode.isMobile',false,this);

    if (JSON.stringify(visibleComponents) !== JSON.stringify(this.visibleComponents)) {
      this.prevVisibleComponents = [].concat(this.visibleComponents);
      this.visibleComponents = [].concat(visibleComponents);

      const adds = this.visibleComponents.reduce((prev,current) => {
        if (this.prevVisibleComponents.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },[]);

      const removes = this.prevVisibleComponents.reduce((prev,current) => {
        if (this.visibleComponents.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },[]);

      adds.forEach((component) => {

        switch (component) {
          case componentNames.INTRO:
            this.showIntro(options);
            MapActions.selectFeature(false);
            AppActions.hideComponent([componentNames.MAP,componentNames.GALLERY,componentNames.SELECTED_SHARES]);
            break;
          case componentNames.MAP:
            this.showMap(options);
            const hideComponents = [componentNames.INTRO];
            const showComponents = [];

            if (isMobile) {
              hideComponents.push(componentNames.GALLERY);
            } else {
              showComponents.push(componentNames.GALLERY);
            }
            AppActions.hideComponent(hideComponents);
            if (showComponents.length > 0) {
              AppActions.showComponent(showComponents);
            }
            break;
          case componentNames.GALLERY:
            if (this.visibleComponents.indexOf(componentNames.CONTRIBUTE) < 0) {
              this.showGallery(options);
              const hideComponents = [componentNames.INTRO];
              const showComponents = [];

              if (isMobile) {
                hideComponents.push(componentNames.MAP);
              } else {
                showComponents.push(componentNames.MAP);
              }
              AppActions.hideComponent(hideComponents);
              if (showComponents.length > 0) {
                AppActions.showComponent(showComponents);
              }
            } else {
              AppActions.hideComponent(componentNames.GALLERY);
            }
            break;
        }

      });

      removes.forEach((component) => {

        switch (component) {
          case componentNames.INTRO:
            this.hideIntro(options);
            if (this.visibleComponents.indexOf(componentNames.MAP) < 0 && this.visibleComponents.indexOf(componentNames.GALLERY) < 0 ) {
              if (isMobile) {
                AppActions.showComponent(componentNames.MAP);
              } else {
                AppActions.showComponent([componentNames.MAP,componentNames.GALLERY]);
              }
            }
            break;
        }

      });
    } else if (isMobile && visibleComponents.indexOf(componentNames.MAP) >= 0 && visibleComponents.indexOf(componentNames.GALLERY) >= 0) {
      this.prevVisibleComponents = [].concat(this.visibleComponents);
      this.visibleComponents = [].concat(visibleComponents);

      this.showMap(options);
      AppActions.hideComponent(componentNames.GALLERY);
    } else if (!isMobile &&
      ((visibleComponents.indexOf(componentNames.MAP) >= 0 && visibleComponents.indexOf(componentNames.GALLERY) < 0) ||
      (visibleComponents.indexOf(componentNames.MAP) < 0 && visibleComponents.indexOf(componentNames.GALLERY) >= 0))) {
      AppActions.showComponent([componentNames.MAP,componentNames.GALLERY]);
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
      container: $('.scroll-container')
    };
    const settings = $.extend(true,{},defaults,_animationDefaults,options);

    $('.content-pane.map-pane').velocity('scroll',settings);
  }

  showGallery(options) {
    const defaults = {
      container: $('.scroll-container')
    };
    const settings = $.extend(true,{},defaults,_animationDefaults,options);

    $('.content-pane.gallery-pane').velocity('scroll',settings);
  }

}
