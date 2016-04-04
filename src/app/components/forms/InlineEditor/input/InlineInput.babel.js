import lang from 'dojo/_base/lang';
import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import FormGroup from 'babel/components/forms/base/FormGroup';

export default class Input extends FormGroup {

  constructor(props) {
    super(props);

    // Autobind methods
    this.updateInputWidth = this.updateInputWidth.bind(this);
    this.updateSizerValue = this.updateSizerValue.bind(this);

    this.state = {
      sizerValue: '',
      inputWidth: 0
    };
  }

  componentDidMount () {
    super.componentDidMount();
    this.updateSizerValue();
    this.updateInputWidth();
	}

	componentDidUpdate () {
    this.updateSizerValue();
    super.componentDidUpdate();
		this.updateInputWidth();
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
