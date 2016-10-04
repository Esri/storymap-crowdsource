import arcgisUtils from 'esri/arcgis/utils';

export const _configSharingUrl = function configSharingUrl(sharingurl) {

  if (sharingurl.match(/^http/)) {
    arcgisUtils.arcgisUrl = sharingurl;
  } else {
    arcgisUtils.arcgisUrl = location.protocol + sharingurl;
  }

};

export default {
  configSharingUrl: _configSharingUrl
};
