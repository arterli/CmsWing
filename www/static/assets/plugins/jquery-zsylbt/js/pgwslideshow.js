/**
 * PgwSlideshow - Version 2.0
 *
 * Copyright 2014, Jonathan M. Piat
 * http://pgwjs.com - http://pagawa.com
 * 
 * Released under the GNU GPLv3 license - http://opensource.org/licenses/gpl-3.0
 */
;(function($){
    $.fn.pgwSlideshow = function(options) {

        var defaults = {
            mainClassName : 'pgwSlideshow',
            transitionEffect : 'sliding',
            displayList : true,
            displayControls : true,
            touchControls : true,
            autoSlide : false,
            beforeSlide : false,
            afterSlide : false,
            maxHeight : null,
            adaptiveDuration : 200,
            transitionDuration : 500,
            intervalDuration : 3000
        };

        if (this.length == 0) {
            return this;
        } else if(this.length > 1) {
            this.each(function() {
                $(this).pgwSlideshow(options);
            });
            return this;
        }

        var pgwSlideshow = this;
        pgwSlideshow.plugin = this;
        pgwSlideshow.config = {};
        pgwSlideshow.data = [];
        pgwSlideshow.currentSlide = 0;
        pgwSlideshow.slideCount = 0;
        pgwSlideshow.resizeEvent = null;
        pgwSlideshow.intervalEvent = null;
        pgwSlideshow.touchFirstPosition = null;
        pgwSlideshow.touchListLastPosition = false;
        pgwSlideshow.window = $(window);

        // Init
        var init = function() {

            // Merge uuu options with the default configuration
            pgwSlideshow.config = $.extend({}, defaults, options);

            // Setup
            setup();

            // Check list
            if (pgwSlideshow.config.displayList) {
                checkList();
            }

            // Resize trigger
            pgwSlideshow.window.resize(function() {
                clearTimeout(pgwSlideshow.resizeEvent);
                pgwSlideshow.resizeEvent = setTimeout(function() {
                    setSizeClass();

                    var maxHeight = pgwSlideshow.plugin.find('.ps-current > ul > li.elt_' + pgwSlideshow.currentSlide + ' img').height();
                    updateHeight(maxHeight);

                    if (pgwSlideshow.config.displayList) {
                        checkList();
                        checkSelectedItem();
                    }
                }, 100);
            });

            // Activate interval
            if (pgwSlideshow.config.autoSlide) {
                activateInterval();
            }

            return true;
        };

        // Update the current height
        var updateHeight = function(height, animate) {

            // Check maxHeight
            if (pgwSlideshow.config.maxHeight) {
                if (height + pgwSlideshow.plugin.find('.ps-list').height() > pgwSlideshow.config.maxHeight) {
                    height = pgwSlideshow.config.maxHeight - pgwSlideshow.plugin.find('.ps-list').height();
                }
            }

            if (typeof pgwSlideshow.plugin.find('.ps-current').animate == 'function') {
                pgwSlideshow.plugin.find('.ps-current').stop().animate({
                    height: height
                }, pgwSlideshow.config.adaptiveDuration, function() {
                    if (pgwSlideshow.config.maxHeight) {
                        pgwSlideshow.plugin.find('.ps-current > ul > li img').css('max-height', height + 'px');
                    }
                });
            } else {
                pgwSlideshow.plugin.find('.ps-current').css('height', height);
                
                if (pgwSlideshow.config.maxHeight) {
                    pgwSlideshow.plugin.find('.ps-current > ul > li img').css('max-height', height + 'px');
                }
            }

            return true;
        };

        // Set list width
        var setListWidth = function() {
            var listWidth = 0;
            
            // The plugin must be visible for a correct calculation
            pgwSlideshow.plugin.show();

            pgwSlideshow.plugin.find('.ps-list > ul > li').show().each(function() {
                listWidth += $(this).width();
            });

            pgwSlideshow.plugin.find('.ps-list > ul').width(listWidth);
            return true;
        }

        // Set size class
        var setSizeClass = function() {
            if (pgwSlideshow.plugin.width() <= 480) {
                pgwSlideshow.plugin.addClass('narrow').removeClass('wide');
            } else {
                pgwSlideshow.plugin.addClass('wide').removeClass('narrow');
            }

            return true;
        };

        // Setup
        var setup = function() {

            // Create container
            pgwSlideshow.plugin.removeClass('pgwSlideshow').removeClass(pgwSlideshow.config.mainClassName);
            pgwSlideshow.plugin.wrap('<div class="ps-list"></div>');
            pgwSlideshow.plugin = pgwSlideshow.plugin.parent();

            pgwSlideshow.plugin.wrap('<div class="' + pgwSlideshow.config.mainClassName + '"></div>');
            pgwSlideshow.plugin = pgwSlideshow.plugin.parent();

            pgwSlideshow.plugin.prepend('<div class="ps-current"><ul></ul><span class="ps-caption"></span></div>');
            pgwSlideshow.slideCount = pgwSlideshow.plugin.find('.ps-list > ul > li').length;

            if (pgwSlideshow.slideCount == 0) {
                throw new Error('pgwSlideshow - No slider item has been found');
                return false;
            }

            // Prev / Next icons
            if (pgwSlideshow.slideCount > 1) {

                // Slider controls
                if (pgwSlideshow.config.displayControls) {
                    pgwSlideshow.plugin.find('.ps-current').prepend('<span class="ps-prev"><span class="ps-prevIcon"></span></span>');
                    pgwSlideshow.plugin.find('.ps-current').append('<span class="ps-next"><span class="ps-nextIcon"></span></span>');
                    pgwSlideshow.plugin.find('.ps-current .ps-prev').click(function() {
                        pgwSlideshow.previousSlide();
                    });
                    pgwSlideshow.plugin.find('.ps-current .ps-next').click(function() {
                        pgwSlideshow.nextSlide();
                    });
                }

                // Touch controls for current image
                if (pgwSlideshow.config.touchControls) {

                    pgwSlideshow.plugin.find('.ps-current').on('touchstart', function(e) {
                        try {
                            if (e.originalEvent.touches[0].clientX && pgwSlideshow.touchFirstPosition == null) {
                                pgwSlideshow.touchFirstPosition = e.originalEvent.touches[0].clientX;
                            }
                        } catch(e) {
                            pgwSlideshow.touchFirstPosition = null;
                        }
                    });

                    pgwSlideshow.plugin.find('.ps-current').on('touchmove', function(e) {
                        try {
                            if (e.originalEvent.touches[0].clientX && pgwSlideshow.touchFirstPosition != null) {
                                if (e.originalEvent.touches[0].clientX > (pgwSlideshow.touchFirstPosition + 50)) {
                                    pgwSlideshow.touchFirstPosition = null;
                                    pgwSlideshow.previousSlide();
                                } else if (e.originalEvent.touches[0].clientX < (pgwSlideshow.touchFirstPosition - 50)) {
                                    pgwSlideshow.touchFirstPosition = null;
                                    pgwSlideshow.nextSlide();
                                }
                            }
                        } catch(e) {
                            pgwSlideshow.touchFirstPosition = null;
                        }
                    });

                    pgwSlideshow.plugin.find('.ps-current').on('touchend', function(e) {
                        pgwSlideshow.touchFirstPosition = null;
                    });
                }
            }

            // Get slideshow elements
            var elementId = 1;
            pgwSlideshow.plugin.find('.ps-list > ul > li').each(function() {
                var element = getElement($(this));
                element.id = elementId;
                pgwSlideshow.data.push(element);

                $(this).addClass('elt_' + element.id);
                $(this).wrapInner('<span class="ps-item' + (elementId == 1 ? ' ps-selected' : '') + '"></span>');
                
                // Set element in the current list
                var currentElement = $('<li class="elt_' + elementId + '"></li>');

                if (element.image) {
                    currentElement.html('<img src="' + element.image + '" alt="' + (element.title ? element.title : '') + '">');
                } else if (element.thumbnail) {
                    currentElement.html('<img src="' + element.thumbnail + '" alt="' + (element.title ? element.title : '') + '">');
                }

                if (element.link) {
                    currentElement.html('<a href="' + element.link + '"' + (element.linkTarget ? ' target="' + element.linkTarget + '"' : '') + '>' + currentElement.html() + '</a>');
                }

                pgwSlideshow.plugin.find('.ps-current > ul').append(currentElement);

                $(this).css('cursor', 'pointer').click(function(event) {
                    event.preventDefault();
                    displayElement(element.id);
                });

                elementId++;
            });

            // Set list elements
            if (pgwSlideshow.config.displayList) {
                setListWidth();

                pgwSlideshow.plugin.find('.ps-list').prepend('<span class="ps-prev"><span class="ps-prevIcon"></span></span>');
                pgwSlideshow.plugin.find('.ps-list').append('<span class="ps-next"><span class="ps-nextIcon"></span></span>');
                pgwSlideshow.plugin.find('.ps-list').show();
            } else {
                pgwSlideshow.plugin.find('.ps-list').hide();
            }

            // Attach slide events
            if (pgwSlideshow.config.autoSlide) {
                pgwSlideshow.plugin.on('mouseenter', function() {
                    clearInterval(pgwSlideshow.intervalEvent);
                    pgwSlideshow.intervalEvent = null;
                }).on('mouseleave', function() {
                    activateInterval();
                });
            }

            // Disable current elements
            pgwSlideshow.plugin.find('.ps-current > ul > li').hide();

            // Display the first element
            displayElement(1);

            // Set the first height
            pgwSlideshow.plugin.find('.ps-current > ul > li.elt_1 img').on('load', function() {
                setSizeClass();

                var maxHeight = pgwSlideshow.plugin.find('.ps-current > ul > li.elt_1 img').height();
                updateHeight(maxHeight);
            });

            // Enable slideshow
            setSizeClass();
            pgwSlideshow.plugin.show();

            return true;
        };

        // Get element
        var getElement = function(obj) {
            var element = {};

            // Get link
            var elementLink = obj.find('a').attr('href');
            if ((typeof elementLink != 'undefined') && (elementLink != '')) {
                element.link = elementLink;
                var elementLinkTarget = obj.find('a').attr('target');
                if ((typeof elementLinkTarget != 'undefined') && (elementLinkTarget != '')) {
                    element.linkTarget = elementLinkTarget;
                }
            }

            // Get image 
            var elementThumbnail = obj.find('img').attr('src');
            if ((typeof elementThumbnail != 'undefined') && (elementThumbnail != '')) {
                element.thumbnail = elementThumbnail;
            }

            var elementImage = obj.find('img').attr('data-large-src');
            if ((typeof elementImage != 'undefined') && (elementImage != '')) {
                element.image = elementImage;
            }

            // Get title 
            var elementTitle = obj.find('img').attr('alt');
            if ((typeof elementTitle != 'undefined') && (elementTitle != '')) {
                element.title = elementTitle;
            }
            
            // Get description
            var elementDescription = obj.find('img').attr('data-description');
            if ((typeof elementDescription != 'undefined') && (elementDescription != '')) {
                element.description = elementDescription;
            }

            return element;
        };

        // Finish element
        var finishElement = function(element) {

            // Element caption
            var elementText = '';
            if (element.title) {
                elementText += '<b>' + element.title + '</b>';
            }

            if (element.description) {
                if (elementText != '') elementText += '<br>';
                elementText += element.description;
            }

            if (elementText != '') {
                if (element.link) {
                    elementText = '<a href="' + element.link + '"' + (element.linkTarget ? ' target="' + element.linkTarget + '"' : '') + '>' + elementText + '</a>';
                }

                if (typeof pgwSlideshow.plugin.find('.ps-caption').fadeIn == 'function') {
                    pgwSlideshow.plugin.find('.ps-caption').html(elementText);
                    pgwSlideshow.plugin.find('.ps-caption').fadeIn(pgwSlideshow.config.transitionDuration / 2);
                } else {
                    pgwSlideshow.plugin.find('.ps-caption').html(elementText);
                    pgwSlideshow.plugin.find('.ps-caption').show();
                }
            }

            // Update list items
            pgwSlideshow.plugin.find('.ps-list > ul > li .ps-item').removeClass('ps-selected');
            pgwSlideshow.plugin.find('.ps-list > ul > li.elt_' + element.id + ' .ps-item').addClass('ps-selected');

            // Check selected item
            if (pgwSlideshow.config.displayList) {
                checkList();
                checkSelectedItem();
            }

            // Slideshow controls
            if (pgwSlideshow.config.displayControls) {
                if (typeof pgwSlideshow.plugin.find('.ps-current > .ps-prev').fadeIn == 'function') {
                    pgwSlideshow.plugin.find('.ps-current > .ps-prev, .ps-current > .ps-next').fadeIn(pgwSlideshow.config.transitionDuration / 2);
                } else {
                    pgwSlideshow.plugin.find('.ps-current > .ps-prev, .ps-current > .ps-next').show();
                }
            }

            // After slide
            if (typeof pgwSlideshow.config.afterSlide == 'function') {
                pgwSlideshow.config.afterSlide(element.id);
            }

            // Set the container height
            var maxHeight = pgwSlideshow.plugin.find('.ps-current .elt_' + element.id + ' img').height();
            updateHeight(maxHeight, true);

            return true;
        }

        // Fade an element
        var fadeElement = function(element) {
            var elementContainer = pgwSlideshow.plugin.find('.ps-current > ul');

            elementContainer.find('li').not('.elt_' + pgwSlideshow.currentSlide).not('.elt_' + element.id).each(function(){
                if (typeof $(this).stop == 'function') {
                    $(this).stop();
                }
                $(this).css('position', '').css('z-index', 1).hide();
            });

            // Current element
            if (pgwSlideshow.currentSlide > 0) {
                var currentElement = elementContainer.find('.elt_' + pgwSlideshow.currentSlide);

                if (typeof currentElement.animate != 'function') {
                    currentElement.animate = function(css, duration, callback) {
                        currentElement.css(css);
                        if (callback) {
                            callback();
                        }
                    };
                }

                if (typeof currentElement.stop == 'function') {
                    currentElement.stop();
                }

                currentElement.css('position', 'absolute').animate({
                    opacity : 0,
                }, pgwSlideshow.config.transitionDuration, function() {
                    currentElement.css('position', '').css('z-index', 1).hide();
                });
            }

            // Update current id
            pgwSlideshow.currentSlide = element.id;

            // Next element
            var nextElement = elementContainer.find('.elt_' + element.id);

            if (typeof nextElement.animate != 'function') {
                nextElement.animate = function(css, duration, callback) {
                    nextElement.css(css);
                    if (callback) {
                        callback();
                    }
                };
            }

            if (typeof nextElement.stop == 'function') {
                nextElement.stop();
            }

            nextElement.css('position', 'absolute').show().animate({
                opacity : 1,
            }, pgwSlideshow.config.transitionDuration, function() {
                nextElement.css('position', '').css('z-index', 2).css('display', 'block');
                finishElement(element);
            });

            return true;
        }

        // Slide an element
        var slideElement = function(element, direction) {
            var elementContainer = pgwSlideshow.plugin.find('.ps-current > ul');

            if (typeof direction == 'undefined') {
                direction = 'left';
            }

            if (pgwSlideshow.currentSlide == 0) {
                elementContainer.find('.elt_1').css({
                    position : '',
                    left : '',
                    opacity : 1,
                    'z-index' : 2
                }).show();
                pgwSlideshow.plugin.find('.ps-list > li.elt_1').css('opacity', '1');
                finishElement(element);

            } else {

                if (pgwSlideshow.transitionInProgress) {
                    return false;
                }

                pgwSlideshow.transitionInProgress = true;

                // Get direction details
                var elementWidth = elementContainer.width();

                if (direction == 'left') {
                    var elementDest = -elementWidth;
                    var nextOrigin = elementWidth;
                } else {
                    var elementDest = elementWidth;
                    var nextOrigin = -elementWidth;
                }

                var currentElement = elementContainer.find('.elt_' + pgwSlideshow.currentSlide);

                if (typeof currentElement.animate != 'function') {
                    currentElement.animate = function(css, duration, callback) {
                        currentElement.css(css);
                        if (callback) {
                            callback();
                        }
                    };
                }

                currentElement.css('position', 'absolute').animate({
                    left : elementDest,
                }, pgwSlideshow.config.transitionDuration, function() {
                    currentElement.css('position', '').css('z-index', 1).css('left', '').css('opacity', 0).hide();
                });

                // Next element
                var nextElement = elementContainer.find('.elt_' + element.id);

                if (typeof nextElement.animate != 'function') {
                    nextElement.animate = function(css, duration, callback) {
                        nextElement.css(css);
                        if (callback) {
                            callback();
                        }
                    };
                }

                nextElement.css('position', 'absolute').css('left', nextOrigin).css('opacity', 1).show().animate({
                    left : 0,
                }, pgwSlideshow.config.transitionDuration, function() {
                    nextElement.css('position', '').css('left', '').css('z-index', 2).show();
                    pgwSlideshow.transitionInProgress = false;
                    finishElement(element);
                });
            }

            // Update current id
            pgwSlideshow.currentSlide = element.id;

            return true;
        }

        // Display current element
        var displayElement = function(elementId, apiController, direction) {

            if (elementId == pgwSlideshow.currentSlide) {
                return false;
            }

            var element = pgwSlideshow.data[elementId - 1];

            if (typeof element == 'undefined') {
                throw new Error('pgwSlideshow - The element ' + elementId + ' is undefined');
                return false;
            }

            if (typeof direction == 'undefined') {
                direction = 'left';
            }

            // Before slide
            if (typeof pgwSlideshow.config.beforeSlide == 'function') {
                pgwSlideshow.config.beforeSlide(elementId);
            }

            if (typeof pgwSlideshow.plugin.find('.ps-caption').fadeOut == 'function') {
                pgwSlideshow.plugin.find('.ps-caption, .ps-prev, .ps-next').fadeOut(pgwSlideshow.config.transitionDuration / 2);
            } else {
                pgwSlideshow.plugin.find('.ps-caption, .ps-prev, .ps-next').hide();
            }

            // Choose the transition effect
            if (pgwSlideshow.config.transitionEffect == 'sliding') {
                slideElement(element, direction);
            } else {
                fadeElement(element);
            }

            // Reset interval to avoid a half interval after an API control
            if (typeof apiController != 'undefined' && pgwSlideshow.config.autoSlide) {
                activateInterval();
            }

            return true;
        };

        // Activate interval
        var activateInterval = function() {
            clearInterval(pgwSlideshow.intervalEvent);

            if (pgwSlideshow.slideCount > 1 && pgwSlideshow.config.autoSlide) {
                pgwSlideshow.intervalEvent = setInterval(function() {
                    if (pgwSlideshow.currentSlide + 1 <= pgwSlideshow.slideCount) {
                        var nextItem = pgwSlideshow.currentSlide + 1;
                    } else {
                        var nextItem = 1;
                    }
                    displayElement(nextItem);
                }, pgwSlideshow.config.intervalDuration);
            }

            return true;
        };

        // Check slide list
        var checkList = function() {
            if (! pgwSlideshow.config.displayList) return false;

            // Refresh list width
            setListWidth();

            var containerObject = pgwSlideshow.plugin.find('.ps-list');
            var containerWidth = containerObject.width();
            var listObject = pgwSlideshow.plugin.find('.ps-list > ul');
            var listWidth = listObject.width();

            if (listWidth > containerWidth) {
                listObject.css('margin', '0 45px');

                var marginLeft = parseInt(listObject.css('margin-left'));
                var marginRight = parseInt(listObject.css('margin-right'));
                containerWidth -= (marginLeft + marginRight);

                // Left button
                containerObject.find('.ps-prev').show().unbind('click').click(function() {
                    var oldPosition = parseInt(listObject.css('left'));
                    var newPosition = oldPosition + containerWidth;

                    if (oldPosition == 0) {
                        newPosition = -(listWidth - containerWidth);
                    } else if (newPosition > 0) {
                        newPosition = 0;
                    }

                    if (typeof listObject.animate == 'function') {
                        listObject.animate({
                            left: newPosition
                        }, pgwSlideshow.config.transitionDuration);
                    } else {
                        listObject.css('left', newPosition);
                    }
                });

                // Right button
                containerObject.find('.ps-next').show().unbind('click').click(function() {
                    var oldPosition = parseInt(listObject.css('left'));
                    var newPosition = oldPosition - containerWidth;
                    var maxPosition = -(listWidth - containerWidth);

                    if (oldPosition == maxPosition) {
                        newPosition = 0;
                    } else if (newPosition < maxPosition) {
                        newPosition = maxPosition;
                    }

                    if (typeof listObject.animate == 'function') {
                        listObject.animate({
                            left: newPosition
                        }, pgwSlideshow.config.transitionDuration);
                    } else {
                        listObject.css('left', newPosition);
                    }
                });

                // Touch controls for the list
                if (pgwSlideshow.config.touchControls) {

                    pgwSlideshow.plugin.find('.ps-list > ul').on('touchmove', function(e) {
                        try {
                            if (e.originalEvent.touches[0].clientX) {
                                var lastPosition = (pgwSlideshow.touchListLastPosition == false ? 0 : pgwSlideshow.touchListLastPosition);
                                nbPixels = (pgwSlideshow.touchListLastPosition == false ? 1 : Math.abs(lastPosition - e.originalEvent.touches[0].clientX));
                                pgwSlideshow.touchListLastPosition = e.originalEvent.touches[0].clientX;

                                var touchDirection = '';
                                if (lastPosition > e.originalEvent.touches[0].clientX) {
                                    touchDirection = 'left';
                                } else if (lastPosition < e.originalEvent.touches[0].clientX) {
                                    touchDirection = 'right';
                                }
                            }

                            var oldPosition = parseInt(listObject.css('left'));

                            if (touchDirection == 'left') {
                                var containerWidth = containerObject.width();
                                var listWidth = listObject.width();

                                var marginLeft = parseInt(listObject.css('margin-left'));
                                var marginRight = parseInt(listObject.css('margin-right'));
                                containerWidth -= (marginLeft + marginRight);

                                var maxPosition = -(listWidth - containerWidth);
                                var newPosition = oldPosition - nbPixels;

                                if (newPosition > maxPosition) {
                                    listObject.css('left', newPosition);
                                }

                            } else if (touchDirection == 'right') {
                                var newPosition = oldPosition + nbPixels;

                                if (newPosition < 0) {
                                    listObject.css('left', newPosition);
                                } else {
                                    listObject.css('left', 0);
                                }
                            }

                        } catch(e) {
                            pgwSlideshow.touchListLastPosition = false;
                        }
                    });

                    pgwSlideshow.plugin.find('.ps-list > ul').on('touchend', function(e) {
                        pgwSlideshow.touchListLastPosition = false;
                    });
                }

            } else {
                var marginLeft = parseInt((containerWidth - listWidth) / 2);
                listObject.css('left', 0).css('margin-left', marginLeft);
                containerObject.find('.ps-prev').hide();
                containerObject.find('.ps-next').hide();
                pgwSlideshow.plugin.find('.ps-list > ul').unbind('touchstart touchmove touchend');
            }

            return true;
        };

        // Check the visibility of the selected item
        var checkSelectedItem = function() {
            var containerWidth = pgwSlideshow.plugin.find('.ps-list').width();
            var listObject = pgwSlideshow.plugin.find('.ps-list > ul');
            var listWidth = listObject.width();  

            var marginLeft = parseInt(listObject.css('margin-left'));
            var marginRight = parseInt(listObject.css('margin-right'));
            containerWidth -= (marginLeft + marginRight);

            var visibleZoneStart = Math.abs(parseInt(listObject.css('left')));
            var visibleZoneEnd = visibleZoneStart + containerWidth;
            var elementZoneStart = pgwSlideshow.plugin.find('.ps-list .ps-selected').position().left;
            var elementZoneEnd = elementZoneStart + pgwSlideshow.plugin.find('.ps-list .ps-selected').width();

            if ((elementZoneStart < visibleZoneStart) || (elementZoneEnd > visibleZoneEnd) || (listWidth > containerWidth && visibleZoneEnd > elementZoneEnd)) {
                var maxPosition = -(listWidth - containerWidth);

                if (-elementZoneStart < maxPosition) {
                    listObject.css('left', maxPosition);
                } else {
                    listObject.css('left', -elementZoneStart);
                }
            }

            return true;
        };

        // Start auto slide
        pgwSlideshow.startSlide = function() {
            pgwSlideshow.config.autoSlide = true;
            activateInterval();
            return true;
        };

        // Stop auto slide
        pgwSlideshow.stopSlide = function() {
            pgwSlideshow.config.autoSlide = false;
            clearInterval(pgwSlideshow.intervalEvent);
            return true;
        };

        // Get current slide
        pgwSlideshow.getCurrentSlide = function() {
            return pgwSlideshow.currentSlide;
        };

        // Get slide count
        pgwSlideshow.getSlideCount = function() {
            return pgwSlideshow.slideCount;
        };

        // Display slide
        pgwSlideshow.displaySlide = function(itemId) {
            displayElement(itemId, true);
            return true;
        };

        // Next slide
        pgwSlideshow.nextSlide = function() {
            if (pgwSlideshow.currentSlide + 1 <= pgwSlideshow.slideCount) {
                var nextItem = pgwSlideshow.currentSlide + 1;
            } else {
                var nextItem = 1;
            }
            displayElement(nextItem, true, 'left');
            return true;
        };

        // Previous slide
        pgwSlideshow.previousSlide = function() {
            if (pgwSlideshow.currentSlide - 1 >= 1) {
                var previousItem = pgwSlideshow.currentSlide - 1;
            } else {
                var previousItem = pgwSlideshow.slideCount;
            }
            displayElement(previousItem, true, 'right');
            return true;
        };

        // Destroy slider
        pgwSlideshow.destroy = function(soft) {
            clearInterval(pgwSlideshow.intervalEvent);

            if (typeof soft != 'undefined') {
                pgwSlideshow.plugin.find('.ps-list > ul > li').each(function() {
                    $(this).attr('style', null).removeClass().unbind('click');
                    $(this).html($(this).find('span').html());
                });

                pgwSlideshow.plugin.find('.ps-current').remove();
                pgwSlideshow.plugin.find('.ps-list').find('.ps-prev, .ps-next').remove();
                pgwSlideshow.plugin.find('.ps-list > ul').addClass(pgwSlideshow.config.mainClassName).attr('style', '');
                pgwSlideshow.plugin.find('.ps-list > ul').unwrap().unwrap();
                pgwSlideshow.hide();

            } else {
                pgwSlideshow.parent().parent().remove();
            }

            pgwSlideshow.plugin = null;
            pgwSlideshow.data = [];
            pgwSlideshow.config = {};
            pgwSlideshow.currentSlide = 0;
            pgwSlideshow.slideCount = 0;
            pgwSlideshow.resizeEvent = null;
            pgwSlideshow.intervalEvent = null;
            pgwSlideshow.touchFirstPosition = null;
            pgwSlideshow.window = null;

            return true;
        };

        // Reload slider
        pgwSlideshow.reload = function(newOptions) {
            pgwSlideshow.destroy(true);

            pgwSlideshow = this;
            pgwSlideshow.plugin = this;
            pgwSlideshow.window = $(window);
            pgwSlideshow.plugin.show();

            // Merge new options with the default configuration
            pgwSlideshow.config = $.extend({}, defaults, newOptions);

            // Setup
            setup();

            // Resize listener
            pgwSlideshow.window.resize(function() {
                clearTimeout(pgwSlideshow.resizeEvent);
                pgwSlideshow.resizeEvent = setTimeout(function() {
                    setSizeClass();

                    var maxHeight = pgwSlideshow.plugin.find('.ps-current > ul > li.elt_' + pgwSlideshow.currentSlide + ' img').css('max-height', '').height();
                    updateHeight(maxHeight);

                    if (pgwSlideshow.config.displayList) {
                        checkList();
                        checkSelectedItem();
                    }
                }, 100);
            });

            // Activate interval
            if (pgwSlideshow.config.autoSlide) {
                activateInterval();
            }

            return true;
        };

        // Slideshow initialization
        init();

        return this;
    }
})(window.Zepto || window.jQuery);
