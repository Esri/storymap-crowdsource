import $ from 'jquery';
import URI from 'lib/urijs/src/URI';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Layout from 'babel/utils/helper/layout/Layout';
import ObjectUtils from 'babel/utils/helper/objects/ObjectUtils';
import MathUtils from 'babel/utils/helper/math/MathUtils';
import MapUtils from 'babel/utils/helper/map/MapUtils';
import ArrayUtils from 'babel/utils/helper/array/ArrayUtils';
import AttachmentUtils from 'babel/utils/helper/attachments/AttachmentUtils';
import Logger from 'babel/utils/logging/Logger';
import viewerText from 'i18n!translations/viewer/nls/template';
import 'babel/utils/helper/strings/StringUtils';

const _logger = new Logger({source: 'Helper'});

const _onError = function onError(error) {
  _logger.logMessage({
    type: 'error',
    error
  });
};

const classnames = function classnames() {
  let classes = '';
  const hasOwn = {}.hasOwnProperty;

	for (let i = 0; i < arguments.length; i++) {
		const arg = arguments[i];

    if (!arg) {
      continue;
    }

		const argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes += ' ' + arg;
		} else if ($.isArray(arg)) {
			classes += ' ' + classnames.apply(null, arg);
		} else if (argType === 'object') {
			for (const key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes += ' ' + key;
				}
			}
		}
	}

	return classes.substr(1);
};

const getSharingUrl = function getSharingUrl() {
  if (window.location.href.match('localhost')) {
    _onError(viewerText.errors.sharing.localhost);
    return 'http://www.example.com';
  } else {
    const url = new URI(window.location.href);

    url.filename('index.html');
    url.removeSearch(['edit','debug','fromscratch','fromScratch']);

    return url.href();
  }
};

const getRandomId = function getRandomId() {
  return Math.random().toString(36).substr(2, 9);
};

export const Icons = {
  getIcon
};

export default {
  classnames,
  getSharingUrl,
  getRandomId,
  icons: Icons,
  layout: Layout,
  objectUtils: ObjectUtils,
  mathUtils: MathUtils,
  mapUtils: MapUtils,
  arrayUtils: ArrayUtils,
  attachmentUtils: AttachmentUtils
};
