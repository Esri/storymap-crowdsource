import React from 'react';
import { connect } from 'reactRedux';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Header from 'babel/components/header/Header';
import IntroSplash from 'babel/components/intro/IntroSplash';
import ContributePanel from 'babel/components/contribute/ContributePanel';
import SelectedShares from 'babel/components/selectedShares/SelectedShares';
import CrowdsourceWebmap from 'babel/components/map/CrowdsourceWebmap';
import ThumbnailGallery from 'babel/components/gallery/ThumbnailGallery';
import AppActions from 'babel/actions/AppActions';
import MapActions from 'babel/actions/MapActions';
import UserActions from 'babel/actions/UserActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import viewerText from 'i18n!translations/viewer/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const OR_TEXT = viewerText.common.or;

class Viewer extends React.Component {

  constructor() {
    super();

    // Bind class methods
    this.saveContribution = this.saveContribution.bind(this);
  }

  render() {

    const viewerClasses = Helper.classnames(['viewer']);

    return (
      <div className={viewerClasses}>
        <style>{this.props.layout.font + this.props.layout.style + this.props.layout.theme}</style>
        <Header
          homeAction={this.props.showComponent.bind(this,componentNames.INTRO)}
          showParticipateActionButton={this.props.loading.map && !this.props.contributing.active}
          participateAction={this.props.updateContributeState.bind(this,{active: true})}
          {...this.props.components.header}
          {...this.props.components.common}
          loading={this.props.loading}>
        </Header>
        <IntroSplash
          seperatorText={OR_TEXT}
          showLoader={this.props.loading.map}
          showExploreActionButton={this.props.loading.map}
          showParticipateActionButton={this.props.loading.map && !this.props.contributing.active}
          exploreAction={this.props.showComponent.bind(this,componentNames.MAP)}
          participateAction={this.props.updateContributeState.bind(this,{active: true})}
          {...this.props.components.intro}
          {...this.props.components.common}>
        </IntroSplash>
        { this.Layout }
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
                selected={this.props.map.selectedIds}
                selectAction={this.props.selectFeaturesById}
                {...this.props.components.gallery}>
              </ThumbnailGallery>;
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
                {...this.props.components.contribute}>
              </ContributePanel> : null }
              { this.props.layout.visibleComponents.indexOf(componentNames.SELECTED_SHARES) >= 0  ? <SelectedShares
                className="overlay-panel">
              </SelectedShares> : null }
            </ReactCSSTransitionGroup>
          </div>
        );

        return stacked;
    }
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
    featuresInExtent: React.PropTypes.array.isRequired
  }).isRequired,
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
        id: React.PropTypes.string
      }),
      webmap: React.PropTypes.string,
      webmapOptions: React.PropTypes.shape({})
    }),
    gallery: React.PropTypes.shape({
      itemAttributePath: React.PropTypes.string,
      primaryKey: React.PropTypes.string,
      secondaryKey: React.PropTypes.string,
      thumbnailKey: React.PropTypes.string
    })
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
    user: state.user
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
    updateContributeState: (options) => {
      dispatch(AppActions.updateContributeState(options));
    },
    selectFeaturesById: (features) => {
      dispatch(MapActions.selectFeaturesById(features));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Viewer);
