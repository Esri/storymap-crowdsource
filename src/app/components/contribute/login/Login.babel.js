import React from 'react';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Helper from 'babel/utils/helper/Helper';
import viewerText from 'i18n!translations/viewer/nls/template';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.autoLoginIfGuestOnly = this.autoLoginIfGuestOnly.bind(this);
  }

  componentDidMount() {
    this.autoLoginIfGuestOnly();
  }

  render() {

    const closeBtnClasses = Helper.classnames(['btn','btn-primary','btn-block','close-btn']);

    return (
      <div className="row">
        <div className="close-button-wrapper">
          <button type="button" className="close-btn btn text-btn" aria-label="Close" onClick={this.onClose}>
            <span aria-hidden="true" dangerouslySetInnerHTML={{__html: getIcon('close')}}></span>
          </button>
        </div>
        <div className="col-xs-12">
          <h3>{viewerText.contribute.login.title}</h3>
          { Object.keys(this.props.loginOptions).map((current) => {
            if (this.props.loginOptions[current] && (this.props.socialLogin || current === 'arcgis' )) {
              const loginBtn = Helper.classnames(['btn','btn-block','btn-' + current,'login-btn',current],{
                'btn-default': current === 'guest'
              });

              return (
                <button type="button" key={current} className={loginBtn} onClick={this.onLogin.bind(this,current)}>
                  { viewerText.contribute.login.services[current] }
                </button>
              );
            }
          }) }
          <p>
            {
              Object.keys(this.props.loginOptions).filter((current) => {
                return this.props.loginOptions[current] === true;
              }).length === 1 ? viewerText.contribute.login.loginDescriptionSingle :
               viewerText.contribute.login.loginDescription
            }
          </p>
          <button type="button" className={closeBtnClasses} onClick={this.onClose}>
            { viewerText.common.buttons.close }
          </button>
        </div>
      </div>
    );
  }

  onLogin(service) {
    this.props.loginAction(service);
  }

  autoLoginIfGuestOnly() {
    const loginOptions = Object.keys(this.props.loginOptions).filter((current) => {
      return this.props.loginOptions[current] === true;
    });

    if (loginOptions.length === 1 && loginOptions.indexOf('guest') >= 0) {
      this.onLogin('guest');
    }
  }

  onClose() {
    this.props.closeAction();
  }
}

Login.propTypes = {
  socialLogin: React.PropTypes.bool,
  loginAction: React.PropTypes.func,
  loginOptions: React.PropTypes.shape({
    arcgis: React.PropTypes.bool,
    facebook: React.PropTypes.bool,
    google: React.PropTypes.bool,
    guest: React.PropTypes.bool
  })
};

Login.defaultProps = {
  loginAction: () => {},
  socialLogin: false,
  loginOptions: {}
};
