import $ from 'jquery';
import lang from 'dojo/_base/lang';

const getVersionDateString = function() {
  const date = new Date();
  const day = date.getDate() < 9 ? (0 + '' + (date.getDate())) : (date.getDate());
  const month = date.getMonth() < 9 ? (0 + '' + (date.getMonth() + 1)) : (date.getMonth() + 1);
  const year = date.getYear() - 100;

  return day + '' + month + '' + year;
};

const updateTo0_2_0 = function updateTo0_2_0(currentItemInfo,isDev) { //eslint-disable-line camelcase
  const updatedItemInfo = $.extend(true,{},currentItemInfo);
  const newVersion = isDev ? 'dev0.2.0-' + getVersionDateString() : '0.2.0';

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

  // Update version
  lang.setObject('data.values.properties.version',newVersion,updatedItemInfo);
  lang.setObject('data.values.properties.versionUpdated',new Date().getTime(),updatedItemInfo);

  return updatedItemInfo;
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
    if (getVersionInfo(currentItemInfo).version === getVersionInfo('latest').version) {
      return currentItemInfo;
    }
    return updateToLatest(updateData(currentItemInfo));
  };

  return updateToLatest(itemInfo);
};

export default crowdsourceVersionUpdate;
