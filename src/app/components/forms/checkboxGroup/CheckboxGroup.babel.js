import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import IconTooltip from 'babel/components/helper/tooltip/IconTooltip';
import FormGroup from 'babel/components/forms/base/FormGroup';
import 'babel/utils/helper/strings/StringUtils';

export default class CheckboxGroup extends FormGroup {

  constructor(props) {
    super(props);

    // Autobind methods
    this.getValue = this.getValue.bind(this);
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    this.input = {
      value: this.props.defaultValue
    };
    super.componentDidMount();
  }

  onChange() {
    this.input.value = this.getValue();
    super.onChange();
  }

  getValue() {
    const selectedInputs = $(this.node).find('input:checked');
    const values = $.map(selectedInputs,(input) => {
      return $(input).val();
    });

    return values.toString();
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'checkbox-group','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid
    }]);
    const defaultValues = this.props.defaultValue.toString().split(',');

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        {this.props.tooltip ? <IconTooltip className="form-tooltip" {...this.props.tooltip} /> : null}
          {this.props.options.map((current) => {
            const id = (this.props.id + current.value + '').toCamelCase();

            return (
              <div className="checkbox" key={id}>
                <label htmlFor={id}>
                  <input
                    type="checkbox"
                    name={this.props.id}
                    id={id}
                    value={current.value}
                    checked={defaultValues.indexOf(current.value.toString()) >= 0 ? 'checked' : null}
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

$.extend(true,CheckboxGroup.propTypes,{
  options: React.PropTypes.array
});

$.extend(true,CheckboxGroup.defaultProps,{
  options: []
});
