import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import ShareButtonPane from 'babel/components/helper/sharing/ShareButtonPane';
import AppActions from 'babel/actions/AppActions';
import {Components} from 'babel/constants/CrowdsourceAppConstants';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export const Header = class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    Helper.layout.resetRegionLayout(true);
  }

  render() {

    const headerClass = Helper.classnames([this.props.className, {
      'header': true,
      'has-data': this.props.title.length > 0
    }]);
    const participateIconHtml = {
      __html: getIcon('participate')
    };
    const participateBtn = this.props.appLoaded ? (
      <button className="participate text-btn" onClick={this.onParticipateClick}>
        <span className="icon" dangerouslySetInnerHTML={participateIconHtml}></span>
        <span className="text">{this.props.participateText}</span>
      </button>
    ) : null;

    return (
      <header className={headerClass}>
        <div className="primary-content region-center">
          <a href={this.props.logo.link} className="logo-link region-left" target="_blank">
            <img src={this.props.logo.source} className="logo" alt={this.props.logo.link} />
          </a>
          <h4 className="title region-center" onClick={AppActions.setView.bind(null,Components.names.INTRO)}>{this.props.title}</h4>
        </div>
        <ReactCSSTransitionGroup
          className="secondary-content region-right"
          component="div"
          transitionName="participate-btn"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1} >
          {participateBtn}
          <ShareButtonPane social={this.props.social} />
        </ReactCSSTransitionGroup>
      </header>
    );

  }

  onParticipateClick() {
    alert('TODO: Share Entry');
  }
};

Header.propTypes = {
  appLoaded: React.PropTypes.bool,
  logo: React.PropTypes.shape({
    link: React.PropTypes.string,
    source: React.PropTypes.string
  }),
  title: React.PropTypes.string,
  participateText: React.PropTypes.string,
  social: React.PropTypes.shape({
    facebook: React.PropTypes.bool,
    twitter: React.PropTypes.bool,
    bitly: React.PropTypes.bool
  }),
  socialButtonTitles: React.PropTypes.shape()
};

Header.defaultProps = {
  appLoaded: false,
  logo: {
    link: '',
    source: ''
  },
  title: '',
  participateText: '',
  social: {
    facebook: false,
    twitter: false,
    bitly: false
  },
  socialButtonTitles: {}
};

export default Header;
