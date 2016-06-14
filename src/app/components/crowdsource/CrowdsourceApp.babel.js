import React from 'react';
import { connect } from 'reactRedux';
import Helper from 'babel/utils/helper/Helper';
import AdminBanner from 'babel/components/admin/banner/AdminBanner';
import Builder from 'mode!isBuilder?./builder/Builder';
import Viewer from './viewer/Viewer';
import Loader from 'babel/components/helper/loading/Loader';
import AppActions from 'babel/actions/AppActions';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import URI from 'lib/urijs/src/URI';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class CrowdsourceApp extends React.Component {

  render() {

    const error = this.Error;
    const showBuilder = this.props.mode.isBuilder && ((this.props.mode.fromScratch && this.props.user.publisher) || (!this.props.mode.fromScratch && this.props.loading.data && this.props.user.editor)) && !error;
    const showViewer = !this.props.mode.fromScratch && (!this.props.mode.isBuilder || this.props.mode.isBuilder && this.props.user.editor) && this.props.loading.data && !error;
    const adminBanner = this.props.visibleComponents.indexOf(componentNames.ADMIN_BANNER) >= 0;

    const appClasses = Helper.classnames(['crowdsource-app',this.props.layout.id,this.props.layout.id + '-' + this.props.layout.theme,'font-' + this.props.layout.font],{
      'banner': adminBanner || showBuilder,
      'visible-side-panel': this.props.visibleComponents.indexOf(componentNames.SIDE_PANEL_SETTINGS) >= 0 ||
        this.props.visibleComponents.indexOf(componentNames.SIDE_PANEL_HELP) >= 0
    });

    return (
      <div className={appClasses}>
        { showBuilder ? <Builder></Builder> : null }
        { adminBanner ? <AdminBanner
          hideAction={this.props.actions.hideComponent.bind(null,componentNames.ADMIN_BANNER)}
          editAction={() => {
            const redirect = new URI(window.location.href);

            redirect.setSearch('edit');
            window.location = redirect.href();
          }} /> : null }
        { showViewer ? <Viewer></Viewer> : null }
        { showViewer || this.props.activeDialog ? null : <Loader></Loader> }
        <ReactCSSTransitionGroup transitionName="wait-for-action" transitionEnterTimeout={1000} transitionLeaveTimeout={1} >
          {error}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  get Error() {
    let error = false;

    if (this.props.error) {
      error = {
        message: {__html: this.props.error}
      };
    } else if (window.location.protocol !== 'https:' && this.props.mode.isBuilder ) {
      const redirectToSecureConnection = function () {
        location.href = location.href.replace("http://", "https://");
      };

      error = {
        message: {__html: builderText.errors.loading.builderNotSSL},
        actionBtn: <button className="btn btn-primary error-action-button" onClick={redirectToSecureConnection}>{builderText.errors.actionsBtns.redirectToSecureConnection}</button>
      };
    } else if (this.props.mode.fromScratch && this.props.user.authenticated && !this.props.user.publisher) {
      error = {
        message: {__html: builderText.errors.loading.notAuthorizedCreateNew}
      };
    } else if (this.props.loading.data && !this.props.mode.fromScratch && this.props.mode.isBuilder && this.props.user.authenticated && !this.props.user.editor) {
      error = {
        message: {__html: builderText.errors.loading.notAuthorizedEdit}
      };
    } else if (!this.props.mode.fromScratch && this.props.config && this.props.config.appid.length !== 32) {
      const redirectToScratchBuilder = function () {
        window.location.replace('?fromScratch');
      };

      if (this.props.mode.isHosted) {
        window.location.replace('http://links.esri.com/storymaps/crowdsource-app');
      } else {
        error = {
          message: {__html: viewerText.errors.loading.invalidConfigNoApp},
          actionBtn: <button className="btn btn-primary error-action-button" onClick={redirectToScratchBuilder}>{viewerText.errors.actionsBtns.startFromScratch}</button>
        };
      }
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
  activeDialog: React.PropTypes.string,
  config: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.shape({
      appid: React.PropTypes.string.isRequired
    })
  ]).isRequired,
  error: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ]).isRequired,
  loading: React.PropTypes.shape({
    data: React.PropTypes.bool
  }).isRequired,
  mode: React.PropTypes.shape({
    isBuilder: React.PropTypes.bool,
    fromScratch: React.PropTypes.bool
  }).isRequired,
  layout: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired
  }).isRequired,
  user: React.PropTypes.shape({
    authenticated: React.PropTypes.bool,
    publisher: React.PropTypes.bool,
    editor: React.PropTypes.bool
  }).isRequired,
  visibleComponents: React.PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    activeDialog: state.builder ? state.builder.activeDialog : '',
    config: state.config,
    error: state.app.mainError,
    mode: state.mode,
    loading: state.app.loading,
    layout: state.items.app.data.values.settings.layout,
    user: state.user,
    visibleComponents: state.app.layout.visibleComponents,
    actions: {
      hideComponent: AppActions.hideComponent
    }
  };
};

export default connect(mapStateToProps)(CrowdsourceApp);
