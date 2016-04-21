import React from 'react';
import { connect } from 'reactRedux';
import Helper from 'babel/utils/helper/Helper';
import BuilderBanner from 'babel/components/builder/banner/Banner';
import Loader from 'babel/components/helper/loading/Loader';
import Modal from 'babel/components/helper/modal/Modal';
import SettingsLayout from 'babel/components/settings/Layout';
import SettingsItemName from 'babel/components/settings/ItemName';
import SidePanelSettings from 'babel/components/builder/settings/sidePanel/Settings';
import HeaderSettings from 'babel/components/builder/settings/sidePanel/header/HeaderSettings';
import SocialSharingSettings from 'babel/components/builder/settings/sidePanel/socialSharing/SocialSharingSettings';
import IntroSplashSettings from 'babel/components/builder/settings/sidePanel/introSplash/IntroSplashSettings';
import AppActions from 'babel/actions/AppActions';
import BuilderActions from 'babel/actions/BuilderActions';
import SettingsActions from 'babel/actions/SettingsActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
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
          saving={this.props.saving}
          settingsAction={this.props.toggleComponent.bind(this,componentNames.SIDE_PANEL_SETTINGS)} />
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
        <ReactCSSTransitionGroup
          component="div"
          transitionName="side-panel"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500} >
        { this.props.visibleComponents.indexOf(componentNames.SIDE_PANEL_SETTINGS) >= 0 ? (
          <SidePanelSettings
            settingsPanes={[
              {
                id: componentNames.SPS_HEADER,
                title: builderText.settings.panes.header.title,
                component: <HeaderSettings defaultValues={this.props.defaultValues.headerSettings} actions={this.props.headerSettingsActions}></HeaderSettings>
              },
              {
                id: componentNames.SPS_SOCIAL_SHARING,
                title: builderText.settings.panes.socialSharing.title,
                component: <SocialSharingSettings defaultValues={this.props.defaultValues.socialSharing} actions={this.props.socialSharingActions}></SocialSharingSettings>
              },
              {
                id: componentNames.SPS_INTRO_SPLASH,
                title: builderText.settings.panes.introSplash.title,
                component: <IntroSplashSettings defaultValues={this.props.defaultValues.introSplash} actions={this.props.introSplashActions}></IntroSplashSettings>
              }
            ]}
            visibleComponents={this.props.visibleComponents}
            showComponent={this.props.showComponent}
            hideComponentByString={this.props.hideComponentByStringMatch}
            hideComponent={this.props.hideComponent}
            closeAction={this.props.hideComponent.bind(this,componentNames.SIDE_PANEL_SETTINGS)}>
          </SidePanelSettings>
        ) : null }
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
    },
    visibleComponents: state.app.layout.visibleComponents,
    defaultValues: {
      headerSettings: {
        logoType: state.items.app.data.settings.components.header.logo.type,
        logoUrl: state.items.app.data.settings.components.header.logo.source === 'resources/images/logo/esri-logo-reversed.svg' ? null : state.items.app.data.settings.components.header.logo.source,
        logoLink: state.items.app.data.settings.components.header.logo.link,
        bannerTitle: state.items.app.data.settings.components.header.title,
        participateButton: state.items.app.data.settings.components.common.participateShort
      },
      socialSharing: {
        includeLink: state.items.app.data.settings.components.common.sharing.services.link,
        includeFacebook: state.items.app.data.settings.components.common.sharing.services.facebook,
        includeTwitter: state.items.app.data.settings.components.common.sharing.services.twitter,
        twitterText: state.items.app.data.settings.components.common.sharing.twitter.text,
        twitterHashtags: state.items.app.data.settings.components.common.sharing.twitter.hashtags,
        twitterHandle: state.items.app.data.settings.components.common.sharing.twitter.twitterHandle,
        twitterRelated: state.items.app.data.settings.components.common.sharing.twitter.related
      },
      introSplashSettings: {
        backgroundImage: state.items.app.data.settings.components.intro.background.type === 'photo' ? state.items.app.data.settings.components.intro.background.source : null
      }
    }
  };
};

// TODO Move to generic mapToProps since dispatch is not needed. Actions are already bound
const mapDispatchToProps = () => {
  return {
    showComponent: AppActions.showComponent,
    hideComponent: AppActions.hideComponent,
    hideComponentByStringMatch: AppActions.hideComponentByStringMatch,
    toggleComponent: AppActions.toggleComponent,
    headerSettingsActions: {
      logoType: (value) => {
        SettingsActions.updateHeaderLogoType(value);
        if (value === 'esri') {
          SettingsActions.updateHeaderLogoUrl('resources/images/logo/esri-logo-reversed.svg');
          SettingsActions.updateHeaderLogoLink('https://www.esri.com');
        } else if (value === 'none') {
          SettingsActions.updateHeaderLogoUrl('');
        }
      },
      logoUrl: SettingsActions.updateHeaderLogoUrl,
      logoUpload: (value) => {
        if (value) {
          BuilderActions.addAppItemAttatchment({
            id: 'logo_' + Helper.getRandomId(),
            type: 'photo',
            attachment: value.logo,
            removeAttachments: true,
            removeFilter: 'logo_',
            callback: SettingsActions.updateHeaderLogoUrl
          });
        }
      },
      logoLink: SettingsActions.updateHeaderLogoLink,
      bannerTitle: SettingsActions.updateHeaderTitle,
      participateButton: SettingsActions.updateCommonParticipateShort
    },
    socialSharingActions: {
      includeSharing: (value) => {
        const boolVal = value ? true : false;

        SettingsActions.updateCommonSharingServices({
          facebook: boolVal,
          link: boolVal,
          twitter: boolVal
        });
      },
      twitterText: (value) => {
        SettingsActions.updateCommonSharingTwitter({text: value});
      },
      twitterHashtags: (value) => {
        SettingsActions.updateCommonSharingTwitter({hashtags: value});
      },
      twitterHandle: (value) => {
        SettingsActions.updateCommonSharingTwitter({twitterHandle: value});
      },
      twitterRelated: (value) => {
        SettingsActions.updateCommonSharingTwitter({related: value});
      }
    },
    introSplashActions: {
      backgroundImage: (value) => {
        if (value) {
          BuilderActions.addAppItemAttatchment({
            id: 'introSplashBackgroundPhoto_' + Helper.getRandomId(),
            type: 'photo',
            attachment: value.backgroundImage,
            removeAttachments: true,
            removeFilter: 'introSplashBackgroundPhoto_',
            callback: (url) => {
              SettingsActions.updateIntroBackground({source: url});
            }
          });
        }
      }
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Builder);
