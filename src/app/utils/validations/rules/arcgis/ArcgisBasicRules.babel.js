import $ from 'jquery';
import ViewerText from 'i18n!translations/viewer/nls/template';
import ValidationUtils from 'babel/utils/validations/ValidationUtils';
import 'babel/utils/helper/strings/StringUtils';

const ValitdateText = ViewerText.validations.arcgis.basic;

const ArcgisBasicRules = {
	arcgisSupportedHtml: function arcgisSupportedHtml(options) {
		let res = {
			isValid: true,
			error: false
		};
    const defaults = {
			regex: /[<>]/gi,
      errorMessage: ValitdateText.arcgisSupportedHtml
    };
    const settings = $.extend(true,{},defaults,options);
		const msgOptions = {
			attribute: settings.attribute
		};
    const errorMessage = ValidationUtils.templateMessage(settings.errorMessage,msgOptions);

    if (settings.value && typeof settings.value === 'string' && settings.value.length > 1 && settings.value !== settings.value.sanitizeHtml()) {
			res = {
				isValid: false,
				error: errorMessage,
				fixValue: settings.value.sanitizeHtml()
			};
    }

    return res;
	}
};

export default ArcgisBasicRules;
