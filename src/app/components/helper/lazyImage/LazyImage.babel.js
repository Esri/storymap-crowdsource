import $ from 'jquery';
import 'babel/utils/jquery/JqueryUtils';
import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';

export const LazyImage = class LazyImage extends React.Component {

  constructor(props) {
    super(props);

    this.checkVisible = this.checkVisible.bind(this);

    this.state = {
      visible: false,
      loaded: false,
      height: false,
      width: false
    };
  }

  componentDidMount() {
    this.markAsLoaded = (width,height) => {
      this.setState({
        loaded: true,
        height,
        width
      });
      this.props.onLoad();
    };

    this._scrollableParents = $(ReactDOM.findDOMNode(this)).parents().filter(function(){
      return $(this).isScrollable();
    });

    this._scrollableParents.on('scroll', this.checkVisible);
    this.checkVisible();
  }

  componentDidUpdate() {
    if (!this.state.visible) {
      this.checkVisible();
    }
  }

  componentWillUnmount() {
    this.onVisible();

    this.markAsLoaded = () => {};
  }

  onVisible() {
    this._scrollableParents.off('scroll', this.checkVisible);
  }

  checkVisible() {
    const threshold = this.props.threshold;
    const bounds = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const top = bounds.top + scrollTop;
    const height = bounds.bottom - bounds.top;

    if (top === 0 || (top <= (scrollTop + window.innerHeight + threshold)
                      && (top + height) > (scrollTop - threshold))) {

      const preload = new Image();

      preload.onload = () => {
        this.markAsLoaded(preload.width,preload.height);
      };
      preload.src = this.props.src;

      this.setState({ visible: true });
      this.onVisible();
    }
  }

  render() {

    const imageClass = Helper.classnames([this.props.className, {
      'lazy-image': true,
      'loaded': this.state.loaded
    }]);
    const backgroundImage = this.state.visible && this.state.loaded ? {backgroundImage: 'url(' + this.props.src + ')'} : {};

    let autoSizeStyle = {};

    if (this.props.autoSizeDiv && this.state.width && this.state.height) {
      let aspectRatio = this.state.height / this.state.width;

      // TODO remove temporary zoom of panoramic images
      if (aspectRatio < 0.75) {
        aspectRatio = 0.75;
      } else if (aspectRatio > 1.33) {
        aspectRatio = 1.33;
      }

      autoSizeStyle = {
        height: 0,
        width: '100%',
        paddingTop: (aspectRatio * 100) + '%'
      };
    }

    const style = $.extend(true, {}, backgroundImage, {
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }, this.props.style, autoSizeStyle);

    return (
      <div className={imageClass} style={style}></div>
    );
  }

};

LazyImage.propTypes = {
  autoSizeDiv: React.PropTypes.bool,
  scrollContainers: React.PropTypes.array,
  src: React.PropTypes.string,
  style: React.PropTypes.shape({
    backgroundPosition: React.PropTypes.string,
    backgroundRepeat: React.PropTypes.string,
    backgroundSize: React.PropTypes.string
  }),
  threshold: React.PropTypes.number,
  onLoad: React.PropTypes.func
};

LazyImage.defaultProps = {
  autoSizeDiv: false,
  scrollContainers: [],
  src: '',
  style: {},
  threshold: 200,
  onLoad: () => {}
};

export default LazyImage;
