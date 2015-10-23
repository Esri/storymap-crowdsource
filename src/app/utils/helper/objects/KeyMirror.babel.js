let isArray;

if (typeof Array.isArray === 'undefined') {
	isArray = function (arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
} else {
	isArray = Array.isArray;
}

const transforms = {
	'none': function(key) {
		return key;
	},

	'camel-case': function(key) {
		let parts = key.toLowerCase().split('_');
		let part;

		for (let idx = 0, len = parts.length; idx < len; idx++) {
			part = parts[idx];
			part = part.substr(0, 1).toUpperCase() + part.substr(1);

			parts[idx] = part;
		}

		return parts.join('');
	},

	'lower-case': function(key) {
		return key.toLowerCase();
	},

	'dashed': function(key) {
		return key.replace(/_/g, '-');
	},

	'lower-dashed': function(key) {
		return this['lower-case'](this.dashed(key));
	}
};

const transformNames = [];

for (let transformName in transforms) {
	transformNames.push(transformName);
}

export const keyMirror = function keyMirror(obj, transformType) {
	const objIsArray = isArray(obj);

	if (obj === null || (typeof obj !== 'object' && objIsArray === false)) {
		throw 'The first argument to mirrorKey must be a object or an array.';
	}

	if (typeof transformType === 'undefined') {
		transformType = 'none';
	} else if (transformNames.indexOf(transformType) === -1) {
		throw 'Unknown value for transformType. Valid values: ' + transformNames.join(', ');
	}

	const result = {};

	if (objIsArray === false) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key) === false) {
				continue;
			}

			result[key] = transforms[transformType](key);
		}
	} else {
		for (let idx = 0, len = obj.length; idx < len; idx++) {
			result[obj[idx]] = transforms[transformType](obj[idx]);
		}
	}

	return result;
};

export default keyMirror;
