(function($, window) {
    $.fn.mediaGallery = function(settings) {
        this.each(function() {
            var $target = $(this);
            if (!$target.data("mediaGallery")) {
                init($target);
            }
        });
        function init($mediaHolder) {
            var $body = $('body'),
                $thumbsHolder = $('.thumbs-holder'),
                $thumbs = $thumbsHolder.find('a'),
                i, el, $el;

            $thumbsHolder.on('click', 'a', function() {
                var $prevImg = $mediaHolder.find('img, iframe'),
                    $newImg,
                    vimeoId = parseVimeo(this.href),
                    youtubeId = parseYoutube(this.href);
                $prevImg.addClass('current-image');
                if (vimeoId) {
                    $newImg = $('<div class="video-wrap vimeo"><iframe src="http://player.vimeo.com/video/' + vimeoId + '?autoplay=1" width="780" height="380" frameborder="0"></iframe></div>');
                } else if (youtubeId) {
                    $newImg = $('<div class="video-wrap youtube"><iframe id="ytplayer" type="text/html" width="780" height="380" src="http://www.youtube.com/embed/' + youtubeId + '?autoplay=1" frameborder="0"/></div>');
                } else {
                    $newImg = $('<img class="new-image" src="' + this.href + '"/>"');
                }

                $mediaHolder.imagesLoaded(function() {
                    $prevImg.fadeOut(function() {
                        $prevImg.remove();
                        $newImg.removeClass('new-image');
                    });
                }).prepend($newImg);
                return false;
            });

            $thumbsHolder.jcarousel({
                scroll: 1,
                wrap: 'circular',
                initCallback: mycarouselInitCallback,
                buttonNextHTML: null,
                buttonPrevHTML: null
            }),

            $thumbs.each(function() {
                var $el = $(this);
                if (parseVimeo(this.href) || parseYoutube(this.href)) {
                    $el.append('<div class="video"><br></div>')
                    .data('video', true);
                } else {
                    $el.append('<div class="zoom"><br></div>');
                }
            });

            $thumbs.each(function(){
                var $this  = $(this);
                if (! $this.data('video')){
                    $body.append('<a href="'+this.href+'" rel="sub-gallery"></a>');
                }
            });

            $("a[rel='sub-gallery']").fancybox({
                padding: 19,
                onStart: function() {
                    $("#fancybox-outer").addClass('media-gallery');
                }
            });

              $mediaHolder.on('click', 'img', function(){
                $('a[rel="sub-gallery"][href="'+this.src+'"]').trigger('click');
                return false;
            });

            $mediaHolder.data("mediaGallery", true);
        }
    };

    function mycarouselInitCallback(carousel) {
        $(".controls .prev").on('click', function() {
            carousel.prev();
            return false;
        });

        $(".controls .next").on('click', function() {
            carousel.next();
            return false;
        });
    }


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