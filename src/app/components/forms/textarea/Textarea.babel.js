import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import FormGroup from 'babel/components/forms/base/FormGroup';
import IconTooltip from 'babel/components/helper/tooltip/IconTooltip';
import autosize from 'autosize';

export default class Textarea extends FormGroup {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    autosize(this.input);
  }

  componentDidUpdate() {
    autosize.update(this.input);
  }

  componentWillUnmount() {
    autosize.destroy(this.input);
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'textarea','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        {this.props.tooltip ? <IconTooltip className="form-tooltip" {...this.props.tooltip} /> : null}
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
