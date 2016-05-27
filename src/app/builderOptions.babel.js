import builderText from 'i18n!translations/builder/nls/template';

export const featureServiceDefaults = {
  basic: {
    fieldSettings: [{
      required: true,
      type: 'photo',
      fieldID: 'PhotoUrl',
      label: builderText.contribute.defaultForm.photo.label,
      placeholder: builderText.contribute.defaultForm.photo.placeholder,
      attributeName: builderText.contribute.defaultForm.photo.attribute,
      validations: ['required'],
      isAttachment: true,
      extras: {
        dataType: 'photo',
        photoSettings: [{
          name: 'PhotoUrl',
          smallestSide: 1000
        },{
          name: 'ThumbnailUrl',
          height: 200,
          width: 200
        }]
      }
    },{
      required: true,
      type: 'text',
      fieldID: 'Name',
      label: builderText.contribute.defaultForm.name.label,
      attributeName: builderText.contribute.defaultForm.name.attribute,
      placeholder: builderText.contribute.defaultForm.name.placeholder,
      validations: ['required']
    },{
      required: true,
      type: 'location',
      fieldID: 'LocationName',
      label: builderText.contribute.defaultForm.location.label,
      attributeName: builderText.contribute.defaultForm.location.attribute,
      placeholder: builderText.contribute.defaultForm.location.placeholder,
      validations: ['required'],
      extras: {
        dataType: 'location',
        storeGeometry: true
      }
    },{
      required: true,
      type: 'textarea',
      fieldID: 'Description',
      label: builderText.contribute.defaultForm.description.label,
      attributeName: builderText.contribute.defaultForm.description.attribute,
      placeholder: builderText.contribute.defaultForm.description.placeholder,
      validations: ['required']
    }]
  }
};

export default {
  featureServiceDefaults
};
