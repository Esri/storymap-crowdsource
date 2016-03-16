import $ from 'jquery';
import React from 'react';
import ReactDom from 'reactDom';
import Helper from 'babel/utils/helper/Helper';

export default class Loader extends React.Component {

  constructor(props) {
    super(props);

    this.setLoaderPosition = this.setLoaderPosition.bind(this);
    this.state = {
      width: 100
    };
  }

  componentDidMount() {
    $(window).on('resize',this.setLoaderPosition);
    this.setLoaderPosition();
  }

  componentDidUpdate() {
    this.setLoaderPosition();
  }

  componentWillUnmount() {
    $(window).off('resize',this.setLoaderPosition);
  }

  render() {

    const loaderClasses = Helper.classnames([this.props.className,this.props.classNames,'loadingIndicator','background-fill']);
    const loaderStyle = {
      marginLeft: -(this.state.width/2)
    };

    return (
      <div ref={(ref) => this.loader = ref} style={loaderStyle} className={loaderClasses}>
        <img src="resources/images/loader-light.gif" />
        <p className="loading-message">{this.props.message}</p>
      </div>
    );
  }

  setLoaderPosition() {
    const diff = this.state.width - ReactDom.findDOMNode(this.loader).offsetWidth;

    if (diff > 1 || diff < -1) {
      this.setState({
        width: ReactDom.findDOMNode(this.loader).offsetWidth
      });
    }
  }

}

Loader.propTypes = {
  message: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool
  ])
};

Loader.defaultProps = {
  message: false
};
