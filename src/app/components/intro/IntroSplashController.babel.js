import $ from 'jquery';
import EventsEmitter from 'lib/eventEmitter/EventEmitter';

export const IntroSplashController = class IntroSplashController extends EventsEmitter {

  constructor(options) {
    super(options);

    const defaults = {};

    this._settings = $.extend(true, {}, defaults, options);
  }

  mount() {
    $('#loadingIndicator').remove();
    this.setLoaderPosition();
  }

  propsUpdated() {
    this.setLoaderPosition();
  }

  setLoaderPosition() {
    $('.loadingIndicator').css({
      marginLeft: -($('.loadingIndicator').outerWidth() / 2)
    });
  }

};

export default IntroSplashController;
