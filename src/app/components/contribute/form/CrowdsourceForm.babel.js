import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import Input from 'babel/components/forms/input/Input';
import Textarea from 'babel/components/forms/textarea/Textarea';
import Location from 'babel/components/forms/location/Location';
import Photo from 'babel/components/forms/photo/Photo';
import TermsAndConditions from 'babel/components/forms/termsAndConditions/TermsAndConditions';
import ViewerText from 'i18n!translations/viewer/nls/template';
import 'bootstrap/transition';

export default class CrowdsourceForm extends React.Component {

  constructor(props) {
    super(props);

    this._formId = 'VIEWER_CONTRIBUTE_MAIN';

    this.state = {
      isValid: false
    };

    this.formItemStatus = {};
    this.graphic = {
      attributes: {}
    };

    this.onSave = this.onSave.bind(this);
    this.onClose = this.onClose.bind(this);
    this.getFormField = this.getFormField.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  render() {
    const termsOptions = {
      formId: this._formId,
      id: 'termsAndCondtions',
      label: ViewerText.contribute.form.termsAndConditions.label,
      inputAttr: {
        type: 'checkbox'
      }
    };

    const saveBtnClasses = Helper.classnames([this.props.className,this.props.classNames,'btn','btn-primary','btn-block','save-btn'], {
      disabled: !this.state.isValid
    });

    const closeBtnClasses = Helper.classnames([this.props.className,this.props.classNames,'btn','btn-default','btn-block','close-btn']);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>{this.props.title}</h3>
          <form>
          {this.props.fields.map(this.getFormField)}
            <TermsAndConditions {...termsOptions}></TermsAndConditions>
          </form>
          <button type="button" className={saveBtnClasses} onClick={this.props.saveAction}>
            {this.props.saving ? ViewerText.common.buttons.saving : ViewerText.contribute.form.save}
          </button>
          <button type="button" className={closeBtnClasses} onClick={this.onClose}>
            { ViewerText.common.buttons.close }
          </button>
          <p className="required-warning"><small>{ViewerText.contribute.form.requiredWarning}</small></p>
        </div>
      </div>
    );
  }

  onSave() {
    if (this.state.isValid) {
      this.props.saveAction();
    }
  }

  onClose() {
    this.props.closeAction();
  }

  getFieldDefinitionValue(name,key) {
    let value;

    this.props.fieldDefinitions.map((current) => {
      if (current.name === name && current[key]) {
        value = current[key];
      }
    });

    return value;
  }

  getFormField(field,index) {

    const self = this;

    this.formItemStatus[field.fieldID] = false;

    const defaults = {
      contributing: true,
      required: field.required,
      formId: this._formId,
      id: field.fieldID,
      key: index,
      label: field.label,
      attribute: field.attributeName,
      validations: field.validations,
      extras: field.extras,
      handleChange: function(res) {
        if (res.valid){
          self.graphic.attributes[field.fieldID] = res.value;
          console.log(self.graphic);
        }
        self.handleFieldChange(field.fieldID,res.valid);
      }
    };

    if (field.type === 'text' || field.type === 'textarea' || field.type === 'location') {
      const maxLength = this.getFieldDefinitionValue(field.fieldID,'length');
      const options = {
        inputAttr: {
          type: field.type,
          placeholder: field.placeholder,
          maxLength
        }
      };

      const settings = $.extend(true,{},defaults,options);

      switch (field.type) {
        case 'textarea':
          return <Textarea {...settings}></Textarea>;
        case 'location':
          return <Location map={this.props.map} {...settings}></Location>;
        default:
          return <Input {...settings}></Input>;
        }
    } else if (field.type === 'photo') {
      const options = {
        placeholder: field.placeholder
      };

      const settings = $.extend(true,{},defaults,options);

      return <Photo {...settings}></Photo>;
    }
  }

  handleFormChange(valid) {
    if (this.props.handleChange) {
      this.props.handleChange(valid);
    }
    if (this.state.isValid !== valid) {
      this.setState({
        isValid: valid
      });
    }
  }

  handleFieldChange(item,valid) {
    let formValid = true;

    this.formItemStatus[item] = valid;

    Object.keys(this.formItemStatus).forEach((current) => {
      if (!this.formItemStatus[current]) {
        formValid = false;
      }
    });

    this.handleFormChange(formValid);
  }
}

CrowdsourceForm.propTypes = {
  title: React.PropTypes.string,
  fields: React.PropTypes.array,
  fieldDefinitions: React.PropTypes.array,
  map: React.PropTypes.shape({}),
  closeAction: React.PropTypes.func,
  saveAction: React.PropTypes.func
};

CrowdsourceForm.defaultProps = {
  title: '',
  fields: [],
  fieldDefinitions: [],
  map: {},
  closeAction: () => {},
  saveAction: () => {}
};
