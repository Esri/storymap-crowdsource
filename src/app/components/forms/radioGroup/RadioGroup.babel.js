import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import IconTooltip from 'babel/components/helper/tooltip/IconTooltip';
import FormGroup from 'babel/components/forms/base/FormGroup';
import 'babel/utils/helper/strings/StringUtils';

export default class RadioInput extends FormGroup {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.input = {
      value: this.props.defaultValue
    };
    super.componentDidMount();
  }

  onChange(e) {
    this.input.value = e.target.value;
    super.onChange();
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'radio-group','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        {this.props.tooltip ? <IconTooltip className="form-tooltip" {...this.props.tooltip} /> : null}
          {this.props.options.map((current) => {
            const id = (this.props.id + current.value + '').toCamelCase();

            return (
              <div className="radio" key={id}>
                <label htmlFor={id}>
                  <input
                    type="radio"
                    name={this.props.id}
                    id={id}
                    value={current.value}
                    checked={current.value === this.props.defaultValue ? 'checked' : null}
                    onChange={this.onChange}
                    onBlur={this.onBlur} />
                  {current.label || current.value}
                </label>
              </div>
            );
          })}
          {this.getErrorMessage ? this.getErrorMessage() : null}
      </div>
    );
  }
}

$.extend(true,RadioInput.propTypes,{
  options: React.PropTypes.array
});

$.extend(true,RadioInput.defaultProps,{
  options: []
});
