import React from 'react';
import Helper from 'babel/utils/helper/Helper';

export const MapTip = class MapTip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showOnTop: true,
      marginLeft: 0,
      marginTop: 0,
      translateX: 0
    };

    // Autobind methods
    this.positionMapTip = this.positionMapTip.bind(this);
  }

  componentDidMount() {
    this.positionMapTip();
  }

  componentDidUpdate() {
    this.positionMapTip();
  }

  render() {
    const classes = Helper.classnames([this.props.className, this.props.classNames, 'map-tip']);
    const top = this.props.screenPoint.y;
    const left = this.props.screenPoint.x;

    return (
      <div className={classes} key={this.props.id} ref={(ref) => this.mapTip = ref} style={{top, left, marginTop: this.state.marginTop, marginLeft: this.state.marginLeft}}>
        { this.state.showOnTop ? null : <div className="top-arrow"></div> }
        <div className="content" style={{transform: 'translateX(' + this.state.translateX + 'px)'}}>
          {this.props.content}
        </div>
        { this.state.showOnTop ? <div className="bottom-arrow"></div> : null }
      </div>
    );
  }

  positionMapTip() {
    const container = this.props.container || document.querySelector('body');
    const height = this.mapTip.offsetHeight;
    const width = this.mapTip.offsetWidth;
    const containerWidth = container.offsetWidth;
    const arrowWidth = 8;
    let symbolSize = this.props.symbol.size;

    if (this.props.symbol.outline && this.props.symbol.outline.width) {
      symbolSize += this.props.symbol.outline.width;
    }

    const symbolOffsetVertical = (symbolSize / 2) + 2;
    let showOnTop = true;
    let marginLeft = -(width / 2);
    let marginTop = -(height + symbolOffsetVertical);
    let translateX = 0;

    if (this.props.screenPoint.y < Math.abs(marginTop) + 25) {
      marginTop = symbolOffsetVertical;
      showOnTop = false;
    }

    if (this.props.screenPoint.x < Math.abs(marginLeft) + 25) {
      translateX = (width / 2) - arrowWidth;
    }

    if (this.props.screenPoint.x > containerWidth - Math.abs(marginLeft) - 25) {
      translateX = marginLeft + arrowWidth;
    }

    if (Math.abs(this.state.marginTop - marginTop) >= 1 ||
      Math.abs(this.state.marginLeft - marginLeft) >= 1 ||
      Math.abs(this.state.translateX - translateX) >= 1 ||
      this.state.showOnTop !== showOnTop) {
      this.setState({
        marginTop,
        marginLeft,
        translateX,
        showOnTop
      });
    }

  }
};

MapTip.propTypes = {
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
};

MapTip.defaultProps = {};

export default MapTip;
