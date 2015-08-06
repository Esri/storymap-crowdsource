var Confidence = require('confidence');

var internals = {};

exports.get = internals.App = function (key, criteria) {

  this.store = new Confidence.Store({
    meta: {
      title: {
        $filter: 'mode',
        development: 'DEV: title',
        $default: 'title'
      },
      keywords: 'comma,seperated,keywords',
      description: 'Add description here',
      url: 'http://storymaps.esri.com/stories/2015/story-name',
      thumbnail: 'http://storymaps.esri.com/stories/2015/story-name/resources/images/meta/thumbnail.jpg',
      twitterHandle: 'EsriStoryMaps'
    }
  });

  return this.store.get(key, criteria);
};