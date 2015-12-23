import React from 'react';
import ReactDOM from 'reactDom'; // eslint-disable-line no-unused-vars
import Helper from 'babel/utils/helper/Helper';
import BuilderBanner from 'babel/components/builder/banner/Banner';
import Modal from 'babel/components/helper/modal/Modal';
import SettingsLayout from 'babel/components/settings/Layout';
import SettingsItemName from 'babel/components/settings/ItemName';
import CrowdsourceAppBuilderController from 'babel/components/crowdsource/builder/CrowdsourceAppBuilderController';
import builderText from 'i18n!translations/builder/nls/template';
import BuilderAction from 'babel/actions/BuilderActions';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
const DATA_STORAGE_PATH_BASE = 'values';

// TRANSLATED TEXT STRINGS START
// TRANSLATED TEXT STRINGS END

export default class CrowdsourceAppBuiler extends React.Component {

  constructor(props) {
    super(props);

    this.onSettingsNext = this.onSettingsNext.bind(this);

    this._controller = new CrowdsourceAppBuilderController();
    this._controller.on('state-change', (state) => {
      this.setState(state);
    });

    this.state = this._controller.appState;
  }

  componentDidMount() {
    this._controller.mount();
  }

  componentWillUnmount() {
    this._controller.unmount();
  }

  render() {

    const appClasses = Helper.classnames('crowdsource-builder');
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

    const settingsLayout = {
      className: Helper.classnames(['layout'],modalClasses),
      headerStyle: {
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat-x',
        backgroundImage: 'url(resources/images/builder/builder-banner-background.png)'
      },
      title: welcomeTitle,
      body: <SettingsLayout
        dataStoragePath={DATA_STORAGE_PATH_BASE + '.layout'}
        alwaysChangeHint={true}
        selected={this.state.appData.layout.id}>
      </SettingsLayout>,
      footer: continueButton
    };

    const settingsItemName = {
      className: Helper.classnames(['item-name'],modalClasses),
      headerStyle: {
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat-x',
        backgroundImage: 'url(resources/images/builder/builder-banner-background.png)'
      },
      title: welcomeTitle,
      body: <SettingsItemName
        dataStoragePath={DATA_STORAGE_PATH_BASE + '.settings'}
        userFolders={this.state.userFolders}
        portal={this.state.portal}>
      </SettingsItemName>,
      footer: continueButton
    };

    return (
      <div className={appClasses}>
        {this.props.bannerVisible ? <BuilderBanner brandOnly={this.state.hideBannerContent} /> : null}
        <ReactCSSTransitionGroup
          component="div"
          transitionName="modal"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={300} >
          {this.state.activeModal === 'layoutScratch' ? <Modal {...settingsLayout} /> : null }
          {this.state.activeModal === 'itemNameScratch' ? <Modal {...settingsItemName} /> : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  onSettingsNext() {
    if (!this.state.continueDisabled) {
      BuilderAction.settingsNext();
    }
  }

}

CrowdsourceAppBuiler.propTypes = {
  bannerVisible: React.PropTypes.bool,
  errorMessage: React.PropTypes.string
};

CrowdsourceAppBuiler.defaultProps = {
  bannerVisible: false,
  errorMessage: ''
};
