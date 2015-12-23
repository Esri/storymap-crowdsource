import _ from 'lib/lodash/lodash';

export const formatFeatureServiceName = function formatFeatureServiceName(name) {
  return _.snakeCase(name.replace(/[^\w\s]/gi, '')).slice(0,120);
};

export const formatItemName = function formatItemName(name) {
  return name.replace(/[<>]/gi, '').slice(0,120);
};

export default {
  formatFeatureServiceName,
  formatItemName
};
