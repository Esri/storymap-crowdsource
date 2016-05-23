import $ from 'jquery';
import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import CheckboxGroup from 'babel/components/forms/checkboxGroup/CheckboxGroup';
import Input from 'babel/components/forms/input/Input';
import Textarea from 'babel/components/forms/textarea/Textarea';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

export default class SocialSharingSetttings extends React.Component {

  constructor() {
    super();

    // Autobind
    this.getInputSettings = this.getInputSettings.bind(this);
  }

  render() {
    const settingsClasses = Helper.classnames([this.props.className,this.props.classNames,'header-settings']);

    return (
      <form className={settingsClasses}>
        <CheckboxGroup {...this.getInputSettings('includeSharing')}></CheckboxGroup>
        { this.props.defaultValues.includeTwitter ? (<Textarea {...this.getInputSettings('twitterText')}></Textarea>) : null }
        { this.props.defaultValues.includeTwitter ? (<Input {...this.getInputSettings('twitterRelated')}></Input>) : null }
        <p className="required-warning"><small>{viewerText.contribute.form.requiredWarning}</small></p>
      </form>
    );
  }

  getInputSettings(input) {
    let settings = {
      id: 'socialSharingSetttings' + input,
      label: builderText.settings.panes.socialSharing.fields[input].label,
      attribute: builderText.settings.panes.socialSharing.fields[input].attribute,
      handleChange: (res) => {
        if (res.valid && res.value !== undefined && this.props.actions[input]){
          this.props.actions[input](res.value);
        }
      }
    };

    switch (input) {
      case 'includeSharing':
        $.extend(true,settings,{
          defaultValue: this.props.defaultValues.includeFacebook && this.props.defaultValues.includeLink && this.props.defaultValues.includeTwitter ? true : false,
          options: [{
            label: builderText.settings.panes.socialSharing.fields[input].optionLabels.include,
            value: true
          }]
        });
        break;
      case 'twitterText':
        $.extend(true,settings,{
          required: true,
          tooltip: {
            content: builderText.settings.panes.socialSharing.fields[input].tooltip
          },
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.socialSharing.fields[input].placeholder
          },
          validations: ['required']
        });
        break;
      case 'twitterRelated':
        $.extend(true,settings,{
          tooltip: {
            content: builderText.settings.panes.socialSharing.fields[input].tooltip
          },
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.socialSharing.fields[input].placeholder
          },
          validations: ['commaSeparated'],
          autoFix: true
        });
        break;
      default:
        $.extend(true,settings,{
          inputAttr: {
            defaultValue: this.props.defaultValues[input],
            placeholder: builderText.settings.panes.socialSharing.fields[input].placeholder
          }
        });
    }
    return settings;
  }
}

SocialSharingSetttings.propTypes = {
  defaultValues: React.PropTypes.shape({
    includeFacebook: React.PropTypes.bool,
    includeLink: React.PropTypes.bool,
    includeTwitter: React.PropTypes.bool,
    twitterText: React.PropTypes.string,
    twitterHashtags: React.PropTypes.string,
    twitterHandle: React.PropTypes.string,
    twitterRelated: React.PropTypes.string
  })
};

SocialSharingSetttings.defaultProps = {
};
