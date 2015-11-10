import $ from 'jquery';
import EventsEmitter from 'lib/eventEmitter/EventEmitter';
import Helper from 'babel/utils/helper/Helper';

export const ThumbnailGalleryController = class ThumbnailGalleryController extends EventsEmitter {

  constructor(options) {
    super(options);

    this.onResize = this.onResize.bind(this);

    const defaults = {
      node: 'body',
      size: 200
    };

    this._settings = $.extend(true, {}, defaults, options);

    $(window).on('resize',this.onResize);
  }

  unmount() {
    $(window).off('resize',this.onResize);
  }

  get tileSettings() {
    const scrollbarWidth = Helper.layout.getScrollbarWidth();
    const nodeWidth = $(this._settings.node).width() - scrollbarWidth;
    const rowLength = Math.floor(nodeWidth / this._settings.size);
    const tileSize = (nodeWidth / rowLength) || 200;

    return ({
      tilesPerRow: rowLength,
      tileSize
    });
  }

  onResize() {
    const tileSettings = this.tileSettings;

    this.emit('resize',tileSettings);
  }

};

export default ThumbnailGalleryController;
