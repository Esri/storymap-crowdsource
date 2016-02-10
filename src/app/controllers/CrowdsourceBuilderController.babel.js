import $ from 'jquery';
import lang from 'dojo/_base/lang';
import StoryCreator from './fromScratch/StoryCreator';
import AppStore from 'babel/store/AppStore';

export default class CrowdsourceBuilderController {

  constructor(options) {

    const defaults = {};

    this.settings = $.extend(true,{},defaults,options);

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.createNewStory = this.createNewStory.bind(this);

    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);
  }

  updateAppState() {
    this.appState = AppStore.getState();

    if (!this.loadStarted && lang.getObject('appState.user.publisher',false,this) && lang.getObject('appState.mode.fromScratch',false,this)) {
      this.createNewStory();
    }
  }

  createNewStory() {
    this.loadStarted = true;
    new StoryCreator();
  }
}
