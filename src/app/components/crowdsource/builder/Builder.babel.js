import React from 'react';
import { connect } from 'reactRedux';
import Helper from 'babel/utils/helper/Helper';
import BuilderBanner from 'babel/components/builder/banner/Banner';
import Loader from 'babel/components/helper/loading/Loader';
import URI from 'lib/urijs/src/URI';
import Modal from 'babel/components/helper/modal/Modal';
import SettingsLayout from 'babel/components/settings/Layout';
import SettingsItemName from 'babel/components/settings/ItemName';
import SidePanelHelp from 'babel/components/builder/sidePanel/help/Help';
import SidePanelSettings from 'babel/components/builder/sidePanel/settings/Settings';
import HeaderSettings from 'babel/components/builder/sidePanel/settings/header/HeaderSettings';
import SocialSharingSettings from 'babel/components/builder/sidePanel/settings/socialSharing/SocialSharingSettings';
import IntroSplashSettings from 'babel/components/builder/sidePanel/settings/introSplash/IntroSplashSettings';
import ContributeSettings from 'babel/components/builder/sidePanel/settings/contribute/ContributeSettings';
import AppActions from 'babel/actions/AppActions';
import BuilderActions from 'babel/actions/BuilderActions';
import SettingsActions from 'babel/actions/SettingsActions';
import ReviewActions from 'babel/actions/ReviewActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';
import 'babel/utils/helper/strings/StringUtils';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
let self;

class Builder extends React.Component {

  constructor() {
    super();

    this.onItemNamesChange = this.onItemNamesChange.bind(this);
    this.onSettingsNext = this.onSettingsNext.bind(this);
    this.getWebmapLink = this.getWebmapLink.bind(this);

    self = this;

    this.state = {
      uploadingLogo: false,
      uploadingCoverPhoto: false,
      continueDisabled: true,
      validating: false
    };
  }

  componentDidMount() {
    if (this.state.continueDisabled && (this.props.activeDialog === 'layoutScratch' || this.props.activeDialog === 'betaMessage')) {
      this.setState({
        continueDisabled: false
      });
    }
  }

  componentDidUpdate() {
    if (this.state.continueDisabled && (this.props.activeDialog === 'layoutScratch' || this.props.activeDialog === 'betaMessage')) {
      this.setState({
        continueDisabled: false
      });
    }
  }

