import React from 'react';
import { connect } from 'reactRedux';
import Helper from 'babel/utils/helper/Helper';
import Builder from 'mode!isBuilder?./builder/Builder';
import Viewer from './viewer/Viewer';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class CrowdsourceApp extends React.Component {

  render() {

    const appClasses = Helper.classnames(['crowdsource-app',this.props.layoutId],{
      'no-banner': this.props.mode.isBuilder && (!this.props.config || (this.props.config && this.props.config.appid.length !== 32))
    });

    return (
      <div className={appClasses}>
        {Builder ? <Builder></Builder> : null}
        <Viewer></Viewer>
        <ReactCSSTransitionGroup transitionName="wait-for-action" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} >
          {this.Error}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  get Error() {
    let error = false;

    if (this.props.mode.fromScratch && this.props.user.authenticated && !this.props.user.publisher) {
      error = {
        message: {__html: builderText.errors.loading.notAuthorizedCreateNew}
      };
    } else if (!this.props.mode.fromScratch && this.props.mode.isBuilder && this.props.user.authenticated && !this.props.user.editor) {
      error = {
        message: {__html: builderText.errors.loading.notAuthorizedEdit}
      };
    } else if (!this.props.mode.fromScratch && this.props.config && this.props.config.appid.length !== 32) {
      const redirectToScratchBuilder = function () {
        window.location.replace('?fromScratch');
      };

      error = {
        message: {__html: viewerText.errors.loading.invalidConfigNoApp},
        actionBtn: <button className="btn btn-primary error-action-button" onClick={redirectToScratchBuilder}>{viewerText.errors.actionsBtns.startFromScratch}</button>
      };
    }

    if (error) {
      const LOADING_ERROR_HEADING = viewerText.errors.loading.heading;

      return (
        <div className="loading-error-message alert alert-danger">
          <h5 className="error-heading"><strong>{LOADING_ERROR_HEADING}</strong></h5>
          <p className="message" dangerouslySetInnerHTML={error.message}></p>
          {error.actionBtn ? error.actionBtn : null}
        </div>
      );
    } else {
      return null;
    }
  }

}

CrowdsourceApp.propTypes = {
  config: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.shape({
      appid: React.PropTypes.string.isRequired
    })
  ]).isRequired,
  mode: React.PropTypes.shape({
    isBuilder: React.PropTypes.bool,
    fromScratch: React.PropTypes.bool
  }).isRequired,
  layoutId: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({
    authenticated: React.PropTypes.bool,
    publisher: React.PropTypes.bool,
    editor: React.PropTypes.bool
  }).isRequired
};

const mapStateToProps = (state) => {
  // TODO remove
  console.log(state);
  return {
    config: state.config,
    mode: state.mode,
    layoutId: state.items.app.data.settings.layout.id,
    user: state.user
  };
};

export default connect(mapStateToProps)(CrowdsourceApp);
