import $ from 'jquery';
import AppStore from 'babel/store/AppStore';
import lang from 'dojo/_base/lang';
import URI from 'lib/urijs/src/URI';
import OAuthInfo from 'esri/arcgis/OAuthInfo';
import IdentityManager from 'esri/IdentityManager';
import UserActions from 'babel/actions/UserActions';
import AppActions from 'babel/actions/AppActions';
import ArcgisItem from 'babel/utils/arcgis/items/Item';
import Logger from 'babel/utils/logging/Logger';
import viewerText from 'i18n!translations/viewer/nls/template';
import 'babel/utils/helper/strings/StringUtils';

const _logger = new Logger({source: 'User Controller'});

// const _onError = function onError(error) {
//   _logger.logMessage({
//     type: 'error',
//     error
//   });
// };

const _onStatus = function onStatus(message,debugOnly) {
  _logger.logMessage({
    type: 'status',
    debugOnly,
    message
  });
};

export default class UserController {
  constructor () {

    // Autobind methods
    this.updateAppState = this.updateAppState.bind(this);
    this.initialLoad = this.initialLoad.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.loginWithOAuth = this.loginWithOAuth.bind(this);
    this.finishOAuthLogin = this.finishOAuthLogin.bind(this);
    this.verifyCredentials = this.verifyCredentials.bind(this);
    window.signInAfterOauth = this.signInAfterOauth = this.signInAfterOauth.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

  }

  updateAppState() {
    this.appState = AppStore.getState();

    const portal = lang.getObject('appState.app.portal',false,this);

    if (portal) {
      this.initialLoad();
      this.checkLoginStatus();
    }

    if (lang.getObject('appState.app.loading.data',false,this) && !lang.getObject('appState.user.authenticated',false,this)) {
      this.verifyCredentials();
    }
    if (lang.getObject('appState.mode.fromScratch',false,this) && lang.getObject('appState.app.portal.user',false,this) && !lang.getObject('appState.user.authenticated',false,this)) {
      this.verifyCredentials();
    }
  }

  initialLoad() {
    if (!this.loadStarted) {
      this.loadStarted = true;
      const portal = lang.getObject('appState.app.portal',false,this);

      const clientId = lang.getObject('appState.config.oAuthAppId',false,this);
      const locationUri = new URI(window.location).protocol('https').filename('oauth-callback.html');
      const redirectUri =  locationUri.origin() + locationUri.path();
      const portalUrl = new URI(portal.portalHostname).protocol('https').href().stripTrailingSlash();

      if (clientId) {
        const info = new OAuthInfo({
          appId: clientId,
          portalUrl: portalUrl,
          popup: true,
          popupCallbackUrl: redirectUri,
          showSocialLogins: true
        });

        IdentityManager.registerOAuthInfos([info]);
        IdentityManager.useSignInPage = false;
      }

      if (lang.getObject('appState.mode.fromScratch',false,this)) {
        portal.signIn().then(this.verifyCredentials);
      } else if (lang.getObject('appState.config.appid',false,this)) {
        ArcgisItem.getDataById({
          requiresLogin: lang.getObject('appState.mode.isBuilder',false,this)
        });
      }
    }
  }

  checkLoginStatus() {

    const portal = lang.getObject('appState.app.portal',false,this);
    const pendingLogin = lang.getObject('appState.user.pendingLogin',false,this);

    if (!this.checkLoginOnFirstContribute && lang.getObject('appState.app.contributing.active',false,this) && lang.getObject('appState.app.contributing.view',false,this) === 'login') {
      this.checkLoginOnFirstContribute = true;

      IdentityManager.checkSignInStatus(portal.portalUrl).then(() => {
        portal.signIn().then(() => {
          this.verifyCredentials();
        });
      },(err) => {
        _onStatus(err.message,true);
      });
    }

    if (pendingLogin && pendingLogin.method) {
      if (pendingLogin.method === 'oauth') {
        this.pendingLogin = pendingLogin;
        this.loginWithOAuth(this.pendingLogin.service);
      }
    }
  }

