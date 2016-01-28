import builderOptions from 'mode!isBuilder?babel/builderOptions';

// TODO move out so module only { featureServiceDefaults } from builderOptions
const defaultFields = builderOptions ? builderOptions.featureServiceDefaults.basic.fieldSettings : [];

export const fields = function (state = defaultFields, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_FIELDS':
      return action.fields;
    default:
      return state;
  }
};

export default fields;
