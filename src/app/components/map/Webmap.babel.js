import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import WebmapController from 'babel/components/map/WebmapController';

export const Webmap = class Webmap extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const mapDiv = ReactDOM.findDOMNode(this);

    this._webmapController = new WebmapController({
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
