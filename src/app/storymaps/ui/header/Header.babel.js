import $ from 'jquery';
import Evented from 'dojo/Evented';
import Logger from 'babel/utils/logging/Logger';
import Icons from 'babel/utils/icons/Icons';

var internals = {
  logger: new Logger({source: 'Header'})
};

export default internals.Header = class Header extends Evented {

  constructor(options) {
    super(options);

    let defaults = {};

    this._settings = $.extend(true,{},defaults,options);
  }

  init() {
    internals.logger.logMessage({
      debugOnly: true,
      type: 'status',
      message: 'Loading'
    });
    internals.createHeader(this);
  }

};

internals.createHeader = function(self) {
  let icons = Icons.getIcons(['facebook','twitter','link','participate']);
  let headerSettings = self._settings.data.getComponentSettings({
    component: 'header',
    globals: ['social','participateShort']
  });
  let props = $.extend(true, {}, headerSettings, {icons: icons});

  console.log(props);
  internals.onReady(self);
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
