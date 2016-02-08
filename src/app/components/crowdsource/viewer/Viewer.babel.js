import React from 'react';
import { connect } from 'reactRedux';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Header from 'babel/components/header/Header';
import IntroSplash from 'babel/components/intro/IntroSplash';
import ContributePanel from 'babel/components/contribute/ContributePanel';
import CrowdsourceWebmap from 'babel/components/map/CrowdsourceWebmap';
import ThumbnailGallery from 'babel/components/gallery/ThumbnailGallery';
import AppActions from 'babel/actions/AppActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import viewerText from 'i18n!translations/viewer/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const OR_TEXT = viewerText.common.or;

class Viewer extends React.Component {

  render() {

    const viewerClasses = Helper.classnames(['viewer']);

    return (
      <div className={viewerClasses}>
        <style>{this.props.layout.font + this.props.layout.style + this.props.layout.theme}</style>
        <Header
          homeAction={this.props.updateLayout.bind(this,{view: componentNames.INTRO})}
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
          exploreAction={this.props.updateLayout.bind(this,{view: componentNames.MAP})}
          participateAction={this.props.updateContributeState.bind(this,{active: true})}
          {...this.props.components.intro}
          {...this.props.components.common}>
        </IntroSplash>
        { this.Layout }
      </div>
    );
  }

  get Layout() {
    switch (this.props.layout.id) {
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
              <ReactCSSTransitionGroup transitionName="contribute-toggle" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
                { this.props.contributing.active ? <ContributePanel
                  {...this.props.contributing}
                  closeAction={this.props.updateContributeState.bind(this,{active: false})}
                  map={this.props.map.originalObject}
                  fieldDefinitions={this.props.map.layer.fields}
                  {...this.props.components.contribute}>
                </ContributePanel> : null}
              </ReactCSSTransitionGroup>
              <CrowdsourceWebmap controllerOptions={this.props.components.map}/>
              <div className="pane-navigation" onClick={this.props.updateLayout.bind(this,{view: componentNames.GALLERY})}>
                <span className="text">{CHANGE_VIEW_TO_GALLERY}</span>
                <span className="icon" dangerouslySetInnerHTML={downArrowHtml}></span>
              </div>
            </div>
            <div className="content-pane gallery-view">
              <div className="pane-navigation" onClick={this.props.updateLayout.bind(this,{view: componentNames.MAP})}>
                <span className="text">{CHANGE_VIEW_TO_MAP}</span>
                <span className="icon" dangerouslySetInnerHTML={upArrowHtml}></span>
              </div>
              <ThumbnailGallery
                items={this.props.map.featuresInExtent}
                {...this.props.components.gallery}>
              </ThumbnailGallery>;
            </div>
          </div>
        );

        return stacked;
    }
  }

}

Viewer.propTypes = {
  layout: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    font: React.PropTypes.string.isRequired,
    style: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired
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
        fields: React.PropTypes.array
      }),
      React.PropTypes.bool
    ]),
    featuresInExtent: React.PropTypes.array.isRequired
  }).isRequired,
  contributing: React.PropTypes.shape({
    active: React.PropTypes.bool.isRequired
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
    contributing: state.app.contributing,
    loading: state.app.loading,
    layout: state.items.app.data.settings.layout,
    map: state.map,
    components: state.items.app.data.settings.components
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLayout: (options) => {
      dispatch(AppActions.updateLayout(options));
    },
    updateContributeState: (options) => {
      dispatch(AppActions.updateContributeState(options));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Viewer);
