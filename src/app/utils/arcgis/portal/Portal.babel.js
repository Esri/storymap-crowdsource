import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import esriRequest from 'esri/request';
import ArcgisPortal from 'esri/arcgis/Portal';
// import AppDataStore from 'babel/stores/AppDataStore';
import AppStore from 'babel/store/AppStore';
import Logger from 'babel/utils/logging/Logger';
import builderDefaults from 'babel/builderOptionsConfig';
// import builderText from 'i18n!translations/builder/nls/template';

const _logger = new Logger({source: 'ArcGIS - Portal'});

const _onError = function onError(error) {
  _logger.logMessage({
    type: 'error',
    error
  });
};

export const Portal = class Portal extends ArcgisPortal.Portal{

  constructor(url,options) {
    super(url,options);

    const defaults = {
      signInOnLoad: false
    };

    this._settings = $.extend(true, {}, defaults, options);

    if (this._settings.signInOnLoad) {
      this.on('load',() => {
        this.signIn().then(() => {
          this.emit('sign-in',this.getPortalUser());
        },(err) => {
          _onError(err);
        });
      });
    }
  }

  getUserFolders() {
    const dfd = new Deferred();
    const user = this.getPortalUser();

    user.getFolders().then((folders) => {
      dfd.resolve(folders);
    },_onError);

    return dfd;
  }

  userIsAppPublisher() {
    return this.hasUserPrivileges(['portal:user:createItem','portal:publisher:publishFeatures']);
  }

  userIsAppEditor() {
    const appItem = lang.getObject('items.app.item',false,AppStore.getState());

    return (appItem && appItem.itemControl && appItem.itemControl === 'update' || appItem.itemControl === 'admin');
  }

  hasUserPrivileges(privileges) {
    const user = this.getPortalUser();

    if (user) {
      if ($.isArray(privileges)) {
        return $.grep(privileges, (v) => {
            return $.inArray(v, user.privileges) !== -1;
        }).length === privileges.length;
      } else {
        _onError('Privileges should be an array.');
        return false;
      }
    } else {
      _onError('No user available.');
      return false;
    }
  }

  isNameAvailable(options) {
    const dfd = new Deferred();
    const defaults = {};
    const settings = $.extend(true, {}, defaults, options);
    const portalId = this.id;
    const url = this.portalUrl + (this.portalUrl.slice(-1) !== '/' ? '/' : '') + 'portals/' + portalId + '/isServiceNameAvailable';

    const content = {
      name: settings.name,
      type: 'Feature Service',
      f: 'json'
    };

    esriRequest({
      url,
      handleAs: 'json',
      content
    }).then((res) => {
      if (res.available || res.available === false) {
        dfd.resolve(res);
      } else {
        _onError(res);
        dfd.reject(res);
      }
    },(err) => {
      _onError(err);
      dfd.reject(err);
    });

    return dfd;
  }

  createService(options) {
    const deferred = new Deferred();
    const fsState = lang.getObject('items.featureService',false,AppStore.getState());
    const defaults = fsState;
    const settings = $.extend(true, {}, defaults, options);
    const username = this.getPortalUser().username;
    const token = this.getPortalUser().credential.token;
    const baseRequestPath = this.portalUrl + (this.portalUrl.slice(-1) !== '/' ? '/' : '') + 'content/users/' + username + (settings.item.ownerFolder ? ('/' + settings.item.ownerFolder) : '');
    let response = {};

    // Transform arrays
    settings.item.tags = settings.item.tags ? settings.item.tags.join(',') : '';
    settings.item.typeKeywords = settings.item.typeKeywords.join(',');

    const createFeatureService = function createFeatureService() {
      const dfd = new Deferred();
      const url = baseRequestPath + '/createService';

      const content = $.extend(true, settings.item, {
        createParameters: JSON.stringify(settings.serviceDefinition),
        outputType: 'featureService',
        f: 'json'
      });

      esriRequest({
        url,
        handleAs: 'json',
        content
      },{
        usePost: true
      }).then((res) => {
        if (res.success) {
          dfd.resolve(res);
        } else {
          _onError(res);
          dfd.reject(res);
        }
      },(err) => {
        _onError(err);
        dfd.reject(err);
      });

      return dfd;
    };

    const addCrowdsourceLayerToFeatureService = function addCrowdsourceLayerToFeatureService(createResponse) {
      const dfd = new Deferred();
      let url = createResponse.serviceurl + (createResponse.serviceurl.slice(-1) !== '/' ? '/' : '') + 'addToDefinition';

      response.crowdsourceLayerUrl = createResponse.serviceurl + '/0';
      response.crowdsourceLayerItemId = createResponse.itemId;

      url = url.replace('rest/services','rest/admin/services');
      url = url.replace('http://','//');

      // Add item data and upload properties
      const content = $.extend(true, {}, {
        addToDefinition: JSON.stringify(settings.layerDefinition),
        token,
        f: 'json'
      });

      esriRequest({
        url,
        handleAs: 'json',
        content
      },{
        usePost: true
      }).then((res) => {
        if (res.success) {
          dfd.resolve(res);
        } else {
          _onError(res);
          dfd.reject(res);
        }
      },(err) => {
        _onError(err);
        dfd.reject(err);
      });

      return dfd;
    };

    createFeatureService().then(addCrowdsourceLayerToFeatureService,(err) => {
      _onError(err);
      deferred.reject(err);
    }).then(() => {
      deferred.resolve(response);
    },(err) => {
      _onError(err);
      deferred.reject(err);
    });

    return deferred;

  }

  saveWebmap(options) {
    const dfd = new Deferred();
    const mapState = lang.getObject('items.webmap',false,AppStore.getState());
    const defaults = mapState;
    const settings = $.extend(true, {}, defaults, options);

    const username = this.getPortalUser().username;
    const url = this.portalUrl + (this.portalUrl.slice(-1) !== '/' ? '/' : '') + 'content/users/' + username + (settings.item.ownerFolder ? ('/' + settings.item.ownerFolder) : '') + '/addItem';

    // Transform arrays
    settings.item.tags = settings.item.tags ? settings.item.tags.join(',') : '';
    settings.item.typeKeywords = settings.item.typeKeywords.join(',');

    $.extend(true, settings.item, {
      // Add Webmap JSON
      text: JSON.stringify(settings.data),
      f: 'json'
    });

    esriRequest({
      url,
      handleAs: 'json',
      content: settings.item
    },{
      usePost: true
    }).then((res) => {
      if (res.success) {
        dfd.resolve({
          createResponse: res
        });
      } else {
        _onError(res);
        dfd.reject(res);
      }
    },(err) => {
      _onError(err);
      dfd.reject(err);
    });

    return dfd;
  }

  saveApp(options) {
    const dfd = new Deferred();
    const appState = lang.getObject('items.app',false,AppStore.getState());
    const defaults = appState;
    const settings = $.extend(true, {}, defaults, options);

    const username = this.getPortalUser().username;
    const baseRequestPath = this.portalUrl + (this.portalUrl.slice(-1) !== '/' ? '/' : '') + 'content/users/' + username + (settings.item.ownerFolder ? ('/' + settings.item.ownerFolder) : '');

    // Remove properties that don't have to be committed
    delete settings.item.avgRating;
		delete settings.item.modified;
		delete settings.item.numComments;
		delete settings.item.numRatings;
		delete settings.item.numViews;
		delete settings.item.size;

    // TODO add serviceproxyparams

    // Layout
		// let layouts = $.map(builderDefaults.builderOptions.layouts, (layout) => {
    //   return "layout-" + layout.id;
    // });

		// Filter previous layout keyword
		// settings.item.typeKeywords = $.grep(settings.item.typeKeywords, (keyword) => {
		// 	return $.inArray(keyword, layouts) === -1;
		// });

		// Add actual layout keyword
		// appItem.typeKeywords.push("layout-" + appData.values.layout.id);

    // Transform arrays
    settings.item.tags = settings.item.tags ? settings.item.tags.join(',') : '';
    settings.item.typeKeywords = settings.item.typeKeywords.join(',');

    // Add item data and upload properties
    $.extend(true, settings.item, {
      // Add Data
      text: JSON.stringify(settings.data),
      // Required Properties
      overwrite: true,
      f: 'json'
    });

    let url = baseRequestPath;

    if (settings.item.id) {
      url += "/items/" + settings.item.id + "/update";
    } else {
      url += '/addItem';
    }

    esriRequest({
      url,
      handleAs: 'json',
			content: settings.item
    },{
      usePost: true
    }).then((res) => {
      if (res.success) {
        dfd.resolve(res);
      } else {
        _onError(res);
        dfd.reject(res);
      }
    },(err) => {
      _onError(err);
      dfd.reject(err);
    });

    return dfd;
  }

};

export default Portal;
