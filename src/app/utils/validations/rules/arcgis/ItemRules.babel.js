import $ from 'jquery';
import BuilderText from 'i18n!translations/builder/nls/template';
import BasicRules from 'babel/utils/validations/rules/BasicRules';
import 'babel/utils/helper/strings/StringUtils';

const ValitdateText = BuilderText.validations.arcgis;

const ItemRules = {
	arcgisItemName: function arcgisItemName(options) {
    const defaults = {
			regex: /[<>]/gi,
      errorMessage: ValitdateText.naming.arcgisItemName
    };
    const settings = $.extend(true,{},defaults,options);

		return BasicRules.regex(settings);
	},
	arcgisServiceNameFormat: function arcgisItemName(options) {
    const defaults = {
			regex: /[^a-zA-Z0-9_]/gi,
      errorMessage: ValitdateText.naming.arcgisServiceNameFormat,
			prefix: function(value) {
				return value.toCamelCase();
			}
    };
    const settings = $.extend(true,{},defaults,options);

		return BasicRules.regex(settings);
	}
};

export default ItemRules;
