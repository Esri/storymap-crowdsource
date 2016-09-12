import $ from 'jquery';
import domContruct from 'dojo/dom-construct';
import arcgisUtils from 'esri/arcgis/utils';
import HomeButton from 'esri/dijit/HomeButton';
import EventsEmitter from 'EventEmitter';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Logger from 'babel/utils/logging/Logger';
import AppActions from 'babel/actions/AppActions';
import viewerText from 'i18n!translations/viewer/nls/template';

const _logger = new Logger({
  source: 'Webmap Controller'
});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

const _logStatus = function logStatus(message,debugOnly) {
  _logger.logMessage({
    type: 'status',
    debugOnly,
    message
  });
};

export const WebmapController = class WebmapController extends EventsEmitter {

  constructor(options) {
    super(options);

    let defaults = {
      mapDiv: 'map',
      homeButton: true,
      webmapOptions: {
        mapOptions: {
          smartNavigation: false
        }
      }
    };

    this._settings = $.extend(true, {}, defaults, options);
  }

  updateMap(options) {
    const mapDiv = this._settings.node || this._settings.mapDiv;
    const defaults = {};

    $.extend(true, this._settings, defaults, options);

    if (this._settings.webmap && (this._loadingMap !== this._settings.webmap) && (this._settings.webmap !== this._errorWebmapId) && (!this._map || (this._map.webmapId && this._map.webmapId !== this._settings.webmap))) {
      this._loadingMap = this._settings.webmap;
      if (this._map) {
        this._map.destroy();
        this._map = null;
      }

      arcgisUtils.createMap(this._settings.webmap, mapDiv, this._settings.webmapOptions).then((response) => {
        this._response = response;
        this._map = response.map;
        this._map.webmapId = this._settings.webmap;

        if (response.errors) {
          this.handleMapResponseErrors(response.errors);
        }

        if (this._settings.homeButton) {
          this._homeButton = new HomeButton({
            map: this._map,
            extent: this._map.extent,
            theme: 'home-button'
          },domContruct.create('div',null,document.querySelector('.esriSimpleSlider .esriSimpleSliderIncrementButton'),"after"));
          $('.esriSimpleSlider .home-button .home').html(getIcon('home')).attr('title',viewerText.map.controls.homeButton);
          this._homeButton.on('load', () => {
            $('.esriSimpleSlider .home-button .home').html(getIcon('home')).attr('title',viewerText.map.controls.homeButton);
          });
        }

        if (this._map.loaded) {
          this._loadingMap = false;
          this.onMapLoad();
        } else {
          this._map.on('load', () => {
            this._loadingMap = false;
            this.onMapLoad();
          });
        }
      },(error) => {
        this._errorWebmapId = this._settings.webmap;
        if (error.toString().search('You do not have access') > -1) {
          AppActions.displayMainError(viewerText.errors.loading.notAuthorizedMap);
        }
        _onError(error);
      });
    }
  }

  handleMapResponseErrors(errors) {
    if ($.isArray(errors)) {
      $.each(errors, function() {
        if (this.toString().search('You do not have access') > -1) {
          AppActions.displayMainError(viewerText.errors.loading.notAuthorizedLayers);
        }
        _onError(this);
      });
    }
  }

  onMapLoad() {
    _logStatus('Webmap ' + this._map.webmapId + ' is loaded',true);
    this.emit('load');
  }

};

export default WebmapController;