  loginWithOAuth(service) {
    const portal = lang.getObject('appState.app.portal',false,this);

    if (!IdentityManager.findCredential(portal.url)) {
      const clientId = lang.getObject('appState.items.app.data.values.settings.oauth.clientId',false,this);
      const locationUri = new URI(window.location).protocol('https').filename('oauth-callback.html');
      const redirectUri =  locationUri.origin() + locationUri.path();
      const portalUrl = new URI(portal.portalHostname).protocol('https').href().stripTrailingSlash();
      const socialOAuthUrl = portalUrl + '/sharing/rest/oauth2/social/authorize';

      const info = new OAuthInfo({
        appId: clientId,
        portalUrl: portalUrl,
        popup: true,
        popupCallbackUrl: redirectUri,
        showSocialLogins: true
      });

      IdentityManager.registerOAuthInfos([info]);

      if (service === 'guest') {
        this.finishOAuthLogin({
          verifyCredentialsOptions: {
            guestContributor: true
          }
        });
      } else if (socialOAuthUrl && service !== 'arcgis') {
        window.open(socialOAuthUrl + '?client_id='+clientId+'&response_type=token&expiration=20160&autoAccountCreateForSocial=true&socialLoginProviderName='+service+'&redirect_uri=' + window.encodeURIComponent(redirectUri), 'oauth-window', 'height=600,width=800,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes');
      } else {
        IdentityManager.useSignInPage = false;
        IdentityManager.getCredential(portal.url,{
          oAuthPopupConfirmation: false
        }).then(() => {
          portal.signIn().then(() => {
            this.finishOAuthLogin();
          });
        });
      }
    } else {
      portal.signIn().then(() => {
        this.finishOAuthLogin();
      });
    }

  }

  verifyCredentials(options) {
    const defaults = {};
    const settings = $.extend(true,{},defaults,options);
    const portal = lang.getObject('appState.app.portal',false,this);
    const userPermissions = {
      publisher: false,
      editor: false,
      contributor: false
    };

    const portalUser = portal.getPortalUser() ? portal.getPortalUser().username : false;
    const appOwner = lang.getObject('appState.items.app.item.owner',false,this);
    const authorizedOwners = lang.getObject('appState.config.authorizedOwners',false,this);

    if (!lang.getObject('appState.mode.fromScratch',false,this) && lang.getObject('appState.mode.isBuilder',false,this) && portal.userIsAppEditor() && portal.userIsAppPublisher()) {
      userPermissions.publisher = true;
      userPermissions.editor = true;
      userPermissions.contributor = true;
    } else if (!lang.getObject('appState.mode.fromScratch',false,this) && portal.userIsAppEditor()) {
      userPermissions.editor = true;
      userPermissions.contributor = true;
    } else if (lang.getObject('appState.mode.isBuilder',false,this) && portal.userIsAppPublisher()) {
      userPermissions.publisher = true;
      userPermissions.contributor = true;
    } else if (portal.getPortalUser()) {
      userPermissions.contributor = true;
    }

    if (settings.guestContributor) {
      userPermissions.contributor = true;
    }

    if (lang.getObject('appState.user.contributor',false,this) !== userPermissions.contributor || lang.getObject('appState.user.editor',false,this) !== userPermissions.editor || lang.getObject('appState.user.publisher',false,this) !== userPermissions.publisher) {
      UserActions.authenticateUser(userPermissions);
    } else if (settings.forceAuthenticate) {
      UserActions.authenticateUser(userPermissions);
    }

    if (!this.authorizedOwnersChecked && !$.isArray(authorizedOwners) || authorizedOwners.length === 0) {
      this.authorizedOwnersChecked = true;
      AppActions.displayMainError(viewerText.errors.loading.unspecifiedConfigOwner);
    } else if (!this.authorizedOwnersChecked && lang.getObject('appState.mode.isBuilder',false,this) && portalUser && authorizedOwners.indexOf(portalUser) === -1 && authorizedOwners.indexOf('*')) {
      this.authorizedOwnersChecked = true;
      AppActions.displayMainError(viewerText.errors.loading.invalidConfigOwner);
    } else if (!this.authorizedOwnersChecked && appOwner && authorizedOwners.indexOf(appOwner) === -1 && authorizedOwners.indexOf('*')) {
      this.authorizedOwnersChecked = true;
      AppActions.displayMainError(viewerText.errors.loading.invalidConfigOwner);
    }
  }

  signInAfterOauth(credential) {
    if (lang.getObject('appState.items.app.item.id',false,this)) {
      const portal = lang.getObject('appState.app.portal',false,this);

      if (credential) {
        var properties = $.extend({
          server: portal.url
        },credential);

        IdentityManager.registerToken(properties);

        portal.signIn().then(() => {
          this.finishOAuthLogin();
        });
      }
    }
  }

  finishOAuthLogin(options) {
    const defaults = {
      verifyCredentialsOptions: {}
    };
    const settings = $.extend(true,{},defaults,options);

    this.verifyCredentials(settings.verifyCredentialsOptions);
    this.pendingLogin = false;
    UserActions.loginOAuthFinish();
  }

}
