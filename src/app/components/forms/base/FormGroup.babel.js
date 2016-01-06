import $ from 'jquery';
import React from 'react';
import Validator from 'babel/utils/validations/Validator';
import ViewerText from 'i18n!translations/viewer/nls/template';

export default class FormGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: false,
      isValid: true
    };

    this.getErrorMessage = this.getErrorMessage.bind(this);
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

    return null;

  }

  getErrorMessage() {
    if (!this.state.isValid && this.state.errors && this.state.errors.length > 0) {
      return (
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
      );
    } else {
      return null;
    }
  }

  fixValue(value) {
    this.input.value = value;
    this.validateForm();
  }

  validateForm() {
    const value = this.input.value;

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
    const type = this.props.inputAttr.type || 'text';

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

FormGroup.propTypes = {
  id: React.PropTypes.string,
  inputAttr: React.PropTypes.shape({
    type: React.PropTypes.string
  }),
  label: React.PropTypes.string,
  validations: React.PropTypes.array
};

FormGroup.defaultProps = {
  id: '',
  inputAttr: {
    type: 'text'
  },
  label: '',
  validations: []
};
