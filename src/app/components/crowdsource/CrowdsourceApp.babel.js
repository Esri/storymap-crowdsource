import React from 'react';
import AppDataStore from 'babel/stores/AppDataStore';
import FeatureStore from 'babel/stores/FeatureStore';
import Helper from 'babel/utils/helper/Helper';
import Header from 'babel/components/header/Header';
import CrowdsourceWebmap from 'babel/components/map/CrowdsourceWebmap';
import ThumbnailGallery from 'babel/components/gallery/ThumbnailGallery';

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
          <div className="content-pane">
            <CrowdsourceWebmap className="region-center" {...webmapProps}/>
            <div className="region-bottom pane-navigation"></div>
          </div>
          <div className="content-pane">
            <div className="region-top pane-navigation"></div>
          <ThumbnailGallery className="region-center" {...galleryProps}/>
          </div>
        </div>
      </div>
    );
  }

  onChange() {
    this.setState(_getCrowdsourceState());
  }
}
