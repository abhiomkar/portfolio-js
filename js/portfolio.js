/*
 * Author : Abhinay Omkar (abhiomkar @ gmail . com)
 * Title  : Portfolio Gallery Slides
 *
 * */

;(function($) {

    var defaults = {
        autoplay: false,
        firstLoadCount: 4,
        enableKeyboardNavigation: true,
        loop: true
    },
    widths = [],
    currentViewingImage,
    totalLoaded = 0,
    offset_left = 0
;

    // prototype
    Array.prototype.sum = function() {
        return this.reduce(function(a,b){return a+b;});
    }

    $.fn.portfolio = function(settings) {
        
        var portfolio = this;

        $.extend(this, {
            version: "0.1v",
            init: function() {

                var gallery = this;

                $(this).find(".photo").css("display", 'none');

                // show spinner while the images are being loaded...
                portfolio.spinner(this);

                portfolio.loadNextImages(4);
                
                // First Image
                currentViewingImage = $(this).find(".photo img").first();

                // Events

                /* Click */
                $(this).find(".photo").click(function(event) {

                    if (currentViewingImage[0] === $(this).find('img')[0]) {
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

                        portfolio.slideTo($(this).find('img'));
                    }
                }); // click()

                $(window).scroll(function() {
                    // $(gallery).find(".photo").removeClass('darken-photo');
                });



            }, // init
            
            next: function() {
                // If lastImage and loop:
                //  scrollTo(firstImage)
                // ElseIf lastLoadedImage:
                //  
                //  
                var lastImage = false, 
                    lastLoadedImage = false;

                if (!!!$(currentViewingImage).parent().next().find("img").length) {
                    lastImage = true;
                    console.log("lastImage");
                }

                if (!lastImage && !!!$(currentViewingImage).parent().next().find("img.loaded").length) {
                    lastLoadedImage = true;
                    console.log("lastLoadedImage");
                }

                if(false) {
                    $(currentViewingImage).parent().next().find("img")
                    portfolio.loadNextImages(4);
                    $(currentViewingImage).parent().next().find("img").load(function(){
                        // portfolio.next();
                    });
                }

                if(lastImage && this.loop) {
                    $(gallery).scrollTo(0, 500, {axis: 'x'});
                    currentViewingImage = $(gallery).find('.photo img').first();
                    // otherwise, don't change currentViewingImage
                }
                else {
                    $(gallery).scrollTo($(currentViewingImage).parent().next().find("img").data("offset-left"), 500, {axis: 'x'});
                    currentViewingImage = $(currentViewingImage).parent().next().find("img");
                }

                // console.log($(currentViewingImage));
                // console.log(gallery.offsetWidth + gallery.scrollLeft, gallery.scrollWidth);
                if (gallery.offsetWidth + gallery.scrollLeft >= gallery.scrollWidth) {
                    console.log('scrollEnd');
                    portfolio.loadNextImages(4);
                    $(currentViewingImage).parent().next().find("img").load(function(){
                        console.log('next image is loaded...');
                    });
                }
            },

            prev: function() {
                var firstImage = false;
                if (!!!$(currentViewingImage).parent().prev().find("img").length) {
                    firstImage = true;
                    console.log("firstImage");
                }

                if(firstImage && this.loop) {
                    currentViewingImage = $(gallery).find('.photo img').last();
                    scrollLeftTarget = $(currentViewingImage).data('offset-left');
                    $(gallery).scrollTo(scrollLeftTarget, 500, {axis: 'x'});
                }
                else {
                    $(gallery).scrollTo($(currentViewingImage).parent().prev().find("img").data("offset-left"), 500, {axis: 'x'});
                    currentViewingImage = $(currentViewingImage).parent().prev().find("img").length?$(currentViewingImage).parent().prev().find("img"):currentViewingImage;
                }

                console.log($(currentViewingImage));
            },

            slideTo: function(img) {
                scrollLeftTarget = $(img).data('offset-left');

                $(gallery).scrollTo(scrollLeftTarget, 500, {axis: 'x'});
                currentViewingImage = $(img);
                console.log($(currentViewingImage));
            },

            spinner: function(target) {
                //
                // Spinner
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

                var spinner = new Spinner(opts).spin(target[0]);
            },

            loadNextImages: function(count) {
                    console.log('loading...', totalLoaded, count, $(gallery).find(".photo img").slice(totalLoaded, totalLoaded + count));
                    $(gallery).find(".photo img").slice(totalLoaded, totalLoaded + count).each(function(index) {
                    // current img element
                    var img = this;
                    $(this).attr("src", $(this).attr("data-original"));
                    var img_width=0; 

                    setTimeout(function(img){
                        $(this).imagesLoaded(function(){
                            // console.log($(img));
                            // console.log($(img).width());
                            $(img).data('offset-left', offset_left);

                            $(img).parent().css({'left': offset_left+'px', opacity: '1'});
                            $(gallery).find('.spinner').hide().remove();
                            $(img).parent().fadeIn('slow');
                            // $(img).parent().css({display: 'inline-block', opacity: '1'});
                            // $(img).parent().animate({'left': offset_left+'px', opacity: '1'}, 1000);
                            // $(img).fadeIn('slow');

                            img_width = $(img).width();
                            console.log('img_width: ', img_width);


                            // $(img_width);
                            offset_left += img_width + 5;

                            totalLoaded += 1;
                            console.log('totalLoaded', totalLoaded)

                            $(img).data('width', img_width);
                            $(img).addClass('loaded');

                            console.log('loaded: ', img);

                        }); // load()
                    }, 10, img); // setTimeout()
                }); // each()
   
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
