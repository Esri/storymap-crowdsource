import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import Logger from 'babel/utils/logging/Logger';
import {validate} from 'babel/utils/validations/Validate';
import ViewerText from 'i18n!translations/viewer/nls/template';

const formText = ViewerText.forms.select;

const _logger = new Logger({
  source: 'Select'
});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

export default class Select extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: false,
      isValid: true
    };

    this.onInput = this.onInput.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'select-input','form-group',{
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        <select
          id={this.props.id}
          className="form-control"
          ref={(ref) => this.selectInput = ref}
          value=""
          onInput={this.onInput}
          onBlur={this.onBlur}
          {...this.props.inputAttr}>
          {this.props.noDefaultSelection ? <option disabled value="">{formText.noDefaultSelection}</option> : null}
          {
            this.props.options.map((option,index) => {
              if (typeof option === 'string') {
                return <option key={index} value={option}>{option}</option>;
              } else if (typeof option === 'object' && option.value !== undefined && option.label !== undefined) {
                return <option key={index} value={option.value}>{option.label}</option>;
              } else {
                _onError('Each option must be either a string or a object containing the keys "value" and "label."');
              }
            })
          }
        </select>
        {!this.state.isValid && this.state.errors && this.state.errors.length > 0 ? (
          <ul className="text-danger form-error-message">
            {this.state.errors.map((error,index) => {
              return (
                <li key={index}>
                  <strong><small>
                    {error}
                  </small></strong>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  }

  onInput() {
    this.validateForm();
  }

  onBlur() {
    this.validateForm();
  }

  validateForm() {
    const value = this.selectInput.value;

    const pass = function pass(res) {
      this.setState({
        errors: false,
        isValid: res.isValid
      });
    };

    const fail = function fail(res) {
      this.setState({
        errors: res.errors,
        isValid: res.isValid
      });
    };

    validate({
      value,
      validations: this.props.validations,
      attributeName: this.props.validationName || this.props.label.toLowerCase()
    }).then(pass.bind(this),fail.bind(this));
  }

}

Select.propTypes = {
  id: React.PropTypes.string,
  inputAttr: React.PropTypes.shape(),
  label: React.PropTypes.string,
  noDefaultSelection: React.PropTypes.bool,
  options: React.PropTypes.array,
  validations: React.PropTypes.string
};

Select.defaultProps = {
  id: '',
  inputAttr: {},
  label: '',
  noDefaultSelection: false,
  options: [],
  validations: ''
};
