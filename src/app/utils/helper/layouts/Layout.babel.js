import xhr from 'dojo/_base/xhr';
import Deferred from 'dojo/Deferred';

export const getStylesheetAsString = function getStylesheetAsString() {
  const dfd = new Deferred();

  xhr.get({
    url: require.toUrl('babel/components/crowdsource/styles/layouts/Scroll.css'),
    load: function(stylesheet) {
      console.log(stylesheet);
    },
    error: function(error) {
      console.log(error);
    }
  });

  return dfd;
};

export const getScrollbarWidth = function getScrollbarWidth() {
  // Create the measurement node
  const scrollDiv = document.createElement('div');

  scrollDiv.className = 'scrollbar-measure';
  document.body.appendChild(scrollDiv);

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

window.test = getStylesheetAsString;

export default {
  getStylesheetAsString,
  getScrollbarWidth
};
