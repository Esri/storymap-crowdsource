import lang from 'dojo/_base/lang';
import has from 'dojo/has';
import touch from 'dojo/touch';
import on from 'dojo/on';
import array from 'dojo/_base/array';
import connect from 'dojo/_base/connect';

export const MovableGraphic = class MovableGraphic {

  constructor(options) {
    /**
		* Make the graphic movable on desktop and touch devices
		* clean() has to be called to restore the graphic behavior when done
		* dojo/touch is used to abstract touch and desktop events
		* @param {Object} map
		* @param {Object} layer
		* @param {Object} graphic
		*/

    this._settings = {
      map: null,
      layer: null,
      graphic: null,
      onMoveStartCallback: () => {},
      onMoveEndCallback: () => {}
    };
    lang.mixin(this._settings,options);

    this.moveGraphic = this.moveGraphic.bind(this);
    this.clean = this.clean.bind(this);

    this._editPointLayer = false;
    this._events = [];
    this._isEdge = !! window.navigator.userAgent.match(/Edge\/\d+/);

    const event1 = connect.connect(this._settings.layer, 'onMouseOver', (event) => {
      if (event.graphic === this._settings.graphic) {
        this._settings.map.setMapCursor('move');
      }
    });

    const event2 = connect.connect(this._settings.layer, 'onMouseOut', (event) => {
      if (event.graphic === this._settings.graphic) {
        this._settings.map.setMapCursor('default');
      }
    });

    const event3 = on(this._settings.layer._div.rawNode, touch.press, (event) =>  {
      // Prevent using another point as a start location on desktop - does not work on touch
      if (event.graphic === this._settings.graphic || has('touch') || has('ie') === 10 || has('trident') === 7 || this._isEdge) {
        this._settings.map.disablePan();

        this._editPointLayer = true;
        this._settings.graphic.hasBeenMoved = false;
      }
    });

    const event4 = touch.release(this._settings.layer._div.rawNode, () => {
      this._settings.map.enablePan();
      this._editPointLayer = false;
      if (this._settings.onMoveEndCallback && this._settings.graphic.hasBeenMoved) {
        this._settings.onMoveEndCallback(this._settings.graphic);
      }
    });

    const event5 = has('touch') || has('ie') >= 10 || has('trident') === 7 || this._isEdge ?
        // Using the layer decrease too much the performance ...
        touch.move(this._settings.map.__container, this.moveGraphic)
        : connect.connect(this._settings.map, 'onMouseDrag', this.moveGraphic);

    this._events = [event1, event2, event3, event4, event5];
  }

  clean() {
    array.forEach(this._events, (event) => {
      connect.disconnect(event);
    });
  }

  moveGraphic(event) {
    if (this._editPointLayer && event.mapPoint) {
      this._settings.graphic.setGeometry(event.mapPoint);

      if (this._settings.onMoveStartCallback && !this._settings.graphic.hasBeenMoved) {
        this._settings.onMoveStartCallback(this._settings.graphic);
      }

      this._settings.graphic.hasBeenMoved = true;
    }
  }

};

export default MovableGraphic;
