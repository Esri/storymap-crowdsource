import $ from 'jquery';
import EventsEmitter from 'EventEmitter';
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
    let rowLength = Math.floor(nodeWidth / this._settings.size);
    let tileSize = (nodeWidth / rowLength) || this._settings.size;

    if (rowLength > 1 && tileSize < (this._settings.size * 0.8)) {
      rowLength = rowLength - 1;
      tileSize = (nodeWidth / rowLength);
    } else if (tileSize >= (this._settings.size * 1.2)) {
      rowLength = rowLength + 1;
      tileSize = (nodeWidth / rowLength);
    }

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
