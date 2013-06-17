;
(function($, window) {
	"use strict";
	$(function() {
        $('input[placeholder], textarea[placeholder]').placeholder();
		$('select.selectmenu').selectmenu({
			create: function() {
				if (window.PIE) {
					$('.ui-selectmenu, .ui-selectmenu-menu ul').each(function() {
						PIE.attach(this);
					});
				}
			}
		});

		$("a[rel='sidebar-gallery']").fancybox({
            padding: 19,
            onStart: function() {
				$("#fancybox-outer").addClass('media-gallery');
			}
        });

		$('.video-lightbox').videoLightbox();

	});
})(jQuery, window);