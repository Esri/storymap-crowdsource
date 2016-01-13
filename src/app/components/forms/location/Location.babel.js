import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'reactDom';
import Geocoder from 'esri/dijit/Geocoder';
import Helper from 'babel/utils/helper/Helper';
import Validator from 'babel/utils/validations/Validator';
import FormActions from 'babel/actions/FormActions';
import FormGroup from 'babel/components/forms/base/FormGroup';
import ViewerText from 'i18n!translations/viewer/nls/template';

export default class Location extends FormGroup {

  constructor(props) {
    super(props);

    this.value = false;

    this.onSelect = this.onSelect.bind(this);
    this.onAutocomplete = this.onAutocomplete.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);

    this.geocoder = new Geocoder({
      autoComplete: true,
      highlightLocation: true,
      minCharacters: 1,
      map: this.props.map,
      theme: 'calcite'
    },this.geocoderContainer);

    console.log(this.geocoder);

    this.geocoderSeachButton = $(node).find('.esriGeocoderSearch');
    this.geocoderSeachButton.attr('tabindex',-1);

    this.geocoderResetButton = $(node).find('.esriGeocoderReset');
    this.geocoderResetButton.attr('tabindex',-1);

    this.geocoderInput = $(node).find('input');
    this.geocoderInput.addClass('form-control');

    this.geocoderAutocomplete = $(node).find('.esriGeocoderResults');
    this.geocoderAutocomplete.addClass('form-control');

    this.addInputAttributes();

    this.validator = new Validator({
      validations: this.getValidations(),
      attribute: this.props.label
    });

    this.geocoder.on('auto-complete',this.onAutocomplete);
    this.geocoder.on('clear',this.onClear);
    this.geocoder.on('select',this.onSelect);
    this.geocoderInput.on('blur',this.onBlur);
    // this.geocoderInput.on('change',this.onChange);
  }

  componentDidUpdate() {
    this.addInputAttributes();
    this.validator.setValidations(this.getValidations());
  }

  componentWillUnmount() {
    this.geocoder.destroy();
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'location','form-geocoder','form-group',{
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        <div className="foo"
          ref={(ref) => this.geocoderContainer = ref}>
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

  validateForm() {
    const nodeId = this.props.formId + '_' + this.props.id;

    const finished = function finished(res) {

      if (!res.newValidation) {
        FormActions.validationFinished(this.props.formId,nodeId,res.isValid);
      }

      if (this.geocoder.results && this.geocoder.results.length === 0 && this.input.value.length > 0) {
        res.errors = res.errors.concat([{message: ViewerText.contribute.location.notFound}]);
        res.isValid = false;
      }

      this.setState({
        extras: res.extras && res.extras.length > 0 ? res.extras : false,
        errors: res.errors && res.errors.length > 0 ? res.errors : false,
        isValid: res.isValid
      });

      if (res.isValid) {
        this.saveData(this.input.value);
      }
    };

    FormActions.validationStarted(this.props.formId,nodeId);
    this.validator.validate(this.input.value).then(finished.bind(this));
  }

  onSelect(selection) {
    console.log(selection);
    if (selection.result) {
      this.value = {
        name: selection.result.name,
        geometry: selection.result.feature.geometry
      };
    }
  }

  onClear() {
    this.value = false;
    if (this.state.changed) {
      this.input = {
        value: this.geocoderInput.val()
      };
      this.validateForm();
    }
  }

  onAutocomplete() {
    this.value = false;
    if (!this.state.changed) {
      this.setState({
        changed: true
      });
    }
    this.input = {
      value: this.geocoderInput.val()
    };
    this.validateForm();
  }

  onChange() {
    if (!this.state.changed) {
      this.setState({
        changed: true
      });
    }
    this.input = {
      value: this.geocoderInput.val()
    };
    this.validateForm();
  }

  onBlur() {
    this.input = {
      value: this.geocoderInput.val()
    };
    this.validateForm();
    if (!this.value && !this.geocoderAutocomplete.is(':visible') && this.geocoder.results && this.geocoder.results.length > 0) {
      this.geocoder._findThenSelect(this.geocoder.results[0]);
    }
  }
}
