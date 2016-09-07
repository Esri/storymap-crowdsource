import $ from 'jquery';
import Helper from 'babel/utils/helper/Helper';
import Deferred from 'dojo/Deferred';
import lang from 'dojo/_base/lang';
import URI from 'lib/urijs/src/URI';
import esriRequest from 'esri/request';
import ArcgisPortal from 'esri/arcgis/Portal';
import AppStore from 'babel/store/AppStore';
import Logger from 'babel/utils/logging/Logger';

const _logger = new Logger({source: 'ArcGIS - Portal'});

const _onError = function onError(error) {
  _logger.logMessage({
    type: 'error',
    error
  });
};

export const Portal = ArcgisPortal.Portal;

// TODO Use class exted - Using prototype instead of extend to fix IE10 bug. Portal not working with class extend in IE10.
Portal.prototype.getUserFolders = function() {
  const dfd = new Deferred();
  const user = this.getPortalUser();

  user.getFolders().then((folders) => {
    dfd.resolve(folders);
  },_onError);

  return dfd;
};

Portal.prototype.userIsAppPublisher = function () {
  return this.hasUserPrivileges(['portal:user:createItem','portal:publisher:publishFeatures']);
};

Portal.prototype.userIsAppEditor = function () {
  const appItem = lang.getObject('items.app.item',false,AppStore.getState());

  return (this.getPortalUser() && appItem && appItem.itemControl && (appItem.itemControl === 'update' || appItem.itemControl === 'admin'));
};

Portal.prototype.hasUserPrivileges = function (privileges) {
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
};

Portal.prototype.isNameAvailable = function (options) {
  const dfd = new Deferred();
  const defaults = {};
  const settings = $.extend(true, {}, defaults, options);
  const portalId = this.id;
  const url = this.portalUrl.stripTrailingSlash() + '/portals/' + portalId + '/isServiceNameAvailable';

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
};

Portal.prototype.createService = function (options) {
  const deferred = new Deferred();
  const fsState = lang.getObject('items.featureService',false,AppStore.getState());
  const defaults = fsState;
  const settings = $.extend(true, {}, defaults, options);
  const username = this.getPortalUser().username;
  const token = this.getPortalUser().credential.token;
  const baseRequestPath = this.portalUrl.stripTrailingSlash() + '/content/users/' + username + (settings.item.ownerFolder ? ('/' + settings.item.ownerFolder) : '');
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
    let url = createResponse.serviceurl.stripTrailingSlash() + '/addToDefinition';

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

  const protect = function() {
    const url = baseRequestPath + '/items/' + response.crowdsourceLayerItemId + '/protect';

    const content = $.extend(true, settings.item, {
      f: 'json'
    });

    esriRequest({
      url,
      handleAs: 'json',
      content
    },{
      usePost: true
    });
  };

  createFeatureService().then(addCrowdsourceLayerToFeatureService,(err) => {
    _onError(err);
    deferred.reject(err);
  }).then(() => {
    if (settings.protectService) {
      protect();
    }
    deferred.resolve(response);
  },(err) => {
    _onError(err);
    deferred.reject(err);
  });

  return deferred;

};

