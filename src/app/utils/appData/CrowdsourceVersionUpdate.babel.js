import $ from 'jquery';
import lang from 'dojo/_base/lang';
import Deferred from 'dojo/Deferred';
import esriRequest from 'mode!isBuilder?esri/request';
import URI from 'mode!isBuilder?lib/urijs/src/URI';
import {crowdsourceStore} from 'babel/store/AppStore';
import ArcgisActions from 'babel/actions/ArcgisActions';

const getVersionDateString = function() {
  const date = new Date();
  const day = date.getDate() < 9 ? (0 + '' + (date.getDate())) : (date.getDate());
  const month = date.getMonth() < 9 ? (0 + '' + (date.getMonth() + 1)) : (date.getMonth() + 1);
  const year = date.getYear() - 100;

  return day + '' + month + '' + year;
};

const updateTo0_2_0 = function updateTo0_2_0(currentItemInfo,isDev) { //eslint-disable-line camelcase
  const dfd = new Deferred();
  const updatedItemInfo = $.extend(true,{},currentItemInfo);
  const newVersion = isDev ? 'dev0.2.0-' + getVersionDateString() : '0.2.0';
  const appState =  crowdsourceStore.getState();

  // Update typeKeywords
  const typeKeywords = lang.getObject('item.typeKeywords',false,currentItemInfo);
  const newTypeKeyworks = typeKeywords.concat(['Story Map','Story Maps','Crowdsource','StoryMapCrowdsource','layout-sidePanel','JavaScript','Map','Mapping Site','Online Map','Ready To Use','selfConfigured','Web Map']).reduce((prev,current) => {
    if (current === 'layout-stacked'){
      return prev;
    }
    return prev.concat(prev);
  },[]);

  lang.setObject('item.typeKeywords',newTypeKeyworks,updatedItemInfo);

  // Change field settings from array to object
  const fields = lang.getObject('data.values.settings.components.map.crowdsourceLayer.fields',false,currentItemInfo);

  if ($.isArray(fields)) {
    const newFields = {};

    fields.forEach((current) => {
      newFields[current.fieldID] = current;
    });
    lang.setObject('data.values.settings.components.map.crowdsourceLayer.fields',newFields,updatedItemInfo);
  }

  // Add minimum size property for photos
  if (lang.exists('data.values.settings.components.map.crowdsourceLayer.fields.PrimaryPhoto.extras',updatedItemInfo)) {
    lang.setObject('data.values.settings.components.map.crowdsourceLayer.fields.PrimaryPhoto.extras.minimumSize',1000,updatedItemInfo);
  }

  // Add source attribute
  lang.setObject('data.source','StoryMap_Crowdsource_Builder',updatedItemInfo);

  // Update version
  lang.setObject('data.values.properties.version',newVersion,updatedItemInfo);
  lang.setObject('data.values.properties.versionUpdated',new Date().getTime(),updatedItemInfo);

  // Update webmap layers to use https
  if (appState.mode.isBuilder) {
    const portal = lang.getObject('app.portal',false,appState);
    const webmap = lang.getObject('data.values.settings.components.map.webmap',false,currentItemInfo);
    const layerId = lang.getObject('data.values.settings.components.map.crowdsourceLayer.id',false,currentItemInfo);
    const token = lang.getObject('app.portal.user.credential.token',false,appState);
    const itemUrl = portal.portalUrl.stripTrailingSlash() + '/content/items/' + webmap;

    const updateWebmapItem = function (item,data) {
      let url;

      if (data && data.operationalLayers) {
        data.operationalLayers = data.operationalLayers.reduce((prev,current) => {
          if (current.id === layerId) {
            url = new URI(current.url).protocol('https').href();
            current.url = url;
          }
          return prev.concat(current);
        },[]);

        data.baseMap.baseMapLayers = data.baseMap.baseMapLayers.reduce((prev,current) => {
          if (current.url.search('http://services.arcgisonline.com') >= 0) {
            current.url = new URI(current.url).protocol('https').href();
          }
          return prev.concat(current);
        },[]);

        const webmapItem = {
          item,
          data
        };

        portal.saveWebmap(webmapItem).then(requestServiceDefinition.bind(null,url));
      }
    };

    const updateServiceDefinition = function (serviceurl,indexDefinitionUpdate) {
      const url = (serviceurl.stripTrailingSlash() + '/updateDefinition').replace('rest/services','rest/admin/services');

      const updateParameters = {
        indexes: indexDefinitionUpdate
      };

      const content = {
        token,
        updateDefinition: JSON.stringify(updateParameters),
        f: 'json'
      };

      esriRequest({
        url,
        handleAs: 'json',
        content
      },{
        usePost: true
      }).then((res) => {
        if (res.success) {
          dfd.resolve(updatedItemInfo);
        } else {
          dfd.reject(res);
        }
      },(err) => {
        dfd.reject(err);
      });
    };

    const requestServiceDefinition = function (url) {
      const content = {
        token,
        f: 'json'
      };

      esriRequest({
        url,
        handleAs: 'json',
        content
      }).then((res) => {
        if (res.indexes) {
          const indexDefinitionUpdate = res.indexes.reduce((prev,current) => {
            if (current.fields === 'Shape') {
              return prev.concat(current);
            }
            return prev;
          },[]);

          updateServiceDefinition(url,indexDefinitionUpdate);
        } else {
          dfd.reject(res);
        }
      },(err) => {
        dfd.reject(err);
      });
    };

    const content = {
      f: 'json',
      token
    };

    esriRequest({
      url: itemUrl,
      content,
      handleAs: 'json'
    }).then((item) => {
      if (item.access) {

        esriRequest({
          url: itemUrl + '/data',
          content,
          handleAs: 'json'
        }).then((data) => {
          updateWebmapItem(item,data);
        });
      }
    });
  } else {
    dfd.resolve(updatedItemInfo);
  }

  return dfd;
};

export const crowdsourceVersionUpdate = function crowdsourceVersionUpdate(itemInfo) {

  const getVersionInfo = function(currentItemInfo) {
    const versionString = lang.getObject('data.values.properties.version',false,currentItemInfo);

    if (currentItemInfo === 'latest') {
      const isDev = window.app.version.search('dev') === 0;
      const version = parseFloat(isDev ? (window.app.version.split('-')[0].split('dev')[1]) : window.app.version);

      return {
        version,
        isDev
      };
    } else if (versionString) {
      const isDev = versionString.search('dev') === 0;
      const version = parseFloat(isDev ? (versionString.split('-')[0].split('dev')[1]) : versionString);

      return {
        version,
        isDev
      };
    } else {
      return false;
    }
  };

  const updateData = function updateData(currentItemInfo) {
    const versionInfo = getVersionInfo(currentItemInfo);

    if (versionInfo) {
      switch (versionInfo.version) {
        case 0.1:
          return updateTo0_2_0(currentItemInfo,versionInfo.isDev);
      }
    }
  };

  const updateToLatest = function updateToLatest(currentItemInfo) {
    const dfd = new Deferred();

    if (getVersionInfo(currentItemInfo).version === getVersionInfo('latest').version) {
      dfd.resolve(currentItemInfo);
    } else {
      updateData(currentItemInfo).then((updatedItemInfo) => {
        updateToLatest(updatedItemInfo).then(dfd.resolve);
      });
    }

    return dfd;
  };

  updateToLatest(itemInfo).then(ArcgisActions.receiveAppItem);
};

export default crowdsourceVersionUpdate;
