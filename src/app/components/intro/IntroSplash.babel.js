import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import AppActions from 'babel/actions/AppActions';
import IntroController from 'babel/components/intro/IntroSplashController';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import {Components} from 'babel/constants/CrowdsourceAppConstants';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export const IntroSplash = class IntroSplash extends React.Component {

  constructor(props) {
    super(props);

    this._controller = new IntroController();
  }

  componentDidMount() {
    this._controller.mount();
  }

  componentDidUpdate() {
    this._controller.propsUpdated();
  }

  render() {

    const introClass = Helper.classnames([this.props.className, {
      splash: true
    }]);

    const loader = this.props.appLoaded ? null : (
      <div className="loadingIndicator">
        <div className="background-fill"></div>
        <img src="resources/images/loader-light.gif" />
      <p className="loading-message">{this.props.loadingMessage}</p>
      </div>
    );

    const actionBtns = this.props.appLoaded ? (
      <div className="action-buttons">
        <button className="participate text-btn" onClick={this.onParticipateClick}>
          <div className="background-fill"></div>
          <span>{this.props.participateText}</span>
        </button>
        <span className="action-seperator">{this.props.seperatorText}</span>
        <button className="explore text-btn" onClick={this.onExploreClick}>
          <div className="background-fill"></div>
          <span>{this.props.exploreText}</span>
        </button>
      </div>
    ) : null;

    let background;

    switch (this.props.background.type) {
      case 'photo':
        background = <LazyImage className="background-image" src={this.props.background.source}></LazyImage>;
        break;
    }

    return (
      <div className={introClass}>
        {background}
        <div className="title-pane">
          <div className="background-fill"></div>
          <h1 className="title">{this.props.title}</h1>
          <h2 className="subtitle">{this.props.subtitle}</h2>
        </div>
        <ReactCSSTransitionGroup transitionName="wait-for-action" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
          {loader}
          {actionBtns}
        </ReactCSSTransitionGroup>
      </div>
    );

  }

  onParticipateClick() {
    alert('TODO: Share Entry');
  }

  onExploreClick() {
    AppActions.setView(Components.names.MAP);
  }
};

IntroSplash.propTypes = {
  appLoaded: React.PropTypes.bool,
  background: React.PropTypes.shape(),
  exploreText: React.PropTypes.string,
  loadingMessage: React.PropTypes.string,
  participateText: React.PropTypes.string,
  seperatorText: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string
};

IntroSplash.defaultProps = {
  appLoaded: false,
  background: {},
  exploreText: '',
  loadingMessage: '',
  participateText: '',
  seperatorText: '',
  subtitle: '',
  title: ''
};

export default IntroSplash;
