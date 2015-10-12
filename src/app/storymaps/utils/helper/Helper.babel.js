import $ from 'jquery';
import Evented from 'dojo/Evented';
import Logger from 'babel/utils/logging/Logger';
import Icons from 'babel/utils/icons/Icons';

var internals = {
  logger: new Logger({source: 'Helper'})
};

export default internals.Helper = class Helper extends Evented {

  constructor(options) {
    super(options);

    let defaults = {};

    this._settings = $.extend(true,{},defaults,options);
  }

  init() {
    let icons = this._icons = new Icons();

    internals.logger.logMessage({
      debugOnly: true,
      type: 'status',
      message: 'Loading'
    });
    
    icons.init();
    internals.onReady(this);
  }

};

internals.onReady = function(self) {
  internals.logger.logMessage({
    debugOnly: true,
    type: 'status',
    message: 'Ready'
  });
  self.emit('load');
};

internals.onError = function(/*[self],error*/) {
  let self = arguments.length === 2 ? arguments[0] : null;
  let err = arguments.length === 2 ? arguments[1] : arguments[0];

  internals.logger.logMessage({
    type: 'error',
    error: err
  });
  if (self) {
    self.emit('error',err);
  }
};
