import jQuery from 'jquery';

(function($) {
  // Check if element is scrollable
  $.fn.isScrollable = function() {
    return this.get(0).scrollHeight > this.height();
  };
})(jQuery);
