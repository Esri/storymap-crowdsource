import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import RadioGroup from 'babel/components/forms/radioGroup/RadioGroup';
import Input from 'babel/components/forms/input/Input';
import Photo from 'babel/components/forms/photo/Photo';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

export default class HeaderSettings extends React.Component {

  constructor() {
    super();

    // Autobind
    this.getInputSettings = this.getInputSettings.bind(this);
  }

  render() {
    const settingsClasses = Helper.classnames([this.props.className,this.props.classNames,'header-settings']);

    return (
      <form onSubmit={(e) => {
          e.preventDefault();
        }}  className={settingsClasses}>
        <RadioGroup {...this.getInputSettings('logoType')}></RadioGroup>
        {this.props.defaultValues.logoType === 'upload' ? <Photo {...this.getInputSettings('logoUpload')}></Photo> : null }
        { this.props.defaultValues.logoType === 'upload' && this.props.uploadingLogo ? (
          <p className="uploading-message">
            <small>{ builderText.settings.messages.uploading }</small>
          </p>
        ) : null }
        {this.props.defaultValues.logoType === 'url' ? <Input {...this.getInputSettings('logoUrl')}></Input> : null }
        {this.props.defaultValues.logoType === 'url' || this.props.defaultValues.logoType === 'upload' ? <Input {...this.getInputSettings('logoLink')}></Input> : null }
        <Input {...this.getInputSettings('bannerTitle')}></Input>
        <p className="required-warning"><small>{viewerText.contribute.form.requiredWarning}</small></p>
      </form>
    );
  }

  getInputSettings(input) {
    let settings = {
      id: 'headerSettings' + input,
      label: builderText.settings.panes.header.fields[input].label,
      attribute: builderText.settings.panes.header.fields[input].attribute,
      handleChange: (res) => {
        if (res.valid && res.value !== undefined && this.props.actions[input]){
          this.props.actions[input](res.value);
        }
      }
    };

    switch (input) {
      case 'logoType':
        $.extend(true,settings,{
          defaultValue: this.props.defaultValues[input],
          options: [{
            label: builderText.settings.panes.header.fields[input].optionLabels.esri,
            value: 'esri'
          },{
            label: builderText.settings.panes.header.fields[input].optionLabels.upload,
            value: 'upload'
          },{
            label: builderText.settings.panes.header.fields[input].optionLabels.url,
            value: 'url'
          },{
            label: builderText.settings.panes.header.fields[input].optionLabels.none,
            value: 'none'
          }]
        });
        break;
      case 'logoUpload':
        $.extend(true,settings,{

            // type: 'photo',
          placeholder: builderText.settings.panes.header.fields[input].placeholder,
          extras: {
            photoSettings: [{
              name: 'logo',
              type: 'png',
              quality: 1
            }]
          }
        });
        break;
      case 'logoUrl':
        $.extend(true,settings,{
          required: true,
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.header.fields[input].placeholder
          },
          validations: ['required','https','imageUrl']
        });
        break;
      case 'logoLink':
        $.extend(true,settings,{
          required: true,
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.header.fields[input].placeholder
          },
          validations: ['required']
        });
        break;
      case 'bannerTitle':
        $.extend(true,settings,{
          saveOnlyChanged: true,
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.header.fields[input].placeholder
          }
        });
        break;
      default:
        $.extend(true,settings,{
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.header.fields[input].placeholder
          }
        });
    }
    return settings;
  }
}

HeaderSettings.propTypes = {
  uploadingLogo: React.PropTypes.bool,
  defaultValues: React.PropTypes.shape({
    logoType: React.PropTypes.string,
    logoUrl: React.PropTypes.string,
    logoLink: React.PropTypes.string,
    bannerTitle: React.PropTypes.string,
    participateButton: React.PropTypes.string
  })
};

HeaderSettings.defaultProps = {
  uploadingLogo: false
};
