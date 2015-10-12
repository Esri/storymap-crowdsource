import $ from 'jquery';

var internals = {};

export default internals.Logger = class Logger {

  constructor(options) {
    let defaults = {
      source: 'Class Not Defined'
    };

    $.extend(true,this,defaults,options);
  }

  logMessage(obj) {
    if (obj.type && internals.shouldLog(obj)) {
      switch (obj.type.toLowerCase()) {
        case 'error':
          internals.logError(this.source,obj.error);
          break;
        case 'status':
          internals.logStatus(this.source,obj.message);
          break;
      }
    }
  }

};

internals.shouldLog = function(obj) {
  if (!obj.debugOnly || (obj.debugOnly && app.mode.isDebug)) {
    return true;
  } else {
    return false;
  }
};

internals.logError = function(source,error) {
  console.error('Error - ' + source + ': ',error);
};

internals.logStatus = function(source,message) {
  console.log(source + ': ' + message);
};

internals.onError = function(self,err) {
  console.log('Logging Error',err);
  self.emit('error',err);
};
