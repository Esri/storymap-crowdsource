import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import Textarea from '../../textarea/Textarea';
// import AppNotification from 'babel/components/helper/notifications/AppNotification';

export default class InlineTextarea extends Textarea {

  constructor(props) {
    super(props);
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'inline-textarea','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid
    }]);

    return (
      <span className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label sr-only">{this.props.label}</label>
        <textarea
          id={this.props.id}
          className="form-control"
          ref={(ref) => this.input = ref}
          rows="1"
          onChange={this.onChange}
          onBlur={this.onBlur}
          {...this.props.inputAttr}>
        </textarea>
          {this.getErrorMessage ? null /*(
            TODO put in app notifications
            this.getErrorMessage()
          )*/ : null}
      </span>
    );
  }
}
