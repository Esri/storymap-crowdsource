import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import WebmapController from 'babel/components/map/WebmapController';

export const Webmap = class Webmap extends React.Component {

  constructor(props) {
    super(props);

    this._MapController = WebmapController;
  }

  componentDidMount() {
    const MapController = this._MapController;

    this.mapController = new MapController({
      node: this.mapDiv
    });

    if (this.props.controllerOptions.webmap) {
      this.mapController.updateMap(this.props.controllerOptions);
    }
  }

  componentDidUpdate() {
    this.mapController.updateMap(this.props.controllerOptions);
  }

  render() {

    const mapClass = Helper.classnames([this.props.className, this.props.classNames, 'map']);

    return (
      <div className={mapClass} ref={(ref) => this.mapDiv = ref} tabIndex="-1"></div>
    );
  }

};

Webmap.propTypes = {
  className: React.PropTypes.string,
  controllerOptions: React.PropTypes.shape({
    webmap: React.PropTypes.string,
    mapOptions: React.PropTypes.shape({})
  })
};

Webmap.defaultProps = {
  className: '',
  controllerOptions: {
    webmap: '',
    mapOptions: {}
  }
};

export default Webmap;
