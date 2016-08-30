import React from 'react';
import Helper from 'babel/utils/helper/Helper';

export const MapTip = class MapTip extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <span>
        { this.props.mapTips.map((current) => {
          const classes = Helper.classnames([this.props.className, this.props.classNames, 'map-tip']);
          const top = current.screenPoint.y + 15;
          const left = current.screenPoint.x + 15;

          return (
            <div className={classes} key={current.id} style={{top, left}}>
              <div className="content">
                {current.content}
              </div>
            </div>
          );
        })}
      </span>
    );
  }
};

MapTip.propTypes = {
  mapTips: React.PropTypes.arrayOf(React.PropTypes.shape({
    container: React.PropTypes.object,
    content: React.PropTypes.node.isRequired,
    screenPoint: React.PropTypes.shape({
      x: React.PropTypes.number,
      y: React.PropTypes.number
    }).isRequired,
    // TODO handle symbol offsets
    symbol: React.PropTypes.shape({
      size: React.PropTypes.number
    }).isRequired
  }))
};

MapTip.defaultProps = {
  mapTips: []
};

export default MapTip;
