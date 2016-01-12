import $ from 'jquery';
import React from 'react';
import Input from 'babel/components/forms/input/Input';
import Select from 'babel/components/forms/select/Select';
import FormActions from 'babel/actions/FormActions';
import builderText from 'i18n!translations/builder/nls/template';
import 'bootstrap/collapse';
import 'bootstrap/transition';

const formText = builderText.settingsModals.itemName.form;

export const SettingsItemName = class SettingsItemName extends React.Component {

  constructor(props) {
    super(props);

    this._formId = 'BUILDER_SETTINGS_ITEM_NAMES';
  }

  componentDidMount() {
    FormActions.formCreated(this._formId);
  }

  componentWillUnmount() {
    FormActions.formCompleted(this._formId);
  }

  render() {

    const appName = {
      formId: this._formId,
      id: 'smCrowdsource_settings_itemName_appName',
      label: formText.appName.label,
      dataStoragePath: this.props.dataStoragePath + '.appName',
      inputAttr: {
        type: 'text',
        placeholder: formText.appName.placeholder,
        maxLength: 120,
        required: true
      },
      validations: ['arcgisItemName']
    };

    const mapName = {
      formId: this._formId,
      id: 'smCrowdsource_settings_itemName_mapName',
      label: formText.mapName.label,
      dataStoragePath: this.props.dataStoragePath + '.webmapName',
      autoUpdate: {
        when: 'notChanged',
        value: this.props.webmapName
      },
      inputAttr: {
        type: 'text',
        placeholder: formText.mapName.placeholder,
        maxLength: 120,
        required: true
      },
      validations: ['arcgisItemName']
    };

    const layerName = {
      formId: this._formId,
      id: 'smCrowdsource_settings_itemName_layerName',
      label: formText.featureServiceName.label,
      dataStoragePath: this.props.dataStoragePath + '.layerName',
      autoUpdate: {
        when: 'notChanged',
        value: this.props.layerName
      },
      inputAttr: {
        type: 'text',
        placeholder: formText.featureServiceName.placeholder,
        maxLength: 120,
        required: true
      },
      validations: ['arcgisIsServiceName']
    };

    const folder = {
      formId: this._formId,
      id: 'smCrowdsource_settings_itemName_folder',
      label: formText.featureServiceName.label,
      dataStoragePath: this.props.dataStoragePath + '.ownerFolder',
      inputAttr: {
        type: 'select',
        placeholder: formText.folderSelection.label,
        required: true
      },
      options: this.getUserFolders()
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h5>
              {builderText.settingsModals.itemName.header}
            </h5>
            <form>
              <Input {...appName}></Input>
              <button id="smCrowdsource_settings_itemName_advanceOptions_toggle" className="btn btn-default btn-xs" type="button" onClick={this.toggleAdvancedOptions} aria-expanded="false" aria-controls="smCrowdsource_settings_itemName_advanceOptions">
                {builderText.settingsModals.common.advancedOptions}
              </button>
              <div id="smCrowdsource_settings_itemName_advanceOptions" className="collapse">
                <hr></hr>
                <p>{builderText.settingsModals.itemName.advancedDescription}</p>
                <Input {...mapName}></Input>
                <Input {...layerName}></Input>
                <Select {...folder}></Select>
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

  getUserFolders() {
    const homeFolder = [{
      value: false,
      label: this.props.portal.getPortalUser().username + ' (' + formText.folderSelection.rootFolder + ')'
    }];

    const userFolders = [];

    this.props.userFolders.map((folder) => {
      userFolders.push({
        value: folder.id,
        label: folder.title
      });
    });

    return homeFolder.concat(userFolders);
  }

};

SettingsItemName.propTypes = {
  webmapName: React.PropTypes.string,
  layerName: React.PropTypes.string,
  dataStoragePath: React.PropTypes.string,
  portal: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.shape()
  ]),
  userFolders: React.PropTypes.array
};

SettingsItemName.defaultProps = {
  webmapName: '',
  layerName: '',
  dataStoragePath: 'values',
  portal: false,
  userFolders: []
};

export default SettingsItemName;
