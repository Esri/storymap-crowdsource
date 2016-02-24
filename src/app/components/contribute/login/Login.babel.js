import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import viewerText from 'i18n!translations/viewer/nls/template';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  render() {

    const closeBtnClasses = Helper.classnames(['btn','btn-default','btn-block','close-btn']);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>{viewerText.contribute.login.title}</h3>
          { Object.keys(this.props.loginTypes).map((current) => {
            if (this.props.loginTypes[current] && (this.props.socialLogin || current === 'arcgis' )) {
              const loginBtn = Helper.classnames(['btn','btn-block','btn-' + current,'login-btn',current]);

              return (
                <button type="button" key={current} className={loginBtn} onClick={this.onLogin.bind(this,current)}>
                  { viewerText.contribute.login.signInWith + ' ' + viewerText.contribute.login.services[current] }
                </button>
              );
            }
          }) }
          <p>{viewerText.contribute.login.loginDescription}</p>
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

  onClose() {
    this.props.closeAction();
  }
}

Login.propTypes = {
  socialLogin: React.PropTypes.bool,
  loginAction: React.PropTypes.func,
  loginTypes: React.PropTypes.shape({
    arcgis: React.PropTypes.bool,
    facebook: React.PropTypes.bool,
    google: React.PropTypes.bool
  })
};

Login.defaultProps = {
  loginAction: () => {},
  socialLogin: false,
  loginTypes: {
    arcgis: true,
    facebook: true,
    google: true
  }
};
