import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import Locator from 'esri/tasks/locator';
import ValidationUtils from 'babel/utils/validations/ValidationUtils';
import ViewerText from 'i18n!translations/viewer/nls/template';

const ValitdateText = ViewerText.validations.arcgis.location;

const ItemRules = {
	location: function location(options) {
		let res = {
			isValid: true,
			error: false
		};
    const defaults = {};
    const settings = $.extend(true,{},defaults,options);
		const msgOptions = {
			attribute: settings.attribute
		};

		if (settings.value && settings.value.inputVal && settings.value.dataVal) {
			if (settings.value.dataVal === 'no results') {
				res.isValid = false,
				res.error = ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.noResults,msgOptions);
			} else if (!settings.value.dataVal.name || !settings.value.dataVal.geometry) {
				res.isValid = false,
				res.error = ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.notValid,msgOptions);
			}
		}

		return res;
	},
	addressToLocation: function addressToLocation(options) {
		let res = {
			isValid: true,
			error: false
		};
    const defaults = {};
    const settings = $.extend(true,{},defaults,options);
		const msgOptions = {
			attribute: settings.attribute
		};

		const locator = new Locator('//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer');

		if (settings.value && typeof settings.value === 'string' && settings.value.length > 0) {
			const dfd = new Deferred();

			locator.addressToLocations({
				address: {
					singleLine: settings.value
				},
				maxLocations: 5,
				categories: ['Populated Place'],
				outFields: ['*']
			}, (response) => {
				const match = response[0];

				if (match) {
					res.extras = [{
						type: 'addressToLocation',
						match,
						response: response
					}];
					dfd.resolve(res);
				} else {
					res.isValid = false,
					res.error = ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.noResults,msgOptions);
					dfd.resolve(res);
				}
			});

			return dfd;
		} else {
			return res;
		}
	}
};

export default ItemRules;
