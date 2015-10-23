import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import CrowdsourceWebmapController from 'babel/components/map/CrowdsourceWebmapController';

export const Webmap = class Webmap extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const mapDiv = ReactDOM.findDOMNode(this);

    this._webmapController = new CrowdsourceWebmapController({
      node: mapDiv
    });
  }

  componentDidUpdate() {
    const options = {
      webmap: this.props.webmap
    };

    this._webmapController.createMap(options);
  }

  render() {

    const mapClass = Helper.classnames([this.props.className, {
      'map-pane': true
    }]);

    return (
      <div className={mapClass}></div>
    );
  }

};

Webmap.propTypes = {
  className: React.PropTypes.string,
  webmap: React.PropTypes.string
};

Webmap.defaultProps = {
  className: '',
  webmap: ''
};

export default Webmap;
