import $ from 'jquery';
import React from 'react';
import Validator from 'babel/utils/validations/Validator';
import ViewerText from 'i18n!translations/viewer/nls/template';

export default class FormGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: false,
      isValid: true,
      changed: false
    };

    this.value = false;
    this.valid = false;

    // Autobind
    this.getErrorMessage = this.getErrorMessage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.fixValue = this.fixValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.validator = new Validator({
      validations: this.getValidations(),
      attribute: this.props.attribute || this.props.label
    });

    if (this.input.value) {
      this.validateForm();
    }
    this.updateValue();
  }

  componentDidUpdate() {
    this.validator.setValidations(this.getValidations());
    this.updateValue();
  }

  render() {

    return null;

  }

  getErrorMessage() {
    if (!this.state.isValid && this.state.errors && this.state.errors.length > 0) {
      const fixable = this.state.errors.reduce((prev,current) => {
        if (current.fixValue) {
          return prev.concat(current.fixValue);
        }
        return prev;
      },[]);

      if (this.props.autoFix && fixable.length > 0) {
        setTimeout(() => {
          this.fixValue(fixable[0]);
        },0);
        return null;
      } else {
        return (
          <ul className="text-danger form-error-message">
            {this.state.errors.map((error) => {
              return (
                <li key={error.rule}>
                  <strong><small>
                    {error.message}
                    {error.fixValue ? <button className="text-btn text-primary" type="button" onClick={this.fixValue.bind(this,error.fixValue)}>{ViewerText.validations.fix}</button> : null}
                  </small></strong>
                </li>
              );
            })}
          </ul>
        );
      }
    } else {
      return null;
    }
  }

  getExtras(type) {
    if (typeof type === 'string' && this.state.extras && $.isArray(this.state.extras)) {
      const filter = $.grep(this.state.extras,(item) => {
        return item.type === type;
      });

      if (filter.length === 0) {
        return false;
      } else if (filter.length === 1) {
        return filter[0];
      } else {
        return filter;
      }
    } else {
      return false;
    }
  }

  onChange() {
    if (!this.state.changed) {
      this.setState({
        changed: true
      });
    }
    this.validateForm();
  }

  onBlur() {
    if (!this.valid) {
      this.validateForm();
    }
  }

  fixValue(value) {
    this.input.value = value;
    this.validateForm();
  }

  validateForm() {
    const finished = function finished(res) {
      if (!res.newValidation) {
        this.value = this.input.value;
        this.valid = res.isValid;

        this.setState({
          extras: res.extras && res.extras.length > 0 ? res.extras : false,
          errors: res.errors && res.errors.length > 0 ? res.errors : false,
          isValid: res.isValid
        });

        if (this.valid) {
          this.lastValidValue = this.value;
          this.handleChange();
        }
      }
    };

    this.value = undefined;
    this.valid = false;
    this.handleChange();
    this.validator.validate(this.input.value).then(finished.bind(this));
  }

  getValidations() {
    const validations = this.props.validations && $.isArray(this.props.validations) ? this.props.validations.slice(0) : [];
    const type = (this.props.inputAttr && this.props.inputAttr.type) ? this.props.inputAttr.type : 'text';

    const addToValidations = function addToValidations(validation) {
      if (validation && $.inArray(validation.rule,validations) === -1 && $.grep(validations,(val) => {
        if (typeof val === 'object' && val.rule && val.rule === validation.rule) {
          return true;
        } else {
          return false;
        }
      }).length === 0) {
        validations.push(validation);
      }
    };

    if (this.defaultValidations && $.isArray(this.defaultValidations)) {
      $.each(this.defaultValidations,(index) => {
        addToValidations(this.defaultValidations[index]);
      });
    }

    if (this.props.inputAttr && typeof this.props.inputAttr === 'object') {
      $.each(this.props.inputAttr,(key,value) => {
        let validation = false;

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

        addToValidations(validation);
      });

      if (this.props.required === true) {
        addToValidations( {
          rule: 'required'
        });
      }
    }
    
    return validations;
  }

  handleChange() {
    if (this.props.handleChange && ((this.state.changed && this.props.saveOnlyChanged) || !this.props.saveOnlyChanged)) {
      this.props.handleChange({
        valid: this.valid,
        value: this.value
      });
    }
  }

  updateValue() {
    const commonChecks = this.props.autoUpdate && this.props.autoUpdate.when && this.props.autoUpdate.value && this.props.autoUpdate.value !== this.input.value;

    if (commonChecks && this.props.autoUpdate && this.props.autoUpdate.when === 'always') {
      this.input.value = this.props.autoUpdate.value;
      this.validateForm();
    } else if (commonChecks && this.props.autoUpdate && this.props.autoUpdate.when === 'notChanged' && !this.state.changed) {
      this.input.value = this.props.autoUpdate.value;
      this.validateForm();
    }
  }

}

FormGroup.propTypes = {
  formId: React.PropTypes.string,
  required: React.PropTypes.bool,
  extras: React.PropTypes.shape({}),
  autoFix: React.PropTypes.bool,
  autoUpdate: React.PropTypes.shape({
    when: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.oneOf(['always', 'notChanged'])
    ]),
    value: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ])
  }),
  id: React.PropTypes.string,
  inputAttr: React.PropTypes.shape({
    type: React.PropTypes.string
  }),
  label: React.PropTypes.string,
  validations: React.PropTypes.array,
  saveOnlyChanged: React.PropTypes.bool,
  handleChange: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.func
  ])
};

FormGroup.defaultProps = {
  formId: '',
  required: false,
  extras: {},
  autoFix: false,
  autoUpdate: {
    when: false,
    value: false
  },
  id: '',
  inputAttr: {
    type: 'text'
  },
  label: '',
  validations: [],
  saveOnlyChanged: false,
  handleChange: false
};
