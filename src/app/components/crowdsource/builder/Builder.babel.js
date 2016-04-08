import React from 'react';
import { connect } from 'reactRedux';
import Helper from 'babel/utils/helper/Helper';
import BuilderBanner from 'babel/components/builder/banner/Banner';
import Loader from 'babel/components/helper/loading/Loader';
import Modal from 'babel/components/helper/modal/Modal';
import SettingsLayout from 'babel/components/settings/Layout';
import SettingsItemName from 'babel/components/settings/ItemName';
import BuilderActions from 'babel/actions/BuilderActions';
import builderText from 'i18n!translations/builder/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class Builder extends React.Component {

  constructor() {
    super();

    this.onItemNamesChange = this.onItemNamesChange.bind(this);
    this.onSettingsNext = this.onSettingsNext.bind(this);

    this.state = {
      continueDisabled: true
    };
  }

  render() {
    const builderClasses = Helper.classnames('crowdsource-builder');

    return (
      <div className={builderClasses}>
        { this.props.loading.data ? <BuilderBanner
          brandOnly={ this.props.activeDialog.length > 0 }
          saving={this.props.saving} /> 
        : null }
        <ReactCSSTransitionGroup
          component="div"
          transitionName="modal"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={300} >
          { this.props.activeDialog === 'layoutScratch' ? this.getSettingsModal('layout') : null }
          { this.props.activeDialog === 'itemNameScratch' ? this.getSettingsModal('itemNames') : null }
          { this.props.activeDialog === 'savingFromScratch' ? <Loader message={builderText.fromScratchMessage.saving}></Loader> : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  getSettingsModal(type) {
    const modalClasses = Helper.classnames(['settings-modal']);
    const continueButtonClasses = Helper.classnames(['btn', 'btn-primary'],{
      disabled: this.state.continueDisabled
    });

    const welcomeTitle = (
      <div className="container-fluid">
        <div className="row">
          <h4 className="title col-xs-12">
            {builderText.settingsModals.common.welcome} <strong>{builderText.common.appName}</strong> {builderText.common.appNameAppend}
          </h4>
        </div>
      </div>
    );
    const continueButton = <button type="button" className={continueButtonClasses} onClick={this.onSettingsNext}>{builderText.common.buttons.next}</button>;

    let options = {
      layout: {
        className: Helper.classnames(['layout'],modalClasses),
        headerStyle: {
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat-x',
          backgroundImage: 'url(resources/images/builder/builder-banner-background.png)'
        },
        title: welcomeTitle,
        body: <SettingsLayout
          alwaysChangeHint={true}
          selected={this.props.layout}>
        </SettingsLayout>,
        footer: continueButton
      },
      itemNames: {
        className: Helper.classnames(['item-name'],modalClasses),
        headerStyle: {
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat-x',
          backgroundImage: 'url(resources/images/builder/builder-banner-background.png)'
        },
        title: welcomeTitle,
        body: <SettingsItemName
          handleChange={this.onItemNamesChange}
          ownerFolder={this.props.scratchNaming.ownerFolder}
          portal={this.props.portal}>
        </SettingsItemName>,
        footer: continueButton
      }
    };

    return <Modal {...options[type]} />;
  }

  onItemNamesChange(valid) {
    this.setState({
      continueDisabled: !valid
    });
  }

  onSettingsNext() {
    if (!this.state.continueDisabled) {
      switch (this.props.activeDialog) {
        case 'itemNameScratch':
          BuilderActions.changeDialog('savingFromScratch');
          break;
      }
    }
  }

}

Builder.propTypes = {
  activeDialog: React.PropTypes.string.isRequired,
  saving: React.PropTypes.bool,
  loading: React.PropTypes.shape({
    data: React.PropTypes.bool
  }).isRequired,
  portal: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.shape({})
  ]),
  layout: React.PropTypes.string,
  scratchNaming: React.PropTypes.shape({
    ownerFolder: React.PropTypes.oneOfType([
      React.PropTypes.shape(null),
      React.PropTypes.string
    ])
  }).isRequired
};

const mapStateToProps = (state) => {
  return {
    activeDialog: state.builder.activeDialog,
    saving: state.builder.saving,
    loading: state.app.loading,
    portal: state.app.portal,
    layout: state.items.app.data.settings.layout.id,
    scratchNaming: {
      ownerFolder: state.items.app.item.ownerFolder
    }
  };
};

export default connect(mapStateToProps)(Builder);
