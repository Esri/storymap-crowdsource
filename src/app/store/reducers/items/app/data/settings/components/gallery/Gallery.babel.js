import $ from 'jquery';

const defaultGallery = {
  thumbnailField: 'PrimaryThumbnail',
  thumbnailIsAttachment: true
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
