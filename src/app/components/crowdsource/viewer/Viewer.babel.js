import $ from 'jquery';
import React from 'react';
import { connect } from 'reactRedux';
import lang from 'dojo/_base/lang';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Header from 'babel/components/header/Header';
import IntroSplash from 'babel/components/intro/IntroSplash';
import ShareLink from 'babel/components/viewerDialogs/sharing/ShareLink';
import ContributePanel from 'babel/components/contribute/ContributePanel';
import SelectedShares from 'babel/components/selectedShares/SelectedShares';
import CrowdsourceWebmap from 'babel/components/map/CrowdsourceWebmap';
import ThumbnailGallery from 'babel/components/gallery/ThumbnailGallery';
import AppNotifications from 'babel/components/helper/notifications/AppNotifications';
import MobileBottomNavigation from 'babel/components/mobile/bottomNavigation/BottomNavigation';
import AppActions from 'babel/actions/AppActions';
import MapActions from 'babel/actions/MapActions';
import UserActions from 'babel/actions/UserActions';
import ItemActions from 'mode!isBuilder?babel/actions/ItemActions';
import SettingsActions from 'mode!isBuilder?babel/actions/SettingsActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import viewerText from 'i18n!translations/viewer/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class Viewer extends React.Component {

  constructor() {
    super();

    // Bind class methods
    this.getSelectedIds = this.getSelectedIds.bind(this);
    this.selectFeaturesById = this.selectFeaturesById.bind(this);
    this.saveContribution = this.saveContribution.bind(this);
  }

  render() {

    const viewerClasses = Helper.classnames(['viewer']);
    const shareConfigWithAction = $.extend(true,{},this.props.sharing,{
      shareLinkAction: this.props.showComponent.bind(this,componentNames.SHARE_LINK)
    });

    return (
      <div className={viewerClasses}>
        <style dangerouslySetInnerHTML={{__html: this.props.layout.font + this.props.layout.style + this.props.layout.theme}}></style>
        <Header
          homeAction={this.props.showComponent.bind(this,componentNames.INTRO)}
          showParticipateActionButton={this.props.loading.map && !this.props.contributing.active}
          participateAction={this.props.updateContributeState.bind(this,{active: true})}
          {...this.props.components.header}
          {...this.props.components.common}
          sharing={shareConfigWithAction}
          portal={this.props.portal}
          loading={this.props.loading}>
        </Header>
        <IntroSplash
          editingAllowed={this.props.mode.isBuilder}
          saveActions={this.props.introSaveActions}
          showLoader={this.props.loading.map}
          showExploreActionButton={this.props.loading.map}
          exploreAction={this.props.showComponent.bind(this,componentNames.MAP)}
          {...this.props.noticationsActions}
          {...this.props.components.intro}
          {...this.props.components.common}>
        </IntroSplash>
        { this.Layout }
        <MobileBottomNavigation
          buttons={[
            {
              name: viewerText.mobile.bottomNav.home,
              icon: 'home',
              active: this.props.layout.visibleComponents.indexOf(componentNames.CONTRIBUTE) < 0 && this.props.layout.visibleComponents.indexOf(componentNames.INTRO) >= 0,
              action: this.props.showComponent.bind(this,componentNames.INTRO)
            },{
              name: viewerText.mobile.bottomNav.map,
              icon: 'map',
              active: this.props.layout.visibleComponents.indexOf(componentNames.CONTRIBUTE) < 0 && this.props.layout.visibleComponents.indexOf(componentNames.MAP) >= 0,
              action: this.props.showComponent.bind(this,componentNames.MAP)
            },{
              name: viewerText.mobile.bottomNav.gallery,
              icon: 'gallery',
              active: this.props.layout.visibleComponents.indexOf(componentNames.CONTRIBUTE) < 0 && this.props.layout.visibleComponents.indexOf(componentNames.GALLERY) >= 0,
              action: this.props.showComponent.bind(this,componentNames.GALLERY)
            },{
              name: this.props.components.common.participateShort,
              icon: 'participate',
              active: this.props.layout.visibleComponents.indexOf(componentNames.CONTRIBUTE) >= 0,
              action: this.props.updateContributeState.bind(this,{active: true})
            }
          ]}>
        </MobileBottomNavigation>
        <AppNotifications notifications={this.props.notifications}></AppNotifications>
        <ReactCSSTransitionGroup
          className="viewer-dialogs"
          component="div"
          transitionName="viewer-dialog"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300} >
          { this.props.layout.visibleComponents.indexOf(componentNames.SHARE_LINK) >= 0 ? (
            <ShareLink closeAction={this.props.hideComponent.bind(this,componentNames.SHARE_LINK)} sharing={this.props.sharing}></ShareLink>
            ) : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  get Layout() {
    switch (this.props.layoutId) {
      case 'sidePanel':
        // TODO add sidePanel layout
        return null;
      default:
        // Translation Strings
        const CHANGE_VIEW_TO_GALLERY = viewerText.layouts.stacked.changeView.galleryView;
        const CHANGE_VIEW_TO_MAP = viewerText.layouts.stacked.changeView.mapView;

        // Icons
        const downArrowHtml = {
          __html: getIcon('arrow-down-open')
        };
        const upArrowHtml = {
          __html: getIcon('arrow-up-open')
        };

        const stacked = (
          <div className="main-content">
            <div className="scroll-container">
              <div className="content-pane map-view">
                <CrowdsourceWebmap controllerOptions={this.props.components.map}/>
                <div className="pane-navigation" onClick={this.props.showComponent.bind(this,componentNames.GALLERY)}>
                  <span className="text">{CHANGE_VIEW_TO_GALLERY}</span>
                  <span className="icon" dangerouslySetInnerHTML={downArrowHtml}></span>
                </div>
              </div>
              <div className="content-pane gallery-view">
                <div className="pane-navigation" onClick={this.props.showComponent.bind(this,componentNames.MAP)}>
                  <span className="text">{CHANGE_VIEW_TO_MAP}</span>
                  <span className="icon" dangerouslySetInnerHTML={upArrowHtml}></span>
                </div>
                <ThumbnailGallery
                  items={this.props.map.featuresInExtent}
                  layer={this.props.map.layer}
                  selected={this.getSelectedIds()}
                  selectAction={this.selectFeaturesById}
                  {...this.props.components.gallery}
                  {...this.props.components.map.crowdsourceLayer}>
                </ThumbnailGallery>;
              </div>
            </div>
            <ReactCSSTransitionGroup transitionName="overlay-toggle" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
              { this.props.layout.visibleComponents.indexOf(componentNames.CONTRIBUTE) >= 0 ? <ContributePanel
                className="overlay-panel"
                loginAction={this.props.loginUser}
                closeAction={this.props.updateContributeState.bind(this,{active: false})}
                saveAction={this.saveContribution}
                socialLogin={this.props.config.allowSocialLogin}
                fieldDefinitions={this.props.map.layer.fields}
                map={this.props.map.originalObject}
                user={this.props.user}
                {...this.props.contributing}
                {...this.props.components.contribute}
                {...this.props.components.map.crowdsourceLayer}>
              </ContributePanel> : null }
              { this.props.layout.visibleComponents.indexOf(componentNames.SELECTED_SHARES) >= 0 ? <SelectedShares
                className="overlay-panel"
                items={this.props.map.selectedFeatures}
                layer={this.props.map.layer}
                closeAction={this.props.selectFeatures.bind(null,false)}
                {...this.props.components.shareDisplay}
                {...this.props.components.map.crowdsourceLayer}>
              </SelectedShares> : null }
            </ReactCSSTransitionGroup>
          </div>
        );

        return stacked;
    }
  }

  getSelectedIds () {

    const oidField = lang.getObject('props.map.layer.objectIdField',false,this);
    const features = lang.getObject('props.map.selectedFeatures',false,this);

    if (oidField && features) {
      return features.reduce((prev,current) => {
        return prev.concat(current.attributes[oidField]);
      },[]);
    } else {
      return [];
    }
  }

  selectFeaturesById(ids) {
    const oidField = this.props.map.layer.objectIdField;
    const features = this.props.map.featuresInExtent;

    this.props.selectFeatures(features.reduce((prev,current) => {
      if ([].concat(ids).indexOf(current.attributes[oidField]) < 0) {
        return prev;
      }
      return prev.concat(current);
    },[]));
  }

  saveContribution(graphic) {
    this.props.updateContributeState({
      saving: true,
      graphic
    });
  }

}

Viewer.propTypes = {
  layoutId: React.PropTypes.string.isRequired,
  layout: React.PropTypes.shape({
    font: React.PropTypes.string.isRequired,
    style: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired,
    visibleComponents: React.PropTypes.array
  }).isRequired,
  loading: React.PropTypes.shape({
    map: React.PropTypes.bool
  }).isRequired,
  map: React.PropTypes.shape({
    originalObject: React.PropTypes.oneOfType([
      React.PropTypes.shape({}),
      React.PropTypes.bool
    ]),
    layer: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        fields: React.PropTypes.array,
        url: React.PropTypes.string,
        credential: React.PropTypes.shape({
          token: React.PropTypes.string
        })
      }),
      React.PropTypes.bool
    ]),
    featuresInExtent: React.PropTypes.array.isRequired,
    selectedFeatures: React.PropTypes.array.isRequired
  }).isRequired,
  portal: React.PropTypes.shape({}),
  mode: React.PropTypes.shape({
    isBuilder: React.PropTypes.bool
  }).isRequired,
  notifications: React.PropTypes.array.isRequired,
  config: React.PropTypes.shape({
    allowSocialLogin: React.PropTypes.bool
  }).isRequired,
  contributing: React.PropTypes.shape({
    active: React.PropTypes.bool.isRequired,
    view: React.PropTypes.string.isRequired
  }).isRequired,
  user: React.PropTypes.shape({
    authenticated: React.PropTypes.bool.isRequired,
    contributor: React.PropTypes.bool.isRequired
  }).isRequired,
  components: React.PropTypes.shape({
    common: React.PropTypes.shape({
      exploreText: React.PropTypes.string,
      participateLong: React.PropTypes.string,
      participateShort: React.PropTypes.string,
      social: React.PropTypes.shape({
        facebook: React.PropTypes.bool,
        twitter: React.PropTypes.bool,
        link: React.PropTypes.bool
      })
    }),
    header: React.PropTypes.shape({
      logo: React.PropTypes.shape({
        link: React.PropTypes.string,
        source: React.PropTypes.string
      }),
      title: React.PropTypes.string
    }),
    intro: React.PropTypes.shape({
      background: React.PropTypes.shape({
        type: React.PropTypes.string,
        source: React.PropTypes.string
      }),
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string
    }),
    map: React.PropTypes.shape({
      crowdsourceLayer: React.PropTypes.shape({
        id: React.PropTypes.string,
        itemAttributePath: React.PropTypes.string,
        primaryKey: React.PropTypes.string,
        secondaryKey: React.PropTypes.string
      }),
      webmap: React.PropTypes.string,
      webmapOptions: React.PropTypes.shape({})
    }),
    gallery: React.PropTypes.shape({
      thumbnailKey: React.PropTypes.string
    }),
    contribute: React.PropTypes.shape({
      title: React.PropTypes.string
    }),
    shareDisplay: React.PropTypes.shape({
      media: React.PropTypes.shape({
        type: React.PropTypes.string
      })
    })
  }).isRequired,
  sharing: React.PropTypes.shape({
    services: React.PropTypes.shape({
      facebook: React.PropTypes.bool,
      twitter: React.PropTypes.bool,
      link: React.PropTypes.bool
    }).isRequired,
    appIds: React.PropTypes.shape({
      bitly: React.PropTypes.shape({
        login: React.PropTypes.string,
        key: React.PropTypes.string
      }),
      facebook: React.PropTypes.string.isRequired
    }).isRequired,
    twitter: React.PropTypes.shape({
      hashtags: React.PropTypes.string,
      text: React.PropTypes.string,
      twitterHandle: React.PropTypes.string
    }).isRequired
  }).isRequired
};

