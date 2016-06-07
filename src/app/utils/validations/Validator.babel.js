import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import Logger from 'babel/utils/logging/Logger';
import BasicRules from 'babel/utils/validations/rules/BasicRules';
import PatternRules from 'babel/utils/validations/rules/pattern/PatternRules';
import ArcgisBasicRules from 'babel/utils/validations/rules/arcgis/ArcgisBasicRules';
import LocationRules from 'babel/utils/validations/rules/arcgis/LocationRules';
import ItemRules from 'mode!isBuilder?babel/utils/validations/rules/arcgis/ItemRules';
import PortalRules from 'mode!isBuilder?babel/utils/validations/rules/arcgis/PortalRules';

const _logger = new Logger({source: 'Validator'});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

const _rules = $.extend(true,{},
  BasicRules,
  PatternRules,
  ArcgisBasicRules,
  LocationRules,
  ItemRules,
  PortalRules
);

export class Validator {
  constructor(options) {

    const defaults = {
      validations: []
    };

    this.settings = $.extend(true,{},defaults,options);

    this._pendingValidation = false;
    this._validationResults = false;

    if (this.settings.validations) {
      this.setValidations(this.settings.validations);
    }
  }

  validate(value) {

    if (this._pendingValidation && this._pendingValidation.isFulfilled && !this._pendingValidation.isFulfilled()) {
      this._pendingValidation.resolve({
        newValidation: true,
        errors: [],
        isValid: true
      });
    }
    this._pendingValidation = new Deferred();
    this._validationResults = {};

    if (this.validations.length > 0) {
      for (let i = 0; i < this.validations.length; i++) {

        const rule = this.validations[i].rule;
        const validationOption = $.extend(true,{},this.validations[i],{
          attribute: this.settings.attribute,
          value
        });

        const res = _rules[rule](validationOption);

        if (res.then) {
          res.then(this.finishedValidation.bind(this,rule),_onError);
        } else {
          this.finishedValidation.call(this,rule,res);
        }

      }
    } else {
      this.checkStatus();
    }

    return this._pendingValidation;
  }

  finishedValidation(rule,res) {
    const isValid = res && res.isValid ? res.isValid : false;
    const error = res && res.error ? res.error : false;
    const fixValue = res && res.fixValue ? res.fixValue : false;
    const extras = res && res.extras ? res.extras : false;

    this._validationResults[rule] = {
      isValid,
      error,
      extras,
      fixValue
    };

    this.checkStatus();
  }

  checkStatus() {
    let count = 0;
    const res = {
      errors: [],
      extras: [],
      isValid: true
    };

    $.each(this._validationResults,(rule) => {
      ++count;
      const current = this._validationResults[rule];

      if (current.isValid === false) {
        res.isValid = false;
      }
      if (current.error) {
        res.errors.push({
          rule,
          message: current.error,
          fixValue: current.fixValue
        });
      }
      if (current.extras && $.isArray(current.extras)) {
        res.extras = res.extras.concat(current.extras);
      }
    });

    if (this.validations.length === count) {
      this._pendingValidation.resolve(res);
    }

  }

  setValidations(validations) {
    if ($.isArray(validations) && (!this._previousSetValidations || JSON.stringify(validations) !== this._previousSetValidations)) {
      this._previousSetValidations = JSON.stringify(validations);

      const newValidations = [];

      for (let i = 0; i < validations.length; i++) {
        const validation  = validations[i];

        if (typeof validation === 'string' && _rules[validation]) {
          newValidations.push({
            rule: validation
          });
        } else if (typeof validation === 'object' && validation.rule && typeof validation.rule === 'string' && _rules[validation.rule]) {
          newValidations.push(validation);
        } else if (typeof validation === 'string') {
          _onError('Validation \'' + validation + '\' is not available');
        } else if (typeof validation === 'object' && validation.rule && typeof validation.rule === 'string') {
          _onError('Validation \'' + validation.rule + '\' is not available');
        } else {
          _onError('Validation must be either a string or and object with the key \'rule\'');
        }
      }

      this.validations = newValidations;
    }
  }
}

export default Validator;
