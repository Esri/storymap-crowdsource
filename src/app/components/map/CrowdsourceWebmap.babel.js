import React from 'react';
import Webmap from 'babel/components/map/Webmap';
import Helper from 'babel/utils/helper/Helper';
import MapTip from 'babel/components/helper/mapTip/MapTip';
import CrowdsourceWebmapController from 'babel/components/map/CrowdsourceWebmapController';

export const CrowdsourceWebmap = class CrowdsourceWebmap extends Webmap {

  constructor(props) {
    super(props);

    this._MapController = CrowdsourceWebmapController;
  }

  render() {
    const mapClass = Helper.classnames([this.props.className, this.props.classNames, 'map'],{
      'force-on-top': this.props.showOnTop
    });

    return (
      <div className={mapClass} ref={(ref) => this.mapDiv = ref} tabIndex="-1">
        {this.props.mapTips.map((current) => {
          return <MapTip {...current} key={current.id}></MapTip>;
        })}
      </div>
    );
  }

};

Webmap.propTypes = {
  className: React.PropTypes.string,
  mapTips: React.PropTypes.array,
  showOnTop: React.PropTypes.bool,
  controllerOptions: React.PropTypes.shape({
    webmap: React.PropTypes.string,
    mapOptions: React.PropTypes.shape({}),
    crowdsourceLayer: React.PropTypes.shape({
      id: React.PropTypes.string,
      where: React.PropTypes.string
    })
  })
};

Webmap.defaultProps = {
  className: '',
  mapTips: [],
  showOnTop: false,
  controllerOptions: {
    webmap: '',
    mapOptions: {},
    crowdsourceLayer: {
      id: '',
      where: '1=1'
    }
  }
};

export default CrowdsourceWebmap;
