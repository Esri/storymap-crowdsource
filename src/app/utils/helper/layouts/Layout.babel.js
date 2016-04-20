import xhr from 'dojo/_base/xhr';
import Deferred from 'dojo/Deferred';

export const getStylesheetAsString = function getStylesheetAsString() {
  const dfd = new Deferred();

  xhr.get({
    url: require.toUrl('babel/components/crowdsource/styles/layouts/Scroll.css')
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

export default {
  getStylesheetAsString,
  getScrollbarWidth
};
