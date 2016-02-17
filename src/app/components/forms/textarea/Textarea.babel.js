import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import FormGroup from 'babel/components/forms/base/FormGroup';
import autosize from 'lib/autosize/dist/autosize';

export default class Textarea extends FormGroup {

  constructor(props) {
    super(props);
  }

  componentDidMountExtention() {
    autosize(this.input);
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'textarea','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        <textarea
          id={this.props.id}
          className="form-control"
          ref={(ref) => this.input = ref}
          onChange={this.onChange}
          onBlur={this.onBlur}
          {...this.props.inputAttr}>
        </textarea>
        {this.getErrorMessage ? this.getErrorMessage() : null}
      </div>
    );
  }
}
