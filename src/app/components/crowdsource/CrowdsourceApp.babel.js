import $ from 'jquery';
import 'velocity';
import React from 'react';
import AppDataStore from 'babel/stores/AppDataStore';
import FeatureStore from 'babel/stores/FeatureStore';
import Helper from 'babel/utils/helper/Helper';
import Header from 'babel/components/header/Header';
import CrowdsourceWebmap from 'babel/components/map/CrowdsourceWebmap';
import ThumbnailGallery from 'babel/components/gallery/ThumbnailGallery';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import viewerText from 'dojo/i18n!translations/viewer/nls/template';

// Translated Text Strings
const CHANGE_VIEW_TO_GALLERY = viewerText.themeSpecific.scroll.changeView.galleryView;
const CHANGE_VIEW_TO_MAP = viewerText.themeSpecific.scroll.changeView.mapView;

// Icons
const downArrowHtml = {
  __html: getIcon('arrow-down-open')
};
const upArrowHtml = {
  __html: getIcon('arrow-up-open')
};

const _getCrowdsourceState = function getCrowdsourceState() {
  const appData = AppDataStore.getAppData();
  const features = FeatureStore.getFeatures();

  return {
    appData: appData.values,
    features
  };
};

export default class CrowdsourceApp extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.state = _getCrowdsourceState();
  }

  componentDidMount() {
    Helper.layout.enableRegionLayout();
    AppDataStore.addChangeListener(this.onChange);
    FeatureStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    AppDataStore.removeChangeListener(this.onChange);
    FeatureStore.removeChangeListener(this.onChange);
  }

  render() {
    const layout = this.state.appData.layout;
    const headerProps = {
      title: this.state.appData.settings.header.title,
      logo: this.state.appData.settings.header.logo,
      participateText: this.state.appData.settings.globals.participateShort,
      social: this.state.appData.settings.globals.social
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
        mapOptions: this.state.appData.settings.map.mapOptions
      }
    };

    const appClasses = Helper.classnames([layout.className, {
      'crowdsource-app': true
    }]);

    return (
      <div className={appClasses}>
        <style>{layout.theme}</style>
        <Header className="region-top" {...headerProps}/>
        <div className="region-center main-content">
          <div className="content-pane map-view">
            <CrowdsourceWebmap className="region-center" {...webmapProps}/>
          <div className="region-bottom pane-navigation" onClick={this.changeView.bind(this,'gallery')}>
              <span className="text">{CHANGE_VIEW_TO_GALLERY}</span>
              <span className="icon" dangerouslySetInnerHTML={downArrowHtml}></span>
            </div>
          </div>
          <div className="content-pane gallery-view">
            <div className="region-top pane-navigation" onClick={this.changeView.bind(this,'map')}>
              <span className="text">{CHANGE_VIEW_TO_MAP}</span>
              <span className="icon" dangerouslySetInnerHTML={upArrowHtml}></span>
            </div>
            <ThumbnailGallery className="region-center" {...galleryProps}/>
          </div>
        </div>
      </div>
    );
  }

  onChange() {
    this.setState(_getCrowdsourceState());
  }

  changeView(view) {
    const duration = 800;
    const easing = 'easeInOutQuart';
    let el;

    switch (view) {
      case 'gallery':
        el = $('.content-pane.gallery-view');
        break;
      default:
        el = $('.content-pane.map-view');
    }

    el.velocity('scroll',{
      container: $('.main-content'),
      duration,
      easing
    });
  }
}
