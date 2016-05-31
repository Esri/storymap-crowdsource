import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import Textarea from '../../textarea/Textarea';
import ViewerText from 'i18n!translations/viewer/nls/template';
import BuilderText from 'i18n!translations/builder/nls/template';

export default class InlineTextarea extends Textarea {

  constructor(props) {
    super(props);

    this.compareErrorMessages = this.compareErrorMessages.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);

    this.errors = false;
  }

  componentDidMount() {
    super.componentDidMount();
    this.compareErrorMessages();
  }

  componentDidUpdate() {
    super.componentDidUpdate();
    this.compareErrorMessages();
  }

  compareErrorMessages() {
    if (!this.errors || JSON.stringify(this.state.errors) !== this.errors) {
      this.errors = JSON.stringify(this.state.errors);

      this.props.removeNotifications({
        id: this.props.id
      });

      if (!this.state.isValid && this.getErrorMessage()) {
        this.props.addNotifications({
          id: this.props.id,
          type: 'error',
          content: this.getErrorMessage()
        });
      }
    }
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
          <div className="inline-error-message text-danger">
            <h6>{BuilderText.errors.inlineEditing.heading}</h6>
            <ul className="form-error-message">
              {this.state.errors.map((error) => {
                return (
                  <li key={error.rule}>
                      <span className="error-message">{error.message}</span>
                    {error.fixValue ? <button className="btn btn-primary btn-sm fix-btn" type="button" onClick={this.fixValue.bind(this,error.fixValue)}>{ViewerText.validations.fix}</button> : null}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }
    } else {
      return null;
    }
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
      </span>
    );
  }
}

$.extend(true,InlineTextarea.propTypes,{
  addNotifications: React.PropTypes.func,
  removeNotifications: React.PropTypes.func
});

$.extend(true,InlineTextarea.defaultProps,{
  addNotifications: () => {},
  removeNotifications: () => {}
});
