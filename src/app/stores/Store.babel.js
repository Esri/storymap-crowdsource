import EventsEmitter from 'lib/eventEmitter/EventEmitter';
import {Events} from 'babel/constants/CrowdsourceAppConstants';

export const Store = class Store extends EventsEmitter {

  constructor() {
    super();
  }

  addChangeListener(callback) {
    this.on(Events.common.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Events.common.CHANGE, callback);
  }

  emitChange() {
    this.emit(Events.common.CHANGE);
  }

};

export default Store;
