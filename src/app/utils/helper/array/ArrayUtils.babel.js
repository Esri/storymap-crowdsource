import $ from 'jquery';

export const unique = function unique(array) {
  const result = [];

  $.each(array, (i, item) => { //eslint-disable-line no-unused-vars
    if ($.inArray(item, result) === -1) {
      result.push(item);
    }
  });
  return result;
};

export default {
  unique
};
