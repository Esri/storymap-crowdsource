import $ from 'jquery';
import EventsEmitter from 'lib/eventEmitter/EventEmitter';

export const ThumbnailGalleryController = class ThumbnailGalleryController extends EventsEmitter {

  constructor(options) {
    super(options);

    let defaults = {
      size: 200
    };

    this._settings = $.extend(true, {}, defaults, options);

    $(window).resize(() => {
      const tileSettings = this.getTileSettings();

      this.emit('resize',tileSettings);
    });
  }

  getTileSettings() {
    const docWidth = $('html,body').width();
    const rowLength = Math.floor(docWidth / this._settings.size);
    const tileSize = (docWidth / rowLength);

    return ({
      tilesPerRow: rowLength,
      tileSize
    });
  }

};

export default ThumbnailGalleryController;
