import lang from 'dojo/_base/lang';
import AppStore from 'babel/store/AppStore';
import StackedController from './stacked/StackedController';

export default class CrowdsourceController {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);

    this.layout = false;

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);
  }

  updateAppState() {
    this.appState = AppStore.getState();

    const currentLayout = lang.getObject('appState.items.app.data.settings.layout.id',false,this);

    if (this.layout !== currentLayout) {
      this.layout = currentLayout;
      switch (currentLayout) {
        case 'sidePanel':
          // this.layoutController = new SidePanelController();
          break;
        default:
          this.layoutController = new StackedController();
      }
    }
  }

}
