import AppStore from 'babel/store/AppStore';
import lang from 'dojo/_base/lang';
import IdentityManager from 'esri/IdentityManager';
import OAuthInfo from 'esri/arcgis/OAuthInfo';
import UserActions from 'babel/actions/UserActions';
import ArcgisAppItem from 'babel/utils/arcgis/appItems/AppItem';
import Logger from 'babel/utils/logging/Logger';

const _logger = new Logger({source: 'User Controller'});

const _onError = function onError(error) {
  _logger.logMessage({
    type: 'error',
    error
  });
};

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
    this.initialLoginAndLoad = this.initialLoginAndLoad.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.loginWithOAuth = this.loginWithOAuth.bind(this);
    this.verifyCredentials = this.verifyCredentials.bind(this);

    // Subscribe to state changes
    this.updateAppState();
    this.unsubscribeAppStore = AppStore.subscribe(this.updateAppState);

    this.initialLoginAndLoad();

  }

  updateAppState() {
    this.appState = AppStore.getState();
    this.checkLoginStatus();

    if (lang.getObject('appState.app.loading.data',false,this) && !lang.getObject('appState.user.authenticated',false,this)) {
      this.verifyCredentials();
    }
  }

  initialLoginAndLoad() {
    const portal = lang.getObject('appState.app.portal',false,this);

    if (lang.getObject('appState.mode.isBuilder',false,this)) {
      portal.signIn().then((user) => {
        const token = lang.getObject('credential.token',false,user);

        if (lang.exists('appState.mode.isBuilder',this) && lang.exists('appState.config.appid',this) && this.appState.config.appid.length === 32) {
          ArcgisAppItem.getDataById({
            token
          });
        } else if (lang.exists('appState.mode.fromScratch',this)) {
          this.verifyCredentials();
        }
      },_onError);
    } else {
      IdentityManager.checkSignInStatus(portal.portalUrl).then((credential) => {
        const token = lang.getObject('token',false,credential);

        ArcgisAppItem.getDataById({
          token
        });
      },(err) => {
        ArcgisAppItem.getDataById();
        _onStatus('App load check sign in status - ' + err.message,true);
      });
    }
  }

  checkLoginStatus() {

    const pendingLogin = lang.getObject('appState.user.pendingLogin',false,this);

    if (!this.pendingLogin && pendingLogin && pendingLogin.method) {
      if (pendingLogin.method === 'oauth') {
        this.pendingLogin = pendingLogin;
        this.loginWithOAuth(this.pendingLogin.service);
      }
    }
  }

  loginWithOAuth(service) {
    const info = new OAuthInfo({
      appId: lang.getObject('appState.items.app.data.settings.oauth.clientId',false,this),
      // Uncomment the next line and update if using your own portal
      portalUrl: lang.getObject('appState.app.portal.url',false,this),
      // Uncomment the next line to prevent the user's signed in state from being shared
      // with other apps on the same domain with the same authNamespace value.
      //authNamespace: "portal_oauth_inline",
      popup: false
    });

    IdentityManager.registerOAuthInfos([info]);

    switch (service) {
      case 'facebook':
        console.log('facebook oauth');
        break;
      case 'google':
        console.log('facebook oauth');
        break;
      default:
        console.log('arcgis oauth');
        IdentityManager.signIn(lang.getObject('appState.app.portal.portalUrl',false,this));
    }
  }

  verifyCredentials() {
    const portal = lang.getObject('appState.app.portal',false,this);
    const userPermissions = {
      publisher: false,
      editor: false,
      contributor: false
    };

    if (!lang.getObject('appState.mode.fromScratch',false,this) && lang.getObject('appState.mode.isBuilder',false,this) && portal.userIsAppEditor() && portal.userIsAppPublisher()) {
      userPermissions.publisher = true;
      userPermissions.editor = true;
      userPermissions.contributor = true;
    } else if (!lang.getObject('appState.mode.fromScratch',false,this) && lang.getObject('appState.mode.isBuilder',false,this) && portal.userIsAppEditor()) {
      userPermissions.editor = true;
      userPermissions.contributor = true;
    } else if (lang.getObject('appState.mode.isBuilder',false,this) && portal.userIsAppPublisher()) {
      userPermissions.publisher = true;
      userPermissions.contributor = true;
    } else if (portal.getPortalUser()) {
      userPermissions.contributor = true;
    }

    if (lang.getObject('appState.user.contributor',false,this) !== userPermissions.contributor || lang.getObject('appState.user.editor',false,this) !== userPermissions.editor || lang.getObject('appState.user.publisher',false,this) !== userPermissions.publisher) {
      UserActions.authenticateUser(userPermissions);
    }
  }

}
