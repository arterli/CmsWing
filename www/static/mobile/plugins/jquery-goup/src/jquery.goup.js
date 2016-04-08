/*
 *
 * Copyright (c) 2014 Daniele Lenares (https://github.com/Ryuk87)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 1.0.0
 *
 */
(function ( $ ) {
	
	$.goup = function(user_params) {
		
		/* Default Params */
		var params = $.extend({
				location : 'right',
				locationOffset : 20,
				bottomOffset : 10,
				containerSize : 40,
				containerRadius : 10,
				containerClass : 'goup-container',
				arrowClass : 'goup-arrow',
				alwaysVisible : false,
				trigger: 500,
				entryAnimation : 'fade',
				goupSpeed : 'slow',
				hideUnderWidth : 500,
				containerColor : '#000',
				arrowColor : '#fff',
                title : '',
                titleAsText : false,
                titleAsTextClass : 'goup-text'
			}, user_params);
		/* */
		
		
		$('body').append('<div style="display:none" class="'+params.containerClass+'"></div>');
		var container = $('.'+params.containerClass);
		$(container).html('<div class="'+params.arrowClass+'"></div>');
		var arrow = $('.'+params.arrowClass);
		
		/* Parameters check */
		if (params.location != 'right' && params.location != 'left') {
			params.location = 'right';
		}
		
		if (params.locationOffset < 0) {
			params.locationOffset = 0;
		}
		
		if (params.bottomOffset < 0) {
			params.bottomOffset = 0;
		}
		
		if (params.containerSize < 20) {
			params.containerSize = 20;
		}

		if (params.containerRadius < 0) {
			params.containerRadius = 0;
		}
		
		if (params.trigger < 0) {
			params.trigger = 0;
		}
		
		if (params.hideUnderWidth < 0) {
			params.hideUnderWidth = 0;
		}
		
		var checkColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
		if (!checkColor.test(params.containerColor)) {
			params.containerColor = '#000';
		}
		if (!checkColor.test(params.arrowColor)) {
			params.arrowColor = '#fff';
		}
        
        if (params.title === '') {
            params.titleAsText = false;
        }
		/* */
		
		/* Container Style */
		var containerStyle = {};
		containerStyle = {
			position : 'fixed',
			width : params.containerSize,
			height : params.containerSize,
			background : params.containerColor,
			cursor: 'pointer'
		};
		containerStyle['bottom'] = params.bottomOffset;
		containerStyle[params.location] = params.locationOffset;
		containerStyle['border-radius'] = params.containerRadius;
		
		$(container).css(containerStyle);
        if (!params.titleAsText) {
            $(container).attr('title', params.title);
        } else {
            $('body').append('<div class="'+params.titleAsTextClass+'">'+params.title+'</div>');
            var textContainer = $('.'+params.titleAsTextClass);
            $(textContainer).attr('style', $(container).attr('style'));
            $(textContainer).css('background', 'transparent')
                           .css('width', params.containerSize + 40)
                           .css('height', 'auto')
                           .css('text-align', 'center')
                           .css(params.location, params.locationOffset - 20);
            var containerNewBottom = $(textContainer).height() + 10;
            $(container).css('bottom', '+='+containerNewBottom+'px');
        }
            
		
		/* Arrow Style */		
		var arrowStyle = {};
		var borderSize = 0.25 * params.containerSize;
		arrowStyle = {
			width : 0,
			height : 0,
			margin : '0 auto',
			'padding-top' : Math.ceil(0.325 * params.containerSize),
			'border-style' : 'solid',
			'border-width' : '0 '+borderSize+'px '+borderSize+'px '+borderSize+'px',
			'border-color' : 'transparent transparent '+params.arrowColor+' transparent' 
		};
		$(arrow).css(arrowStyle);
		/* */
		
		
		
		/* params.trigger Hide under a certain width */
		var isHidden = false;
		$(window).resize(function(){
			if ($(window).outerWidth() <= params.hideUnderWidth) {
				isHidden = true;
				do_animation($(container), 'hide', params.entryAnimation);
                if (textContainer)
                    do_animation($(textContainer), 'hide', params.entryAnimation);
			} else {
				isHidden = false;
				$(window).trigger('scroll');
			}
		});
		/* If i load the page under a certain width, i don't have the event 'resize' */
		if ($(window).outerWidth() <= params.hideUnderWidth) {
			isHidden = true;
			$(container).hide();
            if (textContainer)
                $(textContainer).hide();
		}
		
		
		/* params.trigger show event */
		if (!params.alwaysVisible) {
			$(window).scroll(function(){
				if ($(window).scrollTop() >= params.trigger && !isHidden) {
					do_animation($(container), 'show', params.entryAnimation);
                    if (textContainer)
                        do_animation($(textContainer), 'show', params.entryAnimation);
				}
				
				if ($(window).scrollTop() < params.trigger && !isHidden) {
					do_animation($(container), 'hide', params.entryAnimation);
                    if (textContainer)
                        do_animation($(textContainer), 'hide', params.entryAnimation);
				}
			});
		} else {
			do_animation($(container), 'show', params.entryAnimation);
            if (textContainer)
                do_animation($(textContainer), 'show', params.entryAnimation);
		}
		/* If i load the page and the scroll is over the trigger, i don't have immediately the event 'scroll' */
		if ($(window).scrollTop() >= params.trigger && !isHidden) {
			do_animation($(container), 'show', params.entryAnimation);
            if (textContainer)
                do_animation($(textContainer), 'show', params.entryAnimation);
		}
		
		/* Click event */
		var notClicked = true;
		$(container).add(textContainer).on('click', function(){
			if (notClicked) {
				notClicked = false;
				$('html,body').animate({ scrollTop: 0 }, params.goupSpeed, function(){ notClicked = true });
			}
			return false;

		});		
        
	};
	
	
	/* Private function for the animation */
	function do_animation(obj, type, animation) {
		if (type == 'show') {
			switch(animation) {
				case 'fade':
					obj.fadeIn();
				break;
				
				case 'slide':
					obj.slideDown();
				break;
				
				default:
					obj.fadeIn();
			}
		} else {
			switch(animation) {
				case 'fade':
					obj.fadeOut();
				break;
				
				case 'slide':
					obj.slideUp();
				break;
				
				default:
					obj.fadeOut();
			}
		}
	}
	
}( jQuery ));