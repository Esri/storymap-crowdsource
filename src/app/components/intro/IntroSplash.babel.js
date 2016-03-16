import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import Loader from 'babel/components/helper/loading/Loader';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export const IntroSplash = class IntroSplash extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const introClass = Helper.classnames([this.props.className, {
      splash: true
    }]);

    const loader = this.props.showLoader ? null : <Loader></Loader>;

    const participateActionButton = this.props.showParticipateActionButton ?
      <button className="participate text-btn background-fill" onClick={this.props.participateAction}>
        <span>{this.props.participateLong}</span>
      </button> : null;

    const seperatorText = this.props.showExploreActionButton && this.props.showParticipateActionButton ?
      <span className="action-seperator">{this.props.seperatorText}</span> : null;
    const showExploreActionButton = this.props.showExploreActionButton ?
      <button className="explore text-btn background-fill" onClick={this.props.exploreAction}>
        <span>{this.props.exploreText}</span>
      </button> : null;

    let background;

    switch (this.props.background.type) {
      case 'photo':
        background = <LazyImage className="background-image" src={this.props.background.source}></LazyImage>;
        break;
    }

    return (
      <div className={introClass}>
        {background}
        <div className="title-pane background-fill">
          <h1 className="title">{this.props.title}</h1>
          <h2 className="subtitle serif-face">{this.props.subtitle}</h2>
        </div>
        <ReactCSSTransitionGroup component="div" className="action-buttons" transitionName="wait-for-action" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
          {loader}
          {participateActionButton}
          {seperatorText}
          {showExploreActionButton}
        </ReactCSSTransitionGroup>
      </div>
    );

  }

};

IntroSplash.propTypes = {
  background: React.PropTypes.shape({}),
  exploreText: React.PropTypes.string,
  participateLong: React.PropTypes.string,
  seperatorText: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string,
  exploreAction: React.PropTypes.func,
  participateAction: React.PropTypes.func,
  showLoader: React.PropTypes.bool,
  showExploreActionButton: React.PropTypes.bool,
  showParticipateActionButton: React.PropTypes.bool
};

IntroSplash.defaultProps = {
  background: {},
  exploreText: '',
  participateLong: '',
  seperatorText: '',
  subtitle: '',
  title: '',
  exploreAction: () => {},
  participateAction: () => {},
  showLoader: true,
  showExploreActionButton: true,
  showParticipateActionButton: true
};

export default IntroSplash;
