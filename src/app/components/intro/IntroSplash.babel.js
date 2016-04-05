import React from 'react';
import Helper from 'babel/utils/helper/Helper';
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

    const introClass = Helper.classnames([this.props.className, {
      splash: true
    }]);

    const loader = this.props.showLoader ? null : <Loader></Loader>;

    const participateActionButton = this.props.showParticipateActionButton ?
      <button className="participate text-btn background-fill" inlineEditDisableActions="true" onClick={this.props.participateAction}>
        <span inlineEditConfig={this.getEditConfig('participateButton')}>{this.props.participateLong}</span>
      </button> : null;

    const seperatorText = this.props.showExploreActionButton && this.props.showParticipateActionButton ?
      <span className="action-seperator">{this.props.seperatorText}</span> : null;
    const showExploreActionButton = this.props.showExploreActionButton ?
      <button className="explore text-btn background-fill" inlineEditDisableActions="true" onClick={this.props.exploreAction}>
        <span inlineEditConfig={this.getEditConfig('exploreButton')}>{this.props.exploreText}</span>
      </button> : null;

    let background;

    switch (this.props.background.type) {
      case 'photo':
        background = <LazyImage className="background-image" src={this.props.background.source}></LazyImage>;
        break;
    }

    return (
      <InlineEditorWrapper
        editingAllowed={this.props.editingAllowed}
        component="div"
        addNotifications={this.props.addNotifications}
        removeNotifications={this.props.removeNotifications}
        className={introClass}>
        {background}
        <div className="title-pane background-fill">
          <h1 className="title" inlineEditConfig={this.getEditConfig('title')}>{this.props.title}</h1>
          <h2 className="subtitle serif-face" inlineEditConfig={this.getEditConfig('subtitle')}>{this.props.subtitle}</h2>
        </div>
        <ReactCSSTransitionGroup component="div" className="action-buttons" transitionName="wait-for-action" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
          {loader}
          {participateActionButton}
          {seperatorText}
          {showExploreActionButton}
        </ReactCSSTransitionGroup>
      </InlineEditorWrapper>
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
        case 'participateButton':
          value = this.props.participateLong;
          break;
        default:
          value = this.props[component];
      }

      switch (component) {
        case 'exploreButton':
        case 'participateButton':
          return {
            type: 'input',
            formId,
            id: component,
            label: builderText.introSplash.form[component].label,
            inputAttr: {
              type: 'text',
              placeholder: builderText.introSplash.form[component].placeholder,
              maxLength: 50,
              required: true
            },
            autoUpdate: {
              when: 'notChanged',
              value: value
            }
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

IntroSplash.propTypes = {
  editingAllowed: React.PropTypes.bool,
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
  showParticipateActionButton: React.PropTypes.bool,
  addNotifications: React.PropTypes.func,
  removeNotifications: React.PropTypes.func
};

IntroSplash.defaultProps = {
  editingAllowed: false,
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
  showParticipateActionButton: true,
  addNotifications: () => {},
  removeNotifications: () => {}
};

export default IntroSplash;
