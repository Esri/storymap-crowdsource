import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import {validate} from 'babel/utils/validations/Validate';

export default class TextInput extends React.Component {

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

    const inputClasses = Helper.classnames([this.props.className,'text-input','form-group',{
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        <input
          id={this.props.id}
          type="text"
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
    const value = this.textInput.value;

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

TextInput.propTypes = {
  id: React.PropTypes.string,
  inputAttr: React.PropTypes.shape(),
  label: React.PropTypes.string,
  validations: React.PropTypes.string
};

TextInput.defaultProps = {
  id: '',
  inputAttr: {},
  label: '',
  validations: ''
};
