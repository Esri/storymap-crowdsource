import Validator from 'lib/validatorjs/dist/validator';
import PortalStore from 'babel/stores/PortalStore';
import BuilderText from 'i18n!translations/builder/nls/template';

const validationText = BuilderText.validations.arcgis.portal;

Validator.registerAsync('arcgisIsServiceNameAvailable',(inputVal,ruleVal,attributeVal,passes) => {//eslint-disable-line no-unused-vars
  const portal = PortalStore.portalInstance;

  if (typeof inputVal === 'string' && inputVal.length > 0){
    portal.isNameAvailable({
      name: inputVal
    }).then((res) => {
      if (res.available) {
        passes();
      } else if (res.available === false) {
        passes(false,validationText.nameNotAvailableFS);
      } else {
        passes(false,validationText.unableToCheckName);
      }
    },() => {
      passes(false,validationText.unableToCheckName);
    });
  } else {
    passes(false,validationText.nameNotString);
  }
});
