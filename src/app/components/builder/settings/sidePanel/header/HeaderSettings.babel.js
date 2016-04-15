import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import RadioGroup from 'babel/components/forms/radioGroup/RadioGroup';
import Input from 'babel/components/forms/input/Input';
import Photo from 'babel/components/forms/photo/Photo';
import builderText from 'i18n!translations/builder/nls/template';
// import viewerText from 'i18n!translations/viewer/nls/template';

export default class HeaderSettings extends React.Component {

  constructor() {
    super();

    // Autobind
    this.getInputSettings = this.getInputSettings.bind(this);
  }

  render() {
    const settingsClasses = Helper.classnames([this.props.className,this.props.classNames,'header-settings','settings-pane']);

    return (
      <form className={settingsClasses}>
        <RadioGroup {...this.getInputSettings('logoType')}></RadioGroup>
        {this.props.defaultValues.logoType === 'upload' ? <Photo {...this.getInputSettings('logoUpload')}></Photo> : null }
        {this.props.defaultValues.logoType === 'url' ? <Input {...this.getInputSettings('logoUrl')}></Input> : null }
        <Input {...this.getInputSettings('logoLink')}></Input>
        <Input {...this.getInputSettings('bannerTitle')}></Input>
        <Input {...this.getInputSettings('participateButton')}></Input>
      </form>
    );
  }

  getInputSettings(input) {
    let settings = {
      id: 'headerSettings' + input,
      type: 'photo',
      label: builderText.settings.panes.header.fields[input].label,
      attributeName: builderText.settings.panes.header.fields[input].attribute,
      handleChange: (res) => {
        if (res.valid && res.value && this.props.actions[input]){
          this.props.actions[input](res.value);
        }
      }
    };

    switch (input) {
      case 'logoType':
        $.extend(true,settings,{
          required: true,
          defaultValue: this.props.defaultValues[input],
          validations: ['required'],
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
          placeholder: builderText.settings.panes.header.fields[input].placeholder,
          extras: {
            photoSettings: [{
              name: 'logo',
              type: 'png',
              height: 30
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
      default:
        $.extend(true,settings,{
          required: true,
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.header.fields[input].placeholder
          },
          validations: ['required']
        });
    }
    return settings;
  }
}

HeaderSettings.propTypes = {
  defaultValues: React.PropTypes.shape({
    logoType: React.PropTypes.string,
    logoLink: React.PropTypes.string,
    bannerTitle: React.PropTypes.string,
    participateButton: React.PropTypes.string
  })
};

HeaderSettings.defaultProps = {
};
