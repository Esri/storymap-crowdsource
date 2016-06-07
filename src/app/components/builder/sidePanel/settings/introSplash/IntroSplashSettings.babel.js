import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import Photo from 'babel/components/forms/photo/Photo';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

export default class IntroSplashSettings extends React.Component {

  constructor() {
    super();

    // Autobind
    this.getInputSettings = this.getInputSettings.bind(this);
  }

  render() {
    const settingsClasses = Helper.classnames([this.props.className,this.props.classNames,'intro-splash-settings']);

    return (
      <form onSubmit={(e) => {
          e.preventDefault();
        }}  className={settingsClasses}>
        <Photo {...this.getInputSettings('backgroundImage')}></Photo>
        { this.props.uploadingCoverPhoto ? (
          <p className="uploading-message">
            <small>{ builderText.settings.messages.uploading }</small>
          </p>
        ) : null }
        <p className="required-warning"><small>{viewerText.contribute.form.requiredWarning}</small></p>
      </form>
    );
  }

  getInputSettings(input) {
    let settings = {
      id: 'introSplashSettings' + input,
      label: builderText.settings.panes.introSplash.fields[input].label,
      attribute: builderText.settings.panes.introSplash.fields[input].attribute,
      handleChange: (res) => {
        if (res.valid && res.value !== undefined && this.props.actions[input]){
          this.props.actions[input](res.value);
        }
      }
    };

    switch (input) {
      case 'backgroundImage':
        $.extend(true,settings,{
          placeholder: builderText.settings.panes.introSplash.fields[input].placeholder,
          extras: {
            photoSettings: [{
              name: 'backgroundImage',
              width: 2000
            }]
          }
        });
        break;
      default:
        $.extend(true,settings,{
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.introSplash.fields[input].placeholder
          }
        });
    }
    return settings;
  }
}

IntroSplashSettings.propTypes = {
  uploadingCoverPhoto: React.PropTypes.bool,
  defaultValues: React.PropTypes.shape({
    backgroundImage: React.PropTypes.string
  })
};

IntroSplashSettings.defaultProps = {
  uploadingCoverPhoto: false
};
