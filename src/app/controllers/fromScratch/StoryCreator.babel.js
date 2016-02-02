import AppStore from 'babel/store/AppStore';
import BuilderActions from 'babel/actions/BuilderActions';

export default class StoryCreator {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    // TODO dynamic start
    this.openItemNameDialog();
  }

  updateAppState() {
    this.appState = AppStore.getState();
  }

  openItemNameDialog() {
    BuilderActions.changeDialog('itemNameScratch');
  }

}
