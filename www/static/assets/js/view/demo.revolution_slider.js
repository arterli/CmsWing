jQuery(document).ready(function() {
	var revapi;



	// Make Content Visible
	jQuery(".fullwidthbanner ul , .fullscreenbanner ul").removeClass('hide');


	/**
		@HALFSCREEN SLIDER
	**/
	if(jQuery(".fullwidthbanner").length > 0) {

		// Default Thumbs [small]
		var thumbWidth 			= 100,
			thumbHeight 		= 50,
			hideThumbs			= 200,
			navigationType		= "bullet",
			navigationArrows	= "solo",
			navigationVOffset	= 10;

		// Shadow
		_shadow = jQuery(".fullwidthbanner").attr('data-shadow') || 0;

		// Small Thumbnails
		if(jQuery(".fullwidthbanner").hasClass('thumb-small')) {
			var navigationType 		= "thumb";
		}
		
		// Large Thumbnails
		if(jQuery(".fullwidthbanner").hasClass('thumb-large')) {
			var navigationType 		= "thumb";
				thumbWidth 			= 195,
				thumbHeight 		= 95,
				hideThumbs			= 0,
				navigationArrows	= "solo",
				navigationVOffset	= -94;

				// Hide thumbs on mobile - Avoid gaps
				/**
				if(jQuery(window).width() < 800) {
					setTimeout(function() {
						var navigationVOffset = 10;
						jQuery("div.tp-thumbs").addClass('hidden');
					}, 100);
				}
				**/
		}

		// Init Revolution Slider
		revapi = jQuery('.fullwidthbanner').revolution({
			dottedOverlay:"none",
			delay:9000,
			startwidth:1170,
			startheight: jQuery(".fullwidthbanner").attr('data-height') || 500,
			hideThumbs:hideThumbs,

			thumbWidth:thumbWidth,
			thumbHeight:thumbHeight,
			thumbAmount: parseInt(jQuery(".fullwidthbanner ul li").length) || 2,

			navigationType:navigationType,
			navigationArrows:navigationArrows,
			navigationStyle:jQuery('.fullwidthbanner').attr('data-navigationStyle') || "round", // round,square,navbar,round-old,square-old,navbar-old (see docu - choose between 50+ different item)

			touchenabled:"on",
			onHoverStop:"on",

			navigationHAlign:"center",
			navigationVAlign:"bottom",
			navigationHOffset:0,
			navigationVOffset:navigationVOffset,

			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:20,
			soloArrowLeftVOffset:0,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:20,
			soloArrowRightVOffset:0,

			parallax:"mouse",
			parallaxBgFreeze:"on",
			parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

			shadow: parseInt(_shadow),
			fullWidth:"on",
			fullScreen:"off",

			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,

			spinner:"spinner0",
			shuffle:"off",

			autoHeight:"off",
			forceFullWidth:"off",

			hideThumbsOnMobile:"off",
			hideBulletsOnMobile:"on",
			hideArrowsOnMobile:"on",
			hideThumbsUnderResolution:0,

			hideSliderAtLimit:0,
			hideCaptionAtLimit:768,
			hideAllCaptionAtLilmit:0,
			startWithSlide:0,
			fullScreenOffsetContainer: ""
		});

		// Used by styleswitcher onle - delete this on production!
		jQuery("#is_wide, #is_boxed").bind("click", function() { revapi.revredraw(); });
	}


	/**
		@FULLSCREEN SLIDER
	**/
	if(jQuery(".fullscreenbanner").length > 0) {

		var tpj=jQuery;				
		tpj.noConflict();				
		var revapi25;

		// Shadow
		_shadow = jQuery(".fullscreenbanner").attr('data-shadow') || 0;

		tpj(document).ready(function() {
						
			if(tpj('.fullscreenbanner').revolution != undefined) {
				revapi25 = tpj('.fullscreenbanner').show().revolution({
					dottedOverlay:"none",
					delay:9000,
					startwidth:1200,
					startheight:700,
					hideThumbs:10,
					
					thumbWidth:100,
					thumbHeight:50,
					thumbAmount:4,
					
					navigationType:"none",
					navigationArrows:"solo",
					navigationStyle:jQuery('.fullscreenbanner').attr('data-navigationStyle') || "round",
					
					touchenabled:"on",
					onHoverStop:"on",

					swipe_velocity: 0.7,
					swipe_min_touches: 1,
					swipe_max_touches: 1,
					drag_block_vertical: false,

					keyboardNavigation:"on",
					
					navigationHAlign:"center",
					navigationVAlign:"bottom",
					navigationHOffset:0,
					navigationVOffset:30,

					soloArrowLeftHalign:"left",
					soloArrowLeftValign:"center",
					soloArrowLeftHOffset:20,
					soloArrowLeftVOffset:0,

					soloArrowRightHalign:"right",
					soloArrowRightValign:"center",
					soloArrowRightHOffset:20,
					soloArrowRightVOffset:0,

					parallax:"mouse",
					parallaxBgFreeze:"on",
					parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

					shadow: parseInt(_shadow),
					fullWidth:"off",
					fullScreen:"on",

					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					
					shuffle:"off",

					forceFullWidth:"off",						
					fullScreenAlignForce:"off",	
					
					hideThumbsOnMobile:"off",
					hideBulletsOnMobile:"on",
					hideArrowsOnMobile:"off",
					hideThumbsUnderResolution:0,
					
					hideSliderAtLimit:0,
					hideCaptionAtLimit:768,
					hideAllCaptionAtLilmit:0,
					startWithSlide:0,
					fullScreenOffsetContainer: jQuery("#header").hasClass('transparent') || jQuery("#header").hasClass('translucent') ? null : "#header"	
				});

			}
		});	//ready

	}


	/**
		@KEN BURNS
	**/
	if(jQuery(".fullscreenbanner.ken-burns").length > 0) {

		revapi = jQuery('.fullwidthbanner').revolution({
			dottedOverlay:"none",
			delay:9000,
			startwidth:1170,
			startheight:400,
			hideThumbs:200,
			
			thumbWidth:100,
			thumbHeight:50,
			thumbAmount:5,
			
			navigationType:"bullet",
			navigationArrows:"solo",
			navigationStyle:jQuery('.fullwidthbanner').attr('data-navigationStyle') || "round",
			
			touchenabled:"on",
			onHoverStop:"off",
			
			navigationHAlign:"center",
			navigationVAlign:"bottom",
			navigationHOffset:0,
			navigationVOffset:10,

			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:20,
			soloArrowLeftVOffset:0,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:20,
			soloArrowRightVOffset:0,
					
			shadow:0,
			fullWidth:"on",
			fullScreen:"off",

			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,

			
			shuffle:"off",
			
			autoHeight:"off",						
			forceFullWidth:"off",						
									
			hideThumbsOnMobile:"off",
			hideBulletsOnMobile:"off",
			hideArrowsOnMobile:"off",
			hideThumbsUnderResolution:0,
			
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			startWithSlide:0,
			fullScreenOffsetContainer: ""
		});

		// Used by styleswitcher only - delete this on production!
		jQuery("#is_wide, #is_boxed").bind("click", function() { revapi.revredraw(); });

	}

});	//ready