const mapStateToProps = (state) => {
  return {
    config: state.config,
    components: state.items.app.data.settings.components,
    contributing: state.app.contributing,
    loading: state.app.loading,
    layoutId: state.items.app.data.settings.layout.id,
    layout: state.app.layout,
    map: state.app.map,
    portal: state.app.portal,
    mode: state.mode,
    notifications: state.app.notifications,
    user: state.user,
    sharing: {
      services: state.items.app.data.settings.components.common.sharing.services,
      appIds: {
        bitly: state.config.BITLY_API_KEY,
        facebook: state.config.FACEBOOK_APP_ID
      },
      twitter: state.items.app.data.settings.components.common.sharing.twitter
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (service) => {
      dispatch(UserActions.loginOAuthStart(service));
    },
    changeComponentsVisibility: (changes) => {
      dispatch(AppActions.changeComponentsVisibility(changes));
    },
    showComponent: (component) => {
      dispatch(AppActions.showComponent(component));
    },
    hideComponent: (component) => {
      dispatch(AppActions.hideComponent(component));
    },
    updateContributeState: (options) => {
      dispatch(AppActions.updateContributeState(options));
    },
    selectFeatures: (features) => {
      dispatch(MapActions.selectFeatures(features));
    },
    noticationsActions: {
      addNotifications: (notifications) => {
        dispatch(AppActions.addNotifications(notifications));
      },
      removeNotifications: (notifications) => {
        dispatch(AppActions.removeNotifications(notifications));
      }
    },
    introSaveActions: SettingsActions && ItemActions ? {
      title: [SettingsActions.updateIntroTitle,ItemActions.updateAppItemTitle],
      subtitle: [SettingsActions.updateIntroSubtitle,ItemActions.updateAppItemSubtitle],
      exploreButton: SettingsActions.updateCommonExploreText
    } : null
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Viewer);
