import $ from 'jquery';

export const resetRegionLayout = function resetRegionLayout(waitForImages) {
  if (waitForImages){
    $('.region-left:visible,.region-right:visible,.region-top:visible,.region-bottom:visible').find('img').load(resetRegionLayout);
  }
  $('.region-center').each(function() {
    const left = $(this).siblings('.region-left:visible').outerWidth();
    const right = $(this).siblings('.region-right:visible').outerWidth();
    const top = $(this).siblings('.region-top:visible').outerHeight();
    const bottom = $(this).siblings('.region-bottom:visible').outerHeight();
    const siblingWidth = left + right;
    const siblingHeight = top + bottom;

    $(this).css({
      top: top || 0,
      left: left || 0,
      height: $(this).parent().outerHeight() - siblingHeight,
      width: $(this).parent().outerWidth() - siblingWidth
    });
   });
};

export const enableRegionLayout = function enableRegionLayout() {
  resetRegionLayout();
  $(window).resize(resetRegionLayout);
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
  enableRegionLayout,
  resetRegionLayout,
  getScrollbarWidth
};
