import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import FormGroup from 'babel/components/forms/base/FormGroup';
import Logger from 'babel/utils/logging/Logger';
import IconTooltip from 'babel/components/helper/tooltip/IconTooltip';
import ViewerText from 'i18n!translations/viewer/nls/template';

const formText = ViewerText.forms.select;

const _logger = new Logger({
  source: 'Select'
});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

export default class Select extends FormGroup {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    super.componentDidMount();
    window.ts = this.input;
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'select','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        {this.props.tooltip ? <IconTooltip className="form-tooltip" {...this.props.tooltip} /> : null}
        <select
          id={this.props.id}
          className="form-control"
          ref={(ref) => this.input = ref}
          defaultValue={formText.noDefaultSelection ? '' : null}
          onChange={this.onChange}
          onBlur={this.onBlur}
          {...this.props.inputAttr}>
          {this.props.noDefaultSelection ? <option disabled value="">{formText.noDefaultSelection}</option> : null}
          {
            this.props.options.map((option) => {
              if (typeof option === 'string') {
                return <option key={option} value={option}>{option}</option>;
              } else if (typeof option === 'object' && option.value !== undefined && option.label !== undefined) {
                return <option key={option.value} value={option.value}>{option.label}</option>;
              } else {
                _onError('Each option must be either a string or a object containing the keys "value" and "label."');
              }
            })
          }
        </select>
        {this.getErrorMessage ? this.getErrorMessage() : null}
      </div>
    );
  }

}

$.extend(true,Select.propTypes,{
  noDefaultSelection: React.PropTypes.bool,
  options: React.PropTypes.array
});

$.extend(true,Select.defaultProps,{
  noDefaultSelection: false,
  options: []
});
