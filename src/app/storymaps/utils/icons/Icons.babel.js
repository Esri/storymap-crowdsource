import $ from 'jquery';
import Logger from 'babel/utils/logging/Logger';
import Evented from 'dojo/Evented';
import IconsHtml from 'dojo/text!storymaps/utils/icons/Icons.html';

var internals = {
  logger: new Logger({source: 'Icons'})
};

export default internals.Icons = class Icons extends Evented {

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
    $('body').append(IconsHtml);
    internals.onReady(this);
  }

  static getIcons(icons) {
    var iconHtml = {};

    if ($.isArray(icons)) {
      $.each(icons,function() {
        iconHtml[this] = internals.getIconHtml(this);
      });
    } else {
      iconHtml[icons] = internals.getIconHtml(icons);
    }

    return iconHtml;
  }

};

internals.icons = {
  facebook: '<svg class="icon icon-facebook"><use xlink:href="#icon-facebook"></use></svg>',
  link: '<svg class="icon icon-link"><use xlink:href="#icon-link"></use></svg>',
  participate: '<svg class="icon icon-participate"><use xlink:href="#icon-participate"></use></svg>',
  twitter: '<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>'
};

internals.getIconHtml = function(icon) {
  var iconCode = internals.icons[icon];

  if (iconCode) {
    return iconCode;
  } else {
    internals.onError('"icon-' + icon + '" not available');
    return;
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
