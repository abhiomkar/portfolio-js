/*
 *
 * jQuery Gallering Plugin
 *
 * Copyright (c) 2012 Abhinay Omkar (http://abhiomkar.in)
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * */

;(function($) {

    var defaults = {
        autoplay: false,
        firstLoadCount: 2,
        enableKeyboardNavigation: true,
        loop: false,
        easingMethod: 'easeOutQuint',
        height: '500px',
        lightbox: false
    },
    currentViewingImage,
    totalLoaded = 0,
    offset_left = 0
;

    // prototypes
    /* sum */
    Array.prototype.sum = function() {
        return this.reduce(function(a,b){return a+b;});
    }

    $.fn.portfolio = function(settings) {
        
        var portfolio = this, gallery = this;

        $.extend(this, {
            version: "0.1v",
            init: function() {

                // CSS Base
                $(this).css({
                    width: '100%',
                    height: portfolio.height,
                    overflow: 'scroll',
                    position: 'relative'
                });

                $(this).find('img').css({
                    position: 'absolute',
                    display: 'inline-block',
                    height: portfolio.height
                });

                $(this).find("img").css('display', 'none');
                // end

                // set all images element attribute loaded to false and hide, bcoz the
                // game is not yet started :)
                $(this).find("img").attr('loaded', 'false');
                // end

                // mark first & last images
                $(this).find("img").first().attr('first', 'true');
                $(this).find("img").last().attr('last', 'true');
                // end

                // set positions for each image
                $(this).find("img").each(function(index) {
                    $(this).data('position', index);
                });
                // end
                
                // spinner
                // show spinner while the images are being loaded...
                portfolio.spinner.show('100%');

                // load first 4 images
                portfolio.loadNextImages(portfolio.firstLoadCount);
                
                // First Image
                currentViewingImage = $(this).find("img").first();
                $(currentViewingImage).addClass('active');

                if (portfolio.lightbox) {
                    $(gallery).find('img').not('.active').animate({opacity: '0.2'});
                    $(gallery).find('img.active').animate({opacity: '1'});
                }

                // LionBar
                $(this).lionbars();

                // Events

                /* Swipe Left */
                $(this).swipe( {
                    swipeLeft: function() {
                                    portfolio.next();
                                },
                    swipeRight: function() {
                                    portfolio.prev();
                                }
                });

                $(this).find('img').on('movestart', function(e) {
                    console.log('movestart');
                    if ((e.distX > e.distY && e.distX < -e.distY) ||
                        (e.distX < e.distY && e.distX > -e.distY)) {
                        e.preventDefault();
                            portfolio.next();
                    }
                });

                /* Click */
                $(this).find("img").click(function(event) {

                    if (currentViewingImage[0] === $(this)[0]) {
                        // If clicked on the current viewing image
                        // then scroll to next image
                        // $(gallery).find(".photo").addClass('darken-photo');
                        // $(this).next().removeClass('darken-photo');

                        // $(gallery).scrollTo($(this).next().find('img').data('offset-left'), 500, {axis: 'x'} );
                        // currentViewingImage = $(this).next().find('img');
                        portfolio.next();

                    }
                    else {
                        // clicked on the next image or particular image, scroll to that image
                        // $(gallery).find(".photo").addClass('darken-photo');
                        // $(this).removeClass('darken-photo');

                        portfolio.slideTo($(this));
                    }
                }); // click()

                $(window).scroll(function() {
                    // $(gallery).find(".photo").removeClass('darken-photo');
                });



            }, // init

            next: function() {

                // console.log($(currentViewingImage).nextAll('img[loaded=false]').first().data('position'), $(currentViewingImage).data('position'));
                var distance = $(currentViewingImage).nextAll('img[loaded=false]').first().data('position') - $(currentViewingImage).data('position');

                console.log(distance);
                if(distance < 4) {
                    console.log('next: preload next 4 images');
                    portfolio.loadNextImages(4);
                }

                if($(currentViewingImage).attr('last') === 'true') {
                    // if on last image and if loop is on 
                    if(portfolio.loop) {
                        // go to first image 
                        console.log('last', 'loop: on');

                        $(gallery).scrollTo(0, 500, {axis: 'x', easing: portfolio.easingMethod});
                        currentViewingImage = $(gallery).find('img').first();

                        $(gallery).find('img').removeClass('active');
                        $(currentViewingImage).addClass('active');

                        if (portfolio.lightbox) {
                            $(gallery).find('img').not('.active').animate({opacity: '0.2'});
                            $(gallery).find('img.active').animate({opacity: '1'});
                        }
                    }
                    else {
                        console.log('last', 'loop: off');
                    }
                }

                // if next image is already loaded
                else if ($(currentViewingImage).next().attr('loaded') === 'true') {
                    // go to next image
                    $(gallery).scrollTo($(currentViewingImage).next().data("offset-left"), 800, {axis: 'x', easing: portfolio.easingMethod});
                    currentViewingImage = $(currentViewingImage).next();

                    $(gallery).find('img').removeClass('active');
                    $(currentViewingImage).addClass('active');

                    if (portfolio.lightbox) {
                        $(gallery).find('img').not('.active').animate({opacity: '0.2'});
                        $(gallery).find('img.active').animate({opacity: '1'});
                    }

                }
                // if next image is not yet loaded
                else if ($(currentViewingImage).next().attr('loaded') === 'false') {
                    // show the spinner and prepare to load next images
                    console.log('next images are being loaded...');
                }

                /*
                if (gallery.offsetWidth + gallery.scrollLeft >= gallery.scrollWidth) {
                    console.log('scrollEnd');
                    var spinner_target = $(currentViewingImage).after('<span class="spinner-container"></span>');
                    $(gallery).scrollTo($(currentViewingImage).data("offset-left") + 100, 500, {axis: 'x'});
                    portfolio.spinner(spinner_target);
                }
                */
                console.log('next: current viewing image', currentViewingImage);
            },

            prev: function() {
                if($(currentViewingImage).attr('first') === 'true') {
                    // If on first Image stay there, do not scroll
                }
                else {
                    // go to prev image
                    $(gallery).scrollTo($(currentViewingImage).prev().data("offset-left"), 500, {axis: 'x', easing: portfolio.easingMethod});
                    currentViewingImage = $(currentViewingImage).prev();

                    $(gallery).find('img').removeClass('active');
                    $(currentViewingImage).addClass('active');

                    if (portfolio.lightbox) {
                        $(gallery).find('img').not('.active').animate({opacity: '0.2'});
                        $(gallery).find('img.active').animate({opacity: '1'});
                    }
                }

                console.log('prev: current viewing image', currentViewingImage);
            },

            slideTo: function(img) {
                scrollLeftTarget = $(img).data('offset-left');

                $(gallery).scrollTo(scrollLeftTarget, 500, {axis: 'x', easing: portfolio.easingMethod});
                currentViewingImage = $(img);

                $(gallery).find('img').removeClass('active');
                $(currentViewingImage).addClass('active');

                if (portfolio.lightbox) {
                    $(gallery).find('img').not('.active').animate({opacity: '0.2'});
                    $(gallery).find('img.active').animate({opacity: '1'});
                }

                console.log($(currentViewingImage));
            },

            spinner: {
                remove: function() {
                    $(gallery).find('.spinner-container').remove();
                },

                show: function(width) {
                    // Spinner
                    portfolio.spinner.remove();

                    var lastImg = $(gallery).find('img[loaded=true]').last();
                    $(gallery).append('<span class="spinner-container"></span>');
                    $(gallery).find('.spinner-container').css({
                        display: 'inline-block',
                        position: 'absolute',
                        height: portfolio.height,
                        width: width,
                        left: $(lastImg).data('offset-left') + $(lastImg).data('width') + 5 + 'px'
                    });

                    var opts = {
                        lines: 17, // The number of lines to draw
                        length: 4, // The length of each line
                        width: 2, // The line thickness
                        radius: 5, // The radius of the inner circle
                        corners: 1, // Corner roundness (0..1)
                        rotate: 0, // The rotation offset
                        color: '#000', // #rgb or #rrggbb
                        speed: 1.5, // Rounds per second
                        trail: 72, // Afterglow percentage
                        shadow: false, // Whether to render a shadow
                        hwaccel: false, // Whether to use hardware acceleration
                        className: 'spinner', // The CSS class to assign to the spinner
                        zIndex: 2e9, // The z-index (defaults to 2000000000)
                        top: '250px', // Top position relative to parent in px
                        left: 'auto' // Left position relative to parent in px
                    };

                    var spinner = new Spinner(opts).spin($(gallery).find('.spinner-container')[0]);
                }
            },

            loadNextImages: function(count) {
                    // console.log('loading...', totalLoaded, count, $(gallery).find(".photo img").slice(totalLoaded, totalLoaded + count));
                    $(gallery).find("img").slice(totalLoaded, totalLoaded + count).each(function(index) {
                        // current img element
                        var cur_img = this;

                        cur_img.src = $(cur_img).data('src');
                        $(cur_img).attr('loaded', 'loading');
                    }); // each()

                     // .imagesLoaded callback on images having src attribute but not loaded yet
                     // on otherwords, filter only loading images
                     $(gallery).find('img[src][loaded=loading]').imagesLoaded(function($img_loaded){

                        console.log('images loaded:');
                        console.log($img_loaded);
                        $img_loaded.each(function(index) {
                            var img = this;
                            $(img).data('offset-left', offset_left);

                            // Inorder to fadeIn effect to work, make the new
                            // img element invisible by 'display: none'
                            $(img).css({'left': offset_left+'px', 'display': 'none'});
                            portfolio.spinner.remove();
                            $(img).fadeIn('slow');

                            img_width = $(img).width();
                            console.log('img_width: ', img_width);


                            offset_left += img_width + 5;

                            totalLoaded += 1;
                            // console.log('totalLoaded', totalLoaded)

                            $(img).data('width', img_width);
                            $(img).attr('loaded', 'true');

                        }); // each()

                        portfolio.spinner.show('100px');
                        // $(gallery).find('.spinner-container').css({'width': '100px', 'left': (offset_left+10)+'px'}).show();
                        if (totalLoaded === $(gallery).find('img').length) {
                            portfolio.spinner.remove();
                           // $(gallery).find('.spinner-container').css({'left': (offset_left+10)+'px'}).hide();
                        }
                    }); // imagesLoaded()
  
            } // loadNextImages
        }); // extend()

        $.extend(this, defaults, settings);

        if (this.enableKeyboardNavigation) {
                $(document).keydown(function(e) {
                        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                        switch(key) {
                                case 37: // left arrow
                                        portfolio.prev();
                                        e.preventDefault();
                                        break;
                                case 39: // right arrow
                                        portfolio.next();
                                        e.preventDefault();
                                        break;
                        }
                });
        }

        return this;
    }

})(jQuery);
