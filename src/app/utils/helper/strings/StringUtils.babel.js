import $ from 'jquery';
import 'lib/xss/dist/xss';

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

String.prototype.sanitizeHtml = function(options) {
  const defaults = {
    // ArcGIS Online Whitelist https://doc.arcgis.com/en/arcgis-online/reference/supported-html.htm
    whiteList: {
      a: ['href', 'target', 'style'],
      img: ['src', 'width', 'height', 'border', 'alt', 'style'],
      video: ['autoplay', 'controls', 'height', 'loop', 'muted', 'poster', 'preload', 'src', 'width'],
      audio: ['autoplay', 'controls', 'loop', 'muted', 'preload', 'src'],
      span: ['style'],
      table: ['width', 'height', 'cellpadding', 'cellspacing', 'border', 'style'],
      div: ['style', 'class'],
      font: ['size', 'color', 'style'],
      tr: ['height', 'valign', 'align', 'style'],
      td: ['height', 'width', 'valign', 'align', 'colspan', 'rowspan', 'nowrap', 'style'],
      th: ['height', 'width', 'valign', 'align', 'colspan', 'rowspan', 'nowrap', 'style'],
      b: [],
      strong: [],
      i: [],
      em: [],
      br: [],
      p: [],
      li: [],
      ul: [],
      tbody: []
    },
    stripIgnoreTag: true
  };
  const settings = $.extend(true,{},defaults,options);

	return filterXSS(this,settings); //eslint-disable-line no-undef
};
