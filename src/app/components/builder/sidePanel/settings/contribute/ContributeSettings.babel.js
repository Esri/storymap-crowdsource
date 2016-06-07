import $ from 'jquery';
import React from 'react';
import Input from 'babel/components/forms/input/Input';
import CheckboxGroup from 'babel/components/forms/checkboxGroup/CheckboxGroup';
import RadioGroup from 'babel/components/forms/radioGroup/RadioGroup';
import Helper from 'babel/utils/helper/Helper';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

export default class ContributeSettings extends React.Component {

  constructor() {
    super();

    // Autobind
    this.getInputSettings = this.getInputSettings.bind(this);
  }

  render() {
    const settingsClasses = Helper.classnames([this.props.className,this.props.classNames,'contribute-settings']);

    return (
      <form onSubmit={(e) => {
          e.preventDefault();
        }} className={settingsClasses}>
        <CheckboxGroup {...this.getInputSettings('allowParticipation')}></CheckboxGroup>
        <RadioGroup {...this.getInputSettings('showNewFeatures')}></RadioGroup>
        <CheckboxGroup {...this.getInputSettings('loginOptions')}></CheckboxGroup>
        <Input {...this.getInputSettings('participateButton')}></Input>
        <p className="required-warning"><small>{viewerText.contribute.form.requiredWarning}</small></p>
      </form>
    );
  }

  getInputSettings(input) {
    let settings = {
      id: 'contributeSettings' + input,
      label: builderText.settings.panes.contribute.fields[input].label,
      attribute: builderText.settings.panes.contribute.fields[input].attribute,
      handleChange: (res) => {
        if (res.valid && res.value !== undefined && this.props.actions[input]){
          this.props.actions[input](res.value);
        }
      }
    };

    switch (input) {
      case 'allowParticipation':
        $.extend(true,settings,{
          defaultValue: this.props.defaultValues[input],
          options: [{
            label: builderText.settings.panes.contribute.fields[input].optionLabels.accept,
            value: true
          }]
        });
        break;
      case 'showNewFeatures':
        $.extend(true,settings,{
          defaultValue: this.props.defaultValues[input],
          tooltip: {
            placement: 'bottom',
            content: builderText.settings.panes.contribute.fields[input].tooltip
          },
          options: [{
            label: builderText.settings.panes.contribute.fields[input].optionLabels.new,
            value: 'new'
          },{
            label: builderText.settings.panes.contribute.fields[input].optionLabels.approved,
            value: 'approved'
          }]
        });
        break;
      case 'loginOptions':
        $.extend(true,settings,{
          required: true,
          defaultValue: this.props.defaultValues[input],
          tooltip: {
            content: builderText.settings.panes.contribute.fields[input].tooltip
          },
          validations: ['required'],
          options: [{
            label: builderText.settings.panes.contribute.fields[input].optionLabels.arcgis,
            value: 'arcgis'
          },{
            label: builderText.settings.panes.contribute.fields[input].optionLabels.facebook,
            value: 'facebook'
          },{
            label: builderText.settings.panes.contribute.fields[input].optionLabels.google,
            value: 'google'
          },{
            label: builderText.settings.panes.contribute.fields[input].optionLabels.guest,
            value: 'guest'
          }]
        });
        break;
      default:
        $.extend(true,settings,{
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.contribute.fields[input].placeholder
          }
        });
    }
    return settings;
  }
}

ContributeSettings.propTypes = {
  defaultValues: React.PropTypes.shape({
    allowParticipation: React.PropTypes.bool,
    loginOptions: React.PropTypes.string
  })
};

ContributeSettings.defaultProps = {
};
