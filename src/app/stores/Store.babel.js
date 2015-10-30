import EventsEmitter from 'lib/eventEmitter/EventEmitter';

const CHANGE_EVENT = 'change';

export const Store = class Store extends EventsEmitter {

  constructor() {
    super();
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

};

export default Store;
