import $ from 'jquery';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Layout from 'babel/utils/helper/layout/Layout';
import ObjectUtils from 'babel/utils/helper/objects/ObjectUtils';
import MathUtils from 'babel/utils/helper/math/MathUtils';
import ArrayUtils from 'babel/utils/helper/array/ArrayUtils';

const _classnames = function classnames() {
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
			classes += ' ' + _classnames.apply(null, arg);
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

export const Icons = {
  getIcon: getIcon
};

export default {
  icons: Icons,
  classnames: _classnames,
  layout: Layout,
  objectUtils: ObjectUtils,
  mathUtils: MathUtils,
  arrayUtils: ArrayUtils
};
