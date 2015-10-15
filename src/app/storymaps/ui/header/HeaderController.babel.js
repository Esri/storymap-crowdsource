import $ from 'jquery';
import Evented from 'dojo/Evented';
import Logger from 'babel/utils/logging/Logger';
import Icons from 'babel/utils/icons/Icons';

var internals = {
  logger: new Logger({source: 'HeaderController'})
};

export default internals.HeaderController = class HeaderController extends Evented {

  constructor(options) {
    super(options);

    let defaults = {};

    this._settings = $.extend(true, {}, defaults, options);
  }

  init() {
    internals.logger.logMessage({
      debugOnly: true,
      type: 'status',
      message: 'Loading'
    });
    internals.createHeaderController.call(this);
  }

};

internals.createHeaderController = function() {
  let self = this;
  let icons = Icons.getIcons(['facebook', 'twitter', 'link', 'participate']);
  let headerSettings = self._settings.data.getComponentSettings({
    component: 'header',
    globals: ['social', 'participateShort']
  });
  let props = $.extend(true, {}, headerSettings, {icons: icons});

  // console.log(props);

  internals.onReady.call(this);
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
