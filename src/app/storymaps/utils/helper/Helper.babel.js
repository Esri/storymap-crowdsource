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

    this._settings = $.extend(true, {}, defaults, options);
  }

  init() {
    let icons = this._icons = new Icons();

    internals.logger.logMessage({
      debugOnly: true,
      type: 'status',
      message: 'Loading'
    });

    icons.init();
    internals.onReady.call(this);
  }

};

internals.onReady = function() {
  internals.logger.logMessage({
    debugOnly: true,
    type: 'status',
    message: 'Ready'
  });
  if (this.emit){
    this.emit('load');
  }
};

internals.onError = function(err) {
  internals.logger.logMessage({
    type: 'error',
    error: err
  });
  if (this) {
    this.emit('error', err);
  }
};
