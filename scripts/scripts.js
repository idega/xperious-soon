;
(function($, window) {
    $(function() {
        "use strict";

        var $window = $(window),
            $body = $('body'),
            $bottom = $('#bottom');
        /*Placeholder for old browsers*/
        $('input[placeholder], textarea[placeholder]').placeholder();

        $("a.chose-destination").fancybox({
            hideOnContentClick: true,
            padding: 0,
            onStart: function() {
                $('#fancybox-close').text('Close');
                $("#fancybox-outer").removeClass('event-lightbox');
            }
        });

        /* http://jqueryui.com/autocomplete/ */
        $("input.autocomplete-search-input").autocomplete({
            source: availableTags
        });

        if (!Modernizr.touch) {
            /* http://craigsworks.com/projects/qtip/ */
            $(".tooltip").each(function() {
                var config = {
                    content: {},
                    style: {
                        name: 'dark',
                        width: 285,
                        padding: 15,
                        border: {
                            width: 2,
                            radius: 2,
                            color: '#000000'
                        },

                        tip: { // Now an object instead of a string
                            corner: 'topLeft', // We declare our corner within the object using the corner sub-option
                            color: '#000000',
                            size: {
                                x: 20, // Be careful that the x and y values refer to coordinates on screen, not height or width.
                                y: 20 // Depending on which corner your tooltip is at, x and y could mean either height or width!
                            }
                        }
                    },
                    position: {
                        adjust: {
                            x: -350,
                            y: 0
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
        }

        $(".slider-container").imagesLoaded(centerSliderImages);

        /* Calculate Section Height */

        if (!Modernizr.touch) {
            $window.resize(function() {
                var windowHeight = $window.height(),
                    windowWidth = $window.width();
                $('.full-height-section .site-block').each(function() {
                    var $block = $(this);
                    if (! $block.data('originalheight')){
                        $block.data('originalheight', $block.height());
                    }
                    $block.height(Math.max(windowHeight, $block.data('originalheight')));
                });
                if (!$body.data('initialized')) {
                    $body.find('.index-page, .landing-page').css({
                        display: 'none',
                        visibility: 'visible'
                    }).fadeIn(200, onInit);
                }
                $('.grid').height(windowHeight - $(".site-header").height());

                $body.data('initialized', 'initialized');
            }).trigger('resize');
        } else {
            onInit();
        }

        function onInit() {
            var $selectMenu = $('select.selectmenu'),
                $selectMenuInPopup = $('select.selectmenu-in-popup');

            function initSelectMenus() {
                $selectMenu.each(function(){
                    var $selectM = $(this);
                    $selectM.selectmenu({
                        create: function() {
                            if (window.PIE) {
                                $('.ui-selectmenu, .ui-selectmenu-menu ul').each(function() {
                                    PIE.attach(this);
                                });
                            }
                        },
                        open: function(p) {
                            var $select = $(this),
                                $menu_button = $select.parent().find('a.ui-selectmenu'),
                                toTop = $menu_button.offset().top > $('.ui-selectmenu-menu').offset().top;

                            $menu_button.toggleClass('to-top', toTop);
                            $(".ui-selectmenu-menu-dropdown").toggleClass('to-top', toTop);
                            if (Modernizr.touch){
                                $(p.currentTarget).parent().siblings('select').show().focus().trigger('mousedown').on('change', function(){
                                    //$selectM.selectmenu('value', $this.val());
                                    initSelectMenus();
                                });
                                $('.ui-selectmenu').hide();
                            }
                        },
                        close: function(p) {
                            var $select = $(this),
                                $menu_button = $select.parent().find('a.ui-selectmenu');
                            $menu_button.removeClass('to-top');
                            $(".ui-selectmenu-menu-dropdown").removeClass('to-top');
                            if (Modernizr.touch){
                                $(p.currentTarget).parent().siblings('select').hide();
                                $('.ui-selectmenu').show();
                            }
                        }
                    });
                });

                $selectMenuInPopup.selectmenu({
                    create: function() {
                        if (window.PIE) {
                            $('.ui-selectmenu, .ui-selectmenu-menu ul').each(function() {
                                PIE.attach(this);
                            });
                        }
                    },
                    appendTo: 'form.convert-form'
                });
            }
            initSelectMenus();

            $window.resize(function() {
                $selectMenu.selectmenu('destroy');
                $selectMenuInPopup.selectmenu('destroy');
                initSelectMenus();
            });

            $(".convert-form .ui-widget").mouseout(function(e) {
                e.stopPropagation();
            });

            /*JS PIE. Fetures and usage: http://css3pie.com/documentation/supported-css3-features/*/
            if (window.PIE) {
                $('.button, .buttoned, input[type="text"], input[type="password"], textarea, .ui-selectmenu').each(function() {
                    PIE.attach(this);
                });
            }
        }

        /* Slide down */
        $('.site-bottom-menu').localScroll({
            duration: 300,
            easing: "swing"
        });


        /* Top slider */
        initSlider('.home-section .next', '.home-section .prev', '.slider-container');

        /*Events slider*/
        $("#events-slider").jcarousel({
            scroll: 1,
            wrap: 'circular'
        });

        /* First page bottom menus */
        var menuAnimationTime = 100;
        $(".site-bottom-menu li:has('.convert-form')").hoverIntent({
            over: function showHovered() {
                $(this).find('.convert-form').css({
                    opacity: 0.0,
                    visibility: 'visible',
                    display: 'block'
                }).animate({
                    opacity: 1.0
                }, menuAnimationTime);

                if (window.PIE) {
                    $(".convert-form .ui-selectmenu, .convert-form input[type='text']").each(function() {
                        PIE.attach(this);
                    });
                }
            },
            out: function hideHovered(p, a, r) {
                var $form = $(this).find('.convert-form');
                $form.css({
                    opacity: 1.0
                }).animate({
                    opacity: 0.0
                }, menuAnimationTime, function() {
                    $form.css({
                        visibility: 'hidden',
                        display: 'none'
                    });
                });
            }
        });

        $(".site-bottom-menu li:has('.submenu')").hoverIntent(function() {
            $(this).find('.submenu').css({
                opacity: 0.0,
                display: 'block',
                width: '2000px'
            }).animate({
                opacity: 1.0
            }, menuAnimationTime);
        }, function() {
            var $submenu = $(this).find('.submenu');
            $submenu.css({
                opacity: 1.0
            }).animate({
                opacity: 0.0
            }, menuAnimationTime, function() {
                $submenu.css({
                    display: 'none'
                });
            });
        });

        $('.event-link').on('click', function() {
            var $trigger = $(this);
            $.fancybox({
                //TODO: load content via AJAX, etc
                content: $('#event-popup').html(),
                padding: 0,
                overlayShow: false,
                onStart: function() {
                    $("#fancybox-outer").addClass('event-lightbox');
                    $('#fancybox-close').text('Close');
                },
                onComplete: function() {
                    initSlider('#fancybox-content .popup-gallery-fader .next',
                        '#fancybox-content .popup-gallery-fader .prev',
                        '#fancybox-content .popup-gallery-fader', 1103, false);
                    $(".event-popup p.info").shorten();
                    initHovers();
                    if (window.PIE) {
                        $('.popup-gallery-fader, .event-popup, .event-lightbox, .button-ticket').each(function() {
                            PIE.attach(this);
                        });
                    }
                }
            });
            return false;
        });

        $window.scroll(function(e) {
            $bottom.css({
                visibility: $window.scrollTop() >= 300 ? 'visible' : "hidden"
            });
        });

        function hoverCallback() {
            var $this = $(this);
            $this.toggleClass('hovered', 200, 'swing');
        }

        function initHovers() {
            $('input[type="submit"], a').hoverIntent({
                over: hoverCallback,
                out: hoverCallback,
                interval: 25
            });
        }
        initHovers();

        $(".trigger-input-animation").on('focus', function() {
            $('#plan-inputs-container').animate({
                width: 313
            }, 500);
        });

        $('.video-lightbox').videoLightbox();
    });
})(jQuery, window);

//TODO: add real autocomplete data source
var availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
];

/**
Original: http://viralpatel.net/blogs/demo/jquery/jquery.shorten.1.0.js

*/
jQuery.fn.shorten = function(settings) {
    var config = {
        showChars: 100,
        ellipsesText: "...",
        moreText: "More info",
        lessText: "less"
    };

    if (settings) {
        $.extend(config, settings);
    }

    $('body').on('click', '.morelink', function() {
        var $this = $(this);
        if ($this.hasClass('less')) {
            $this.removeClass('less');
            $this.html(config.moreText);
        } else {
            $this.addClass('less');
            $this.html('');
        }
        $this.parent().prev().slideDown();
        $this.prev().slideDown();
        return false;
    });

    return this.each(function() {
        var $this = $(this);

        var content = $this.html();
        if (content.length > config.showChars) {
            var c = content.substr(0, config.showChars);
            var h = content.substr(config.showChars, content.length - config.showChars);
            var html = c + '<span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="javascript://nop/" class="morelink show-more">' + config.moreText + '</a></span>';
            $this.html(html);
            $(".morecontent span").hide();
        }
    });
};