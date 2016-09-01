import React from 'react';
import Helper from 'babel/utils/helper/Helper';

export const MapTip = class MapTip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showOnTop: true,
      marginLeft: 0,
      marginTop: 0,
      right: 0,
      left: 0,
      arrowMarginLeft: 'auto',
      arrowMarginRight: 'auto'
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

    return (
      <div className={classes} key={this.props.id} ref={(ref) => this.mapTip = ref} style={{top, left: this.state.left, right: this.state.right, marginTop: this.state.marginTop, marginLeft: this.state.marginLeft}}>
        { this.state.showOnTop ? null : <div style={{marginLeft: this.state.arrowMarginLeft, marginRight: this.state.arrowMarginRight}} ref={(ref) => this.topArrow = ref} className="top-arrow"></div> }
        <div className="content" >
          {this.props.content}
        </div>
        { this.state.showOnTop ? <div style={{marginLeft: this.state.arrowMarginLeft, marginRight: this.state.arrowMarginRight}} ref={(ref) => this.bottomArrow = ref}  className="bottom-arrow"></div> : null }
      </div>
    );
  }

  positionMapTip() {
    const container = this.props.container || document.querySelector('body');
    const height = this.mapTip.clientHeight;
    const width = this.mapTip.clientWidth;
    const containerWidth = container.clientWidth;
    const positionFromRight = this.props.screenPoint.x > containerWidth/2;

    const left = positionFromRight ? 'auto' : this.props.screenPoint.x;
    let right = positionFromRight ? containerWidth - this.props.screenPoint.x - (width/2) : 'auto';
    const arrowWidth = this.state.showOnTop ? this.bottomArrow.offsetWidth/2 : this.topArrow.offsetWidth/2;
    let symbolSize = this.props.symbol.size;
    let arrowMarginLeft = 'auto';
    let arrowMarginRight = 'auto';

    if (this.props.symbol.outline && this.props.symbol.outline.width) {
      symbolSize += this.props.symbol.outline.width;
    }

    const symbolOffsetVertical = (symbolSize / 2) + 2;
    let showOnTop = true;
    let marginLeft = -(width / 2);
    let marginTop = -(height + symbolOffsetVertical);

    // On top
    if (this.props.screenPoint.y < ((width/2) + 25)) {
      marginTop = symbolOffsetVertical;
      showOnTop = false;
    }

    // On left
    if (this.props.screenPoint.x < ((width/2) + 25)) {
      marginLeft = -arrowWidth;
      arrowMarginLeft = 0;
    }

    // On right
    if (this.props.screenPoint.x > (containerWidth - (width/2) - 25)) {
      right = containerWidth - this.props.screenPoint.x - arrowWidth;
      arrowMarginRight = 0;
    }

    if (
      (this.state.left === 'auto' && left !== 'auto') ||
      (this.state.right === 'auto' && right !== 'auto') ||
      (this.state.arrowMarginLeft === 'auto' && arrowMarginLeft !== 'auto') ||
      (this.state.arrowMarginRight === 'auto' && arrowMarginRight !== 'auto') ||
      Math.abs(this.state.marginTop - marginTop) >= 1 ||
      Math.abs(this.state.marginLeft - marginLeft) >= 1 ||
      Math.abs(this.state.right - right) >= 1 ||
      Math.abs(this.state.left - left) >= 1 ||
      Math.abs(this.state.arrowMarginLeft - arrowMarginLeft) >= 1 ||
      Math.abs(this.state.arrowMarginRight - arrowMarginRight) >= 1 ||
      this.state.showOnTop !== showOnTop) {
      this.setState({
        marginTop,
        marginLeft,
        left,
        right,
        showOnTop,
        arrowMarginLeft,
        arrowMarginRight
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

// style={{transform: 'arrowMargin(' + this.state.arrowMargin + 'px)'}}
