/*eslint no-console: 0*/
import $ from 'jquery';

const _shouldLog = function shouldLog(obj) {
  if (!obj.debugOnly || (obj.debugOnly && window.app.mode.isDebug)) {
    return true;
  } else {
    return false;
  }
};

const _logError = function logError(error) {
  console.error('Error: ' + this.source + ' -', error);
};

const _logStatus = function logStatus(message) {
  console.log(this.source + ': ' + message);
};

export const Logger = class Logger {

  constructor(options) {
    const defaults = {
      source: 'Source Not Defined'
    };

    $.extend(true, this, defaults, options);
  }

  logMessage(obj) {
    if (obj.type && _shouldLog(obj)) {
      switch (obj.type.toLowerCase()) {
        case 'error':
          _logError.call(this, obj.error);
          break;
        case 'status':
          _logStatus.call(this, obj.message);
          break;
      }
    }
  }

};

export default Logger;
