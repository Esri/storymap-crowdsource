/*eslint no-console: 0*/
import $ from 'jquery';

var internals = {};

export default internals.Logger = class Logger {

  constructor(options) {
    let defaults = {
      source: 'Class Not Defined'
    };

    $.extend(true, this, defaults, options);
  }

  logMessage(obj) {
    if (obj.type && internals.shouldLog(obj)) {
      switch (obj.type.toLowerCase()) {
        case 'error':
          internals.logError.call(this, obj.error);
          break;
        case 'status':
          internals.logStatus.call(this, obj.message);
          break;
      }
    }
  }

};

internals.shouldLog = function(obj) {
  if (!obj.debugOnly || (obj.debugOnly && window.app.mode.isDebug)) {
    return true;
  } else {
    return false;
  }
};

internals.logError = function(error) {
  console.error('Error - ' + this.source + ': ', error);
};

internals.logStatus = function(message) {
  console.log(this.source + ': ' + message);
};

internals.onError = function(err) {
  console.log('Logging Error', err);
  if (this) {
    this.emit('error', err);
  }
};
