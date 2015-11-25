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
    const layout = this.state.appData.layout;
    const introProps = {
      title: this.state.appData.settings.intro.title,
      subtitle: this.state.appData.settings.intro.subtitle,
      background: this.state.appData.settings.intro.background,
      exploreText: this.state.appData.settings.globals.exploreText,
      seperatorText: OR_TEXT,
      participateText: this.state.appData.settings.globals.participateLong,
      loadingMessage: this.state.loadState.loadingMessage,
      appLoaded: this.state.loadState.isReady
    };
    const headerProps = {
      title: this.state.appData.settings.header.title,
      logo: this.state.appData.settings.header.logo,
      participateText: this.state.appData.settings.globals.participateShort,
      social: this.state.appData.settings.globals.social,
      appLoaded: this.state.loadState.isReady
    };
    const galleryProps = {
      items: this.state.features,
      itemAttributePath: 'attributes',
      locationKey: 'standardPlace'
    };
    const webmapProps = {
      controllerOptions: {
        webmap: this.state.appData.settings.map.webmap,
        crowdsourceLayer: this.state.appData.settings.map.crowdsourceLayer,
        webmapOptions: this.state.appData.settings.map.webmapOptions
      }
    };

    const appClasses = Helper.classnames(['crowdsource-app', layout.className]);

    const getLayoutConfiguration = function getLayoutConfiguration(layout) {
      switch (layout) {
        case 'sidePanel':
          break;
        default:
          // SCROLL LAYOUT

          // Translation Strings
          const CHANGE_VIEW_TO_GALLERY = viewerText.layouts.scroll.changeView.galleryView;
          const CHANGE_VIEW_TO_MAP = viewerText.layouts.scroll.changeView.mapView;

          // Icons
          const downArrowHtml = {
            __html: getIcon('arrow-down-open')
          };
          const upArrowHtml = {
            __html: getIcon('arrow-up-open')
          };

          const scroll = (
            <div className="main-content">
              <div className="content-pane map-view">
                <CrowdsourceWebmap {...webmapProps}/>
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
                <ThumbnailGallery {...galleryProps}/>
              </div>
            </div>
          );

          return scroll;
      }
    };

    return (
      <div className={appClasses}>
        {/* THEME AND LAYOUT STYLES */}
        <style>{layout.font + layout.styles + layout.theme}</style>

        { CrowdsourceBuilder ? <CrowdsourceBuilder /> : null }

        <div className="viewer">
          {/* COMMON VIEWER COMPONENTS */}
          <Header {...headerProps}/>
          <IntroSplash {...introProps}/>
          {/* INSET LAYOUT SPECIFIC COMPONENT ARRANGMENT */}
          {getLayoutConfiguration(layout.type)}
        </div>
      </div>
    );
  }

}
