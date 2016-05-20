import $ from 'jquery';
import lang from 'dojo/_base/lang';
import UrlUtils from 'esri/urlUtils';
import AppStore from 'babel/store/AppStore';
import ModeActions from 'babel/actions/ModeActions';

export default class AppMode {
  constructor () {

    this.setAppMode(this.urlQuery);
    ModeActions.updateMode({
      isHosted: document.location.pathname.indexOf('/apps/') >= 0 || document.location.pathname.indexOf('/home/') >= 0,
      isMobile: window.innerWidth < 768
    });

    // Autobind methods
    this.onWindowResize = this.onWindowResize.bind(this);
    this.updateAppState = this.updateAppState.bind(this);

    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    $(window).resize(this.onWindowResize);

  }

  get urlQuery() {
    return UrlUtils.urlToObject(window.location.href).query;
  }

  updateAppState() {
    this.appState = AppStore.getState();
  }

  getValidatedMode(modeObj) {
    const modes = {};

    if (modeObj) {
      Object.keys(modeObj).forEach((current) => {
        switch (current.toLowerCase()) {
          case 'fromscratch':
            modes.fromScratch = true;
            modes.isBuilder = true;
            break;
          case 'edit':
            modes.isBuilder = true;
            break;
          case 'debug':
            modes.isDebug = true;
            break;
        }
      });
    }

    return modes;
  }

  setAppMode(modeObj) {
    const validModeObj = this.getValidatedMode(modeObj);

    ModeActions.updateMode(validModeObj);
  }

  onWindowResize() {
    const isMobile = lang.getObject('appState.mode.isMobile',false,this);

    if (window.innerWidth < 768 && !isMobile) {
      ModeActions.updateMode({isMobile: true});
    } else if (window.innerWidth > 767 && isMobile) {
      ModeActions.updateMode({isMobile: false});
    }
  }
}
