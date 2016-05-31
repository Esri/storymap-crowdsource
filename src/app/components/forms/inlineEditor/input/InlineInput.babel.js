import $ from 'jquery';
import lang from 'dojo/_base/lang';
import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import FormGroup from 'babel/components/forms/base/FormGroup';
import ViewerText from 'i18n!translations/viewer/nls/template';
import BuilderText from 'i18n!translations/builder/nls/template';

export default class InlineInput extends FormGroup {

  constructor(props) {
    super(props);

    // Autobind methods
    this.updateInputWidth = this.updateInputWidth.bind(this);
    this.updateSizerValue = this.updateSizerValue.bind(this);
    this.compareErrorMessages = this.compareErrorMessages.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);

    this.errors = false;

    this.state = {
      sizerValue: '',
      inputWidth: 0
    };
  }

  componentDidMount () {
    super.componentDidMount();
    this.updateSizerValue();
    this.updateInputWidth();
    this.compareErrorMessages();
	}

	componentDidUpdate () {
    this.updateSizerValue();
    super.componentDidUpdate();
		this.updateInputWidth();
    this.compareErrorMessages();
	}

  updateSizerValue() {
    const placeholder = lang.getObject('props.inputAttr.placeholder',false,this);

    if (!placeholder && this.input.value.length === 0 && this.state.sizerValue !== '') {
      this.setState({
        sizerValue: ''
      });
    } else if (placeholder && this.input.value.length === 0 && this.state.sizerValue !== placeholder) {
      this.setState({
        sizerValue: placeholder
      });
    } else if (this.input.value.length > 0 && this.state.sizerValue !== this.input.value) {
      this.setState({
        sizerValue: this.input.value
      });
    }
  }

  updateInputWidth() {
    const placeholder = lang.getObject('props.inputAttr.placeholder',false,this);

    if (this.state.inputWidth !== this.sizer.scrollWidth + 2 &&
      (this.state.sizerValue === this.input.value ||
      (this.input.value.length === 0 && placeholder && this.state.sizerValue === placeholder) ||
      (this.input.value.length === 0 && !placeholder && this.state.sizerValue === ''))) {

      this.setState({
        inputWidth: this.sizer.scrollWidth + 2
      });
    }
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

    const inputClasses = Helper.classnames([this.props.className,'inline-input','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid
    }]);

    return (
      <span className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label sr-only">{this.props.label}</label>
        <input
          id={this.props.id}
          className="form-control"
          ref={(ref) => this.input = ref}
          onChange={this.onChange}
          onBlur={this.onBlur}
          autoComplete="off"
          style={{width: this.state.inputWidth}}
          {...this.props.inputAttr}>
        </input>
        <div className="sizer" ref={(ref) => this.sizer = ref}>{this.state.sizerValue}</div>
        {/*{this.getErrorMessage ? this.getErrorMessage() : null}*/}
      </span>
    );
  }
}

$.extend(true,InlineInput.propTypes,{
  addNotifications: React.PropTypes.func,
  removeNotifications: React.PropTypes.func
});

$.extend(true,InlineInput.defaultProps,{
  addNotifications: () => {},
  removeNotifications: () => {}
});
