import $ from 'jquery';
import lang from 'dojo/_base/lang';
import Deferred from 'dojo/Deferred';
import AppStore from 'babel/store/AppStore';
import ValidationUtils from 'babel/utils/validations/ValidationUtils';
import BuilderText from 'i18n!translations/builder/nls/template';
import 'babel/utils/helper/strings/StringUtils';

const ValitdateText = BuilderText.validations.arcgis;

const PortalRules = {
  arcgisIsServiceName: function arcgisIsServiceName(options) {
    let res = {
			isValid: true,
			error: false
		};
    const defaults = {};
    const settings = $.extend(true,{},defaults,options);
		const msgOptions = {
			attribute: settings.attribute
		};
    const errorMessage = ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.portal.nameNotAvailableFS,msgOptions);

    const portal = lang.getObject('app.portal',false,AppStore.getState());

    const getValidLayerName = function getValidLayerName(value) {
      const dfd = new Deferred();
      let i = 0;

      const checkName = function checkName() {
        const append = '_' + i;
        const name = i === 0 ? value.slice(0,120) : value.slice(0,120 - append.length) + append;

        portal.isNameAvailable({
          name
        }).then((response) => {
          if (response.available) {
            dfd.resolve(name);
          } else if (response.available === false) {
            ++i;
            checkName();
          }
        },() => {
          dfd.reject();
        });
      };

      checkName();

      return dfd;
    };

    if (portal) {
      if (settings.value && typeof settings.value === 'string' && settings.value.length > 0 && !settings.value.match(/[^a-zA-Z0-9_]/gi) && !settings.value.match(/^[\d]/gi)){
        const dfd = new Deferred();

        portal.isNameAvailable({
          name: settings.value
        }).then((response) => {
          if (response.available) {
            dfd.resolve(res);
          } else if (response.available === false) {
            res.isValid = false;
            res.error = errorMessage;
            getValidLayerName(settings.value).then((response) => {
              res.fixValue = response;
              dfd.resolve(res);
            },() => {
              dfd.resolve(res);
            });
          } else {
            res.isValid = false;
            res.error = ValitdateText.portal.unableToCheckName;
            dfd.resolve(res);
          }
        },() => {
          res.isValid = false;
          res.error = ValitdateText.portal.unableToCheckName;
          dfd.resolve(res);
        });
        return dfd;
      } else if (settings.value && typeof settings.value === 'string' && settings.value.length > 0 && (settings.value.match(/[^a-zA-Z0-9_]/gi) || settings.value.match(/^[\d]/gi))) {
        const dfd = new Deferred();
        const correctFormat = settings.value.match(/^[\d]/gi) ? '_' + settings.value.toCamelCase().replace(/[^a-zA-Z0-9_]/gi,'').slice(0,120) : settings.value.toCamelCase().replace(/[^a-zA-Z0-9_]/gi,'').slice(0,120);

        res.isValid = false;
        res.error = ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.naming.arcgisServiceNameFormat,msgOptions);
        getValidLayerName(correctFormat).then((response) => {
          res.fixValue = response;
          dfd.resolve(res);
        },() => {
          dfd.resolve(res);
        });
        return dfd;
      } else if (settings.value && typeof settings.value !== 'string') {
        res.isValid = false;
        res.error = ValitdateText.nameNotString;
        return res;
      } else {
        return res;
      }
    } else {
      res.isValid = false;
      res.error = ValidationUtils.templateMessage(settings.errorMessage || ValitdateText.portal.unableToCheckName,msgOptions);
      return res;
    }
  }
};

export default PortalRules;
