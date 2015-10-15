import $ from 'jquery';
import Logger from 'babel/utils/logging/Logger';
import Evented from 'dojo/Evented';
import IconsHtml from 'text!storymaps/utils/icons/Icons.html';

var internals = {
  logger: new Logger({source: 'Icons'})
};

export default internals.Icons = class Icons extends Evented {

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
    $('body').append(IconsHtml);
    internals.onReady.call(this);
  }

  static getIcons(icons) {
    let self = this;
    let iconHtml = {};

    if ($.isArray(icons)) {
      $.each(icons, function() {
        iconHtml[this] = internals.getIconHtml.call(self,this);
      });
    } else {
      iconHtml[icons] = internals.getIconHtml.call(self,icons);
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
    internals.onError.call(this,'"icon-' + icon + '" not available');
    return false;
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
