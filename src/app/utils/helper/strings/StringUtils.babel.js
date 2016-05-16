import $ from 'jquery';

String.prototype.toCamelCase = function() {
  return this.replace(/\s(.)/g,($1) => {
    return $1.toUpperCase();
  }).replace(/\s/g,'').replace(/^(.)/,($1) => {
    return $1.toLowerCase();
  });
};

String.prototype.stripTrailingSlash = function() {
	if (this.substr(-1) === '/') {
		return this.substr(0, this.length - 1);
	}
	return this;
};

String.prototype.templateString = function (options) {
    const defaults = {
      templates: []
    };
    const settings = $.extend(true,{},defaults,options);
    const self = this;
    let newMessage = self;

    settings.templates.map((current) => {
      newMessage = newMessage.replace(current.string,current.replace);
    });

    newMessage = newMessage.replace(/\s+/g,' ').trim();

    return newMessage;
};
