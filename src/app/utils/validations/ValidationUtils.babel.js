import $ from 'jquery';

const applySentenceCase = function applySentenceCase(str) {
  return str.replace(/.+?[\.\?\!](\s|$)/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const templateMessage = function templateMessage(message,options) {
  const defaults = {
    templates: [],
    attributeTemplate: '<% attribute %>'
  };
  const settings = $.extend(true,{},defaults,options);
  const attributeReplace = settings.attribute && typeof settings.attribute === 'string' ? settings.attribute : '';
  let newMessage;

  newMessage = message.replace(settings.attributeTemplate,attributeReplace);

  settings.templates.map((current) => {
    newMessage = newMessage.replace(current.string,current.replace);
  });

  newMessage = newMessage.replace(/\s+/g,' ').trim();

  return applySentenceCase(newMessage);
};

export default {
  templateMessage
};
