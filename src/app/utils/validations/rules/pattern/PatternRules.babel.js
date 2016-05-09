import $ from 'jquery';
import ViewerText from 'i18n!translations/viewer/nls/template';
import BasicRules from 'babel/utils/validations/rules/BasicRules';

const ValitdateText = ViewerText.validations.pattern;

const PatternRules = {
	commaSeparated: function commaSeparated(options) {
    const defaults = {
			regex: [/[;.\/\\:*|-\s]/g,/,{2,}/g],
			regexReplace: ',',
      errorMessage: ValitdateText.commaSeparated
    };
    const settings = $.extend(true,{},defaults,options);

		return BasicRules.regex(settings);
	}
};

export default PatternRules;
