import $ from 'jquery';
import Deferred from 'dojo/Deferred';
import PortalStore from 'babel/stores/PortalStore';
import ValidationUtils from 'babel/utils/validations/ValidationUtils';
import BuilderText from 'i18n!translations/builder/nls/template';

const ValitdateText = BuilderText.validations.arcgis.portal;

const PortalRules = {
  arcgisIsServiceNameAvailable: function arcgisIsServiceNameAvailable(options) {
    let res = {
			isValid: true,
			error: false
		};
    const defaults = {
      errorMessage: ValitdateText.nameNotAvailableFS
    };
    const settings = $.extend(true,{},defaults,options);
		const msgOptions = {
			attribute: settings.attribute
		};
    const errorMessage = ValidationUtils.templateMessage(settings.errorMessage,msgOptions);

    const portal = PortalStore.portalInstance;

    const getValidLayerName = function getValidLayerName() {
      const dfd = new Deferred();
      let i = 1;

      const checkName = function checkName() {
        const append = '_' + i;
        const name = settings.value.slice(0,120 - append.length) + append;

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

    if (settings.value && typeof settings.value === 'string' && settings.value.length > 0 && !settings.value.match(/[^a-zA-Z0-9_]/gi)){
      const dfd = new Deferred();

      portal.isNameAvailable({
        name: settings.value
      }).then((response) => {
        if (response.available) {
          dfd.resolve(res);
        } else if (response.available === false) {
          res.isValid = false;
          res.error = errorMessage;
          getValidLayerName().then((response) => {
            res.fixValue = response;
            dfd.resolve(res);
          },() => {
            dfd.resolve(res);
          });
        } else {
          res.isValid = false;
          res.error = ValitdateText.unableToCheckName;
          dfd.resolve(res);
        }
      },() => {
        res.isValid = false;
        res.error = ValitdateText.unableToCheckName;
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
  }
};

export default PortalRules;
