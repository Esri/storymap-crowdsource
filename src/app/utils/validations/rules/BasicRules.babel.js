import $ from 'jquery';
import ValidationUtils from 'babel/utils/validations/ValidationUtils';
import ViewerText from 'i18n!translations/viewer/nls/template';

const ValitdateText = ViewerText.validations.basic;

const BasicRules = {
	required: function required(options) {
		let res = {
			isValid: true,
			error: false
		};
    const defaults = {
      errorMessage: ValitdateText.required
    };
    const settings = $.extend(true,{},defaults,options);
		const msgOptions = {
			attribute: settings.attribute
		};
    const errorMessage = ValidationUtils.templateMessage(settings.errorMessage,msgOptions);

    if (settings.value) {
			// TODO check other types
      switch (typeof settings.value) {
        case 'string':
          if (settings.value.length === 0) {
            res = {
							isValid: false,
              error: errorMessage
            };
          }
          break;
      }
    } else {
			res = {
				isValid: false,
				error: errorMessage
			};
    }

    return res;
  },
	regex: function regex(options) {
		let res = {
			isValid: true,
			error: false
		};
    const defaults = {
      errorMessage: ValitdateText.regex
    };
    const settings = $.extend(true,{},defaults,options);
		const msgOptions = {
			attribute: settings.attribute
		};
    const errorMessage = ValidationUtils.templateMessage(settings.errorMessage,msgOptions);

    if (settings.regex && typeof settings.regex === 'object' && settings.value && settings.value.match(settings.regex)) {
			const value = settings.prefix ? settings.prefix(settings.value) : settings.value;

			res = {
				isValid: false,
				error: errorMessage
			};
			res.fixValue = value.replace(settings.regex,'');
    }

    return res;
	},
	max: function required(options) {
		let res = {
			isValid: true,
			error: false
		};
    const defaults = {
			attribute: false,
			max: Number.POSITIVE_INFINITY
		};
    const settings = $.extend(true,{},defaults,options);
		const msgOptions = {
			attribute: settings.attribute,
			templates: [{
				string: '<% max %>',
				replace: settings.max.toString()
			}]
		};

    if (settings.value) {
			// TODO check other types
      switch (typeof settings.type) {
				case 'number':
          if (Number(settings.value) > settings.max) {
            res = {
							isValid: false,
              error: ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.max.string,msgOptions),
							fixValue: settings.max
            };
          }
          break;
        default:
          if (settings.value.length > settings.max) {
            res = {
							isValid: false,
              error: ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.max.string,msgOptions),
							fixValue: settings.value.slice(0,settings.max)
            };
          }
          break;
      }
    }

    return res;
  },
	min: function required(options) {
		let res = {
			isValid: true,
			error: false
		};
    const defaults = {
			attribute: false,
			min: Number.NEGATIVE_INFINITY
		};
    const settings = $.extend(true,{},defaults,options);
		const msgOptions = {
			attribute: settings.attribute,
			templates: [{
				string: '<% min %>',
				replace: settings.min.toString()
			}]
		};

    if (settings.value) {
			// TODO check other types
      switch (typeof settings.type) {
				case 'number':
          if (Number(settings.value) < settings.min) {
            res = {
							isValid: false,
              error: ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.min.string,msgOptions),
							fixValue: settings.min
            };
          }
          break;
        default:
          if (settings.value.length < settings.min) {
            res = {
							isValid: false,
              error: ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.min.string,msgOptions)
            };
          }
          break;
      }
    }

    return res;
  }
};

export default BasicRules;
