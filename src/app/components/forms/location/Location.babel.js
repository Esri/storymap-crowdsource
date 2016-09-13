import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'reactDom';
import Geocoder from 'esri/dijit/Geocoder';
import LocateButton from 'esri/dijit/LocateButton';
import Locator from 'esri/tasks/locator';
import lang from 'dojo/_base/lang';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';
import Point from 'esri/geometry/Point';
import Graphic from 'esri/graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import Color from 'dojo/_base/Color';
import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Helper from 'babel/utils/helper/Helper';
import MapActions from 'babel/actions/MapActions';
import Validator from 'babel/utils/validations/Validator';
import IconTooltip from 'babel/components/helper/tooltip/IconTooltip';
import FormGroup from 'babel/components/forms/base/FormGroup';
import ViewerText from 'i18n!translations/viewer/nls/template';

export default class Location extends FormGroup {

  constructor(props) {
    super(props);

    this.defaultValidations = ['location'];

    this.input = {
      value: false
    };
    this.locator = new Locator('//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer');

    this.onSelect = this.onSelect.bind(this);
    this.onAutocomplete = this.onAutocomplete.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.geocodeMapPoint = this.geocodeMapPoint.bind(this);
    this.parseResultForGeoPoint = this.parseResultForGeoPoint.bind(this);
    this.reverseGeocode = this.reverseGeocode.bind(this);
    this.setLocationValue = this.setLocationValue.bind(this);
  }

