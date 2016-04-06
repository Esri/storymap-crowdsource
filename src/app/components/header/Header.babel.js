import $ from 'jquery';
import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import ShareButtonPane from 'babel/components/helper/sharing/ShareButtonPane';
import InlineEditorWrapper from 'babel/components/forms/inlineEditor/InlineEditorWrapper';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';

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
      <InlineEditorWrapper
        editingAllowed={this.props.editingAllowed}
        component="header"
        addNotifications={this.props.addNotifications}
        removeNotifications={this.props.removeNotifications}
        className={headerClass}>
        <div className="cell-wrapper">
          <a href={this.props.logo.link} className="logo-link cell" target="_blank">
            <img src={this.props.logo.source} className="logo" alt={this.props.logo.link} />
          </a>
          <div className="title-cell cell fill-cell">
            <h4 className="title" tabIndex="0" inlineEditConfig={this.getEditConfig('title')} onClick={this.props.homeAction}>{this.props.title}</h4>
          </div>
          <ReactCSSTransitionGroup
            className="cell participate-cell"
            component="div"
            transitionName="participate-btn"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000} >
            {participateBtn}
          </ReactCSSTransitionGroup>
          <ShareButtonPane className="cell" config={this.props.sharing} />
        </div>
      </InlineEditorWrapper>
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

  getEditConfig(component) {
    if (builderText) {
      const formId = 'header';
      let value;

      switch (component) {
        default:
          value = this.props[component];
      }

      switch (component) {
        default:
          return {
            type: 'input',
            formId,
            id: component,
            label: builderText.header.form[component].label,
            inputAttr: {
              type: 'text',
              placeholder: builderText.header.form[component].placeholder,
              maxLength: 120,
              required: true
            },
            validations: ['arcgisItemName'],
            autoUpdate: {
              when: 'notChanged',
              value: value
            }
          };
      }
    } else {
      return false;
    }
  }

};

Header.propTypes = {
  editingAllowed: React.PropTypes.bool,
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
  }),
  addNotifications: React.PropTypes.func,
  removeNotifications: React.PropTypes.func
};

Header.defaultProps = {
  editingAllowed: false,
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
  },
  addNotifications: () => {},
  removeNotifications: () => {}
};

export default Header;
