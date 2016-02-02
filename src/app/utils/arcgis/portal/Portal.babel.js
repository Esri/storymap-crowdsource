import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import esriRequest from 'esri/request';
import ArcgisPortal from 'esri/arcgis/Portal';
// import AppDataStore from 'babel/stores/AppDataStore';
import AppStore from 'babel/store/AppStore';
import Logger from 'babel/utils/logging/Logger';
import builderDefaults from 'babel/builderOptionsConfig';
import builderText from 'i18n!translations/builder/nls/template';

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
    const defaults = {};
    const settings = $.extend(true, {}, defaults, options);
    const username = this.getPortalUser().username;
    const token = this.getPortalUser().credential.token;
    const baseRequestPath = this.portalUrl + (this.portalUrl.slice(-1) !== '/' ? '/' : '') + 'content/users/' + username + (settings.contentFolder ? ('/' + settings.contentFolder) : '');
    let response = {};

    const createFeatureService = function createFeatureService() {
      const dfd = new Deferred();
      const url = baseRequestPath + '/createService';
      const featureServiceItem = settings.item;
      const createParameters = builderDefaults.featureServiceDefaults;

      if (!createParameters.name) {
        createParameters.name = featureServiceItem.title;
      }

      const content = $.extend(true, featureServiceItem, {
        createParameters: JSON.stringify(createParameters),
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
      const crowdsourceLayerDef = builderDefaults.crowdsourceLayerDefinition;
      let url = createResponse.serviceurl + (createResponse.serviceurl.slice(-1) !== '/' ? '/' : '') + 'addToDefinition';

      response.crowdsourceLayerUrl = createResponse.serviceurl;
      response.crowdsourceLayerItemId = createResponse.itemId;

      url = url.replace('rest/services','rest/admin/services');
      url = url.replace('http://','//');

      // Add item data and upload properties
      const content = $.extend(true, {}, {
        addToDefinition: JSON.stringify(crowdsourceLayerDef),
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
    const defaults = {};
    const settings = $.extend(true, {}, defaults, options);

    const username = this.getPortalUser().username;
    const url = this.portalUrl + (this.portalUrl.slice(-1) !== '/' ? '/' : '') + 'content/users/' + username + (settings.contentFolder ? ('/' + settings.contentFolder) : '') + '/addItem';
    const webmapItem = settings.item;
    const webmapJSON = {};
    const csLayerId = 'crowdsource-layer-' + new Date().getTime();
    const csLayer = $.extend(true, {}, builderDefaults.crowdsourceLayerWebmapDefinition, {
      // TODO add popup fields
      id: csLayerId,
      title: builderText.fromScratchMessage.layerNameInWebmap,
      url: settings.crowdsourceLayerUrl + '/0',
      itemId: settings.crowdsourceLayerItemId
    });

    // Transform arrays
    webmapItem.tags = webmapItem.tags ? webmapItem.tags.join(',') : '';
    webmapItem.typeKeywords = webmapItem.typeKeywords.join(',');

    webmapJSON.operationalLayers = [csLayer];
    webmapJSON.baseMap = builderDefaults.basemapsWebmapDefinitions.lightGray;
    webmapJSON.version = '2.3';

    $.extend(true, webmapItem, {
      // Add Webmap JSON
      text: JSON.stringify(webmapJSON),
      f: 'json'
    });

    esriRequest({
      url,
      handleAs: 'json',
      content: webmapItem
    },{
      usePost: true
    }).then((res) => {
      if (res.success) {
        dfd.resolve({
          csLayerId,
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
    const defaults = {};
    const settings = $.extend(true, {}, defaults, options);

    const username = this.getPortalUser().username;
    const baseRequestPath = this.portalUrl + (this.portalUrl.slice(-1) !== '/' ? '/' : '') + 'content/users/' + username + (settings.contentFolder ? ('/' + settings.contentFolder) : '');
    const appItem = lang.getObject('items.app.item',false,AppStore.getState());
    const appData = lang.getObject('items.app.data',false,AppStore.getState());

    // lang.setObject('values.settings.map.webmap',settings.webmapId,appData);
    // lang.setObject('values.settings.map.crowdsourceLayer.id',settings.csLayerId,appData);

    // Remove properties that don't have to be committed
    delete appItem.avgRating;
		delete appItem.modified;
		delete appItem.numComments;
		delete appItem.numRatings;
		delete appItem.numViews;
		delete appItem.size;

    // TODO add serviceproxyparams

    // Layout
		let layouts = $.map(builderDefaults.builderOptions.layouts, (layout) => {
      return "layout-" + layout.id;
    });

		// Filter previous layout keyword
		appItem.typeKeywords = $.grep(appItem.typeKeywords, (keyword) => {
			return $.inArray(keyword, layouts) === -1;
		});

		// Add actual layout keyword
		appItem.typeKeywords.push("layout-" + appData.values.layout.id);

    // Transform arrays
    appItem.tags = appItem.tags ? appItem.tags.join(',') : '';
    appItem.typeKeywords = appItem.typeKeywords.join(',');

    if (!appItem.snippet) {
      appItem.snippet = appData.values.settings.intro.subtitle;
    }

    // Add item data and upload properties
    $.extend(true, appItem, {
      // Add Data
      text: JSON.stringify(appData),
      // Required Properties
      overwrite: true,
      f: 'json'
    });

    let url = baseRequestPath;

    if (appItem.id) {
      url += "/items/" + appItem.id + "/update";
    } else {
      url += '/addItem';
    }

    esriRequest({
      url,
      handleAs: 'json',
			content: appItem
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
