import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import AppActions from 'babel/actions/AppActions';
import Loader from 'babel/components/helper/loading/Loader';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import {Components} from 'babel/constants/CrowdsourceAppConstants';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export const IntroSplash = class IntroSplash extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const introClass = Helper.classnames([this.props.className, {
      splash: true
    }]);

    const loader = this.props.appLoaded || this.props.appError.length > 0 ? null : (
      <Loader message={this.props.loadingMessage}></Loader>
    );

    const appError = {__html: this.props.appError};

    const error = this.props.appError.length > 0 ? (
      <div className="loading-error-message alert alert-danger">
        <h5 className="error-heading"><strong>{this.props.appErrorHeading}</strong></h5>
        <p className="message" dangerouslySetInnerHTML={appError}></p>
      </div>
    ) : null;

    const actionBtns = this.props.appLoaded && this.props.appError.length <= 0 ? (
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
          <h2 className="subtitle serif-face">{this.props.subtitle}</h2>
        </div>
        <ReactCSSTransitionGroup transitionName="wait-for-action" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
          {loader}
          {error}
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
  appError: React.PropTypes.string,
  appErrorHeading: React.PropTypes.string,
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
  appError: '',
  appErrorHeading: 'An error has occured',
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
