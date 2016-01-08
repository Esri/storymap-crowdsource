import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import CrowdsourceAppController from 'babel/components/crowdsource/viewer/CrowdsourceAppController';
import CrowdsourceBuilder from 'mode!isBuilder?babel/components/crowdsource/builder/CrowdsourceAppBuilder';
import IntroSplash from 'babel/components/intro/IntroSplash';
import Header from 'babel/components/header/Header';
import CrowdsourceWebmap from 'babel/components/map/CrowdsourceWebmap';
import ThumbnailGallery from 'babel/components/gallery/ThumbnailGallery';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import AppActions from 'babel/actions/AppActions';
import {Components} from 'babel/constants/CrowdsourceAppConstants';
import viewerText from 'i18n!translations/viewer/nls/template';

// TRANSLATED TEXT STRINGS START
// Intro
const OR_TEXT = viewerText.intro.or;
const LOADING_ERROR_HEADING = viewerText.errors.loading.header;
// TRANSLATED TEXT STRINGS END

export default class CrowdsourceApp extends React.Component {

  constructor(props) {
    super(props);

    this._controller = new CrowdsourceAppController();
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

    const appClasses = Helper.classnames(['crowdsource-app'],{
      'no-banner': window.app.mode.isBuilder && this.state.builderBannerVisible ? false : true
    });

    return (
      <div className={appClasses}>
        {/* THEME AND LAYOUT STYLES */}
        <style>{this.AppStyles}</style>
        {/* ADD BUILDER COMPONENTS */}
        {this.Builder}
        <div className="viewer">
          {/* COMMON VIEWER COMPONENTS */}
          {this.Header}
          {this.Intro}
          {/* INSET LAYOUT SPECIFIC COMPONENT ARRANGMENT */}
          {this.Layout}
        </div>
      </div>
    );
  }

  get AppStyles() {
    if (this.state.appData) {
      const layout = this.state.appData.app.data.values.layout;
      const font = layout.font || '';
      const styles = layout.styles || '';
      const theme = layout.theme || '';

      return font + styles + theme;
    } else {
      return '';
    }
  }

  get Builder() {
    if (CrowdsourceBuilder && window.app.mode.isBuilder && this.state.loadState) {
      const options = {
        bannerVisible: this.state.builderBannerVisible,
        errorMessage: this.state.loadState.error
      };

      return <CrowdsourceBuilder {...options} />;
    } else {
      return null;
    }
  }

  get Layout() {
    if (this.state.appData && this.state.loadState && this.state.loadState.error.length <= 0) {
      const layout = this.state.appData.app.data.values.layout.id;

      switch (layout) {
        case 'sidePanel':
        break;
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
              {this.Webmap}
              <div className="pane-navigation" onClick={AppActions.setView.bind(null,Components.names.GALLERY)}>
                <span className="text">{CHANGE_VIEW_TO_GALLERY}</span>
                <span className="icon" dangerouslySetInnerHTML={downArrowHtml}></span>
              </div>
            </div>
            <div className="content-pane gallery-view">
              <div className="pane-navigation" onClick={AppActions.setView.bind(null,Components.names.MAP)}>
                <span className="text">{CHANGE_VIEW_TO_MAP}</span>
                <span className="icon" dangerouslySetInnerHTML={upArrowHtml}></span>
              </div>
              {this.Gallery}
            </div>
          </div>
        );

        return stacked;
      }
    } else {
      return null;
    }
  }

  get Intro() {
    if (this.state.appData && this.state.loadState) {
      const appData = this.state.appData.app.data.values;
      const loadState = this.state.loadState;
      const options = {
        title: appData.settings.intro.title,
        subtitle: appData.settings.intro.subtitle,
        background: appData.settings.intro.background,
        exploreText: appData.settings.globals.exploreText,
        seperatorText: OR_TEXT,
        participateText: appData.settings.globals.participateLong,
        loadingMessage: loadState.loadingMessage,
        appLoaded: loadState.isReady,
        appErrorHeading: LOADING_ERROR_HEADING,
        appError: loadState.error
      };

      return <IntroSplash {...options}/>;
    } else {
      return null;
    }
  }

  get Header() {
    if (this.state.appData && this.state.loadState) {
      const appData = this.state.appData.app.data.values;
      const loadState = this.state.loadState;
      const options = {
        title: appData.settings.header.title,
        logo: appData.settings.header.logo,
        participateText: appData.settings.globals.participateShort,
        social: appData.settings.globals.social,
        appLoaded: loadState.isReady
      };

      return <Header {...options}/>;
    } else {
      return null;
    }
  }

  get Webmap() {
    if (this.state.appData) {
      const appData = this.state.appData.app.data.values;
      const options = {
        controllerOptions: {
          webmap: appData.settings.map.webmap,
          crowdsourceLayer: appData.settings.map.crowdsourceLayer,
          webmapOptions: appData.settings.map.webmapOptions
        }
      };

      return <CrowdsourceWebmap {...options}/>;
    } else {
      return null;
    }
  }

  get Gallery() {
    if (this.state.features) {
      const options = {
        items: this.state.features,
        itemAttributePath: 'attributes',
        locationKey: 'standardPlace'
      };

      return <ThumbnailGallery {...options}/>;
    } else {
      return null;
    }
  }

}
