import $ from 'jquery';
import lang from 'dojo/_base/lang';
import URI from 'lib/urijs/src/URI';
import 'babel/utils/helper/strings/StringUtils';

export const dataURItoBlob = function dataURItoBlob(dataURI) {
  let byteString;

  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }

  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length);

  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type: mimeString});
};

export const checkForCredential = function(options) {

  const defaults = {};
  const settings = $.extend(true,{},defaults,options);

  const attachmentUrl = new URI(settings.url);

  // Append token to URL for private photo attachments
  if (lang.getObject('layer.credential.token',false,settings) && lang.getObject('layer.credential.server',false,settings)) {
    const serverURI = new URI(lang.getObject('layer.credential.server',false,settings));
    const matchString = serverURI.host() + serverURI.path();
    const testPhotoString = attachmentUrl.host() + attachmentUrl.path();

    if (testPhotoString.match(matchString)) {
      attachmentUrl.setSearch('token', lang.getObject('layer.credential.token',false,settings));
    }
  } else if (lang.getObject('portal.user.credential.token',false,settings)) {
    const serverURI = new URI(lang.getObject('portal.portalUrl',false,settings));
    const testPhotoString = attachmentUrl.host() + attachmentUrl.path();
    const matchString = serverURI.host() + serverURI.path();

    if (testPhotoString.match(matchString)) {
      attachmentUrl.setSearch('token', lang.getObject('portal.user.credential.token',false,settings));
    }
  }

  return attachmentUrl.href();
};

export const getAttachmentUrlsByStringMatch = function(options) {
  const defaults = {
    attachmentKey: 'attachmentInfos'
  };
  const settings = $.extend(true,{},defaults,options);
  const urls = [];

  if (settings.layer && settings.feature && settings.match && settings.feature[settings.attachmentKey]) {
    const serviceUrl = settings.layer.url;
    const objectId = settings.feature.attributes[settings.layer.objectIdField];

    settings.feature[settings.attachmentKey].forEach((current) => {
      if (typeof settings.position === 'number' && current.name.search(settings.match) === settings.position) {
        urls.push(serviceUrl.stripTrailingSlash() + '/' + objectId + '/attachments/' + current.id);
      } else if (current.name.search(settings.match) >= 0) {
        urls.push(serviceUrl.stripTrailingSlash() + '/' + objectId + '/attachments/' + current.id);
      }
    });
  }

  return urls;
};

export default {
  checkForCredential,
  dataURItoBlob,
  getAttachmentUrlsByStringMatch
};
