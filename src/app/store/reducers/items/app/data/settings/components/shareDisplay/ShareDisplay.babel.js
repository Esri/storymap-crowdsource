import $ from 'jquery';

const defaultDisplay = {
  media: {
    type: 'photo',
    field: 'PrimaryPhoto'
  },
  displayOrder: ['Description']
};

export const shareDisplay = function (state = defaultDisplay, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_SHARE_DISPLAY':
      return $.extend(true,{},state,action.shareDisplay);
    default:
      return state;
  }
};

export default shareDisplay;
