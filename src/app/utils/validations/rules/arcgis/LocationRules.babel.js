import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import Locator from 'esri/tasks/locator';
import ValidationUtils from 'babel/utils/validations/ValidationUtils';
import ViewerText from 'i18n!translations/viewer/nls/template';

const ValitdateText = ViewerText.contribute.location;

const ItemRules = {
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

		const locator = new Locator('http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer');

		if (settings.value && typeof settings.value === 'string' && settings.value.length > 0) {
			const dfd = new Deferred();

			locator.addressToLocations({
				address: {
					singleLine: settings.value
				},
				maxLocations: 1,
				outFields: ['*']
			}, (response) => {
				const match = response[0];

				if (match) {
					res.extras = [{
						type: 'addressToLocation',
						match
					}];
					dfd.resolve(res);
				} else {
					res.isValid = false,
					res.error = ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.notFound,msgOptions);
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
