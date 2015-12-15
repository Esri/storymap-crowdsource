import $ from 'jquery';
import 'babel/utils/jquery/JqueryUtils';
import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';

export const LazyImage = class LazyImage extends React.Component {

  constructor(props) {
    super(props);

    this.onWindowScroll = this.onWindowScroll.bind(this);

    this.state = {
      visible: false,
      loaded: false
    };
  }

  componentDidMount() {
    this.markAsLoaded = () => {
      this.setState({ loaded: true });
    };

    this._scrollableParents = $(ReactDOM.findDOMNode(this)).parents().filter(function(){
      return $(this).isScrollable();
    });

    this._scrollableParents.on('scroll', this.onWindowScroll);
    this.onWindowScroll();
  }

  componentDidUpdate() {
    if (!this.state.visible) {
      this.onWindowScroll();
    }
  }

  componentWillUnmount() {
    this.onVisible();

    this.markAsLoaded = () => {};
  }

  onVisible() {
    this._scrollableParents.off('scroll', this.onWindowScroll);
  }

  onWindowScroll() {
    const threshold = this.props.threshold;
    const bounds = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const top = bounds.top + scrollTop;
    const height = bounds.bottom - bounds.top;

    if (top === 0 || (top <= (scrollTop + window.innerHeight + threshold)
                      && (top + height) > (scrollTop - threshold))) {

      const preload = new Image();

      preload.onload = () => {
        this.markAsLoaded();
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
    const style = $.extend(true, {}, backgroundImage, this.props.style);

    return (
      <div className={imageClass} style={style}></div>
    );
  }

};

LazyImage.propTypes = {
  scrollContainers: React.PropTypes.array,
  src: React.PropTypes.string,
  style: React.PropTypes.shape({
    backgroundPosition: React.PropTypes.string,
    backgroundRepeat: React.PropTypes.string,
    backgroundSize: React.PropTypes.string
  }),
  threshold: React.PropTypes.number
};

LazyImage.defaultProps = {
  scrollContainers: [],
  src: '',
  style: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  threshold: 200
};

export default LazyImage;
