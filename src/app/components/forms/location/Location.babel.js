import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'reactDom';
import Geocoder from 'esri/dijit/Geocoder';
import LocateButton from 'esri/dijit/LocateButton';
import Locator from 'esri/tasks/locator';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Helper from 'babel/utils/helper/Helper';
import Validator from 'babel/utils/validations/Validator';
// import FormActions from 'babel/actions/FormActions';
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

    this.reverseGeocode = this.reverseGeocode.bind(this);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.inputContainer);

    $(node).append($('<div class="geocoder-container"></div>'));
    $(node).append($('<div class="locator-container"></div>'));

    this.geocoderContainer = $(node).find('.geocoder-container');
    this.locateButtonContainer = $(node).find('.locator-container');

    this.geocoder = new Geocoder({
      autoComplete: true,
      highlightLocation: true,
      minCharacters: 1,
      map: this.props.map,
      theme: 'calcite-geocoder'
    },this.geocoderContainer[0]);

    this.locateButton = new LocateButton({
      map: this.props.map,
      theme: 'calcite-locate'
    },this.locateButtonContainer[0]);

    this.geocoderInner = $(node).find('.esriGeocoder');
    this.geocoderInner.addClass('input-group').append('<span class="input-group-btn"></span>');
    this.locateButtonContainer = $(node).find('.calcite-locate');
    this.locateButtonContainer.addClass('btn btn-default').attr('tabindex',0);
    this.locateButtonContainer.find('.zoomLocateButton').html(getIcon('location') + '<img class="loading-gif" src="resources/images/loader-light.gif" alt="' + ViewerText.contribute.form.location.gettingLocatingAlt + '">');
    this.geocoderInner.find('.input-group-btn').append(this.locateButtonContainer);

    this.geocoderSeachButton = $(node).find('.esriGeocoderSearch');
    this.geocoderSeachButton.attr('tabindex',-1);

    this.geocoderResetButton = $(node).find('.esriGeocoderReset');
    this.geocoderResetButton.attr('tabindex',-1);

    this.geocoderInput = $(node).find('input');
    this.geocoderInput.addClass('form-control');
    this.geocoderInput.attr('id',this.props.id);

    this.geocoderAutocomplete = $(node).find('.esriGeocoderResults');
    this.geocoderAutocomplete.addClass('form-control');

    this.locateButton.on('locate',this.reverseGeocode);
    this.locateButtonContainer.on('keypress',(e) => {
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
    this.geocoderInput.on('blur',this.onBlur);

    this.geocoder.startup();
    this.locateButton.startup();
  }

  componentDidUpdate() {
    this.addInputAttributes();
    this.validator.setValidations(this.getValidations());
  }

  componentWillUnmount() {
    this.geocoder.clear();
    this.locateButton.clear();
    this.geocoder.destroy();
    this.locateButton.destroy();
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
        {this.props.tooltip ? <IconTooltip className="form-tooltip" {...this.props.tooltip} /> : null}
        <div
          ref={(ref) => this.inputContainer = ref}>
        </div>
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
    this.locateButton.clear();
    if (selection.result) {
      this.input.value = {
        inputVal: this.geocoderInput.val(),
        dataVal: {
          name: selection.result.name,
          geometry: selection.result.feature.geometry
        }
      };
    }
    this.validateForm();
  }

  onClear() {
    this.input.value = {
      inputVal: this.geocoderInput.val(),
      dataVal: false
    };
    if (this.state.changed) {
      this.validateForm();
    }
  }

  onAutocomplete() {
    this.input.value = {
      inputVal: this.geocoderInput.val(),
      dataVal: this.geocoder.results.length === 0 ? 'no results' : false
    };
    if (!this.state.changed) {
      this.setState({
        changed: true
      });
    }
    this.validateForm();
  }

  onBlur() {
    setTimeout(() => {
      this.validateForm();
      if (!this.input.value.dataVal && !this.geocoderAutocomplete.is(':visible') && this.geocoder.results && this.geocoder.results.length > 0) {
        this.geocoder._findThenSelect(this.geocoder.results[0]);
      }
    },0);
  }

  reverseGeocode(response) {
    this.geocoder.clear();
    if (response && response.graphic) {
      this.locator.locationToAddress(response.graphic.geometry,100, (res) => {
        if (res.address && res.address.Match_addr) {
          this.geocoderInput.val(res.address.Match_addr);
          this.input.value = {
            inputVal: this.geocoderInput.val(),
            dataVal: {
              name: res.address.Match_addr,
              geometry: response.graphic.geometry
            }
          };
        } else {
          const name = response.position.coords.latitude + ', ' + response.position.coords.longitude;

          this.geocoderInput.val(res.address.Match_addr);
          this.input.value = {
            inputVal: this.geocoderInput.val(),
            dataVal: {
              name: name,
              geometry: response.graphic.geometry
            }
          };
        }
        this.validateForm();
      });
    }
  }
}
