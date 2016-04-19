import $ from 'jquery';
import ViewerText from 'i18n!translations/viewer/nls/template';
import BasicRules from 'babel/utils/validations/rules/BasicRules';

const ValitdateText = ViewerText.validations.pattern;

const PatternRules = {
	noSpace: function noSpace(options) {
    const defaults = {
			regex: /\s/g,
      errorMessage: ValitdateText.noSpace
    };
    const settings = $.extend(true,{},defaults,options);

		return BasicRules.regex(settings);
	}
};

export default PatternRules;
