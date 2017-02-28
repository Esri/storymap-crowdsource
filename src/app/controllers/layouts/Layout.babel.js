import $ from 'jquery';
import lang from 'dojo/_base/lang';
import AppStore from 'babel/store/AppStore';
import AppActions from 'babel/actions/AppActions';
import StackedController from './stacked/StackedController';
import SidePanelController from './sidePanel/SidePanelController';
import componentNames from 'babel/constants/componentNames/ComponentNames';

export default class LayoutController {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);

    this.layout = false;
    this.resizedViewer = false;
    this.mapShown = false;
    this.adminShown = false;
    this.layoutControllers = {};

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    this.resizeViewer = function () {
      const height = $('.control-banner').height() || 0;

      $('.viewer').css({
        height: 'calc(100% - ' + height + 'px)'
      });
    };

    $(window).on('resize',this.resizeViewer);
  }

  updateAppState() {
    this.appState = AppStore.getState();

    const currentLayout = lang.getObject('appState.items.app.data.values.settings.layout.id',false,this);

    if (!this.checkedAdminPanel && !lang.getObject('appState.mode.isMobile',false,this) && !lang.getObject('appState.mode.isBuilder',false,this) && lang.getObject('appState.user.editor',false,this)) {
      this.checkedAdminPanel = true;
      AppActions.showComponent(componentNames.ADMIN_BANNER);
    }
    if (lang.getObject('appState.mode.isMobile',false,this) && lang.getObject('appState.app.layout.visibleComponents',false,this).indexOf(componentNames.ADMIN_BANNER) >= 0) {
      this.checkedAdminPanel = false;
      AppActions.hideComponent(componentNames.ADMIN_BANNER);
    }

    if (!this.resizedViewer && lang.getObject('appState.app.loading.data',false,this)) {
      this.resizeViewer();
    }

    if (this.resizeViewer) {
      this.resizeViewer();
    }

    if (!this.resizedViewer && lang.getObject('appState.app.loading.map',false,this)) {
      this.resizedViewer = true;
      this.resizeViewer();
    }

    if (lang.getObject('appState.app.layout.visibleComponents',false,this) && lang.getObject('appState.app.layout.visibleComponents',false,this).indexOf('admin-banner') < 0 && this.adminShown === true) {
      this.adminShown = false;
      setTimeout(() => {
        this.resizeViewer();
      },0);
    }

    if (lang.getObject('appState.app.layout.visibleComponents',false,this) && lang.getObject('appState.app.layout.visibleComponents',false,this).indexOf('admin-banner') >= 0 && this.adminShown === false) {
      this.adminShown = true;
      setTimeout(() => {
        this.resizeViewer();
      },0);
    }

    if (lang.getObject('appState.app.layout.visibleComponents',false,this) && lang.getObject('appState.app.layout.visibleComponents',false,this).indexOf('map') < 0 && this.mapShown === true) {
      this.mapShown = false;
      setTimeout(() => {
        this.resizeViewer();
      },100);
    }

    if (lang.getObject('appState.app.layout.visibleComponents',false,this) && lang.getObject('appState.app.layout.visibleComponents',false,this).indexOf('map') >= 0 && this.mapShown === false) {
      this.mapShown = true;
      setTimeout(() => {
        this.resizeViewer();
      },100);
    }

    if (this.layout !== currentLayout) {
      this.layout = currentLayout;

      Object.keys(this.layoutControllers).forEach((current) => {
        this.layoutControllers[current].disable();
      });

      switch (currentLayout) {
        case 'stacked':
          if (!this.layoutControllers[currentLayout]) {
            this.layoutControllers[currentLayout] = new StackedController();
          }
          this.layoutControllers[currentLayout].enable();
          break;
        default:
          if (!this.layoutControllers[currentLayout]) {
            this.layoutControllers[currentLayout] = new SidePanelController();
          }
          this.layoutControllers[currentLayout].enable();
      }
    }
  }

}
