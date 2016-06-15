import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Loader from 'babel/components/helper/loading/Loader';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import InlineEditorWrapper from 'babel/components/forms/inlineEditor/InlineEditorWrapper';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export const IntroSplash = class IntroSplash extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const introClass = Helper.classnames([this.props.className, 'splash', {
      editing: this.props.editingAllowed
    }]);

    const loader = this.props.showLoader ? null : <Loader></Loader>;

    const showExploreActionButton = this.props.showExploreActionButton ?
    <InlineEditorWrapper
      editingAllowed={this.props.editingAllowed}
      component="div"
      addNotifications={this.props.addNotifications}
      removeNotifications={this.props.removeNotifications}>
        <button className="explore text-btn background-fill" inlineEditDisableActions="true" onClick={this.props.exploreAction}>
          <p className="text inline-editable" inlineEditConfig={this.getEditConfig('exploreButton')}>{this.props.exploreText}</p>
          <div className="icon-arrow-down" dangerouslySetInnerHTML={{__html: getIcon('arrow-down-open')}}></div>
        </button>
      </InlineEditorWrapper> : null;

    let background;

    switch (this.props.background.type) {
      case 'photo':
        const backgroundUrl = Helper.attachmentUtils.checkForCredential({
          url: this.props.background.source,
          portal: this.props.portal
        });

        background = <LazyImage className="background-image" src={backgroundUrl}></LazyImage>;
        break;
    }

    return (
      <div className={introClass}>
        {builderText && !this.props.editingAllowed ? (
          // TODO check builder mode instead of if builder text
          <button
            onClick={this.props.editAction}
            className="background-edit-button btn btn-primary btn-lg"
            dangerouslySetInnerHTML={{__html: getIcon('edit')}}></button>
        ) : null}
        {background}
        <InlineEditorWrapper
          className="title-pane background-fill"
          editingAllowed={this.props.editingAllowed}
          component="div"
          addNotifications={this.props.addNotifications}
          removeNotifications={this.props.removeNotifications}>
          <h1 className="title inline-editable" inlineEditConfig={this.getEditConfig('title')}>{this.props.title}</h1>
          { this.props.editingAllowed || (this.props.subtitle && typeof this.props.subtitle === 'string' && this.props.subtitle.length > 0) ? <h2 className="subtitle serif-face inline-editable" inlineEditConfig={this.getEditConfig('subtitle')}>{this.props.subtitle}</h2> : null }
        </InlineEditorWrapper>
        <ReactCSSTransitionGroup component="div" className="action-buttons" transitionName="wait-for-action" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
          {loader}
          {showExploreActionButton}
        </ReactCSSTransitionGroup>
      </div>
    );

  }

  getEditConfig(component) {
    if (builderText) {
      const formId = 'introSplash';
      let value;

      switch (component) {
        case 'exploreButton':
          value = this.props.exploreText;
          break;
        default:
          value = this.props[component];
      }

      switch (component) {
        case 'exploreButton':
          return {
            type: 'textarea',
            formId,
            id: component,
            label: builderText.introSplash.form[component].label,
            inputAttr: {
              type: 'text',
              placeholder: builderText.introSplash.form[component].placeholder,
              maxLength: 25,
              required: true
            },
            validations: ['required','noNewLine'],
            autoFix: true,
            autoUpdate: {
              when: 'notChanged',
              value: value
            },
            handleChange: this.saveChanges.bind(this,component)
          };
        case 'subtitle':
          return {
            type: 'textarea',
            formId,
            id: component,
            label: builderText.introSplash.form[component].label,
            inputAttr: {
              type: 'text',
              placeholder: builderText.introSplash.form[component].placeholder,
              maxLength: component === 'title' ? 120 : 250
            },
            validations: ['arcgisItemName'],
            autoUpdate: {
              when: 'notChanged',
              value: value
            },
            handleChange: this.saveChanges.bind(this,component)
          };
        default:
          return {
            type: 'textarea',
            formId,
            id: component,
            label: builderText.introSplash.form[component].label,
            inputAttr: {
              type: 'text',
              placeholder: builderText.introSplash.form[component].placeholder,
              maxLength: component === 'title' ? 120 : 250,
              required: true
            },
            validations: ['arcgisItemName','required'],
            autoUpdate: {
              when: 'notChanged',
              value: value
            },
            handleChange: this.saveChanges.bind(this,component)
          };
      }
    } else {
      return false;
    }
  }

  saveChanges(component,data) {
    if (data.valid && (data.value || data.value === '')) {
      [].concat(this.props.saveActions[component]).forEach((action) => {
        if (typeof action === 'function') {
          action(data.value);
        }
      });
    }
  }

};

IntroSplash.propTypes = {
  editingAllowed: React.PropTypes.bool,
  background: React.PropTypes.shape({}),
  exploreText: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string,
  exploreAction: React.PropTypes.func,
  showLoader: React.PropTypes.bool,
  showExploreActionButton: React.PropTypes.bool,
  editAction: React.PropTypes.func,
  addNotifications: React.PropTypes.func,
  removeNotifications: React.PropTypes.func,
  saveActions: React.PropTypes.shape({
    title: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]),
    subtitle: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]),
    exploreButton: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ])
  })
};

IntroSplash.defaultProps = {
  editingAllowed: false,
  background: {},
  exploreText: '',
  subtitle: '',
  title: '',
  exploreAction: () => {},
  showLoader: true,
  showExploreActionButton: true,
  editAction: () => {},
  addNotifications: () => {},
  removeNotifications: () => {}
};

export default IntroSplash;
