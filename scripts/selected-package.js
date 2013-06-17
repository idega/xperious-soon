;
(function($, window) {
    "use strict";
    $(function() {
        $('.media-holder').mediaGallery();

        $("a.day-element").fancybox({
            padding: 0,
            onStart: function() {
                $('#fancybox-close').text('Close');
                $("#fancybox-outer").addClass('day-lightbox');

                $(".js-show-tooltip").each(function() {
                    var config = {
                        content: {},
                        style: {
                            name: 'light',
                            width: 285,
                            padding: 15,
                            border: {
                                width: 2,
                                radius: 2,
                                color: '#000000'
                            },

                            tip: { // Now an object instead of a string
                                corner: 'topRight', // We declare our corner within the object using the corner sub-option
                                color: '#000000',
                                size: {
                                    x: 19, // Be careful that the x and y values refer to coordinates on screen, not height or width.
                                    y: 26 // Depending on which corner your tooltip is at, x and y could mean either height or width!
                                }
                            }
                        },
                        position: {
                            adjust: {
                                x: -302,
                                y: -16
                            }
                        }
                    },
                    $this = $(this);
                    if ($this.data('tooltipcontent')) {
                        config.content.text = $this.data('tooltipcontent');
                    }
                    if ($this.data('tooltiptitle')) {
                        config.content.title = $this.data('tooltiptitle');
                    }
                    $this.qtip(config);
                });
            },
            onComplete: function() {
                initSlider('#fancybox-content .popup-gallery-fader .next',
                    '#fancybox-content .popup-gallery-fader .prev',
                    '#fancybox-content .popup-gallery-fader', 1103, false);
                if (window.PIE) {
                    $('.popup-gallery-fader, .event-popup, .event-lightbox, .button-ticket').each(function() {
                        PIE.attach(this);
                    });
                }
            }
        });



    });
})(jQuery, window);