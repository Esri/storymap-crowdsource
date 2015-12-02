import $ from 'jquery';
import EventsEmitter from 'lib/eventEmitter/EventEmitter';
import AppDataStore from 'babel/stores/AppDataStore';
import CrowdsourceAppBuilderStore from 'babel/stores/CrowdsourceAppBuilderStore';
// import {Components} from 'babel/constants/CrowdsourceAppConstants';
// import {Events} from 'babel/constants/CrowdsourceAppConstants';

export const CrowdsourceAppController = class CrowdsourceAppController extends EventsEmitter {

  constructor(options) {
    super(options);

    this.onChange = this.onChange.bind(this);

    const defaults = {};

    this._settings = $.extend(true, {}, defaults, options);
  }

  get appState() {
    return {};
  }

  mount() {
    // Add listeners
    AppDataStore.addChangeListener(this.onChange);
    CrowdsourceAppBuilderStore.addChangeListener(this.onChange);
  }

  unmount() {
    // Remover listeners
    AppDataStore.removeChangeListener(this.onChange);
    CrowdsourceAppBuilderStore.removeChangeListener(this.onChange);
  }

  onChange(type) {
    switch (type) {
      default:
        const state = this.appState;

        this.emit('state-change',state);
    }
  }

};

export default CrowdsourceAppController;
