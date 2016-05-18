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
    this.layoutControllers = {};

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);
  }

  updateAppState() {
    this.appState = AppStore.getState();

    const currentLayout = lang.getObject('appState.items.app.data.settings.layout.id',false,this);

    if (!this.checkedAdminPanel && !lang.getObject('appState.mode.isMobile',false,this) && !lang.getObject('appState.mode.isBuilder',false,this) && lang.getObject('appState.user.editor',false,this)) {
      this.checkedAdminPanel = true;
      AppActions.showComponent(componentNames.ADMIN_BANNER);
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
