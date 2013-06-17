;
(function($, window) {
	$.fn.videoLightbox = function(settings) {
		this.each(function() {
			var $target = $(this);
			if (!$target.data("videoLightbox")) {
				init(this);
			}
		});

		function init(el) {
			var $el = $(el),
				youtubeId = parseYoutube(el.href),
				vimeoId = parseVimeo(el.href);
			if (youtubeId) {
				$el.addClass('video-lightbox');
			} else if (vimeoId) {
				$el.addClass('vimeo-video-lightbox');
				el.href = "http://player.vimeo.com/video/" + vimeoId +
					"?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=true;";
				$el.fancybox({
					type: 'iframe',
					fitToView: false,
					width: 800,
					height: 450,
					padding: 0,
					onStart: function() {
						$("#fancybox-outer").addClass('media-gallery');
					}
				});
			}

			$el.data('videoLightbox', true);
		}
	};

	$("html").on('click', ".video-lightbox", function() {
		$.fancybox({
			autoScale: false,
			transitionIn: 'none',
			transitionOut: 'none',
			title: this.title,
			href: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/') + '&amp;autoplay=1',
			type: 'swf',
			swf: {
				wmode: 'transparent',
				allowfullscreen: 'true'
			},
			padding: 0,
			onStart: function() {
				$("#fancybox-outer").addClass('media-gallery');
			}
		});
		return false;
	});

	function parseVimeo(url) {
		/*http://stackoverflow.com/questions/2916544/parsing-a-vimeo-id-using-javascript*/
		var regExp = /http(s)?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

		var match = url.match(regExp);

		if (match) {
			return match[3];
		}
		return false;
	}

	/*http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url*/

	function parseYoutube(url) {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		if (match && match[7].length == 11) {
			return match[7];
		}
		return false;
	}
})(jQuery, window);