import lang from 'dojo/_base/lang';
import AppStore from 'babel/store/AppStore';
import AppActions from 'babel/actions/AppActions';

export default class ContributeController {

  constructor() {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.checkContributeView = this.checkContributeView.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);
  }

  updateAppState() {
    this.appState = AppStore.getState();

    this.checkContributeView();
  }

  checkContributeView() {
    if (lang.getObject('appState.app.contributing.active',false,this) && lang.getObject('appState.app.contributing.view',false,this) === 'login' && lang.getObject('appState.user.contributor',false,this)) {
      AppActions.updateContributeState({
        view: 'form'
      });
    }
  }

}
