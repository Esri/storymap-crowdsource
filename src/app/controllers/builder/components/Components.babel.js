import lang from 'dojo/_base/lang';
import AppStore from 'babel/store/AppStore';
import AppActions from 'babel/actions/AppActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import 'velocity';

export default class StackedController {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.updateVisibleComponents = this.updateVisibleComponents.bind(this);

    // Subscribe to state changes
    this.visibleComponents = [];

    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);
  }

  updateAppState() {
    this.appState = AppStore.getState();

    this.updateVisibleComponents();
  }

  updateVisibleComponents() {
    const visibleComponents = lang.getObject('appState.app.layout.visibleComponents',false,this);

    if (JSON.stringify(visibleComponents) !== JSON.stringify(this.visibleComponents)) {
      this.prevVisibleComponents = [].concat(this.visibleComponents);
      this.visibleComponents = [].concat(visibleComponents);

      const adds = this.visibleComponents.reduce((prev,current) => {
        if (this.prevVisibleComponents.indexOf(current) < 0) {
          return prev.concat(current);
        }
        return prev;
      },[]);

      // const removes = this.prevVisibleComponents.reduce((prev,current) => {
      //   if (this.visibleComponents.indexOf(current) < 0) {
      //     return prev.concat(current);
      //   }
      //   return prev;
      // },[]);

      adds.forEach((component) => {

        switch (component) {
          case componentNames.SIDE_PANEL_SETTINGS:
            AppActions.hideComponent([componentNames.SIDE_PANEL_HELP]);
            break;
          case componentNames.SIDE_PANEL_HELP:
            AppActions.hideComponent([componentNames.SIDE_PANEL_SETTINGS]);
            break;
          case componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH + componentNames.SPS_INTRO_SPLASH:
            if (this.visibleComponents.indexOf(componentNames.INTRO) < 0) {
              AppActions.showComponent([componentNames.INTRO]);
            }
            break;
        }

      });

      // removes.forEach((component) => {
      // });
    }

  }

}
