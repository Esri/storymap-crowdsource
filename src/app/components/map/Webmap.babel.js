import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import WebmapController from 'babel/components/map/WebmapController';

export const Webmap = class Webmap extends React.Component {

  constructor(props) {
    super(props);

    this._MapController = WebmapController;
  }

  componentDidMount() {
    const mapDiv = ReactDOM.findDOMNode(this);
    const MapController = this._MapController;

    this.mapController = new MapController({
      node: mapDiv
    });

    if (this.props.controllerOptions.webmap) {
      this.mapController.updateMap(this.props.controllerOptions);
    }
  }

  componentDidUpdate() {
    this.mapController.updateMap(this.props.controllerOptions);
  }

  render() {

    const mapClass = Helper.classnames([this.props.className, {
      map: true
    }]);

    return (
      <div className={mapClass}></div>
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
