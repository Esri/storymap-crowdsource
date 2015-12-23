import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import Logger from 'babel/utils/logging/Logger';
import Helper from 'babel/utils/helper/Helper';
import Validator from 'lib/validatorjs/dist/validator';
import ViewerText from 'i18n!translations/viewer/nls/template';
import BuilderText from 'mode!isBuilder?i18n!translations/builder/nls/template';
import 'babel/utils/validations/rules/Rules';

const messages = $.extend(true,{},ViewerText.validations.defaultMessages,BuilderText ? BuilderText.validations.defaultMessages : {});

Validator.setMessages('translated', messages);
Validator.useLang('translated');

const _logger = new Logger({
  source: 'Validations'
});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

export const validate = function validate(options) {
  const dfd = new Deferred;
  const defaults = {
    singleValue: true,
    value: null,
    validations: ''
  };
  const settings = $.extend(true,{},defaults,options);

  const validationFinished = function validationFinished(res) {
    if (res.isValid) {
      dfd.resolve(res);
    } else {
      dfd.reject(res);
    }
  };

  if (settings.singleValue) {
    const validator = new Validator({
      value: settings.value
    },{
      value: settings.validations
    });

    if (settings.attributeName) {
      validator.setAttributeNames({value: settings.attributeName});
    }

    if (validator.hasAsync) {
      validator.passes(() => {
        validationFinished({
          isValid: true
        });
      });
      validator.fails(() => {
        validationFinished({
          isValid: false,
          errors: Helper.arrayUtils.unique(validator.errors.get('value'))
        });
      });
    } else {
      const passed = validator.passes();

      validationFinished({
        isValid: passed,
        errors: passed ? undefined : Helper.arrayUtils.unique(validator.errors.get('value'))
      });
    }

  } else {
    _onError('only single values have been implemented');
  }

  return dfd;
};

export default {
  validate
};
