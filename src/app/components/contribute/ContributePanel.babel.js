import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import Input from 'babel/components/forms/input/Input';
import Textarea from 'babel/components/forms/textarea/Textarea';
import Location from 'babel/components/forms/location/Location';
import Photo from 'babel/components/forms/photo/Photo';
import TermsAndConditions from 'babel/components/forms/termsAndConditions/TermsAndConditions';
import FormActions from 'babel/actions/FormActions';
import ViewerText from 'i18n!translations/viewer/nls/template';
import ContributeActions from 'babel/actions/ContributeActions';
import CrowdsourceAppStore from 'babel/stores/CrowdsourceAppStore';
import 'bootstrap/modal';
import 'bootstrap/transition';

export default class ContributePanel extends React.Component {

  constructor(props) {
    super(props);

    this._formId = 'VIEWER_CONTRIBUTE_MAIN';

    this.getFormField = this.getFormField.bind(this);
    this.saveGraphic = this.saveGraphic.bind(this);
  }

  componentDidMount() {
    FormActions.formCreated(this._formId);
  }

  componentWillUnmount() {
    FormActions.formCompleted(this._formId);
  }

  render() {

    const contributeClasses = Helper.classnames([this.props.className,this.props.classNames,
      'contribute-panel',
      'container-fluid'
    ]);

    const termsOptions = {
      formId: this._formId,
      id: 'termsAndCondtions',
      label: ViewerText.contribute.termsAndConditions.label,
      inputAttr: {
        type: 'checkbox'
      }
    };

    const saveBtnClasses = Helper.classnames([this.props.className,this.props.classNames,'btn','btn-primary','btn-block','save'], {
      disabled: !this.props.formComplete || CrowdsourceAppStore.getFormErrors(this._formId) > 0 || this.props.saving
    });

    return (
      <div className={contributeClasses}>
        <div className="row">
          <div className="col-xs-12">
            <h3>{this.props.title}</h3>
            <form>
            {this.props.fields.map(this.getFormField)}
              <TermsAndConditions {...termsOptions}></TermsAndConditions>
            </form>
            <button type="button" className={saveBtnClasses} onClick={this.saveGraphic}>
              {this.props.saving ? ViewerText.contribute.saving : ViewerText.contribute.save}
            </button>
            <p className="required-warning"><small>{ViewerText.contribute.requiredWarning}</small></p>
          </div>
        </div>
      </div>
    );
  }

  saveGraphic() {
    ContributeActions.save();
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
      saveMethod: function(value) {
        if (value){
          ContributeActions.updateContribution({
            fieldId: field.fieldID,
            extras: field.extras,
            value
          });
        }
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
        placeholder: field.placeholder,
        inputAttr: {
          type: 'file',
          accept: 'image/*',
          capture: 'camera'
        }
      };

      const settings = $.extend(true,{},defaults,options);

      return <Photo {...settings}></Photo>;
    }
  }

}

ContributePanel.propTypes = {
  title: React.PropTypes.string,
  fields: React.PropTypes.array,
  fieldDefinitions: React.PropTypes.array,
  formComplete: React.PropTypes.bool,
  graphic: React.PropTypes.shape({}),
  map: React.PropTypes.shape({})
};

ContributePanel.defaultProps = {
  title: '',
  fields: [],
  fieldDefinitions: [],
  formComplete: false,
  graphic: {},
  map: {}
};