Portal.prototype.saveWebmap = function (options) {
  const dfd = new Deferred();
  const mapState = lang.getObject('items.webmap',false,AppStore.getState());
  const defaults = mapState;
  const settings = $.extend(true, {}, defaults, options);

  const username = this.getPortalUser().username;
  const baseRequestPath = this.portalUrl.stripTrailingSlash() + '/content/users/' + (settings.item.owner ? settings.item.owner : username) + (settings.item.ownerFolder ? ('/' + settings.item.ownerFolder) : '');

  // Remove properties that don't have to be committed
  delete settings.item.avgRating;
	delete settings.item.modified;
	delete settings.item.numComments;
	delete settings.item.numRatings;
	delete settings.item.numViews;
	delete settings.item.size;

  const typeKeywords = settings.item.typeKeywords.concat(['Story Map','Story Maps','Crowdsource','StoryMap-Crowdsource-Webmap','Web Map']);

  // Transform arrays
  settings.item.tags = settings.item.tags ? settings.item.tags.join(',') : '';
  settings.item.typeKeywords = typeKeywords.join(',');

  $.extend(true, settings.item, {
    // Add Webmap JSON
    text: JSON.stringify(settings.data),
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
};

Portal.prototype.saveApp = function (options) {
  const dfd = new Deferred();
  const appState = lang.getObject('items.app',false,AppStore.getState());
  const defaults = appState;
  const settings = $.extend(true, {}, defaults, options);

  const username = this.getPortalUser().username;
  const baseRequestPath = this.portalUrl.stripTrailingSlash() + '/content/users/' + (settings.item.owner ? settings.item.owner : username) + (settings.item.ownerFolder ? ('/' + settings.item.ownerFolder) : '');

  // Remove properties that don't have to be committed
  delete settings.item.avgRating;
	delete settings.item.modified;
	delete settings.item.numComments;
	delete settings.item.numRatings;
	delete settings.item.numViews;
	delete settings.item.size;

  // TODO add serviceproxyparams

  const layoutTypeKeyword = lang.getObject('data.values.settings.layout.id',false,appState) === 'sidePanel' ? 'layout-sidePanel' : 'layout-stacked';
  const typeKeywords = settings.item.typeKeywords.concat(layoutTypeKeyword).concat(['Story Map','Story Maps','Crowdsource','StoryMapCrowdsource','JavaScript','Map','Mapping Site','Online Map','Ready To Use','selfConfigured','Web Map']);

  // Transform arrays
  settings.item.tags = settings.item.tags ? settings.item.tags.join(',') : '';
  settings.item.typeKeywords = typeKeywords.join(',');

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
};

Portal.prototype.registerApp = function (options) {
  const dfd = new Deferred();
  const appState = lang.getObject('items.app',false,AppStore.getState());
  const defaults = appState;
  const settings = $.extend(true, {}, defaults, options);
  let url = new URI(this.portalUrl.stripTrailingSlash() + '/oauth2/registerApp');

  url.protocol('https');

  const currentUrl = window.location.href.match('localhost') ? 'https://*.arcgis.com' : 'https://*.' + new URI(window.location.href).domain();
  const portalUrl = 'https://*.' + new URI(this.portalUrl).domain();
  const redirectUris = Helper.arrayUtils.unique([currentUrl,portalUrl,'https://*.arcgis.com','https://*.esri.com','https://localhost']);

  const content = {
    itemId: settings.item.id,
    appType: 'browser',
    redirect_uris: JSON.stringify(redirectUris), // eslint-disable-line camelcase
    f: 'json'
  };

  esriRequest({
    url: url.href(),
    handleAs: 'json',
    content
  },{
    usePost: true
  }).then((res) => {
    if (res.client_id) {
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

Portal.prototype.uploadAppItemAttachments = function (options) {
  const dfd = new Deferred();
  const appState = lang.getObject('items.app',false,AppStore.getState());
  const defaults = appState;
  const settings = $.extend(true, {}, defaults, options);

  const username = this.getPortalUser().username;
  const url = this.portalUrl.stripTrailingSlash() + '/content/users/' + (settings.item.owner ? settings.item.owner : username) + (settings.item.ownerFolder ? ('/' + settings.item.ownerFolder) : '') + '/items/' + settings.item.id + '/addResources';

  const formdata = new FormData();

  formdata.append('attachment', settings.attachment, settings.filename);
  formdata.append('f', 'json');

  esriRequest({
    url,
    handleAs: 'json',
    form: formdata
  },{
    usePost: true
  }).then((res) => {
    if (res.success) {
      const attachmentUrl = this.portalUrl.stripTrailingSlash()  + '/content/items/' + settings.item.id + '/resources/' + settings.filename;

      dfd.resolve(attachmentUrl);
    } else {
      _onError(res);
      dfd.reject();
    }
  },(err) => {
    _onError(err);
    dfd.reject();
  });

  return dfd;

};

Portal.prototype.removeAttachments = function (options) {
  const appState = lang.getObject('items.app',false,AppStore.getState());
  const defaults = appState;
  const settings = $.extend(true, {}, defaults, options);

  const username = this.getPortalUser().username;
  const removeUrl = this.portalUrl.stripTrailingSlash() + '/content/users/' + (settings.item.owner ? settings.item.owner : username) + (settings.item.ownerFolder ? ('/' + settings.item.ownerFolder) : '') + '/items/' + settings.item.id + '/removeResources';
  const queryUrl = this.portalUrl.stripTrailingSlash() + '/content/items/' + settings.item.id + '/resources';

  const removeExtraResouces = function(resources) {
    const keep = [].concat(settings.keep);
    const filter = [].concat(settings.filter);

    resources.forEach((current) => {
      const name = current.resource;

      if (keep.indexOf(name) < 0 && filter.filter((fC) => {
          return name.match(fC);
        }).length > 0) {

          const content = {
            resource: name,
            f: 'json'
          };

          esriRequest({
            url: removeUrl,
            handleAs: 'json',
            content
          },{
            usePost: true
          });
      }
    });
  };

  const query = function() {
    const content = {
      f: 'json'
    };

    esriRequest({
      url: queryUrl,
      handleAs: 'json',
      content
    },{
      usePost: true
    }).then((res) => {
      if (res.resources && res.resources.length > 0) {
        removeExtraResouces(res.resources);
      }
    });
  };

  query();
};

Portal.prototype.shareItems = function (options) {
  const dfd = new Deferred();
  const appState = AppStore.getState();
  const defaults = {
    appState,
    everyone: false,
    org: false
  };

  const settings = $.extend(true, {}, defaults, options);
  const username = this.getPortalUser().username;
  const url = this.portalUrl.stripTrailingSlash() + '/content/users/' + (lang.getObject('appState.items.app.item.owner',false,settings) ? lang.getObject('appState.items.app.item.owner',false,settings) : username) + '/shareItems';

  const appId = lang.getObject('appState.items.app.item.id',false,settings);
  const webmapId = lang.getObject('appState.items.webmap.item.id',false,settings);
  const layers = [].concat(lang.getObject('appState.items.webmap.data.operationalLayers',false,settings)).concat(lang.getObject('appState.items.webmap.data.baseMap.baseMapLayers',false,settings));
  let layerIds = [];

  layers.forEach((layer) => {
    if (layer && layer.itemId && typeof layer.itemId === 'string' && layer.itemId.length === 32) {
      layerIds.push(layer.itemId);
    }
  });

  const items = settings.items || [appId,webmapId].concat(layerIds);

   $.extend(true, {items}, settings);

   const content = {
     items: items.toString(),
     everyone: settings.everyone,
     org: settings.org,
     f: 'json'
   };

   esriRequest({
     url,
     handleAs: 'json',
     content
   },{
     usePost: true
   }).then((res) => {
     if (res.results) {
      //  TODO Error Handling
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

export default Portal;