  componentDidMount() {
    const geocoderNode = ReactDOM.findDOMNode(this.geocoderContainer);
    const locatorNode = ReactDOM.findDOMNode(this.locatorContainer);

    $(geocoderNode).append($('<div class="geocoder-container"></div>'));
    $(locatorNode).append($('<div class="locator-container"></div>'));

    this.geocoderContainer = $(geocoderNode).find('.geocoder-container');
    this.locatorContainer = $(locatorNode).find('.locator-container');

    this.geocoder = new Geocoder({
      autoComplete: true,
      highlightLocation: false,
      minCharacters: 1,
      map: this.props.map,
      theme: 'calcite-geocoder'
    },this.geocoderContainer[0]);

    this.locateButton = new LocateButton({
      map: this.props.map,
      highlightLocation: false,
      theme: 'calcite-locate'
    },this.locatorContainer[0]);

    this.locatorContainer = $(locatorNode).find('.calcite-locate');
    this.locatorContainer.find('.zoomLocateButton').addClass('btn btn-default btn-sm').html('<div class="locator-icon">\
      <img class="loading-gif" src="resources/images/loader-light.gif" alt="' + ViewerText.contribute.form.location.gettingLocation + '">' + getIcon('location') + '</div>\
      <span class="locating-text">' + ViewerText.contribute.form.location.gettingLocation + '\</span>\
      <span class="locate-text">' + ViewerText.contribute.form.location.locate + '\</span>');

    this.geocoderSeachButton = $(geocoderNode).find('.esriGeocoderSearch');
    this.geocoderSeachButton.attr('tabindex',-1);

    this.geocoderResetButton = $(geocoderNode).find('.esriGeocoderReset');
    this.geocoderResetButton.attr('tabindex',-1);

    this.geocoderInput = $(geocoderNode).find('input');
    this.geocoderInput.addClass('form-control');
    this.geocoderInput.attr('id',this.props.id);

    this.geocoderAutocomplete = $(geocoderNode).find('.esriGeocoderResults');
    this.geocoderAutocomplete.addClass('form-control');

    this.locateButton.on('locate',this.reverseGeocode);
    this.locatorContainer.on('keypress',(e) => {
      if (e.which === 13) {
        this.locateButton.locate();
      }
    });

    this.addInputAttributes();

    this.validator = new Validator({
      validations: this.getValidations(),
      attribute: this.props.attribute || this.props.label
    });

    this.geocoder.on('auto-complete',this.onAutocomplete);
    this.geocoder.on('clear',this.onClear);
    this.geocoder.on('select',this.onSelect);
    this.geocoder.on('find-results',(response) => {
      if (response && response.results && response.results.results[0]) {
        const result = response.results.results[0].name;
        const location = this.parseResultForGeoPoint(result);

        if (location) {
          this.reverseGeocode(location,true);
        }
      }
    });
    this.geocoderInput.on('blur',this.onBlur);

    this.geocoder.startup();
    this.locateButton.startup();

    // Define Graphic and Add Graphics Layer to map
    this.locationSymbol = new SimpleMarkerSymbol('circle', 16,new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([204, 62, 68, 1]), 3),new Color([255, 255, 255, .5]));
    this.locationLayer = new GraphicsLayer({
      id: 'crowdsource-contribute-location'
    });
    this.props.map.addLayer(this.locationLayer);
    this.geocodeClickEvent = this.props.map.on('click',this.geocodeMapPoint);
  }

  componentDidUpdate() {
    this.addInputAttributes();
    this.validator.setValidations(this.getValidations());

    if (this.props.locationFromOtherSource && JSON.stringify(this.props.locationFromOtherSource) !== JSON.stringify(this.locationFromOtherSource) && this.props.locationFromOtherSource.latLong) {
      this.locationFromOtherSource = this.props.locationFromOtherSource;
      if (!this.state.changed || confirm(ViewerText.contribute.form.location.photoLocation)) { //eslint-disable-line no-alert
        this.reverseGeocode();
      }
    }
  }

  componentWillUnmount() {
    this.geocoder.clear();
    this.locateButton.clear();
    this.geocoder.destroy();
    this.locateButton.destroy();
    this.props.map.removeLayer(this.locationLayer);
    this.geocodeClickEvent.remove();
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'location','form-geocoder','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        {this.props.tooltip ? <IconTooltip className="form-tooltip" {...this.props.tooltip} /> : null}
        <div
          className="geocoder"
          ref={(ref) => this.geocoderContainer = ref}>
        </div>
        <div className="action-btn-wrapper">
        <div
          className="locator"
          ref={(ref) => this.locatorContainer = ref}>
        </div>
        <div
          className="find-on-map btn btn-default btn-sm"
          ref={(ref) => this.findOnMapContainer = ref}
          onClick={this.reverseGeocode.bind(this,{useMapCenter: true},false)}>
            <span className="find-on-map-icon" dangerouslySetInnerHTML={{__html: getIcon('map-pin')}}></span>
            <span className="find-on-map-text">{ViewerText.contribute.form.location.findOnMap}</span>
        </div>
        </div>
        { this.state.reverseCoords ? (
          <a href="#" onClick={this.reverseGeocode.bind(this,this.state.reverseCoords)}><small><strong>Did you mean:</strong> Longitude: {this.state.reverseCoords.longLatResult[0]} Latitude: {this.state.reverseCoords.longLatResult[1]}?</small></a>
        ) : null }
        {this.getErrorMessage ? this.getErrorMessage() : null}
      </div>
    );
  }

  addInputAttributes() {
    $.each(this.props.inputAttr,(key,value) => {
      this.geocoderInput.attr(key,value);
    });
  }

  onSelect(selection) {
    const latLong = this.parseResultForGeoPoint(this.geocoderInput.val());

    if (!latLong){
      this.locateButton.clear();
      this.geocoderInput.val(selection.result.name);
    }

    if (latLong) {
      this.reverseGeocode(latLong,true);
    } else if (selection.result) {
      this.setLocationValue({
        inputVal: this.geocoderInput.val(),
        dataVal: {
          name: selection.result.name,
          geometry: selection.result.feature.geometry
        }
      });
    }
    this.validateForm();
  }

  onClear() {
    this.setState({
      reverseCoords: null
    });
    this.setLocationValue({
      inputVal: this.geocoderInput.val(),
      dataVal: false
    });
    if (this.state.changed) {
      this.validateForm();
    }
  }

  onAutocomplete() {
    MapActions.mapMoving(true);
    const latLong = this.parseResultForGeoPoint(this.geocoderInput.val());

    if (latLong) {
      setTimeout(() => {
        this.geocoder._hideResultsMenu();
      },0);
      this.setLocationValue({
        setReverseCoords: true,
        inputVal: this.geocoderInput.val(),
        dataVal: {
          name: this.geocoderInput.val(),
          geometry: latLong.webMercatorResult
        }
      });
      this.validateForm();
    } else if (this.geocoder.results.length === 0) {
      this.setLocationValue({
        inputVal: this.geocoderInput.val(),
        dataVal: 'no results'
      });
      this.validateForm();
    } else {
      this.setLocationValue({
        inputVal: this.geocoderInput.val(),
        dataVal: false
      });
      this.validateForm();
    }
  }

  onBlur() {
    setTimeout(() => {
      this.validateForm();
      const latLong = this.parseResultForGeoPoint(this.geocoderInput.val());

      if (latLong) {
        this.reverseGeocode(latLong,true,true);
      } else if (!this.input.value.dataVal && !this.geocoderAutocomplete.is(':visible') && this.geocoder.results && this.geocoder.results.length > 0) {
        if (this.geocoder.results[0].magicKey) {
          const params = {
            delay: 0,
            search: this.geocoder.results[0].text,
            magicKey: this.geocoder.results[0].magicKey
          };

          this.geocoder._query(params).then(lang.hitch(this.geocoder, (response) => {
            // select location
            this.geocoder.select(response.results[0]);
          }));
        } else if (this.geocoder.results.length > 0) {
          this.geocoder.select(this.geocoder.results[0]);
        }
      }
    },0);
  }

  geocodeMapPoint(e) {
    this.reverseGeocode({
      graphic: {
        geometry: e.mapPoint
      }
    });
  }

  reverseGeocode(response,setReverseCoords,ignoreShowingMapOnMobile) {
    let point;

    if (ignoreShowingMapOnMobile && ignoreShowingMapOnMobile !== true) {
      ignoreShowingMapOnMobile = false;
    }

    if (response && response.graphic) {
      point = response.graphic.geometry;
    } else if (response && response.useMapCenter) {
      point = this.props.map.extent.getCenter();
    } else if (response && response.hasBeenMoved && response.geometry) {
      point = response.geometry;
    } else if (response && response.longLatResult) {
      point = response.webMercatorResult;
    } else if (this.props.locationFromOtherSource && this.props.locationFromOtherSource.type === 'latLong' && this.props.locationFromOtherSource.latLong) {
      point = webMercatorUtils.geographicToWebMercator(new Point(this.props.locationFromOtherSource.latLong.longitude,this.props.locationFromOtherSource.latLong.latitude));
    }

    if (point) {
      this.locator.locationToAddress(point,100, (res) => {
        if (res.address && res.address.Match_addr) {
          this.geocoderInput.val(res.address.Match_addr);
          this.setLocationValue({
            ignoreShowingMapOnMobile,
            inputVal: this.geocoderInput.val(),
            dataVal: {
              name: res.address.Match_addr,
              geometry: point
            }
          });
        } else {
          const name = response.position.coords.latitude + ', ' + response.position.coords.longitude;

          this.geocoderInput.val(res.address.Match_addr);
          this.setLocationValue({
            ignoreShowingMapOnMobile,
            setReverseCoords,
            inputVal: this.geocoderInput.val(),
            dataVal: {
              name: name,
              geometry: response.graphic.geometry
            }
          });
        }
        this.validateForm();
      },() => {
        const geoPt = webMercatorUtils.webMercatorToGeographic(point);
        const longitude = Math.round(parseFloat(geoPt.x) * 1000) / 1000;
        const latitude = Math.round(parseFloat(geoPt.y) * 1000) / 1000;
        const locationString = longitude === 0 && latitude === 0
          ? ViewerText.contribute.form.location.nullIsland
          : ViewerText.contribute.form.location.longitude + ': ' + longitude + ' ' + ViewerText.contribute.form.location.latitude + ': ' + latitude;

        this.geocoderInput.val(locationString);
        this.setLocationValue({
          ignoreShowingMapOnMobile,
          setReverseCoords,
          inputVal: locationString,
          dataVal: {
            name: locationString,
            geometry: point
          }
        });
        this.validateForm();
      });
    }
  }

  parseResultForGeoPoint(result,setReverseCoords) {

    if (result.search(ViewerText.contribute.form.location.longitude + ': ') === 0) {
      result = this.geocoderInput.val().replace(ViewerText.contribute.form.location.longitude + ': ','').replace(ViewerText.contribute.form.location.latitude + ': ','');
    }
    let array;

    if (result.split(' ').length === 2) {
      array = result.split(' ');
    } else if (result.split(',').length === 2) {
      array = result.split(',');
    } else if (result.replace(/\s/g,'').split('N').length === 2) {
      array = result.replace(/\s/g,'').split('N');
    } else if (result.replace(/\s/g,'').split('n').length === 2) {
      array = result.replace(/\s/g,'').split('n');
    } else if (result.replace(/\s/g,'').split('S').length === 2) {
      array = result.replace(/\s/g,'').split('S');
    } else if (result.replace(/\s/g,'').split('s').length === 2) {
      array = result.replace(/\s/g,'').split('s');
    } else if (result.replace(/\s/g,'').split('W').length === 2) {
      array = result.replace(/\s/g,'').split('W');
    } else if (result.replace(/\s/g,'').split('w').length === 2) {
      array = result.replace(/\s/g,'').split('w');
    } else if (result.replace(/\s/g,'').split('E').length === 2) {
      array = result.replace(/\s/g,'').split('E');
    } else if (result.replace(/\s/g,'').split('e').length === 2) {
      array = result.replace(/\s/g,'').split('e');
    }

    if (array) {
      if (array[0].search('N') >= 0 || array[0].search('n') >= 0 || array[0].search('S') >= 0 || array[0].search('s') >= 0) {
        array = [array[1],array[0]];
      }

      const convertCoords = function(coordString) {
        const cleanString = coordString.replace(/\s/g,'');
        const coord = cleanString.split(/[^\d\w]+/);
        const ref = isNaN(coord[coord.length - 1]) ? coord[coord.length - 1] : null;
        let seconds = coord[2];

        if (!ref && coord.length === 4) {
          seconds = seconds + '.' + coord[3];
        } else if (coord.length === 4) {
          seconds = seconds + '.' + coord[3];
        }
        const DD = parseFloat(coord[0]) + ((parseFloat(coord[1]) + (parseFloat(seconds)/60))/60);

        if (ref === 'S' || ref === 'W') {
          return Math.abs(DD) * -1;
        } else {
          return Math.abs(DD);
        }
      };

      if (typeof array[0] === 'string' && (array[0].split(/[^\d\w]+/).length === 4 || array[0].split(/[^\d\w]+/).length === 5)) {
        array[0] = convertCoords(array[0]);
      }
      if (typeof array[1] === 'string' && (array[1].split(/[^\d\w]+/).length === 4 || array[1].split(/[^\d\w]+/).length === 5)) {
        array[1] = convertCoords(array[1]);
      }

      array = [parseFloat(array[0]),parseFloat(array[1])];
    }

    if (array && typeof array[0] === 'number'
       && !isNaN(array[0])
       && typeof array[1] === 'number'
       && !isNaN(array[1])) {
         if (Math.abs(array[1]) > 90) {
           this.setState({
             reverseCoords: null
           });
           return {
             longLatResult: [array[1],array[0]],
             webMercatorResult: webMercatorUtils.geographicToWebMercator(new Point(array[1],array[0]))
           };
         } else {
           if (setReverseCoords && Math.abs(array[0]) <= 90) {
             this.setState({
               reverseCoords: {
                 longLatResult: [array[1],array[0]],
                 webMercatorResult: webMercatorUtils.geographicToWebMercator(new Point(array[1],array[0]))
               }
             });
           } else {
             this.setState({
               reverseCoords: null
             });
           }
           return {
             longLatResult: [array[0],array[1]],
             webMercatorResult: webMercatorUtils.geographicToWebMercator(new Point(array[0],array[1]))
           };
         }
    } else {
      this.setState({
        reverseCoords: null
      });
      return false;
    }
  }

  setLocationValue(options) {

    const normalizeGeometry = function(dataVal) {
      if (dataVal.geometry && dataVal.geometry.spatialReference && dataVal.geometry.spatialReference.wkid === 102100) {
        const geoPt = webMercatorUtils.webMercatorToGeographic(dataVal.geometry);
        const webMecPt = webMercatorUtils.geographicToWebMercator(geoPt);
        const newDataVal = $.extend(true,{},dataVal,{
          geometry: webMecPt
        });

        return newDataVal;
      }

      return dataVal;
    };

    this.input.value = {
      inputVal: options.inputVal,
      dataVal: normalizeGeometry(options.dataVal)
    };

    if (!this.state.changed && this.geocoderInput.val().length > 0) {
      this.setState({
        changed: true
      });
    }

    this.parseResultForGeoPoint(options.inputVal,options.setReverseCoords);

    if (this.locationLayer.graphics.length > 0) {
      this.locationLayer.graphics[0];
      if (typeof this.locationLayer.graphics[0].clearMoveableEvents === 'function') {
        this.locationLayer.graphics[0].clearMoveableEvents();
      }
      this.locationLayer.remove(this.locationLayer.graphics[0]);
    }

    if (this.input.value.dataVal && this.input.value.dataVal.geometry && this.locationLayer.graphics.length === 0) {
      const graphic = new Graphic(this.input.value.dataVal.geometry,this.locationSymbol);

      this.locationLayer.add(graphic);
      this.props.map.centerAt(this.input.value.dataVal.geometry);

      const moveable = new Helper.mapUtils.MoveableGraphic({
        map: this.props.map,
        layer: this.locationLayer,
        graphic,
        onMoveStartCallback: () => {
          MapActions.mapMoving(true);
        },
        onMoveEndCallback: (e) => {
          MapActions.mapMoving(false);
          this.reverseGeocode(e);
        }
      });

      graphic.clearMoveableEvents = moveable.clean;

      if (!options.ignoreShowingMapOnMobile) {
        MapActions.forceToTop(true);
      }
    }
  }
}
