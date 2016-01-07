String.prototype.toCamelCase = function() {
  return this.replace(/\s(.)/g,($1) => {
    return $1.toUpperCase();
  }).replace(/\s/g,'').replace(/^(.)/,($1) => {
    return $1.toLowerCase();
  });
};
