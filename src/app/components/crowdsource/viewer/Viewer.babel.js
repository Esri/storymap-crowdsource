import $ from 'jquery';
import React from 'react';
import { connect } from 'reactRedux';
import lang from 'dojo/_base/lang';
import Point from 'esri/geometry/Point';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Header from 'babel/components/header/Header';
import IntroSplash from 'babel/components/intro/IntroSplash';
import ShareLink from 'babel/components/viewerDialogs/socialSharing/ShareLink';
import AppSharing from 'mode!isBuilder?babel/components/viewerDialogs/appSharing/AppSharing';
import ContributePanel from 'babel/components/contribute/ContributePanel';
import SelectedShares from 'babel/components/selectedShares/SelectedShares';
import CrowdsourceWebmap from 'babel/components/map/CrowdsourceWebmap';
import ThumbnailGallery from 'babel/components/gallery/ThumbnailGallery';
import AppNotifications from 'babel/components/helper/notifications/AppNotifications';
import MobileBottomNavigation from 'babel/components/mobile/bottomNavigation/BottomNavigation';
import AppActions from 'babel/actions/AppActions';
import MapActions from 'babel/actions/MapActions';
import ReviewActions from 'mode!isBuilder?babel/actions/ReviewActions';
import UserActions from 'babel/actions/UserActions';
import ItemActions from 'mode!isBuilder?babel/actions/ItemActions';
import BuilderActions from 'mode!isBuilder?babel/actions/BuilderActions';
import SettingsActions from 'mode!isBuilder?babel/actions/SettingsActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import viewerText from 'i18n!translations/viewer/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class Viewer extends React.Component {

  constructor() {
    super();

    // Bind class methods
    this.getFeatureFromId = this.getFeatureFromId.bind(this);
    this.getMapTipProps = this.getMapTipProps.bind(this);
    this.saveContribution = this.saveContribution.bind(this);
  }

  render() {

    const viewerClasses = Helper.classnames(['viewer'],{
      contributing: this.props.contributing.active
    });
    const shareConfigWithAction = $.extend(true,{},this.props.sharing,{
      shareLinkAction: this.props.showComponent.bind(this,componentNames.SHARE_LINK)
    });

    return (
      <div className={viewerClasses}>
        <style dangerouslySetInnerHTML={{__html: this.props.layout.fontCss}}></style>
        {!this.props.contributing.active || !this.props.mode.isMobile ? (
          <Header
            homeAction={this.props.showComponent.bind(this,componentNames.INTRO)}
            showParticipateActionButton={this.props.components.contribute.participationAllowed && this.props.loading.map && !this.props.contributing.active}
            participationButtonDisabled={this.props.layout.visibleComponents.indexOf(componentNames.SIDE_PANEL_SETTINGS) >= 0}
            participateAction={this.props.updateContributeState.bind(this,{active: true})}
            {...this.props.components.header}
            {...this.props.components.common}
            sharing={shareConfigWithAction}
            portal={this.props.portal}
            loading={this.props.loading}>
          </Header>
        ) : null}
        <IntroSplash
          editAction={this.props.showComponent.bind(this,[componentNames.SIDE_PANEL_SETTINGS,componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH + componentNames.SPS_INTRO_SPLASH])}
          editingAllowed={this.props.mode.isBuilder && this.props.layout.visibleComponents.indexOf(componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH + componentNames.SPS_INTRO_SPLASH) >= 0}
          saveActions={this.props.introSaveActions}
          showLoader={this.props.loading.map}
          showExploreActionButton={this.props.loading.map}
          portal={this.props.portal}
          exploreAction={this.props.showComponent.bind(this,componentNames.MAP)}
          {...this.props.noticationsActions}
          {...this.props.components.intro}
          {...this.props.components.common}>
        </IntroSplash>
        { this.Layout }
        {this.mobileNavigationButtons ? (
          <MobileBottomNavigation
            selected={this.props.map.selectedFeatureId}
            selectAction={this.props.selectFeature}
            buttons={this.mobileNavigationButtons}>
          </MobileBottomNavigation>
        ) : null}
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
          { AppSharing && this.props.layout.visibleComponents.indexOf(componentNames.APP_SHARING) >= 0 ? (
            <AppSharing
            appPrivacy={this.props.appPrivacy}
            appPrivacyUpdating={this.props.appPrivacyUpdating}
            updatePrivacyAction={BuilderActions.updateShare}
            closeAction={this.props.hideComponent.bind(this,componentNames.APP_SHARING)}
            sharing={this.props.sharing}></AppSharing>
            ) : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  get Layout() {
    switch (this.props.layoutId) {
      case 'sidePanel':
        const sidePanel = (
          <div className="main-content">
            <div className="scroll-container">
              <CrowdsourceWebmap showOnTop={this.props.map.forceToTop} mapTips={this.getMapTipProps()} className="content-pane map-pane" controllerOptions={this.webmapControllerOptions} />
              <ThumbnailGallery
                isMobile={this.props.mode.isMobile}
                className="content-pane gallery-pane"
                items={this.props.map.featuresInExtent}
                layer={this.props.map.layer}
                highlighted={this.props.map.highlightedFeatureId}
                selected={this.props.map.selectedFeatureId}
                highlightAction={this.props.highlightAction}
                selectAction={this.props.selectFeature}
                {...this.props.components.gallery}
                {...this.props.components.map.crowdsourceLayer}>
              </ThumbnailGallery>;
            </div>
            <ReactCSSTransitionGroup transitionName="overlay-toggle" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
              { this.props.components.contribute.participationAllowed && this.props.layout.visibleComponents.indexOf(componentNames.CONTRIBUTE) >= 0 ? <ContributePanel
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
              { this.props.layout.visibleComponents.indexOf(componentNames.SELECTED_SHARES) >= 0 && this.getFeatureFromId(lang.getObject('props.map.selectedFeatureId',false,this)) ? <SelectedShares
                className="overlay-panel"
                featuresInExtent={this.props.map.featuresInExtent}
                feature={this.getFeatureFromId(lang.getObject('props.map.selectedFeatureId',false,this))}
                layer={this.props.map.layer}
                reviewEnabled={this.props.mode.isBuilder}
                approveAction={(features) => {
                  this.props.approveFeatures({add: features});
                }}
                rejectAction={(features) => {
                  this.props.rejectFeatures({add: features});
                }}
                closeAction={this.props.selectFeature.bind(null,false)}
                nextAction={this.props.nextFeature}
                previousAction={this.props.previousFeature}
                {...this.props.components.shareDisplay}
                {...this.props.components.map.crowdsourceLayer}>
              </SelectedShares> : null }
            </ReactCSSTransitionGroup>
          </div>
        );

        return sidePanel;
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
                <CrowdsourceWebmap showOnTop={this.props.map.forceToTop} mapTips={this.getMapTipProps()} controllerOptions={this.webmapControllerOptions} />
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
                  isMobile={this.props.mode.isMobile}
                  items={this.props.map.featuresInExtent}
                  layer={this.props.map.layer}
                  selected={this.props.map.selectedFeatureId}
                  highlighted={this.props.map.highlightedFeatureId}
                  selectAction={this.props.selectFeature}
                  highlightAction={this.props.highlightAction}
                  {...this.props.components.gallery}
                  {...this.props.components.map.crowdsourceLayer}>
                </ThumbnailGallery>;
              </div>
            </div>
            <ReactCSSTransitionGroup transitionName="overlay-toggle" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
              { this.props.components.contribute.participationAllowed && this.props.layout.visibleComponents.indexOf(componentNames.CONTRIBUTE) >= 0 ? <ContributePanel
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
              { this.props.layout.visibleComponents.indexOf(componentNames.SELECTED_SHARES) >= 0 && this.getFeatureFromId(lang.getObject('props.map.selectedFeatureId',false,this)) ? <SelectedShares
                className="overlay-panel"
                featuresInExtent={this.props.map.featuresInExtent}
                feature={this.getFeatureFromId(lang.getObject('props.map.selectedFeatureId',false,this))}
                layer={this.props.map.layer}
                reviewEnabled={this.props.mode.isBuilder}
                approveAction={(features) => {
                  this.props.approveFeatures({add: features});
                }}
                rejectAction={(features) => {
                  this.props.rejectFeatures({add: features});
                }}
                closeAction={this.props.selectFeature.bind(null,false)}
                nextAction={this.props.nextFeature}
                previousAction={this.props.previousFeature}
                {...this.props.components.shareDisplay}
                {...this.props.components.map.crowdsourceLayer}>
              </SelectedShares> : null }
            </ReactCSSTransitionGroup>
          </div>
        );

        return stacked;
    }
  }

  get webmapControllerOptions() {
    const vettedField = lang.getObject('props.components.map.crowdsourceLayer.vettedField',false,this);
    const hiddenField = lang.getObject('props.components.map.crowdsourceLayer.hiddenField',false,this);
    const visibleFeaturesQuery = lang.getObject('props.components.map.crowdsourceLayer.visibleFeaturesQuery',false,this);
    let where = '1=1';

    if (this.props.mode.isBuilder && this.props.review && this.props.review.selection) {
      switch (this.props.review.selection) {
        case 'new':
          where = vettedField + ' = 0';
          break;
        case 'approved':
          where = vettedField + ' = 1';
          break;
        case 'rejected':
          where = vettedField + ' = 2';
          break;
        default:
          where = vettedField + ' < 3';
      }
    } else if (visibleFeaturesQuery.length > 0 && visibleFeaturesQuery.indexOf('vetted:new') >= 0 && visibleFeaturesQuery.indexOf('vetted:approved') >= 0) {
      where = vettedField + ' < 2 AND ' + hiddenField + ' = 0';
    } else if (visibleFeaturesQuery.length > 0 && visibleFeaturesQuery.indexOf('vetted:approved') >= 0) {
      where = vettedField + ' = 1 AND ' + hiddenField + ' = 0';
    }

    return $.extend(true,{
      editable: this.props.mode.isBuilder,
      crowdsourceLayer: {
        where
      },
      isMobile: this.props.mode.isMobile,
      selectedFeature: this.getFeatureFromId(lang.getObject('props.map.selectedFeatureId',false,this))
    },this.props.components.map);
  }

  get mobileNavigationButtons() {
    if (this.props.contributing.active) {
      return false;
    }
    if (this.props.components.contribute.participationAllowed && this.props.loading.map && !this.props.contributing.active) {
      return [
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
          name: viewerText.mobile.bottomNav.participate,
          icon: 'participate',
          active: this.props.layout.visibleComponents.indexOf(componentNames.CONTRIBUTE) >= 0,
          action: this.props.updateContributeState.bind(this,{active: true})
        }
      ];
    }

    return [
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
      }
    ];
  }

  getFeatureFromId (featureId) {

    const oidField = lang.getObject('props.map.layer.objectIdField',false,this);
    const features = this.props.map.featuresInExtent;

    if (oidField && featureId) {
      return features.reduce((prev,current) => {
        if (featureId === current.attributes[oidField]) {
          return prev.concat(current);
        }
        return prev;
      },[])[0];
    } else {
      return false;
    }
  }

  getMapTipProps() {
    const mapMoving = lang.getObject('props.map.mapMoving',false,this);
    const selectedFeature = this.getFeatureFromId(lang.getObject('props.map.selectedFeatureId',false,this));
    const highlightedFeature = this.getFeatureFromId(lang.getObject('props.map.highlightedFeatureId',false,this));
    const container = document.querySelector('.map-pane');
    const map = lang.getObject('props.map.originalObject',false,this);
    const features = [];

    const testAndAdjustGeometry = function(mapLeft, mapRight, testGeo, direction) {
      const mapWidth = Math.abs(map.toScreen(new Point(0,0)).x - map.toScreen(new Point(360,0)).x);

      if (testGeo.x < mapLeft.x && direction !== 2) {
        testGeo.x += mapWidth;
        return testAndAdjustGeometry(mapLeft, mapRight, testGeo, 1);
      } else if (testGeo.x > mapRight.x && direction !== 1) {
        testGeo.x -= mapWidth;
        return testAndAdjustGeometry(mapLeft, mapRight, testGeo, 2);
      } else {
        return testGeo;
      }
    };

    if (mapMoving) {
      return [];
    }
    if (selectedFeature) {
      features.push(selectedFeature);
    }
    if (highlightedFeature && highlightedFeature !== selectedFeature) {
      features.push(highlightedFeature);
    }

    if (this.props.contributing.active && map && map.getLayer('crowdsource-contribute-location') && map.getLayer('crowdsource-contribute-location').graphics && map.getLayer('crowdsource-contribute-location').graphics.length > 0) {
      const graphic = map.getLayer('crowdsource-contribute-location').graphics[0];
      const content = (
        <span>
          {viewerText.contribute.form.location.findOnMapTooltip}
          <br></br>
          <button type="button" className="btn btn-primary btn-block btn-sm mobile-save-button" onClick={MapActions.forceToTop.bind(null,false)}>{viewerText.contribute.form.location.saveLocation}</button>
        </span>
      );
      const id = 'contribute-form-map-tip';
      const ext = map._getAvailExtent();
      const originalScreenPoint = map.toScreen(graphic.geometry);
      const screenMapLeft = map.toScreen(new Point({x: ext.xmin, y: ext.ymax, spatialReference: map.spatialReference}));
      const screenMapRight = map.toScreen(new Point({x: ext.xmax, y: ext.ymin, spatialReference: map.spatialReference}));
      const screenPoint = testAndAdjustGeometry(screenMapLeft,screenMapRight,originalScreenPoint);
      const symbol = graphic.symbol;

      return [{
        container,
        content,
        id,
        screenPoint,
        symbol
      }];
    } else if (highlightedFeature || (this.props.layout.visibleComponents.indexOf(componentNames.SELECTED_SHARES) >= 0 && selectedFeature)) {
      return features.reduce((prev,current) => {

        const oidField = lang.getObject('props.map.layer.objectIdField',false,this);
        const primaryField = lang.getObject('props.components.map.crowdsourceLayer.primaryField',false,this);
        const clusterId = current.attributes.clusterId;
        const cluster = this.props.map.clusterLayer._clusters.filter((current) => {
          return current.attributes.clusterId === clusterId;
        })[0];
        const content = current.attributes[primaryField];
        const id = current.attributes[oidField];
        const ext = map._getAvailExtent();
        const screenMapLeft = map.toScreen(new Point({x: ext.xmin, y: ext.ymax, spatialReference: map.spatialReference}));
        const screenMapRight = map.toScreen(new Point({x: ext.xmax, y: ext.ymin, spatialReference: map.spatialReference}));
        const originalScreenPoint = map.toScreen(new Point({
          x: cluster.x,
          y: cluster.y,
          spatialReference: {
            wkid: 102100
          }
        }));
        const screenPoint = testAndAdjustGeometry(screenMapLeft,screenMapRight,originalScreenPoint);
        const symbol = this.props.map.clusterLayer.renderer.getSymbol(cluster);

        return prev.concat({
          container,
          content,
          id,
          screenPoint,
          symbol
        });
      },[]);

    }

    return [];
  }

  saveContribution(graphic) {
    this.props.updateContributeState({
      saving: true,
      graphic
    });
  }

}

Viewer.propTypes = {
  appPrivacy: React.PropTypes.string.isRequired,
  appPrivacyUpdating: React.PropTypes.bool.isRequired,
  layoutId: React.PropTypes.string.isRequired,
  layout: React.PropTypes.shape({
    fontCss: React.PropTypes.string,
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
    selectedFeatureId: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number
    ]).isRequired,
    highlightedFeatureId: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number
    ]).isRequired,
    mapMoving: React.PropTypes.bool.isRequired,
    forceToTop: React.PropTypes.bool.isRequired
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
      sharing: React.PropTypes.shape({
        services: React.PropTypes.shape({
          facebook: React.PropTypes.bool,
          twitter: React.PropTypes.bool,
          link: React.PropTypes.bool
        }),
        twitter: React.PropTypes.shape({
          related: React.PropTypes.string,
          text: React.PropTypes.string
        })
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
    appPrivacy: state.mode.isBuilder ? state.builder.appShare : 'private',
    appPrivacyUpdating: state.mode.isBuilder ? state.builder.appSharePending : false,
    config: state.config,
    components: state.items.app.data.values.settings.components,
    contributing: state.app.contributing,
    loading: state.app.loading,
    layoutId: state.items.app.data.values.settings.layout.id,
    layout: state.app.layout,
    map: state.app.map,
    portal: state.app.portal,
    mode: state.mode,
    review: state.mode.isBuilder ? state.review : null,
    notifications: state.app.notifications,
    user: state.user,
    sharing: {
      services: state.items.app.data.values.settings.components.common.sharing.services,
      appIds: {
        bitly: state.config.BITLY_API_KEY,
        facebook: state.config.FACEBOOK_APP_ID
      },
      twitter: {
        text: state.items.app.data.values.settings.components.common.sharing.twitter.text.length > 0 ? state.items.app.data.values.settings.components.common.sharing.twitter.text : (state.items.app.data.values.settings.components.intro.title + ' #storymap'),
        related: state.items.app.data.values.settings.components.common.sharing.twitter.related
      }
    },
    loginUser: UserActions.loginOAuthStart,
    changeComponentsVisibility: AppActions.changeComponentsVisibility,
    showComponent: AppActions.showComponent,
    hideComponent: AppActions.hideComponent,
    updateContributeState: AppActions.updateContributeState,
    selectFeature: MapActions.selectFeature,
    highlightAction: MapActions.highlightFeature,
    nextFeature: MapActions.nextFeature,
    previousFeature: MapActions.previousFeature,
    approveFeatures: state.mode.isBuilder ? ReviewActions.approveFeatures : null,
    rejectFeatures: state.mode.isBuilder ? ReviewActions.rejectFeatures: null,
    noticationsActions: {
      addNotifications: AppActions.addNotifications,
      removeNotifications: AppActions.removeNotifications
    },
    introSaveActions: SettingsActions && ItemActions ? {
      title: [SettingsActions.updateIntroTitle,ItemActions.updateAppItemTitle],
      subtitle: [SettingsActions.updateIntroSubtitle,ItemActions.updateAppItemSubtitle],
      exploreButton: SettingsActions.updateCommonExploreText
    } : null
  };
};

export default connect(mapStateToProps)(Viewer);
