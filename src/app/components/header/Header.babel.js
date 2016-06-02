import $ from 'jquery';
import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import ShareButtonPane from 'babel/components/helper/sharing/ShareButtonPane';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';
import 'bootstrap/tooltip';
import 'bootstrap/transition';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export const Header = class Header extends React.Component {

  constructor(props) {
    super(props);
    this.updateTitleWidth = this.updateTitleWidth.bind(this);
    this.participateAction = this.participateAction.bind(this);
    this.toggleParticipateBtnTooltip = this.toggleParticipateBtnTooltip.bind(this);
  }

  componentDidMount() {
    this.toggleParticipateBtnTooltip();
  }

  componentDidUpdate() {
    this.node = ReactDOM.findDOMNode(this);
    this.updateTitleWidth();
    $(window).on('resize',this.updateTitleWidth);
    this.toggleParticipateBtnTooltip();
  }

  componentWillUnmount() {
    $(window).off('resize',this.updateTitleWidth);
    this.toggleParticipateBtnTooltip(true);
  }

  render() {

    const headerClass = Helper.classnames([this.props.className, 'header', 'navbar', 'main-app-header']);
    const participateIconHtml = {
      __html: getIcon('participate')
    };
    const participateBtn = this.props.showParticipateActionButton ? (
      <button ref={(ref) => this.participateBtn = ref} className={Helper.classnames(['participate', 'btn', 'btn-primary', 'nav-btn'],{
          disabled: this.props.participationButtonDisabled
        })} onClick={this.participateAction}>
        <span className="icon" dangerouslySetInnerHTML={participateIconHtml}></span>
        <span className="text">{this.props.participateShort}</span>
      </button>
    ) : null;

    const logoUrl = Helper.attachmentUtils.checkForCredential({
      url: this.props.logo.source,
      portal: this.props.portal
    });

    const includeSharing = Object.keys(this.props.sharing.services).filter((key) => {
      return this.props.sharing.services[key] === true;
    }).length > 0;

    return (
      <header className={headerClass}>
        <div className="cell-wrapper">
          {this.props.logo.type === 'none' || logoUrl.length === 0 ? null : (
            <a href={this.props.logo.link} className="logo-link cell" target="_blank">
              <img src={logoUrl} className="logo" alt={this.props.logo.link} />
            </a>
          )}
          <div className="title-cell cell fill-cell">
            <h4 className="title" tabIndex="0" onClick={this.props.homeAction}>{this.props.title}</h4>
          </div>
          <ReactCSSTransitionGroup
            className="cell participate-cell"
            component="div"
            transitionName="participate-btn"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000} >
            {participateBtn}
          </ReactCSSTransitionGroup>
          {includeSharing ? <ShareButtonPane className="cell" config={this.props.sharing} /> : null}
        </div>
      </header>
    );

  }

  toggleParticipateBtnTooltip(destroy) {
    if (builderText && !this.participationButtonTooltip && this.props.participationButtonDisabled) {
      this.participationButtonTooltip = true;
      $(this.participateBtn).tooltip({
        title: builderText.header.participateBtnDisabledTooltip,
        placement: 'left'
      });
    } else if (destroy || (this.participationButtonTooltip && !this.props.participationButtonDisabled)) {
      this.participationButtonTooltip = false;
      $(this.participateBtn).tooltip('destroy');
    }
  }

  participateAction() {
    if (!this.props.participationButtonDisabled) {
      this.props.participateAction();
    }
  }

  updateTitleWidth() {
    const node = $(this.node);
    const fullWidth = node.outerWidth();
    let siblingWidth = 0;

    node.find('img').load(this.updateTitleWidth);

    node.find('.cell').not('.fill-cell').each(function(){
      siblingWidth += $(this).outerWidth();
    });

    node.find('.title').width(fullWidth - siblingWidth - 45);
  }

};

Header.propTypes = {
  portal: React.PropTypes.oneOfType([
    React.PropTypes.shape({}),
    React.PropTypes.bool
  ]),
  homeAction: React.PropTypes.func,
  participateAction: React.PropTypes.func,
  logo: React.PropTypes.shape({
    link: React.PropTypes.string,
    source: React.PropTypes.string
  }),
  title: React.PropTypes.string,
  participateShort: React.PropTypes.string,
  sharing: React.PropTypes.shape({}),
  loading: React.PropTypes.shape({
    map: React.PropTypes.bool
  })
};

Header.defaultProps = {
  portal: false,
  homeAction: () => {},
  participateAction: () => {},
  logo: {
    link: '',
    source: ''
  },
  title: '',
  participateShort: '',
  loading: {
    map: false
  }
};

export default Header;
