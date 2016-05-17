import builderOptions from 'mode!isBuilder?babel/builderOptions';

const defaultFields = builderOptions ? builderOptions.featureServiceDefaults.basic.fieldSettings : [];

export const fields = function (state = defaultFields, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_MAP_CROWDSOURCE_LAYER_FIELDS':
      return action.fields;
    default:
      return state;
  }
};

export default fields;
