import $ from 'jquery';
import React from 'react';
import TextInput from 'babel/components/forms/textInput/TextInput';
import SelectInput from 'babel/components/forms/selectInput/SelectInput';
import builderText from 'i18n!translations/builder/nls/template';
import 'bootstrap/collapse';
import 'bootstrap/transition';

const formText = builderText.settingsModals.itemName.form;

export const SettingsItemName = class SettingsItemName extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const self = this;

    const appNameInputAttr = {
      placeholder: formText.appName.placeholder,
      maxLength: 120
    };

    const mapNameInputAttr = {
      placeholder: formText.mapName.placeholder,
      maxLength: 120
    };

    const layerNameInputAttr = {
      placeholder: formText.featureServiceName.placeholder,
      maxLength: 120
    };

    const getUserFolders = function getUserFolders() {
      const homeFolder = [{
        value: false,
        label: self.props.portal.getPortalUser().username + ' (' + formText.folderSelection.rootFolder + ')'
      }];

      const userFolders = [];

      self.props.userFolders.map((folder) => {
        userFolders.push({
          value: folder.id,
          label: folder.title
        });
      });

      return homeFolder.concat(userFolders);
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h5>
              {builderText.settingsModals.itemName.header}
            </h5>
            <form>
              <TextInput
                id="smCrowdsource_settings_itemName_appName"
                label={formText.appName.label}
                inputAttr={appNameInputAttr}
                validations="required|max:120|arcgisItemName">
              </TextInput>
              <button id="smCrowdsource_settings_itemName_advanceOptions_toggle" className="btn btn-default btn-xs" type="button" onClick={this.toggleAdvancedOptions} aria-expanded="false" aria-controls="smCrowdsource_settings_itemName_advanceOptions">
                {builderText.settingsModals.common.advancedOptions}
              </button>
              <div id="smCrowdsource_settings_itemName_advanceOptions" className="collapse">
                <hr></hr>
                <p>{builderText.settingsModals.itemName.advancedDescription}</p>
                <TextInput
                  id="smCrowdsource_settings_itemName_mapName"
                  label={formText.mapName.label}
                  inputAttr={mapNameInputAttr}
                  validations="required|max:120|arcgisItemName">
                </TextInput>
                <TextInput
                  id="smCrowdsource_settings_itemName_layerName"
                  label={formText.featureServiceName.label}
                  inputAttr={layerNameInputAttr}
                  validations="required|max:120|arcgisServiceNameFormat">
                </TextInput>
                <SelectInput
                  id="smCrowdsource_settings_itemName_folder"
                  label={formText.folderSelection.label}
                  options={getUserFolders()}
                  validations="required">
                </SelectInput>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  toggleAdvancedOptions() {
    $('#smCrowdsource_settings_itemName_advanceOptions_toggle').attr('aria-expanded',!$('#smCrowdsource_settings_itemName_advanceOptions').height() > 0);
    $('#smCrowdsource_settings_itemName_advanceOptions').collapse('toggle');
  }

  showAdvancedOptions() {
    $('#smCrowdsource_settings_itemName_advanceOptions_toggle').attr('aria-expanded',true);
    $('#smCrowdsource_settings_itemName_advanceOptions').collapse('show');
  }

};

SettingsItemName.propTypes = {
  appName: React.PropTypes.string,
  portal: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.shape()
  ]),
  userFolders: React.PropTypes.array
};

SettingsItemName.defaultProps = {
  appName: '',
  portal: false,
  userFolders: []
};

export default SettingsItemName;
