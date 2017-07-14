/**
 * HSCore -
 *
 * @author HtmlStream
 * @version 1.0
 */
;
(function ($) {

    'use strict';

    $.HSCore = {

        /**
         *
         *
         * @param
         *
         * @return
         */
        init: function () {

            $(document).ready(function (e) {
                // Botostrap Tootltips
                $('[data-toggle="tooltip"]').tooltip();

                // Set Background Image Dynamically
                if ($('[data-bg-img-src]').length) $.HSCore.helpers.bgImage($('[data-bg-img-src]'));

                // Extends jQuery
                $.HSCore.helpers.extendjQuery();

                // Bootstrap Navigation Options
                $.HSCore.helpers.bootstrapNavOptions.init();

            });

            $(window).on('load', function (e) {

            });

        },

        /**
         *
         *
         * @var
         */
        components: {},

        /**
         *
         *
         * @var
         */
        helpers: {

            Math: {

                /**
                 * Returns random value from [startPoint, endPoint] interval.
                 *
                 * @param Number startPoint
                 * @param Number endPoint
                 * @param Boolean fixed
                 *
                 * @return Number
                 */
                getRandomValueFromRange(startPoint, endPoint, fixed) {

                    fixed = fixed ? fixed : false;

                    Math.random();

                    return fixed ?

                        (Math.random() * (endPoint - startPoint) + startPoint) :
                        (Math.floor(Math.random() * (endPoint - startPoint + 1)) + startPoint);

                }

            },

            /**
             * Sets background-image dynamically.
             *
             * @param jQuery collection
             *
             * @return jQuery|undefined
             */
            bgImage: function (collection) {

                if (!collection || !collection.length) return;

                return collection.each(function (i, el) {

                    var $el = $(el),
                        bgImageSrc = $el.data('bg-img-src');

                    if (bgImageSrc) $el.css('background-image', 'url(' + bgImageSrc + ')');

                });

            },

            /**
             * Extends basic jQuery functionality
             *
             * @return undefined
             */
            extendjQuery: function () {

                $.fn.extend({

                    /**
                     * Runs specified function after loading of all images.
                     *
                     * @return Deferred
                     */
                    imagesLoaded: function () {

                        var $imgs = this.find('img[src!=""]');

                        if (!$imgs.length) {
                            return $.Deferred().resolve().promise();
                        }

                        var dfds = [];

                        $imgs.each(function () {
                            var dfd = $.Deferred();
                            dfds.push(dfd);
                            var img = new Image();
                            img.onload = function () {
                                dfd.resolve();
                            };
                            img.onerror = function () {
                                dfd.resolve();
                            };
                            img.src = this.src;
                        });

                        return $.when.apply($, dfds);

                    }

                });

            },

            /**
             * Bootstrap navigation options
             *
             */
            bootstrapNavOptions: {
                init: function () {
                    this.mobileHideOnScroll();
                },

                mobileHideOnScroll: function () {
                    var $collection = $('.navbar');
                    if (!$collection.length) return;

                    var $w = $(window),
                        breakpointsMap = {
                            'sm': 576,
                            'md': 768,
                            'lg': 992,
                            'xl': 1200
                        };

                    $('body').on('click.HSMobileHideOnScroll', '.navbar-toggler', function (e) {
                        var $navbar = $(this).closest('.navbar');

                        if ($navbar.length) {
                            $navbar.data('mobile-menu-scroll-position', $w.scrollTop());
                        }
                        e.preventDefault();
                    });

                    $w.on('scroll.HSMobileHideOnScroll', function (e) {
                        $collection.each(function (i, el) {
                            var $this = $(el), $toggler, $nav, offset, $hamburgers, breakpoint;
                            if ($this.hasClass('navbar-toggleable-xl')) breakpoint = breakpointsMap['xl'];
                            else if ($this.hasClass('navbar-toggleable-lg')) breakpoint = breakpointsMap['lg'];
                            else if ($this.hasClass('navbar-toggleable-md')) breakpoint = breakpointsMap['md'];
                            else if ($this.hasClass('navbar-toggleable-xs')) breakpoint = breakpointsMap['xs'];

                            if ($w.width() > breakpoint) return;

                            $toggler = $this.find('.navbar-toggler');
                            $nav = $this.find('.navbar-collapse');

                            if (!$nav.data('mobile-scroll-hide')) return;

                            if ($nav.length) {
                                offset = $this.data('mobile-menu-scroll-position');

                                if (Math.abs($w.scrollTop() - offset) > 40 && $nav.hasClass('show')) {
                                    $toggler.trigger('click');
                                    $hamburgers = $toggler.find('.is-active');
                                    if ($hamburgers.length) {
                                        $hamburgers.removeClass('is-active');
                                    }
                                }
                            }
                        });
                    });
                }
            }

        },

        /**
         *
         *
         * @var
         */
        settings: {
            rtl: false
        }

    };

    $.HSCore.init();

})(jQuery);