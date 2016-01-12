import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import FormGroup from 'babel/components/forms/base/FormGroup';

export default class Location extends FormGroup {

  constructor(props) {
    super(props);

    this.defaultValidations = ['addressToLocation'];
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'input','form-group',{
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        <input
          id={this.props.id}
          className="form-control"
          ref={(ref) => this.input = ref}
          onChange={this.onChange}
          onBlur={this.onBlur}
          {...this.props.inputAttr}>
        </input>
        {this.getErrorMessage ? this.getErrorMessage() : null}
      </div>
    );
  }
}
