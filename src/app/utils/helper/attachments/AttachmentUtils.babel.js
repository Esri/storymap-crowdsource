import $ from 'jquery';
import lang from 'dojo/_base/lang';
import URI from 'lib/urijs/src/URI';

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
  }

  return attachmentUrl.href();
};

export default {
  checkForCredential,
  dataURItoBlob
};
