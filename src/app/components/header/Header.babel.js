import $ from 'jquery';
import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import ShareButtonPane from 'babel/components/helper/sharing/ShareButtonPane';
// import AppActions from 'babel/actions/AppActions';
// import ContributeActions from 'babel/actions/ContributeActions';
// import {Components} from 'babel/constants/CrowdsourceAppConstants';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export const Header = class Header extends React.Component {

  constructor(props) {
    super(props);
    this.updateTitleWidth = this.updateTitleWidth.bind(this);
  }

  componentDidUpdate() {
    this.node = ReactDOM.findDOMNode(this);
    this.updateTitleWidth();
    $(window).on('resize',this.updateTitleWidth);
  }

  componentWillUnmount() {
    $(window).off('resize',this.updateTitleWidth);
  }

  render() {

    const headerClass = Helper.classnames([this.props.className, 'header', 'navbar']);
    const participateIconHtml = {
      __html: getIcon('participate')
    };
    const participateBtn = this.props.showParticipateActionButton ? (
      <button className="participate text-btn" onClick={this.props.participateAction}>
        <span className="icon" dangerouslySetInnerHTML={participateIconHtml}></span>
        <span className="text">{this.props.participateShort}</span>
      </button>
    ) : null;

    return (
      <header className={headerClass}>
        <div className="cell-wrapper">
          <a href={this.props.logo.link} className="logo-link cell" target="_blank">
            <img src={this.props.logo.source} className="logo" alt={this.props.logo.link} />
          </a>
          <div className="cell fill-cell">
            <h4 className="title" tabIndex="0" onClick={this.props.homeAction}>{this.props.title}</h4>
          </div>
          <ReactCSSTransitionGroup
            className="cell"
            component="div"
            transitionName="participate-btn"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000} >
            {participateBtn}
          </ReactCSSTransitionGroup>
          <ShareButtonPane className="cell" social={this.props.social} />
        </div>
      </header>
    );

  }

  updateTitleWidth() {
    const node = $(this.node);
    const fullWidth = node.outerWidth();
    let siblingWidth = 0;

    node.find('img').load(this.updateTitleWidth);

    node.find('.cell').not('.fill-cell').each(function(){
      siblingWidth += $(this).outerWidth();
    });

    node.find('.title').width(fullWidth - siblingWidth);
  }

};

Header.propTypes = {
  homeAction: React.PropTypes.func,
  participateAction: React.PropTypes.func,
  logo: React.PropTypes.shape({
    link: React.PropTypes.string,
    source: React.PropTypes.string
  }),
  title: React.PropTypes.string,
  participateShort: React.PropTypes.string,
  social: React.PropTypes.shape({
    facebook: React.PropTypes.bool,
    twitter: React.PropTypes.bool,
    bitly: React.PropTypes.bool
  }),
  loading: React.PropTypes.shape({
    map: React.PropTypes.bool
  })
};

Header.defaultProps = {
  homeAction: () => {},
  participateAction: () => {},
  logo: {
    link: '',
    source: ''
  },
  title: '',
  participateShort: '',
  social: {
    facebook: false,
    twitter: false,
    bitly: false
  },
  loading: {
    map: false
  }
};

export default Header;
