import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import BuilderBanner from 'babel/components/builder/banner/Banner';
import Modal from 'babel/components/helper/modal/Modal';
import SettingsLayout from 'babel/components/settings/Layout';
import CrowdsourceAppBuilderController from 'babel/components/crowdsource/builder/CrowdsourceAppBuilderController';
import builderText from 'i18n!translations/builder/nls/template';

// TRANSLATED TEXT STRINGS START
// TRANSLATED TEXT STRINGS END

export default class CrowdsourceAppBuiler extends React.Component {

  constructor(props) {
    super(props);

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

    const welcomeTitle = (
      <div className="container-fluid">
        <div className="row">
          <h4 className="title col-xs-12">
            {builderText.settingsModals.layout.welcome} <strong>{builderText.common.appName}</strong> {builderText.common.appNameAppend}
          </h4>
        </div>
      </div>
    );
    const continueButton = <button type="button" className="btn btn-primary">{builderText.common.buttons.next}</button>;

    const settingsLayout = {
      className: Helper.classnames(['layout'],modalClasses),
      headerStyle: {
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat-x',
        backgroundImage: 'url(resources/images/builder/builder-banner-background.png)'
      },
      title: welcomeTitle,
      body: <SettingsLayout alwaysChangeHint={true} selected={this.state.appData.layout.id} />,
      footer: continueButton
    };

    return (
      <div className={appClasses}>
        {this.props.bannerVisible ? <BuilderBanner brandOnly={this.state.hideBannerContent} /> : null}
        {this.state.activeModal === 'layout' ? <Modal {...settingsLayout} /> : null }
      </div>
    );
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
