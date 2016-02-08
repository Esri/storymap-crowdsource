import $ from 'jquery';

const defaultGallery = {
  itemAttributePath: 'attributes',
  idKey: 'FID',
  primaryKey: 'Name',
  secondaryKey: 'LocationName',
  thumbnailKey: 'ThumbnailUrl'
};

export const gallery = function (state = defaultGallery, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_GALLERY':
      return $.extend(true,{},state,action.gallery);
    default:
      return state;
  }
};

export default gallery;
