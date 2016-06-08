import $ from 'jquery';
import React from 'react';
import Input from 'babel/components/forms/input/Input';
import Select from 'babel/components/forms/select/Select';
import builderText from 'i18n!translations/builder/nls/template';
import ItemActions from 'babel/actions/ItemActions';
import SettingsActions from 'babel/actions/SettingsActions';
import Validator from 'babel/utils/validations/Validator';
import 'bootstrap/collapse';
import 'bootstrap/transition';

const formText = builderText.settingsModals.itemName.form;

export const SettingsItemName = class SettingsItemName extends React.Component {

  constructor(props) {
    super(props);

    this.setAutoUpdateValues = this.setAutoUpdateValues.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);

    this._formId = 'BUILDER_SETTINGS_ITEM_NAMES';
    this.layerNameValidator = new Validator({
      validations: ['arcgisIsServiceName']
    });
    this.formItems = {
      autoUpdate: false,
      appName: false,
      mapName: false,
      layerName: false
    };

    this.state = {
      folderOptions: [],
      mapNameAutoUpdate: '',
      layerNameAutoUpdate: ''
    };
  }

  componentDidMount() {
    this.getUserFolders();
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {

    const self = this;

    const appName = {
      formId: this._formId,
      id: 'smCrowdsource_settings_itemName_appName',
      label: formText.appName.label,
      inputAttr: {
        type: 'text',
        placeholder: formText.appName.placeholder,
        maxLength: 120,
        required: true
      },
      validations: ['arcgisItemName'],
      handleChange: function(res) {
        if (res.valid){
          self.setAutoUpdateValues(res.value);
          ItemActions.updateAppItemTitle(res.value);
          SettingsActions.updateIntroTitle(res.value);
          SettingsActions.updateHeaderTitle(res.value);
        }
        self.handleFieldChange('appName',res.valid);
      }
    };

    const mapName = {
      formId: this._formId,
      id: 'smCrowdsource_settings_itemName_mapName',
      label: formText.mapName.label,
      autoUpdate: {
        when: 'notChanged',
        value: this.state.mapNameAutoUpdate
      },
      inputAttr: {
        type: 'text',
        placeholder: formText.mapName.placeholder,
        maxLength: 120,
        required: true
      },
      validations: ['arcgisItemName'],
      handleChange: function(res) {
        if (res.valid){
          ItemActions.updateWebmapItemTitle(res.value);
        }
        self.handleFieldChange('mapName',res.valid);
      }
    };

    const layerName = {
      formId: this._formId,
      id: 'smCrowdsource_settings_itemName_layerName',
      label: formText.featureServiceName.label,
      autoUpdate: {
        when: 'notChanged',
        value: this.state.layerNameAutoUpdate
      },
      inputAttr: {
        type: 'text',
        placeholder: formText.featureServiceName.placeholder,
        maxLength: 120,
        required: true
      },
      validations: ['arcgisIsServiceName'],
      handleChange: function(res) {
        if (res.valid){
          ItemActions.updateFeatureServiceItemTitle(res.value);
          ItemActions.updateFeatureServiceDefinition({name: res.value});
        }
        self.handleFieldChange('layerName',res.valid);
      }
    };

    const folder = {
      formId: this._formId,
      id: 'smCrowdsource_settings_itemName_folder',
      label: formText.folderSelection.label,
      inputAttr: {
        type: 'select',
        defaultValue: this.props.ownerFolder,
        placeholder: formText.folderSelection.label
      },
      options: this.state.folderOptions,
      handleChange: function(res) {
        if (res.valid){
          const params = {
            ownerFolder: res.value
          };

          ItemActions.updateAppItem(params);
          ItemActions.updateWebmapItem(params);
          ItemActions.updateFeatureServiceItem(params);
        }
      }
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <h5>
              {builderText.settingsModals.itemName.header}
            </h5>
            <form onSubmit={(e) => {
                e.preventDefault();
              }}>
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
    if (this.props.portal) {
      const homeFolder = [{
        value: '',
        label: this.props.portal.getPortalUser().username + ' (' + formText.folderSelection.rootFolder + ')'
      }];

      const userFolders = [];

      this.props.portal.getUserFolders().then((folders) => {

        folders.map((folder) => {
          userFolders.push({
            value: folder.id,
            label: folder.title
          });
        });

        const newFolders = homeFolder.concat(userFolders);

        if (this.mounted && JSON.stringify(newFolders) !== JSON.stringify(this.state.folderOptions)){
          this.setState({
            folderOptions: newFolders
          });
        }
      });

    }
  }

  handleFormChange(valid) {
    if (this.props.handleChange) {
      this.props.handleChange(valid);
    }
  }

  handleFieldChange(item,valid) {
    let formValid = true;

    this.formItems[item] = valid;

    Object.keys(this.formItems).forEach((current) => {
      if (this.formItems[current] === 'validating') {
        formValid = 'validating';
      } else if (!this.formItems[current]) {
        formValid = false;
      }
    });

    this.handleFormChange(formValid);
  }

  setAutoUpdateValues(value) {
    this.handleFieldChange('autoUpdate',false);
    if (this.updateValue === value) {

      const self = this;

      this.handleFieldChange('autoUpdate','validating');
      this.layerNameValidator.validate(value).then((res) => {

        let layerName = value;

        const getFormatedLayerName = function getFormatedLayerName() {
          self.layerNameValidator.validate(layerName).then((newRes) => {
            if (!newRes.isValid && newRes.errors && newRes.errors[0] && newRes.errors[0].fixValue) {
              layerName = newRes.errors[0].fixValue;
            }
            if (self.updateValue === value) {
              self.handleFieldChange('autoUpdate',true);
              self.setState({
                layerNameAutoUpdate: layerName,
                mapNameAutoUpdate: value
              });
            }
          });
        };

        if (res.isValid && this.updateValue === value) {
          this.handleFieldChange('autoUpdate',true);
          this.setState({
            layerNameAutoUpdate: layerName,
            mapNameAutoUpdate: value
          });
        } else {
          getFormatedLayerName();
        }
      });

    } else {
      this.updateValue = value;
      clearTimeout(this.updateValueTimeout);
      this.updateValueTimeout = setTimeout(()=>{
        this.setAutoUpdateValues(value);
      },300);
    }

  }

};

SettingsItemName.propTypes = {
  ownerFolder: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ]),
  portal: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.shape({})
  ]),
  handleChange: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.func
  ])
};

SettingsItemName.defaultProps = {
  ownerFolder: false,
  portal: false,
  handleChange: false
};

export default SettingsItemName;