  render() {
    const builderClasses = Helper.classnames('crowdsource-builder');

    return (
      <div className={builderClasses}>
        { this.props.loading.data ? <BuilderBanner
          brandOnly={ this.props.activeDialog.length > 0 }
          saving={this.props.saving}
          displayReviewDropdown={this.props.visibleComponents.indexOf(componentNames.MAP) >= 0 || this.props.visibleComponents.indexOf(componentNames.GALLERY) >= 0}
          reviewSelection={this.props.review.selection}
          changeReviewSelection={this.props.changeReviewableSelection}
          settingsAction={this.props.toggleComponent.bind(this,componentNames.SIDE_PANEL_SETTINGS)}
          shareAction={this.props.showComponent.bind(this,componentNames.APP_SHARING)}
          helpAction={this.props.toggleComponent.bind(this,componentNames.SIDE_PANEL_HELP)} />
        : null }
        <ReactCSSTransitionGroup
          component="div"
          transitionName="modal"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={300} >
          { this.props.activeDialog === 'layoutScratch' ? this.getSettingsModal('layout') : null }
          { this.props.activeDialog === 'betaMessage' ? this.getSettingsModal('betaMessage') : null }
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
                id: componentNames.SPS_INTRO_SPLASH,
                title: builderText.settings.panes.introSplash.title,
                component: <IntroSplashSettings defaultValues={this.props.defaultValues.introSplash} actions={this.props.introSplashActions} uploadingCoverPhoto={this.state.uploadingCoverPhoto}></IntroSplashSettings>
              },
              {
                id: componentNames.SPS_CONTRIBUTE,
                title: builderText.settings.panes.contribute.title,
                component: <ContributeSettings defaultValues={this.props.defaultValues.contribute} actions={this.props.contributeActions}></ContributeSettings>
              },
              {
                id: componentNames.SPS_HEADER,
                title: builderText.settings.panes.header.title,
                component: <HeaderSettings defaultValues={this.props.defaultValues.headerSettings} actions={this.props.headerSettingsActions} uploadingLogo={this.state.uploadingLogo}></HeaderSettings>
              },
              {
                id: componentNames.SPS_SOCIAL_SHARING,
                title: builderText.settings.panes.socialSharing.title,
                component: <SocialSharingSettings defaultValues={this.props.defaultValues.socialSharing} actions={this.props.socialSharingActions}></SocialSharingSettings>
              }
            ]}
            visibleComponents={this.props.visibleComponents}
            showComponent={this.props.showComponent}
            hideComponentByString={this.props.hideComponentByStringMatch}
            hideComponent={this.props.hideComponent}
            closeAction={this.props.hideComponent.bind(this,componentNames.SIDE_PANEL_SETTINGS)}>
          </SidePanelSettings>
        ) : null }
        { this.props.visibleComponents.indexOf(componentNames.SIDE_PANEL_HELP) >= 0 ? (
          <SidePanelHelp
            webmapLink={this.getWebmapLink()}
            closeAction={this.props.hideComponent.bind(this,componentNames.SIDE_PANEL_HELP)}>
          </SidePanelHelp>
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
            {builderText.settingsModals.common.welcome} <strong>{viewerText.common.appName}</strong> {builderText.common.appNameAppend}
          </h4>
        </div>
      </div>
    );
    const continueButton = this.state.validating ?
    (
      <button
        type="button"
        className={continueButtonClasses}
        dangerouslySetInnerHTML={{__html: '<img class="loading-gif" src="resources/images/loader-light.gif" alt="' + viewerText.contribute.form.location.gettingLocatingAlt + '"/> ' + builderText.validations.waitMessage}} >
      </button>
    )
    : (
      <button
        type="button"
        className={continueButtonClasses}
        onClick={this.onSettingsNext}>
        {builderText.common.buttons.next}
      </button>
    );

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
          handleChange={this.props.updateLayoutId}
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
          {...this.props.scratchNaming}>
        </SettingsItemName>,
        footer: continueButton
      },
      betaMessage: {
        className: Helper.classnames(['beta-message'],modalClasses),
        headerStyle: {
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat-x',
          backgroundImage: 'url(resources/images/builder/builder-banner-background.png)'
        },
        title: welcomeTitle,
        body: (
          <div className="message">
            <h5 className="text-danger">{builderText.betaMessage.title}</h5>
            {builderText.betaMessage.messageParagraphs.map((current) => {
              return <p key={current.slice(0,10).toCamelCase()}>{current}</p>;
            })}
          </div>
        ),
        footer: continueButton
      }
    };

    return <Modal {...options[type]} />;
  }

  onItemNamesChange(valid) {
    this.setState({
      continueDisabled: !valid || valid === 'validating',
      validating: valid === 'validating' ? true : false
    });
  }

  onSettingsNext() {
    if (!this.state.continueDisabled) {
      switch (this.props.activeDialog) {
        case 'layoutScratch':
          this.setState({
            continueDisabled: true
          });
          BuilderActions.changeDialog('itemNameScratch');
          break;
        case 'itemNameScratch':
          BuilderActions.changeDialog('savingFromScratch');
          break;
        case 'betaMessage':
          if ((this.props.config.webmap && !this.props.loading.data) || (this.props.config.appid && !this.props.loading.data)) {
            BuilderActions.changeDialog('savingFromScratch');
          } else {
            this.setState({
              continueDisabled: true
            });
            BuilderActions.changeDialog('itemNameScratch');
          }
          break;
      }
    }
  }

  getWebmapLink() {
    const portal = this.props.portal;
    const webmapUrl = new URI('').hostname(portal.portalHostname).protocol('https').pathname('home/webmap/viewer.html').setSearch('webmap',this.props.webmap);

    return webmapUrl.href();
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
  config: React.PropTypes.shape({
    webmap: React.PropTypes.string,
    appid: React.PropTypes.string
  }).isRequired,
  layout: React.PropTypes.string,
  scratchNaming: React.PropTypes.shape({
    ownerFolder: React.PropTypes.oneOfType([
      React.PropTypes.shape(null),
      React.PropTypes.string
    ])
  }).isRequired,
  review: React.PropTypes.shape({
    selection: React.PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = (state) => {
  return {
    activeDialog: state.builder.activeDialog,
    saving: state.builder.saving,
    loading: state.app.loading,
    portal: state.app.portal,
    layout: state.items.app.data.values.settings.layout.id,
    webmap: state.items.app.data.values.settings.components.map.webmap,
    scratchNaming: {
      ownerFolder: state.config.folderid,
      portal: state.app.portal
    },
    visibleComponents: state.app.layout.visibleComponents,
    config: state.config,
    review: state.review,
    defaultValues: {
      headerSettings: {
        logoType: state.items.app.data.values.settings.components.header.logo.type,
        logoUrl: state.items.app.data.values.settings.components.header.logo.source === 'resources/images/logo/esri-logo-reversed.svg' ? null : state.items.app.data.values.settings.components.header.logo.source,
        logoLink: state.items.app.data.values.settings.components.header.logo.link,
        bannerTitle: state.items.app.data.values.settings.components.header.title
      },
      socialSharing: {
        includeLink: state.items.app.data.values.settings.components.common.sharing.services.link,
        includeFacebook: state.items.app.data.values.settings.components.common.sharing.services.facebook,
        includeTwitter: state.items.app.data.values.settings.components.common.sharing.services.twitter,
        twitterText: state.items.app.data.values.settings.components.common.sharing.twitter.text.length > 0 ? state.items.app.data.values.settings.components.common.sharing.twitter.text : (state.items.app.data.values.settings.components.intro.title + ' #storymap'),
        twitterRelated: state.items.app.data.values.settings.components.common.sharing.twitter.related
      },
      introSplashSettings: {
        backgroundImage: state.items.app.data.values.settings.components.intro.background.type === 'photo' ? state.items.app.data.values.settings.components.intro.background.source : null
      },
      contribute: {
        allowParticipation: state.items.app.data.values.settings.components.contribute.participationAllowed,
        showNewFeatures: state.items.app.data.values.settings.components.map.crowdsourceLayer.visibleFeaturesQuery.indexOf('vetted:new') >= 0 ? 'new' : 'approved',
        loginOptions: (
          Object.keys(state.items.app.data.values.settings.components.contribute.loginOptions).filter((current) => {
            return state.items.app.data.values.settings.components.contribute.loginOptions[current];
          }).toString()
        ),
        participateButton: state.items.app.data.values.settings.components.common.participateShort
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
    changeReviewableSelection: ReviewActions.changeReviewableSelection,
    updateLayoutId: SettingsActions.updateLayoutId,
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
            attachment: value.photos.logo,
            removeAttachments: true,
            removeFilter: 'logo_',
            callback: (url) => {
              SettingsActions.updateHeaderLogoUrl(url);
              self.setState({
                uploadingLogo: false
              });
            }
          });
          self.setState({
            uploadingLogo: true
          });
        }
      },
      logoLink: SettingsActions.updateHeaderLogoLink,
      bannerTitle: SettingsActions.updateHeaderTitle
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
            attachment: value.photos.backgroundImage,
            removeAttachments: true,
            removeFilter: 'introSplashBackgroundPhoto_',
            callback: (url) => {
              SettingsActions.updateIntroBackground({source: url});
              self.setState({
                uploadingCoverPhoto: false
              });
            }
          });
          self.setState({
            uploadingCoverPhoto: true
          });
        }
      }
    },
    contributeActions: {
      allowParticipation: (value) => {
        const boolVal = value ? true : false;

        SettingsActions.changeParticipationAllowed(boolVal);
      },
      showNewFeatures: (val) => {
        if (val === 'new') {
          SettingsActions.addVisibleFeatureQuery('vetted:new');
        } else {
          SettingsActions.removeVisibleFeatureQuery('vetted:new');
        }
      },
      loginOptions: (val) => {
        const optionsArray = val.split(',');

        const options = {
          arcgis: optionsArray.indexOf('arcgis') >= 0,
          facebook: optionsArray.indexOf('facebook') >= 0,
          google: optionsArray.indexOf('google') >= 0,
          guest: optionsArray.indexOf('guest') >= 0
        };

        SettingsActions.changeParticipantLoginOptions(options);
      },
      participateButton: SettingsActions.updateCommonParticipateShort
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Builder);
