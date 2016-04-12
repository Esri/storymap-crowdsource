import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
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
        <Photo {...this.getInputSettings('logo')}></Photo>
        <Input {...this.getInputSettings('logoLink')}></Input>
        <Input {...this.getInputSettings('bannerTitle')}></Input>
        <Input {...this.getInputSettings('participateButton')}></Input>
      </form>
    );
  }

  getInputSettings(input) {
    let settings = {
      formId: 'headerSettings',
      id: input,
      required: true,
      type: 'photo',
      label: builderText.settings.panes.header.fields[input].label
    };

    switch (input) {
      case 'logo':
        $.extend(true,settings,{
          attributeName: builderText.settings.panes.header.fields[input].attribute,
          placeholder: builderText.settings.panes.header.fields[input].placeholder,
          extras: {
            photoSettings: [{
              name: 'logo',
              type: 'png',
              height: 30
            }],
            handleChange: (res) => {
              console.log(res);
            }
          }
        });
        break;
      default:
        $.extend(true,settings,{
          inputAttr: {
            value: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.header.fields[input].placeholder
          },
          validations: ['required'],
          handleChange: (res) => {
            if (res.valid && res.value && this.props.actions[input]){
              this.props.actions[input](res.value);
            }
          }
        });
    }

    console.log(settings);
    return settings;
  }
}

HeaderSettings.propTypes = {
};

HeaderSettings.defaultProps = {
};
