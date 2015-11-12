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
  getScrollbarWidth
};
