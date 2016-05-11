import React from 'react';
import Webmap from 'babel/components/map/Webmap';
import CrowdsourceWebmapController from 'babel/components/map/CrowdsourceWebmapController';

export const CrowdsourceWebmap = class CrowdsourceWebmap extends Webmap {

  constructor(props) {
    super(props);

    this._MapController = CrowdsourceWebmapController;
  }

};

Webmap.propTypes = {
  className: React.PropTypes.string,
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
