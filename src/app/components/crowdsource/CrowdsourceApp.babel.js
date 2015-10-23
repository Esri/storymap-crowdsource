import React from 'react';
import AppDataStore from 'babel/stores/AppDataStore';
import Helper from 'babel/utils/helper/Helper';
import Header from 'babel/components/header/Header';
import CrowdsourceWebmap from 'babel/components/map/CrowdsourceWebmap';

const _getCrowdsourceState = function getCrowdsourceState() {
  const appData = AppDataStore.getAppData();

  return {
    appData: appData.values
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
  }

  componentWillUnmount() {
    AppDataStore.removeChangeListener(this.onChange);
  }

  render() {
    const theme = this.state.appData.theme;
    const headerProps = {
      title: this.state.appData.settings.header.title,
      logo: this.state.appData.settings.header.logo,
      participateText: this.state.appData.settings.globals.participateShort,
      social: this.state.appData.settings.globals.social
    };
    const webmapProps = {
      webmap: this.state.appData.webmap
    };

    return (
      <div className="crowdsource-app">
        <style>{theme}</style>
        <Header className="region-top" {...headerProps}/>
        <div className="region-center main-content">
          <CrowdsourceWebmap className="region-center" {...webmapProps}/>
        </div>
      </div>
    );
  }

  onChange() {
    this.setState(_getCrowdsourceState());
  }
}
