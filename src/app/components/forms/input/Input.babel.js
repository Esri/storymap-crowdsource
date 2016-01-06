import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import Validator from 'babel/utils/validations/Validator';
import ViewerText from 'i18n!translations/viewer/nls/template';

export default class Input extends React.Component {

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
    this.validator = new Validator({
      validations: this.getValidations(),
      attribute: this.props.label
    });
  }

  componentDidUpdate() {
    this.validator.setValidations(this.getValidations());
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'text-input','form-group',{
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        <input
          id={this.props.id}
          className="form-control"
          ref={(ref) => this.textInput = ref}
          onInput={this.onInput}
          onBlur={this.onBlur}
          {...this.props.inputAttr}>
        </input>
        {!this.state.isValid && this.state.errors && this.state.errors.length > 0 ? (
          <ul className="text-danger form-error-message">
            {this.state.errors.map((error,index) => {
              return (
                <li key={index}>
                  <strong><small>
                    {error.message}
                    {error.fixValue ? <button className="text-btn text-primary" type="button" onClick={this.fixValue.bind(this,error.fixValue)}>{ViewerText.validations.fix}</button> : null}
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

  fixValue(value) {
    this.textInput.value = value;
    this.validateForm();
  }

  validateForm() {
    const value = this.textInput.value;

    const finished = function finished(res) {
      this.setState({
        errors: res.errors && res.errors.length > 0 ? res.errors : false,
        isValid: res.isValid
      });
    };

    this.validator.validate(value).then(finished.bind(this));
  }

  getValidations() {
    const validations = this.props.validations;
    const type = this.props.inputAttr.type;

    let validation = false;

    $.each(this.props.inputAttr,(key,value) => {
      // TODO add all validations http://www.w3schools.com/tags/tag_input.asp
      switch (key.toLowerCase()) {
        case 'required':
          if (value) {
            validation = {
              rule: 'required'
            };
          }
          break;
        case 'max':
          validation = {
            rule: 'max',
            max: value,
            type: type
          };
          break;
        case 'min':
          validation = {
            rule: 'min',
            max: value,
            type: type
          };
          break;
        case 'maxlength':
          validation = {
            rule: 'max',
            max: value,
            type: 'string'
          };
          break;
        case 'pattern':
          validation = {
            rule: 'regex',
            pattern: value
          };
          break;
      }

      if (validation && $.inArray(validation.rule,validations) === -1 && $.grep(validations,(val) => {
        if (typeof val === 'object' && val.rule && val.rule === validation.rule) {
          return true;
        } else {
          return false;
        }
      }).length === 0) {
        validations.push(validation);
      }
    });

    return validations;
  }

}

Input.propTypes = {
  id: React.PropTypes.string,
  inputAttr: React.PropTypes.shape({
    type: React.PropTypes.string
  }),
  label: React.PropTypes.string,
  validations: React.PropTypes.array
};

Input.defaultProps = {
  id: '',
  inputAttr: {
    type: 'text'
  },
  label: '',
  validations: []
};
