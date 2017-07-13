
/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for Revolution Slider
 * @version: 5.0.8.1 (12.09.2015)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
**************************************************************************/
(function(jQuery,undefined){
	"use strict";
		
	jQuery.fn.extend({

		revolution: function(options) {

			// SET DEFAULT VALUES OF ITEM //
			var defaults = {
				delay:9000,
				responsiveLevels:4064,					// Single or Arrac for Responsive Levels i.e.: 4064 or i.e. [2048, 1024, 768, 480]					
				gridwidth:960,							// Single or Array i.e. 960 or [960, 840,760,460]
				gridheight:500,							// Single or Array i.e. 500 or [500, 450,400,350]
				minHeight:0,
				autoHeight:"off",					
				sliderType : "standard",				// standard, carousel, hero					
				sliderLayout : "auto",					// auto, fullwidth, fullscreen				

				fullScreenAutoWidth:"on",				// Turns the FullScreen Slider to be a FullHeight but auto Width Slider
				fullScreenAlignForce:"off",
				fullScreenOffsetContainer:"",			// Size for FullScreen Slider minimising Calculated on the Container sizes
				fullScreenOffset:"0",					// Size for FullScreen Slider minimising					

				hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
				hideAllCaptionAtLimit:0,				// Hide all The Captions if Width of Browser is less then this value
				hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value										
				disableProgressBar:"off",				// Hides Progress Bar if is set to "on"
				stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
				stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
				shadow:0,								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
				dottedOverlay:"none",					//twoxtwo, threexthree, twoxtwowhite, threexthreewhite
				startDelay:0,							// Delay before the first Animation starts.										
				lazyType : "smart",						//full, smart, single
				spinner:"spinner0",
				shuffle:"off",							// Random Order of Slides,

				
				viewPort:{
					enable:false,						// if enabled, slider wait with start or wait at first slide.
					outof:"wait",						// wait,pause						
					visible_area:"60%"					
				},

				fallbacks:{
					isJoomla:false,
					panZoomDisableOnMobile:"off",
					simplifyAll:"on",
					nextSlideOnWindowFocus:"off",	
					disableFocusListener:true						
				},
				
				parallax : {
					type : "off",						// off, mouse, scroll, mouse+scroll
					levels: [10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85],
					origo:"enterpoint",				// slidercenter or enterpoint
					speed:400,
					bgparallax : "on",
					opacity:"on",
					disable_onmobile:"off"
					
				},
				
				carousel : {
					horizontal_align : "center",
					vertical_align : "center",
					infinity : "on",
					space : 0,
					maxVisibleItems : 3,						
					stretch:"off",						
					fadeout:"on",						
					maxRotation:0,						
					minScale:0,
					vary_fade:"off",
					vary_rotation:"on",
					vary_scale:"off",						
					border_radius:"0px",
					padding_top:0,
					padding_bottom:0
				},

				navigation : {
					keyboardNavigation:"on",	
					keyboard_direction:"horizontal",		//	horizontal - left/right arrows,  vertical - top/bottom arrows
					mouseScrollNavigation:"off",					
					onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off

					touch:{
						touchenabled:"off",						// Enable Swipe Function : on/off
						swipe_treshold : 75,					// The number of pixels that the uuu must move their finger by before it is considered a swipe.
						swipe_min_touches : 1,					// Min Finger (touch) used for swipe							
						drag_block_vertical:false,				// Prevent Vertical Scroll during Swipe
						swipe_direction:"horizontal"
					},
					arrows: {
						style:"",
						enable:false,
						hide_onmobile:false,							
						hide_onleave:true,
						hide_delay:200,
						hide_delay_mobile:1200,
						hide_under:0,
						hide_over:9999,
						tmp:'',
						left : {															
							h_align:"left",
							v_align:"center",
							h_offset:20,
							v_offset:0,								
						},
						right : {
							h_align:"right",
							v_align:"center",
							h_offset:20,
							v_offset:0
						}
					},
					bullets: {
						style:"",
						enable:false,
						hide_onmobile:false,							
						hide_onleave:true,
						hide_delay:200,
						hide_delay_mobile:1200,
						hide_under:0,
						hide_over:9999,
						direction:"horizontal",
						h_align:"left",
						v_align:"center",
						space:0,
						h_offset:20,
						v_offset:0,
						tmp:'<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>'
					},
					thumbnails: {
						style:"",
						enable:false,
						width:100,
						height:50,
						min_width:100,
						wrapper_padding:2,
						wrapper_color:"#f5f5f5",
						wrapper_opacity:1,
						tmp:'<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',
						visibleAmount:5,
						hide_onmobile:false,							
						hide_onleave:true,
						hide_delay:200,
						hide_delay_mobile:1200,
						hide_under:0,
						hide_over:9999,
						direction:"horizontal",
						span:false,
						position:"inner",							
						space:2,
						h_align:"left",
						v_align:"center",
						h_offset:20,
						v_offset:0
					},
					tabs: {
						style:"",
						enable:false,
						width:100,
						min_width:100,
						height:50,
						wrapper_padding:10,
						wrapper_color:"#f5f5f5",
						wrapper_opacity:1,
						tmp:'<span class="tp-tab-image"></span>',
						visibleAmount:5,
						hide_onmobile:false,							
						hide_onleave:true,
						hide_delay:200,
						hide_delay_mobile:1200,
						hide_under:0,
						hide_over:9999,
						direction:"horizontal",
						span:false,
						space:0,
						position:"inner",							
						h_align:"left",
						v_align:"center",
						h_offset:20,
						v_offset:0
					}
				},					
				extensions:"extensions/",			//example extensions/ or extensions/source/
				extensions_suffix:".min.js",
				debugMode:false
			};
				
			// Merge of Defaults									
			options = jQuery.extend(true,{},defaults, options);
			
			return this.each(function() {
				
				
				var c = jQuery(this);
				//REMOVE SLIDES IF SLIDER IS HERO
				if (options.sliderType=="hero") {
					c.find('>ul>li').each(function(i) {
						if (i>0) jQuery(this).remove();
					})
				}
				options.jsFileLocation = options.jsFileLocation || getScriptLocation("themepunch.revolution.min.js");						
				options.jsFileLocation = options.jsFileLocation + options.extensions;
				options.scriptsneeded = getNeededScripts(options,c);
				options.curWinRange = 0;		

				jQuery(this).on("scriptsloaded",function() {
					if (options.modulesfailing ) {
						c.html('<div style="margin:auto;line-height:40px;font-size:14px;color:#fff;padding:15px;background:#e74c3c;margin:20px 0px;">!! Error at loading Slider Revolution 5.0 Extrensions.'+options.errorm+'</div>').show();
						return false;
					}
					// CHECK FOR MIGRATION
					if (_R.migration!=undefined) options = _R.migration(c,options);			
					punchgs.force3D = true;
					if (options.simplifyAll!=="on") punchgs.TweenLite.lagSmoothing(1000,16);													
					prepareOptions(c,options);
					initSlider(c,options);
				});						

				waitForScripts(c,options.scriptsneeded);
			})
		},

		// Add a New Call Back to some Module
		revaddcallback: function(callback) {
			return this.each(function() {						
				var container=jQuery(this);
				if (container!=undefined && container.length>0 && jQuery('body').find('#'+container.attr('id')).length>0) {
					var bt = container.parent().find('.tp-bannertimer'),
						opt = bt.data('opt');
					if (opt.callBackArray === undefined)
						opt.callBackArray = new Array();
					opt.callBackArray.push(callback);						
				}
			})
		},

		// Get Current Parallax Proc
		revgetparallaxproc : function() {		
			var container=jQuery(this);
			if (container!=undefined && container.length>0 && jQuery('body').find('#'+container.attr('id')).length>0) {
				var bt = container.parent().find('.tp-bannertimer'),
					opt = bt.data('opt');
				return opt.scrollproc;
			}
			
		},

		// ENABLE DEBUG MODE
		revdebugmode: function() {
			return this.each(function() {						
				var container=jQuery(this);
				if (container!=undefined && container.length>0 && jQuery('body').find('#'+container.attr('id')).length>0) {
					var bt = container.parent().find('.tp-bannertimer'),
						opt = bt.data('opt');
						opt.debugMode = true;
					containerResized(container,opt);
				}
			})
		},

		// METHODE SCROLL
		revscroll: function(oy) {
					return this.each(function() {
						var container=jQuery(this);
						if (container!=undefined && container.length>0 && jQuery('body').find('#'+container.attr('id')).length>0)
							jQuery('body,html').animate({scrollTop:(container.offset().top+(opt.li.height())-oy)+"px"},{duration:400});
					})
				},

		// METHODE PAUSE
		revredraw: function(oy) {
					return this.each(function() {
						
						var container=jQuery(this);
						if (container!=undefined && container.length>0 && jQuery('body').find('#'+container.attr('id')).length>0) {
							var bt = container.parent().find('.tp-bannertimer');
							var opt = bt.data('opt');

							containerResized(container,opt);
						}
					})
				},
		// METHODE PAUSE
		revkill: function(oy) {

						var self = this,
							container=jQuery(this);

							punchgs.TweenLite.killDelayedCallsTo(showHideNavElements);
							if (_R.endMoveCaption)
								punchgs.TweenLite.killDelayedCallsTo(_R.endMoveCaption);

						if (container!=undefined && container.length>0 && jQuery('body').find('#'+container.attr('id')).length>0) {

							container.data('conthover',1);
							container.data('conthover-changed',1);
							container.trigger('revolution.slide.onpause');
							var bt = container.parent().find('.tp-bannertimer'),
								opt = bt.data('opt');
							opt.tonpause = true;
							container.trigger('stoptimer');

							punchgs.TweenLite.killTweensOf(container.find('*'),false);
							punchgs.TweenLite.killTweensOf(container,false);
							container.unbind('hover, mouseover, mouseenter,mouseleave, resize');
							var resizid = "resize.revslider-"+container.attr('id');
							jQuery(window).off(resizid);
							container.find('*').each(function() {
									var el = jQuery(this);

									el.unbind('on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer');
									el.off('on, hover, mouseenter,mouseleave,mouseover, resize');
									el.data('mySplitText',null);
									el.data('ctl',null);
									if (el.data('tween')!=undefined)
										el.data('tween').kill();
									if (el.data('kenburn')!=undefined)
										el.data('kenburn').kill();
									if (el.data('timeline_out')!=undefined)											
										el.data('timeline_out').kill();	
									if (el.data('timeline')!=undefined)											
										el.data('timeline').kill();													
										
									el.remove();
									el.empty();
									el=null;
							})


							punchgs.TweenLite.killTweensOf(container.find('*'),false);
							punchgs.TweenLite.killTweensOf(container,false);
							bt.remove();
							try{container.closest('.forcefullwidth_wrapper_tp_banner').remove();} catch(e) {}
							try{container.closest('.rev_slider_wrapper').remove()} catch(e) {}
							try{container.remove();} catch(e) {}
							container.empty();
							container.html();
							container = null;

							opt = null;
							delete(self.c);
							delete(self.opt);

							return true;
						} else {
							return false;
						}


				},

		// METHODE PAUSE
		revpause: function() {
			return this.each(function() {
				var c=jQuery(this);
				if (c!=undefined && c.length>0 && jQuery('body').find('#'+c.attr('id')).length>0) {
					c.data('conthover',1);
					c.data('conthover-changed',1);
					c.trigger('revolution.slide.onpause');
					var bt = c.parent().find('.tp-bannertimer');
					var opt = bt.data('opt');
					opt.tonpause = true;
					c.trigger('stoptimer');
				}
			})
		},

		// METHODE RESUME
		revresume: function() {
			return this.each(function() {
				var c=jQuery(this);
				if (c!=undefined && c.length>0 && jQuery('body').find('#'+c.attr('id')).length>0) {
					c.data('conthover',0);
					c.data('conthover-changed',1);
					c.trigger('revolution.slide.onresume');
					var bt = c.parent().find('.tp-bannertimer');
					var opt = bt.data('opt');
					opt.tonpause = false;
					c.trigger('starttimer');
				}
			})
		},

		// METHODE NEXT
		revnext: function() {
			return this.each(function() {
				// CATCH THE CONTAINER
				var c=jQuery(this);
				if (c!=undefined && c.length>0 && jQuery('body').find('#'+c.attr('id')).length>0) {
					var bt = c.parent().find('.tp-bannertimer'),
						opt = bt.data('opt');					
					_R.callingNewSlide(opt,c,1);
				}
			})
		},

		// METHODE RESUME
		revprev: function() {
			return this.each(function() {
				// CATCH THE CONTAINER
				var c=jQuery(this);
				if (c!=undefined && c.length>0 && jQuery('body').find('#'+c.attr('id')).length>0) {
					var bt = c.parent().find('.tp-bannertimer'),
						opt = bt.data('opt');					
					_R.callingNewSlide(opt,c,-1);
				}
			})
		},

		// METHODE LENGTH
		revmaxslide: function() {
			// CATCH THE CONTAINER
			return jQuery(this).find('.tp-revslider-mainul >li').length;
		},


		// METHODE CURRENT
		revcurrentslide: function() {
			// CATCH THE CONTAINER
			var c=jQuery(this);
			if (c!=undefined && c.length>0 && jQuery('body').find('#'+c.attr('id')).length>0) {
				var bt = c.parent().find('.tp-bannertimer');
				var opt = bt.data('opt');
				return parseInt(opt.act,0)+1;
			}
		},

		// METHODE CURRENT
		revlastslide: function() {
			// CATCH THE CONTAINER
			return jQuery(this).find('.tp-revslider-mainul >li').length;
		},


		// METHODE JUMP TO SLIDE
		revshowslide: function(slide) {
			return this.each(function() {
				// CATCH THE CONTAINER
				var c=jQuery(this);
				if (c!=undefined && c.length>0 && jQuery('body').find('#'+c.attr('id')).length>0) {
					var bt = c.parent().find('.tp-bannertimer'),
						opt = bt.data('opt');							
					_R.callingNewSlide(opt,c,"to"+(slide-1));
				}
			})
		},
		revcallslidewithid: function(slide) {
			return this.each(function() {
				// CATCH THE CONTAINER
				var c=jQuery(this);
				if (c!=undefined && c.length>0 && jQuery('body').find('#'+c.attr('id')).length>0) {
					var bt = c.parent().find('.tp-bannertimer'),
						opt = bt.data('opt');										
					_R.callingNewSlide(opt,c,slide);
				}
			})
		}		
});



//////////////////////////////////////////////////////////////
// -	REVOLUTION FUNCTION EXTENSIONS FOR GLOBAL USAGE  -  //	
//////////////////////////////////////////////////////////////
var _R = jQuery.fn.revolution;

jQuery.extend(true, _R, {
	
	simp : function(a,b,basic) {
		var c = Math.abs(a) - (Math.floor(Math.abs(a / b))*b);																			
		if (basic)
			return c;
		else 
			return a<0 ? -1*c : c;
	},

	//	-	IS IOS VERSION OLDER THAN 5 ??	
 	iOSVersion : function() {
		var oldios = false;
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
	        if (navigator.userAgent.match(/OS 4_\d like Mac OS X/i)) {
	        	oldios = true;
			}
	    } else {
			   oldios = false;
	    }
		return oldios;
	},


	//	-	CHECK IF BROWSER IS IE		-		
	isIE : function( version, comparison ){
	    var $div = jQuery('<div style="display:none;"/>').appendTo(jQuery('body'));
	    $div.html('<!--[if '+(comparison||'')+' IE '+(version||'')+']><a>&nbsp;</a><![endif]-->');
	    var ieTest = $div.find('a').length;
	    $div.remove();
	    return ieTest;
	},

	// 	-	IS MOBILE ?? 
	is_mobile : function() {
	    var agents = ['android', 'webos', 'iphone', 'ipad', 'blackberry','Android', 'webos', ,'iPod', 'iPhone', 'iPad', 'Blackberry', 'BlackBerry'];
		var ismobile=false;
	    for(var i in agents) {
	
		    if (navigator.userAgent.split(agents[i]).length>1) {
	            ismobile = true;
	
	          }
	    }
	    return ismobile;		    
	},

	// -  CALL BACK HANDLINGS - //
	 callBackHandling : function(opt,type,position) {
	 	try{
			if (opt.callBackArray)
				jQuery.each(opt.callBackArray,function(i,c) {				
					if (c) {
						if (c.inmodule && c.inmodule === type)
							if (c.atposition && c.atposition === position)
								if (c.callback) 
									c.callback.call();											
					}
				});
		} catch(e) {
			console.log("Call Back Failed");
		}
	},

	get_browser : function(){
	    var N=navigator.appName, ua=navigator.userAgent, tem;
	    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
	    return M[0];
    },

	get_browser_version  : function(){
	    var N=navigator.appName, ua=navigator.userAgent, tem;
	    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
	    return M[1];
    },

    // GET THE HORIZONTAL OFFSET OF SLIDER BASED ON THE THU`MBNAIL AND TABS LEFT AND RIGHT SIDE
	getHorizontalOffset : function(container,side) {
		var thumbloff = gWiderOut(container,'.outer-left'),
			thumbroff = gWiderOut(container,'.outer-right');
							
		switch (side) {
			case "left":
				return thumbloff;
			break;
			case "right":
				return thumbroff;
			break;
			case "both":
				return thumbloff+thumbroff;
			break;
		}
	},


	// 	-	CALLING THE NEW SLIDE 	-	//		
	callingNewSlide : function(opt,container,direction) {
		
		
		var aindex = container.find('.next-revslide').length>0 ? container.find('.next-revslide').index() : container.find('.processing-revslide').length>0 ? container.find('.processing-revslide').index() : container.find('.active-revslide').index(),
			nindex = 0;
	
		container.find('.next-revslide').removeClass("next-revslide");


		// SET NEXT DIRECTION
		if (direction && jQuery.isNumeric(direction) || direction.match(/to/g)) {			
			if (direction===1 || direction === -1) {
				nindex = aindex + direction;
				nindex = nindex<0 ? opt.slideamount-1 : nindex>=opt.slideamount ? 0 : nindex;						
			} else {							

				direction=jQuery.isNumeric(direction) ? direction : parseInt(direction.split("to")[1],0);
				nindex = direction<0 ? 0 : direction>opt.slideamount-1 ? opt.slideamount-1 : direction;						
			}
			container.find('.tp-revslider-slidesli:eq('+nindex+')').addClass("next-revslide");
		} else 		
		if (direction) {
			
			container.find('.tp-revslider-slidesli').each(function() {
				var li=jQuery(this);				
				if (li.data('index')===direction) li.addClass("next-revslide");									
			})			
		}

		
		nindex = container.find('.next-revslide').index();				
		container.trigger("revolution.nextslide.waiting");
				

		if (nindex !== aindex && nindex!=-1)
			swapSlide(container,opt);	
		else
			container.find('.next-revslide').removeClass("next-revslide");
	},

	slotSize : function(img,opt) {
		opt.slotw=Math.ceil(opt.width/opt.slots);

		if (opt.sliderLayout=="fullscreen")
			opt.sloth=Math.ceil(jQuery(window).height()/opt.slots);
		else
			opt.sloth=Math.ceil(opt.height/opt.slots);

		if (opt.autoHeight=="on" && img!==undefined && img!=="")
		 	opt.sloth=Math.ceil(img.height()/opt.slots);


	},

	setSize : function(opt) {
	
		var ofh = (opt.top_outer || 0) + (opt.bottom_outer || 0),
			cpt = parseInt((opt.carousel.padding_top||0),0),
			cpb = parseInt((opt.carousel.padding_bottom||0),0),
			maxhei = opt.gridheight[opt.curWinRange];
			
		maxhei = maxhei<opt.minHeight ? opt.minHeight : maxhei;		
		if (opt.sliderLayout=="fullwidth" && opt.autoHeight=="off")	punchgs.TweenLite.set(opt.c,{maxHeight:maxhei+"px"});	
		opt.c.css({marginTop:cpt,marginBottom:cpb});					
		opt.width=opt.ul.width();
		opt.height=opt.ul.height();	
		setScale(opt);
			
		opt.height = Math.round(opt.gridheight[opt.curWinRange] * (opt.width/opt.gridwidth[opt.curWinRange]));

		if (opt.height>opt.gridheight[opt.curWinRange] && opt.autoHeight!="on") opt.height=opt.gridheight[opt.curWinRange];

		if (opt.sliderLayout=="fullscreen") {
			opt.height = opt.bw * opt.gridheight[opt.curWinRange];
			var cow = opt.c.parent().width();
			var coh = jQuery(window).height();

			if (opt.fullScreenOffsetContainer!=undefined) {
				try{
					var offcontainers = opt.fullScreenOffsetContainer.split(",");
					if (offcontainers)
						jQuery.each(offcontainers,function(index,searchedcont) {
							coh = jQuery(searchedcont).length>0 ? coh - jQuery(searchedcont).outerHeight(true) : coh;										
						});
				} catch(e) {}
				try{
					if (opt.fullScreenOffset.split("%").length>1 && opt.fullScreenOffset!=undefined && opt.fullScreenOffset.length>0) 
							coh = coh - (jQuery(window).height()* parseInt(opt.fullScreenOffset,0)/100);
					else
					if (opt.fullScreenOffset!=undefined && opt.fullScreenOffset.length>0)
					 		coh = coh - parseInt(opt.fullScreenOffset,0);								
				} catch(e) {}
			}

			coh = coh<opt.minHeight ? opt.minHeight : coh;	
			coh = coh - ofh;			
			opt.c.parent().height(coh);

			opt.c.closest('.rev_slider_wrapper').height(coh);
			opt.c.css({'height':'100%'});

			opt.height=coh;
			if (opt.minHeight!=undefined && opt.height<opt.minHeight)
				opt.height = opt.minHeight;
		} else {

			if (opt.minHeight!=undefined && opt.height<opt.minHeight)
				opt.height = opt.minHeight;			
			opt.c.height(opt.height);
		}
		var si = {	height:(cpt+cpb+ofh+opt.height)};			
		opt.c.closest('.forcefullwidth_wrapper_tp_banner').find('.tp-fullwidth-forcer').css(si);
		opt.c.closest('.rev_slider_wrapper').css(si);		
		setScale(opt);		
	},

	enterInViewPort : function(opt) {
		// START COUNTER IF VP ENTERED, AND COUNTDOWN WAS NOT ON YET
		if (opt.waitForCountDown) {
			countDown(opt.c,opt);		
			opt.waitForCountDown=false;			
		}
		// START FIRST SLIDE IF NOT YET STARTED AND VP ENTERED
		if (opt.waitForFirstSlide) {
			swapSlide(opt.c,opt);		
			opt.waitForFirstSlide=false;			
		}			

		if (opt.sliderlaststatus == "playing" || opt.sliderlaststatus==undefined) {
			opt.c.trigger("starttimer");
		}			

		
		if (opt.lastplayedvideos != undefined && opt.lastplayedvideos.length>0) {
			
			jQuery.each(opt.lastplayedvideos,function(i,_nc) {
				
				_R.playVideo(_nc,opt);
			});
		}	
	},

	leaveViewPort : function(opt) {
		opt.sliderlaststatus = opt.sliderstatus;
		opt.c.trigger("stoptimer");		
		if (opt.playingvideos != undefined && opt.playingvideos.length>0) { 
			opt.lastplayedvideos = jQuery.extend(true,[],opt.playingvideos);
			if (opt.playingvideos)
				jQuery.each(opt.playingvideos,function(i,_nc) {				
					if (_R.stopVideo) _R.stopVideo(_nc,opt);
				});
		}
	}

});


var	_ISM = _R.is_mobile();



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
var lAjax = function(s,o) {
	if (jQuery('body').data(s)) return false;
	if (o.filesystem) {
		if (o.errorm===undefined) 
			o.errorm = "<br>Local Filesystem Detected !<br>Put this to your header:";
		console.warn('Local Filesystem detected !');
		o.errorm = o.errorm+'<br>&lt;script type="text/javascript" src="'+o.jsFileLocation+s+o.extensions_suffix+'"&gt;&lt;/script&gt;';
		console.warn(o.jsFileLocation+s+o.extensions_suffix+' could not be loaded !');
		console.warn('Please use a local Server or work online or make sure that you load all needed Libraries manually in your Document.');
		console.log(" ");
		o.modulesfailing = true;
		return false;
	}
	jQuery.ajax({
		url:o.jsFileLocation+s+o.extensions_suffix,
		'dataType':'script',
		'cache':true,
		"error":function(e) {
			console.warn("Slider Revolution 5.0 Error !")
			console.error("Failure at Loading:"+s+o.extensions_suffix+" on Path:"+o.jsFileLocation)
			console.info(e);
		}			
	});
	jQuery('body').data(s,true);
}

var getNeededScripts = function(o,c) {	
	var n = new Object(),
		_n = o.navigation;
	
	n.kenburns = false;
	n.parallax = false;
	n.carousel = false;
	n.navigation = false;
	n.videos = false;
	n.actions = false;
	n.layeranim = false;
	n.migration = false;


	// MIGRATION EXTENSION
	if (!c.data('version') || !c.data('version').match(/5./gi)) {
		n.kenburns = true;
		n.parallax = true;
		n.carousel = false;
		n.navigation = true;
		n.videos = true;
		n.actions = true;
		n.layeranim = true;
		n.migration = true;		
	}
	else {
		// KEN BURN MODUL
		c.find('img').each(function(){			
			if (jQuery(this).data('kenburns')=="on") n.kenburns = true;
		});						

		// NAVIGATION EXTENSTION
		if (o.sliderType =="carousel" || _n.keyboardNavigation=="on" || _n.mouseScrollNavigation=="on" || _n.touch.touchenabled=="on" || _n.arrows.enable || _n.bullets.enable || _n.thumbnails.enable || _n.tabs.enable )
			n.navigation = true;
		
		// LAYERANIM, VIDEOS, ACTIONS EXTENSIONS
		c.find('.tp-caption, .tp-static-layer, .rs-background-video-layer').each(function(){
			var _nc = jQuery(this);
			if ((_nc.data('ytid')!=undefined  || _nc.find('iframe').length>0 && _nc.find('iframe').attr('src').toLowerCase().indexOf('youtube')>0))
				n.videos = true;
			if ((_nc.data('vimeoid')!=undefined || _nc.find('iframe').length>0 && _nc.find('iframe').attr('src').toLowerCase().indexOf('vimeo')>0))
				n.videos = true;		
			if (_nc.data('actions')!==undefined) 
				n.actions = true;
			n.layeranim = true;
		});

		c.find('li').each(function() {
			if (jQuery(this).data('link') && jQuery(this).data('link')!=undefined) {
				n.layeranim = true;
				n.actions = true;
			}
		})

		// VIDEO EXTENSION
		if (!n.videos && (c.find('.rs-background-video-layer').length>0 || c.find(".tp-videolayer").length>0 || c.find('iframe').length>0 || c.find('video').length>0))
			n.videos = true;

		// VIDEO EXTENSION
		if (o.sliderType =="carousel")
			n.carousel = true;

		

		if (o.parallax.type!=="off" || o.viewPort.enable || o.viewPort.enable=="true")
			n.parallax = true;
	}
	
	if (o.sliderType=="hero") {
		n.carousel = false;
		n.navigation = false;
	}
	
	if (window.location.href.match(/file:/gi)) {
		n.filesystem = true;
		o.filesystem = true;
	}

	// LOAD THE NEEDED LIBRARIES
	if (n.videos && typeof _R.isVideoPlaying=='undefined') lAjax('revolution.extension.video',o);
	if (n.carousel && typeof _R.prepareCarousel=='undefined') lAjax('revolution.extension.carousel',o);								
	if (!n.carousel && typeof _R.animateSlide=='undefined') lAjax('revolution.extension.slideanims',o);								
	if (n.actions && typeof _R.checkActions=='undefined') lAjax('revolution.extension.actions',o);						
	if (n.layeranim && typeof _R.handleStaticLayers=='undefined') lAjax('revolution.extension.layeranimation',o);						
	if (n.kenburns && typeof _R.stopKenBurn=='undefined') lAjax('revolution.extension.kenburn',o); 
	if (n.navigation && typeof _R.createNavigation=='undefined') lAjax('revolution.extension.navigation',o);					
	if (n.migration && typeof _R.migration=='undefined') lAjax('revolution.extension.migration',o);					
	if (n.parallax && typeof _R.checkForParallax=='undefined') lAjax('revolution.extension.parallax',o);					
	
	

	return n;
}

///////////////////////////////////
//   -  WAIT FOR SCRIPT LOADS  - //
///////////////////////////////////	
var waitForScripts = function(c,n) {
	// CHECK KEN BURN DEPENDENCIES
	 
	if (n.filesystem || 
		(typeof punchgs !== 'undefined' &&
		(!n.kenburns || (n.kenburns && typeof _R.stopKenBurn !== 'undefined')) &&
		(!n.navigation || (n.navigation && typeof _R.createNavigation !== 'undefined')) &&
		(!n.carousel || (n.carousel && typeof _R.prepareCarousel !== 'undefined')) &&
		(!n.videos || (n.videos && typeof _R.resetVideo !== 'undefined')) &&
		(!n.actions || (n.actions && typeof _R.checkActions !== 'undefined')) &&
		(!n.layeranim || (n.layeranim && typeof _R.handleStaticLayers !== 'undefined')) &&
		(!n.migration || (n.migration && typeof _R.migration !== 'undefined')) &&
		(!n.parallax || (n.parallax && typeof _R.checkForParallax !== 'undefined')) &&
		(n.carousel || (!n.carousel && typeof _R.animateSlide !== 'undefined'))
	   ))
		c.trigger("scriptsloaded");
	else			
		setTimeout(function() {
			waitForScripts(c,n);
		},50);
		
}

//////////////////////////////////
//	-	GET SCRIPT LOCATION	-	//
//////////////////////////////////
var getScriptLocation = function(a) {

	var srcexp = new RegExp("themepunch.revolution.min.js","gi"),
		ret = "";
	jQuery("script").each(function() {
		var src = jQuery(this).attr("src");
		if (src && src.match(srcexp)) 								
			ret = src;							
	});
	
	ret = ret.replace('jquery.themepunch.revolution.min.js', ''); 
	ret = ret.replace('jquery.themepunch.revolution.js', ''); 	
	ret = ret.split("?")[0];		
	return ret;
}

//////////////////////////////////////////
//	-	ADVANCED RESPONSIVE LEVELS	-	//
//////////////////////////////////////////
var setCurWinRange = function(opt) {		
	var curlevel = 0,
		curwidth = 9999,
		lastmaxlevel = 0,
		lastmaxid = 0,
		curid = 0,
		winw = jQuery(window).width();			
	  
	 if (opt.responsiveLevels && opt.responsiveLevels.length)
		jQuery.each(opt.responsiveLevels,function(index,level) {				
			if (winw<level) {
				if (lastmaxlevel==0 || lastmaxlevel>level) {
					curwidth = level;
					curid = index;
					lastmaxlevel = level;
				}
			}
		
		if (winw>level && lastmaxlevel<level) {
			lastmaxlevel = level;
			lastmaxid = index;
		}
	});
	
	if (lastmaxlevel<curwidth) 
		curid = lastmaxid;		

	opt.curWinRange = curid;	
				
}


//////////////////////////////////////////
//	-	INITIALISATION OF OPTIONS 	-	//
//////////////////////////////////////////
var prepareOptions = function(container,opt) {		
	opt.carousel.maxVisibleItems = opt.carousel.maxVisibleItems < 1 ? 999 : opt.carousel.maxVisibleItems; // === 1 ? 2 : opt.carousel.maxVisibleItems;
	opt.carousel.vertical_align = opt.carousel.vertical_align === "top" ? "0%" : opt.carousel.vertical_align==="bottom" ? "100%" : "50%";
}

var gWiderOut = function(c,cl) {
	var r = 0;
	c.find(cl).each(function() {
		var a = jQuery(this);
		if (!a.hasClass("tp-forcenotvisible") && r<a.outerWidth())
			r = a.outerWidth();			
	});
	return r;
}




//////////////////////////////////////////
//	-	INITIALISATION OF SLIDER	-	//
//////////////////////////////////////////
var initSlider = function (container,opt) {
	if (container==undefined) return false;

	// CHECK FOR ALTERNATIVE IMAGE, AND IFRAM EXIST, AND WE ARE IN IE8, MOBILE, DRAW IT SIMPLE
	if (container.data('aimg')!=undefined) 
		if ((container.data('aie8')=="enabled" && _R.isIE(8)) || (container.data('amobile')=="enabled" && _ISM))
			container.html('<img class="tp-slider-alternative-image" src="'+container.data("aimg")+'">');
	
	// PREPRARE SOME CLASSES AND VARIABLES
	container.find('>ul').addClass("tp-revslider-mainul");

	// CREATE SOME DEFAULT OPTIONS FOR LATER			
	opt.c=container;
	opt.ul = container.find('.tp-revslider-mainul');
	opt.cid = container.attr('id');
	opt.ul.css({visibility:"visible"});
    opt.slideamount = opt.ul.find('>li').length;
    opt.slayers = container.find('.tp-static-layers');

    // Save Original Index of Slides
    opt.ul.find('>li').each(function(i) {
    	jQuery(this).data('originalindex',i);
    });
	
	// RANDOMIZE THE SLIDER SHUFFLE MODE
	if (opt.shuffle=="on") {		
		var fsa = new Object,
			fli = opt.ul.find('>li:first-child');
		fsa.fstransition = fli.data('fstransition');
		fsa.fsmasterspeed = fli.data('fsmasterspeed');
		fsa.fsslotamount = fli.data('fsslotamount');

		for (var u=0;u<opt.slideamount;u++) {
			var it = Math.round(Math.random()*opt.slideamount);			
			opt.ul.find('>li:eq('+it+')').prependTo(opt.ul);			
		}

		var newfli = opt.ul.find('>li:first-child');
		newfli.data('fstransition',fsa.fstransition);
		newfli.data('fsmasterspeed',fsa.fsmasterspeed);
		newfli.data('fsslotamount',fsa.fsslotamount);
		 // COLLECT ALL LI INTO AN ARRAY
		opt.li = opt.ul.find('>li');
	}


	opt.li = opt.ul.find('>li');
	opt.thumbs = new Array();		
	
	opt.slots=4;
	opt.act=-1;					
	opt.firststart=1;
	opt.loadqueue = new Array();
	opt.syncload = 0;
	opt.conw = container.width();
	opt.conh = container.height();

	if (opt.responsiveLevels.length>1) 
		opt.responsiveLevels[0] = 9999;
	else
		opt.responsiveLevels = 9999;
	
	// RECORD THUMBS AND SET INDEXES
	jQuery.each(opt.li,function(index,li) {
		var li = jQuery(li),
			img = li.find('.rev-slidebg') || li.find('img').first(),
			i = 0;			
		li.addClass("tp-revslider-slidesli");
		if (li.data('index')===undefined) li.data('index','rs-'+Math.round(Math.random()*999999));

		var obj = new Object;
		obj.params = new Array();
		
		obj.id = li.data('index');
		obj.src = li.data('thumb')!==undefined ? li.data('thumb') : img.data('lazyload') !== undefined ? img.data('lazyload') : img.attr('src');					
		if (li.data('title') !== undefined) obj.params.push({from:RegExp("\\{\\{title\\}\\}","g"), to:li.data("title")})		
		if (li.data('description') !== undefined) obj.params.push({from:RegExp("\\{\\{description\\}\\}","g"), to:li.data("description")})		
		for (var i=1;i<=10;i++) {
			if (li.data("param"+i)!==undefined) 
				obj.params.push({from:RegExp("\\{\\{param"+i+"\\}\\}","g"), to:li.data("param"+i)})
		}			
		opt.thumbs.push(obj);	

		li.data('origindex',li.index());
		
		// IF LINK ON SLIDE EXISTS, NEED TO CREATE A PROPER LAYER FOR IT.
		if (li.data('link')!=undefined) {
			var link = li.data('link'),
				target= li.data('target') || "_self",
				zindex= li.data('slideindex')==="back" ? 0 : 60,					
				linktoslide=li.data('linktoslide'),
				checksl = linktoslide;					
			if (linktoslide != undefined) 
				if (linktoslide!="next" && linktoslide!="prev")
					opt.li.each(function() {
						var t = jQuery(this);
						if (t.data('origindex')+1==checksl) linktoslide = t.index()+1;
					});
			
			
			if (link!="slide") linktoslide="no";
			var apptxt = '<div class="tp-caption sft slidelink" style="cursor:pointer;width:100%;height:100%;z-index:'+zindex+';" data-x="center" data-y="center" ',
				jts = linktoslide==="scroll_under" ? '[{"event":"click","action":"scrollbelow","offset":"100px","delay":"0"}]' : '[{"event":"click","action":"jumptoslide","slide":"2","delay":"0.2"}]'
			
			apptxt = linktoslide=="no" ? apptxt +' data-start="0">' : apptxt + 'data-actions='+"'"+jts + "'"+' data-start="0">';
			apptxt = apptxt + '<a style="width:100%;height:100%;display:block"';					
			apptxt = link!="slide" ? apptxt + ' target="'+target+'" href="'+link+'"' : apptxt;
			apptxt = apptxt + '><span style="width:100%;height:100%;display:block"></span></a></div>';
			li.append(apptxt);
		}			
	});

	
	// CREATE GRID WIDTH AND HEIGHT ARRAYS		
	opt.rle = opt.responsiveLevels.length || 1;
	opt.gridwidth = cArray(opt.gridwidth,opt.rle);
	opt.gridheight = cArray(opt.gridheight,opt.rle);																														
	// END OF VERSION 5.0 INIT MODIFICATION



	// SIMPLIFY ANIMATIONS ON OLD IOS AND IE8 IF NEEDED
	if (opt.simplifyAll=="on" && (_R.isIE(8) || _R.iOSVersion())) {
		container.find('.tp-caption').each(function() {
			var tc = jQuery(this);
			tc.removeClass("customin customout").addClass("fadein fadeout");
			tc.data('splitin',"");
			tc.data('speed',400);
		})
		opt.li.each(function() {
			var li= jQuery(this);				
			li.data('transition',"fade");
			li.data('masterspeed',500);
			li.data('slotamount',1);
			var img = li.find('.rev-slidebg') || li.find('>img').first();
			img.data('kenburns',"off");
		});
	}

	opt.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);

	// SOME OPTIONS WHICH SHOULD CLOSE OUT SOME OTHER SETTINGS		
	opt.autoHeight = opt.sliderLayout=="fullscreen" ? "on" : opt.autoHeight;		

	if (opt.sliderLayout=="fullwidth" && opt.autoHeight=="off") container.css({maxHeight:opt.gridheight[opt.curWinRange]+"px"});
	
	// BUILD A FORCE FULLWIDTH CONTAINER, TO SPAN THE FULL SLIDER TO THE FULL WIDTH OF BROWSER
	if (opt.sliderLayout!="auto" && container.closest('.forcefullwidth_wrapper_tp_banner').length==0) {
		if (opt.sliderLayout!=="fullscreen" || opt.fullScreenAutoWidth!="on") {			
			var cp = container.parent(),				
				mb = cp.css('marginBottom'),
				mt = cp.css('marginTop');
			mb = mb===undefined ? 0 : mb;
			mt = mt===undefined ? 0 : mt;

			cp.wrap('<div class="forcefullwidth_wrapper_tp_banner" style="position:relative;width:100%;height:auto;margin-top:'+mt+';margin-bottom:'+mb+'"></div>');
			container.closest('.forcefullwidth_wrapper_tp_banner').append('<div class="tp-fullwidth-forcer" style="width:100%;height:'+container.height()+'px"></div>');
			container.parent().css({marginTop:"0px",marginBottom:"0px"});
			//container.css({'backgroundColor':container.parent().css('backgroundColor'),'backgroundImage':container.parent().css('backgroundImage')});
			container.parent().css({position:'absolute'});						
		}
	}



	// SHADOW ADD ONS
	if (opt.shadow!==undefined && opt.shadow>0) {
		container.parent().addClass('tp-shadow'+opt.shadow);			
		container.parent().append('<div class="tp-shadowcover"></div>');
		container.parent().find('.tp-shadowcover').css({'backgroundColor':container.parent().css('backgroundColor'),'backgroundImage':container.parent().css('backgroundImage')});
	}

	// ESTIMATE THE CURRENT WINDOWS RANGE INDEX
	setCurWinRange(opt);
	
	// IF THE CONTAINER IS NOT YET INITIALISED, LETS GO FOR IT
	if (!container.hasClass("revslider-initialised")) {
		// MARK THAT THE CONTAINER IS INITIALISED WITH SLIDER REVOLUTION ALREADY
		container.addClass("revslider-initialised");

		// FOR BETTER SELECTION, ADD SOME BASIC CLASS
		container.addClass("tp-simpleresponsive");

		// WE DONT HAVE ANY ID YET ? WE NEED ONE ! LETS GIVE ONE RANDOMLY FOR RUNTIME
		if (container.attr('id')==undefined) container.attr('id',"revslider-"+Math.round(Math.random()*1000+5));

		// CHECK IF FIREFOX 13 IS ON WAY.. IT HAS A STRANGE BUG, CSS ANIMATE SHOULD NOT BE USED
		opt.firefox13 = false;
		opt.ie = !jQuery.support.opacity;
		opt.ie9 = (document.documentMode == 9);

		opt.origcd=opt.delay;



		// CHECK THE jQUERY VERSION
		var version = jQuery.fn.jquery.split('.'),
			versionTop = parseFloat(version[0]),
			versionMinor = parseFloat(version[1]),
			versionIncrement = parseFloat(version[2] || '0');
		if (versionTop==1 && versionMinor < 7) 
			container.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:'+version+' <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>');									
		if (versionTop>1) opt.ie=false;
		 		
					

		// PREPARE VIDEO PLAYERS
		var addedApis = new Object();				
		addedApis.addedyt=0;
		addedApis.addedvim=0;
		addedApis.addedvid=0;
		
		container.find('.tp-caption, .rs-background-video-layer').each(function(i) {
			var _nc = jQuery(this),
				an = _nc.data('autoplayonlyfirsttime'),
				ap = _nc.data('autoplay');

			if (_nc.hasClass("tp-static-layer") && _R.handleStaticLayers)
				_R.handleStaticLayers(_nc,opt);

			// FIX VISIBLE IFRAME BUG IN SAFARI
			var iff = 0;
			_nc.find('iframe').each(function() {
				punchgs.TweenLite.set(jQuery(this),{autoAlpha:0});
				iff++;
			})
			if (iff>0)
				_nc.data('iframes',true)

			if (_nc.hasClass("tp-caption")) {
				// PREPARE LAYERS AND WRAP THEM WITH PARALLAX, LOOP, MASK HELP CONTAINERS
				var ec = _nc.hasClass("slidelink") ? "width:100% !important;height:100% !important;" : "";
				_nc.wrap('<div class="tp-parallax-wrap" style="'+ec+'position:absolute;visibility:hidden"><div class="tp-loop-wrap" style="'+ec+'position:absolute;"><div class="tp-mask-wrap" style="'+ec+'position:absolute" ></div></div></div>');				
				var lar = ['pendulum', 'rotate','slideloop','pulse','wave'],
					_lc = _nc.closest('.tp-loop-wrap');
				
				jQuery.each(lar,function(i,k) {	
					var lw = _nc.find('.rs-'+k),
						f = lw.data() || "";
					if (f!="") {			
						_lc.data(f);
						_lc.addClass("rs-"+k);									
						lw.children(0).unwrap();
						_nc.data('loopanimation',"on");
					}
				});	
				punchgs.TweenLite.set(_nc,{visibility:"hidden"});
			}

			var as = _nc.data('actions');
			if (as!==undefined) _R.checkActions(_nc,opt,as);

			checkHoverDependencies(_nc,opt);

			if (_R.checkVideoApis)
				addedApis = _R.checkVideoApis(_nc,opt,addedApis);

			// REMOVE VIDEO AUTOPLAYS FOR MOBILE DEVICES 
			if (_ISM) {
				if (an == true || an=="true") {
						_nc.data('autoplayonlyfirsttime',"false");
						an=false;
				}
				if (ap==true || ap=="true" || ap=="on" || ap=="1sttime") {
					 _nc.data('autoplay',"off");
					 ap="off";
				}

			}
			

			// PREPARE TIMER BEHAVIOUR BASED ON AUTO PLAYED VIDEOS IN SLIDES
			if (an == true || an=="true" || ap == "1sttime")  
				_nc.closest('li.tp-revslider-slidesli').addClass("rs-pause-timer-once");
			
			if (ap==true || ap=="true" || ap == "on" || ap == "no1sttime") 
				_nc.closest('li.tp-revslider-slidesli').addClass("rs-pause-timer-always");
				
							
		});

		container.hover(
			function() {				
					container.trigger('tp-mouseenter');		
					opt.overcontainer=true;			
			},
			function() {
					container.trigger('tp-mouseleft');												
					opt.overcontainer=false;
			});


		container.on('mouseover',function() {
			container.trigger('tp-mouseover');
			opt.overcontainer=true;
		})

		// REMOVE ANY VIDEO JS SETTINGS OF THE VIDEO  IF NEEDED  (OLD FALL BACK, AND HELP FOR 3THD PARTY PLUGIN CONFLICTS)
		container.find('.tp-caption video').each(function(i) {
			var v = jQuery(this);
			v.removeClass("video-js vjs-default-skin");
			v.attr("preload","");
			v.css({display:"none"});
		});

		//PREPARE LOADINGS ALL IN SEQUENCE
		if (opt.sliderType!=="standard") opt.lazyType = "all";
		
		
		// PRELOAD STATIC LAYERS			
		loadImages(container.find('.tp-static-layers'),opt,0);

		waitForCurrentImages(container.find('.tp-static-layers img'),opt,function() {
			container.find('.tp-static-layers img').each(function() {								
				var e = jQuery(this),
					src = e.data('lazyload') != undefined ? e.data('lazyload') : e.attr('src'),
					loadobj = getLoadObj(opt,src);								
				e.attr('src',loadobj.src)				
			})
		})



		// SET ALL LI AN INDEX AND INIT LAZY LOADING
		opt.li.each(function(i) {
			var li = jQuery(this);
			
			if (opt.lazyType=="all" || (opt.lazyType=="smart" && (i==0 || i == 1 || i == opt.slideamount || i == opt.slideamount-1))) { 								
				loadImages(li,opt,i);	
				waitForCurrentImages(li,opt,function() { 
					if (opt.sliderType=="carousel") 
						punchgs.TweenLite.to(li,1,{autoAlpha:1,ease:punchgs.Power3.easeInOut});
				});					
			}

		});

		

		// IF DEEPLINK HAS BEEN SET
		var deeplink = getUrlVars("#")[0];
		if (deeplink.length<9) {
			if (deeplink.split('slide').length>1) {
				var dslide=parseInt(deeplink.split('slide')[1],0);
				if (dslide<1) dslide=1;
				if (dslide>opt.slideamount) dslide=opt.slideamount;
				opt.startWithSlide=dslide-1;
			}
		}
		
		// PREPARE THE SPINNER
		container.append(	'<div class="tp-loader '+opt.spinner+'">'+
					  		'<div class="dot1"></div>'+
					  	    '<div class="dot2"></div>'+
					  	    '<div class="bounce1"></div>'+
							'<div class="bounce2"></div>'+
							'<div class="bounce3"></div>'+
						 '</div>');
		

		// RESET THE TIMER
		if (container.find('.tp-bannertimer').length===0) container.append('<div class="tp-bannertimer" style="visibility:hidden"></div>');
		container.find('.tp-bannertimer').css({'width':'0%'});
		container.find('.tp-bannertimer').data('opt',opt);
		
		// PREPARE THE SLIDES
		opt.ul.css({'display':'block'});
		prepareSlides(container,opt);
		if (opt.parallax.type!=="off") _R.checkForParallax(container,opt);

		
		// PREPARE SLIDER SIZE			
		_R.setSize(opt);
		

		// Call the Navigation Builder
		if (opt.sliderType!=="hero") _R.createNavigation(container,opt);
		if (_R.resizeThumbsTabs) _R.resizeThumbsTabs(opt);
		contWidthManager(opt);
		var _v = opt.viewPort;
		opt.inviewport = false;
		
		if (_v !=undefined && _v.enable) {
			_v.visible_area = parseFloat(_v.visible_area)/100;
			_v.visible_area = _v.visible_area<0.001 ? _v.visible_area*100 : _v.visible_area;
			if (_R.scrollTicker) _R.scrollTicker(opt,container);
		}
		


		// START THE SLIDER
		setTimeout(function() {
			if ( opt.sliderType =="carousel") _R.prepareCarousel(opt);	
			
			if (!_v.enable || (_v.enable && opt.inviewport) || (_v.enable &&  !opt.inviewport && !_v.outof=="wait")) {
				swapSlide(container,opt);	
			}
			else
				opt.waitForFirstSlide = true;

			if (_R.manageNavigation) _R.manageNavigation(opt);	


			// START COUNTDOWN
			if (opt.slideamount>1) {
				if (!_v.enable || (_v.enable && opt.inviewport)) 
					countDown(container,opt);
				else
					opt.waitForCountDown = true;
			}
			setTimeout(function() {					
				container.trigger('revolution.slide.onloaded');					
			},100);
		},opt.startDelay);
		opt.startDelay=0;

		

		/******************************
			-	FULLSCREEN CHANGE	-
		********************************/
		// FULLSCREEN MODE TESTING
		jQuery("body").data('rs-fullScreenMode',false);
		jQuery(window).on ('mozfullscreenchange webkitfullscreenchange fullscreenchange',function(){
		     jQuery("body").data('rs-fullScreenMode',!jQuery("body").data('rs-fullScreenMode'));
		     if (jQuery("body").data('rs-fullScreenMode')) {
			     setTimeout(function() {
			     	jQuery(window).trigger("resize");
			     },200);
		     }
		});

		var resizid = "resize.revslider-"+container.attr('id');

		// IF RESIZED, NEED TO STOP ACTUAL TRANSITION AND RESIZE ACTUAL IMAGES
		jQuery(window).on(resizid,function() {
			if (container==undefined) return false;
			
			if (jQuery('body').find(container)!=0) 				
				contWidthManager(opt);							
				
				if (container.outerWidth(true)!=opt.width || container.is(":hidden") || (opt.sliderLayout=="fullscreen" && jQuery(window).height()!=opt.lastwindowheight)) {
						opt.lastwindowheight = jQuery(window).height();
						containerResized(container,opt);
				}


		});
		
		hideSliderUnder(container,opt);	
		contWidthManager(opt);		
		if (!opt.disableFocusListener && opt.disableFocusListener!="true" && opt.disableFocusListener!==true) tabBlurringCheck(container,opt);
	}
}

/*************************************
	-	 CREATE SIMPLE ARRAYS	-
**************************************/
var cArray = function(b,l) {		
	if (!jQuery.isArray(b)) {
		var t = b;
		b = new Array();
		b.push(t);
	}		
	if (b.length<l) {			
		var t = b[b.length-1];
		for (var i=0;i<(l-b.length)+2;i++)
			b.push(t)
	}		
	return b;
}



var checkHoverDependencies = function(_nc,opt) {
	
	if (_nc.data('start')==="sliderenter") {		
		if (opt.layersonhover===undefined) {					
			opt.c.on('tp-mouseenter',function() {								
				if (opt.layersonhover)					
					jQuery.each(opt.layersonhover,function(i,tnc) {											
						tnc.data('animdirection',"in");
						var otl = tnc.data('timeline_out'),
							base_offsetx = opt.sliderType==="carousel" ? 0 : opt.width/2 - (opt.gridwidth[opt.curWinRange]*opt.bw)/2,
							base_offsety=0,
							cli = tnc.closest('.tp-revslider-slidesli');

						if (cli.hasClass("active-revslide") || cli.hasClass("processing-revslide")) {

							if (otl!=undefined) {										
								otl.pause(0);
								otl.kill();													
							}							
							_R.animateSingleCaption(tnc,opt,base_offsetx,base_offsety,0,false,true);	
							var tl = tnc.data('timeline');
							tnc.data('triggerstate',"on");																															
							tl.play(0);										
						}
					});
			});
			opt.c.on('tp-mouseleft',function() {
				if (opt.layersonhover)
					jQuery.each(opt.layersonhover,function(i,tnc) {
						tnc.data('animdirection',"out");
						tnc.data('triggered',true);
						tnc.data('triggerstate',"off");
						if (_R.stopVideo) _R.stopVideo(tnc,opt);												
						if (_R.endMoveCaption) _R.endMoveCaption(tnc,null,null,opt);	
					});
			});			
			opt.layersonhover = new Array;
		} 				
		opt.layersonhover.push(_nc);
	}
}



var contWidthManager = function(opt) {	
	if (opt.sliderLayout!="auto" && (opt.sliderLayout!=="fullscreen" || opt.fullScreenAutoWidth!="on")) {
		var loff = Math.ceil(opt.c.closest('.forcefullwidth_wrapper_tp_banner').offset().left - _R.getHorizontalOffset(opt.c,"left"));																
		punchgs.TweenLite.set(opt.c.parent(),{'left':(0-loff)+"px",'width':jQuery(window).width()-_R.getHorizontalOffset(opt.c,"both")});		
	} else {
		var loff =_R.getHorizontalOffset(opt.c,"left");									
		punchgs.TweenLite.set(opt.ul,{left:loff,width:opt.c.width()-_R.getHorizontalOffset(opt.c,"both")});		
	}	
	// put Static Layer Wrapper in Position
	if (opt.slayers)
		punchgs.TweenLite.set(opt.slayers,{left:loff});
}


var cv = function(a,d) {
  	return a===undefined ? d : a;
}


var hideSliderUnder = function(container,opt,resized) {
	// FIRST TIME STOP/START HIDE / SHOW SLIDER
	//REMOVE AND SHOW SLIDER ON DEMAND
	var contpar= container.parent();
	if (jQuery(window).width()<opt.hideSliderAtLimit) {
		container.trigger('stoptimer');
		if (contpar.css('display')!="none")
			contpar.data('olddisplay',contpar.css('display'));
		contpar.css({display:"none"});
	} else {
		if (container.is(":hidden") && resized) {
			if (contpar.data('olddisplay')!=undefined && contpar.data('olddisplay')!="undefined" && contpar.data('olddisplay') != "none")
				contpar.css({display:contpar.data('olddisplay')});
			else
				contpar.css({display:"block"});
			container.trigger('restarttimer');
			setTimeout(function() {
				containerResized(container,opt);
			},150)
		}
	}
	if (_R.hideUnHideNav) _R.hideUnHideNav(opt);	
}


//////////////////////////
//	CONTAINER RESIZED	//
/////////////////////////
var containerResized = function (c,opt) {
	
	setCurWinRange(opt);
	if (!_R.resizeThumbsTabs || _R.resizeThumbsTabs(opt)===true) {
		
		hideSliderUnder(c,opt,true);
		contWidthManager(opt);
		
		if ( opt.sliderType =="carousel") _R.prepareCarousel(opt,true);		

		if (c===undefined) return false;
								
		_R.setSize(opt);
		
		opt.conw = opt.c.width();
		opt.conh = opt.c.height();
		
										
		var actsh = c.find('.active-revslide .slotholder'),
			nextsh = c.find('.processing-revslide .slotholder');
		
		removeSlots(c,opt,c,2);

		if (opt.sliderType==="standard") {
			punchgs.TweenLite.set(nextsh.find('.defaultimg'),{opacity:0});		
			actsh.find('.defaultimg').css({'opacity':1});
		} 

		
		if ( opt.sliderType =="carousel" && opt.lastconw != opt.conw)  {
			clearTimeout(opt.pcartimer);
			opt.pcartimer = setTimeout(function() {
				_R.prepareCarousel(opt,true);		
			},100);
			opt.lastconw = opt.conw;
		}

		if (_R.manageNavigation) _R.manageNavigation(opt);


		if (_R.animateTheCaptions) _R.animateTheCaptions(c.find('.active-revslide'), opt,true);


		if (nextsh.data('kenburns')=="on") 				
			_R.startKenBurn(nextsh,opt,nextsh.data('kbtl').progress());

		if (actsh.data('kenburns')=="on") 				
			_R.startKenBurn(actsh,opt,actsh.data('kbtl').progress());
	}				
}

	
	
	
	

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////       PREPARING / REMOVING		////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
var setScale = function(opt) {
	opt.bw = (opt.width / opt.gridwidth[opt.curWinRange]);
	opt.bh = (opt.height / opt.gridheight[opt.curWinRange]);
	
	
	if (opt.bh>opt.bw) 
		opt.bh=opt.bw
	else
		opt.bw = opt.bh;
	
	if (opt.bh>1 || opt.bw>1) { opt.bw=1; opt.bh=1; }
}

	



/////////////////////////////////////////
//	-	PREPARE THE SLIDES / SLOTS -  //
///////////////////////////////////////
var prepareSlides = function(container,opt) {

	container.find('.tp-caption').each(function() { 
		var c = jQuery(this);
		if (c.data('transition')!==undefined) c.addClass(c.data('transition')); 
	});

	// PREPARE THE UL CONTAINER TO HAVEING MAX HEIGHT AND HEIGHT FOR ANY SITUATION
	opt.ul.css({overflow:'hidden',width:'100%',height:'100%',maxHeight:container.parent().css('maxHeight')})
	if (opt.autoHeight=="on") {
	   opt.ul.css({overflow:'hidden',width:'100%',height:'100%',maxHeight:"none"});
	   container.css({'maxHeight':'none'});
	   container.parent().css({'maxHeight':'none'});
	 }
	//_R.setSize("",opt);
	opt.li.each(function(j) {
		var li=jQuery(this),
			originalIndex = li.data('originalindex');
					
		//START WITH CORRECT SLIDE
		if ((opt.startWithSlide !=undefined && originalIndex==opt.startWithSlide) || opt.startWithSlide ===undefined && j==0)
			li.addClass("next-revslide");
		

		// MAKE LI OVERFLOW HIDDEN FOR FURTHER ISSUES
		li.css({'width':'100%','height':'100%','overflow':'hidden'});
					
	});

	if (opt.sliderType === "carousel") {
		//SET CAROUSEL				
		opt.ul.css({overflow:"visible"}).wrap('<div class="tp-carousel-wrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden;"></div>');
		var apt = '<div style="clear:both;display:block;width:100%;height:1px;position:relative;margin-bottom:-1px"></div>';
		opt.c.parent().prepend(apt);
		opt.c.parent().append(apt);
		_R.prepareCarousel(opt);				
	}

	// RESOLVE OVERFLOW HIDDEN OF MAIN CONTAINER
	container.parent().css({'overflow':'visible'});


	opt.li.find('>img').each(function(j) {

		var img=jQuery(this),
			bgvid = img.closest('li').find('.rs-background-video-layer');


		img.addClass('defaultimg');				
						
		// TURN OF KEN BURNS IF WE ARE ON MOBILE AND IT IS WISHED SO
		if (opt.panZoomDisableOnMobile == "on"  && _ISM) {
			img.data('kenburns',"off");
			img.data('bgfit',"cover");
		}

	
		img.wrap('<div class="slotholder" style="width:100%;height:100%;"></div>');
		var dts = img.data();
		img.closest('.slotholder').data(dts);
									
		if (bgvid.length>0 && dts.bgparallax!=undefined)
			bgvid.data('bgparallax',dts.bgparallax);

		if (opt.dottedOverlay!="none" && opt.dottedOverlay!=undefined)
				img.closest('.slotholder').append('<div class="tp-dottedoverlay '+opt.dottedOverlay+'"></div>');

		var src=img.attr('src');		
		dts.src = src;		
		dts.bgfit = dts.bgfit || "cover";
		dts.bgrepeat = dts.bgrepeat || "no-repeat",
		dts.bgposition = dts.bgposition || "center center";

		var pari = img.closest('.slotholder');
		img.parent().append('<div class="tp-bgimg defaultimg" style="background-color:'+img.css("backgroundColor")+';background-repeat:'+dts.bgrepeat+';background-image:url('+src+');background-size:'+dts.bgfit+';background-position:'+dts.bgposition+';width:100%;height:100%;"></div>');
		var comment = document.createComment("Runtime Modification - Img tag is Still Available for SEO Goals in Source - " + img.get(0).outerHTML);
		img.replaceWith(comment);
		img = pari.find('.tp-bgimg');			
		img.data(dts);
		img.attr("src",src);

		if (opt.sliderType === "standard" || opt.sliderType==="undefined") 				
			img.css({'opacity':0});
	
	})

	
}


//	REMOVE SLOTS	//
var removeSlots = function(container,opt,where,addon) {
	opt.removePrepare = opt.removePrepare + addon;
	where.find('.slot').each(function() {
		jQuery(this).remove();
	});	
	opt.transition = 0;	
	opt.removePrepare = 0;	
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////       SLIDE SWAPS			////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	


// THE IMAGE IS LOADED, WIDTH, HEIGHT CAN BE SAVED
var cutParams = function(a) {
	var b = a;
	if (a!=undefined && a.length>0)
		b = a.split("?")[0];
	return b;
}

var relativeRedir = function(redir){
  return location.pathname.replace(/(.*)\/[^/]*/, "$1/"+redir);
}

var abstorel = function (base, relative) {
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
}

var imgLoaded = function(img,opt,progress) {
	opt.syncload--;	
	if (opt.loadqueue)
		jQuery.each(opt.loadqueue, function(index,queue) {		

			var mqsrc = queue.src.replace(/\.\.\/\.\.\//gi,""),
				fullsrc = self.location.href,
				origin = document.location.origin,
				fullsrc_b = fullsrc.substring(0,fullsrc.length-1)+"/"+mqsrc,
				origin_b = origin+"/"+mqsrc,
				absolute = abstorel(self.location.href,queue.src);
						
			fullsrc = fullsrc.substring(0,fullsrc.length-1)+mqsrc;						
			origin = origin+mqsrc;
						
			if (cutParams(origin) === cutParams(decodeURIComponent(img.src)) || 
				cutParams(fullsrc)=== cutParams(decodeURIComponent(img.src)) || 
				cutParams(absolute)=== cutParams(decodeURIComponent(img.src)) || 
				cutParams(origin_b) === cutParams(decodeURIComponent(img.src)) || 
				cutParams(fullsrc_b)=== cutParams(decodeURIComponent(img.src)) || 
				cutParams(queue.src) === cutParams(decodeURIComponent(img.src)) || 
				cutParams(queue.src).replace(/^.*\/\/[^\/]+/, '') === cutParams(decodeURIComponent(img.src)).replace(/^.*\/\/[^\/]+/, '') || 
				(window.location.origin==="file://" && cutParams(img.src).match(new RegExp(mqsrc)))) {																	
					queue.progress = progress;
					queue.width = img.width;
					queue.height = img.height;
			} 
		});		
	progressImageLoad(opt);
}

// PRELOAD IMAGES 3 PIECES ON ONE GO, CHECK LOAD PRIORITY
var progressImageLoad = function(opt) {		
	if (opt.syncload == 3) return;
	if (opt.loadqueue)
		jQuery.each(opt.loadqueue, function(index,queue) {	
			if (queue.progress.match(/prepared/g)) {				
			 	 if (opt.syncload<=3) {			 	 	
					opt.syncload++;					
					var img = new Image();
					
					img.onload = function() {											
					 	imgLoaded(this,opt,"loaded");					
					};
					img.onerror = function() {
						imgLoaded(this,opt,"failed");					
					};					 
					img.src=queue.src;
					queue.progress="inload";
				}
			}				
		});
}

// ADD TO QUEUE THE NOT LOADED IMAGES YES
var addToLoadQueue = function(src,opt,prio) {		
	var alreadyexist = false;	
	if (opt.loadqueue)	
		jQuery.each(opt.loadqueue, function(index,queue) {			
			if (queue.src === src) alreadyexist = true;
		});


	if (!alreadyexist) {
		var loadobj = new Object();			
		loadobj.src = src;
		loadobj.prio = prio;
		loadobj.progress = "prepared";
		opt.loadqueue.push(loadobj);
	}				

}

// LOAD THE IMAGES OF THE PREDEFINED CONTAINER
var loadImages = function(container,opt,prio) {	
	
	container.find('img,.defaultimg').each(function() {
		var element = jQuery(this),
			src = element.data('lazyload') !== undefined && element.data('lazyload')!=="undefined" ? element.data('lazyload') : element.attr('src');							
		
		element.data('start-to-load',jQuery.now());
		addToLoadQueue(src,opt,prio);
	});
	progressImageLoad(opt);
}

// FIND SEARCHED IMAGE IN THE LOAD QUEUE
var getLoadObj = function(opt,src) {	
	var obj = new Object();
	if (opt.loadqueue)
		jQuery.each(opt.loadqueue, function(index,queue) {			
			if (queue.src == src) obj = queue;
		});
	return obj;
}

// WAIT PROGRESS TILL THE PREDEFINED CONTAINER HAS ALL IMAGES LOADED INSIDE
var waitForCurrentImages = function(nextli,opt,callback) {

	var waitforload = false;
	nextli.find('img,.defaultimg').each(function() {
		var element = jQuery(this),
			src = element.data('lazyload') != undefined ? element.data('lazyload') : element.attr('src'),
			loadobj = getLoadObj(opt,src);
		

		// IF ELEMENTS IS NOT LOADED YET, AND IT IS NOW LOADED
		if (element.data('loaded')===undefined && loadobj !==undefined && loadobj.progress && loadobj.progress.match(/loaded/g)) {
			
			element.attr('src',loadobj.src);
			// IF IT IS A DEFAULT IMG, WE NEED TO ASSIGN SOME SPECIAL VALUES TO IT
			if (element.hasClass("defaultimg")) {		
				if (!_R.isIE(8))
					element.css({backgroundImage:'url("'+loadobj.src+'")'});
				else {
					defimg.attr('src',loadobj.src);
				}			
				nextli.data('owidth',loadobj.width);
				nextli.data('oheight',loadobj.height);
				nextli.find('.slotholder').data('owidth',loadobj.width);
				nextli.find('.slotholder').data('oheight',loadobj.height);
			} else { 
				var w = element.data('ww'),
					h = element.data('hh');
				
				element.data('owidth',loadobj.width);
				element.data('oheight',loadobj.height);

				w = w==undefined || w =="auto" || w=="" ? loadobj.width : w;
				h = h==undefined || h =="auto" || h=="" ? loadobj.height : h;
				
				
				element.data('ww',w);
				element.data('hh',h); 
				
			}
			// ELEMENT IS NOW FULLY LOADED
			element.data('loaded',true);
		} 		


		if (loadobj && loadobj.progress && loadobj.progress.match(/inprogress|inload|prepared/g)) 
			if (jQuery.now()-element.data('start-to-load')<5000) 
					waitforload = true;			
			else
				console.error(src+"  Could not be loaded !");
		
		// WAIT FOR VIDEO API'S					
		if (opt.youtubeapineeded == true && (!window['YT'] || YT.Player==undefined)) {		
			waitforload = true;			
			if (jQuery.now()-opt.youtubestarttime>5000 && opt.youtubewarning!=true) {
				opt.youtubewarning = true;
				var txt = "YouTube Api Could not be loaded !";
				if (location.protocol === 'https:') txt = txt + " Please Check and Renew SSL Certificate !";
				console.error(txt); 
				opt.c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>'+txt+'</strong></div>')				 				
			}
		}

		if (opt.vimeoapineeded == true && !window['Froogaloop']) {
			waitforload = true;
			if (jQuery.now()-opt.vimeostarttime>5000 && opt.vimeowarning!=true) {
				opt.vimeowarning= true;
				var txt = "Vimeo Froogaloop Api Could not be loaded !";
				if (location.protocol === 'https:') txt = txt + " Please Check and Renew SSL Certificate !";
				console.error(txt); 
				opt.c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>'+txt+'</strong></div>')				 
			}
		}			
	});
	

	if (waitforload) 
		setTimeout(function() {
				waitForCurrentImages(nextli,opt,callback) ;
			},19);
	else 		
		callback();
	
}


//////////////////////////////////////
//	-	CALL TO SWAP THE SLIDES -  //
/////////////////////////////////////
var swapSlide = function(container,opt) {	

	clearTimeout(opt.waitWithSwapSlide);



	if (container.find('.processing-revslide').length>0) {			
		opt.waitWithSwapSlide = setTimeout(function() {
			swapSlide(container,opt);
			
		},150);
		return false;
	}	

	var actli = container.find('.active-revslide'),
		nextli = container.find('.next-revslide'),
		defimg= nextli.find('.defaultimg');
	
	
	if (nextli.index() === actli.index()) {
		nextli.removeClass("next-revslide");
		return false;
	}
	nextli.removeClass("next-revslide").addClass("processing-revslide");
			
	// CHECK IF WE ARE ALREADY AT LAST ITEM TO PLAY IN REAL LOOP SESSION
	if (opt.stopLoop=="on" && nextli.index()==opt.lastslidetoshow-1) {
		container.find('.tp-bannertimer').css({'visibility':'hidden'});
		container.trigger('revolution.slide.onstop');
		opt.noloopanymore = 1;
	} 

	// INCREASE LOOP AMOUNTS
	if (nextli.index()===opt.slideamount-1) {
		opt.looptogo=opt.looptogo-1;
		if (opt.looptogo<=0)
				opt.stopLoop="on";
	}	
	
	opt.tonpause = true;
	container.trigger('stoptimer');
	opt.cd=0;
	container.find('.tp-loader').css({display:"block"});
	loadImages(nextli,opt,1);


	// WAIT FOR SWAP SLIDE PROGRESS
	waitForCurrentImages(nextli,opt,function() {				 


		// MANAGE BG VIDEOS
		nextli.find('.rs-background-video-layer').each(function() {
			var _nc = jQuery(this);				
			if (!_nc.hasClass("HasListener")) {
				_nc.data('bgvideo',1);
				_R.manageVideoLayer(_nc,opt);
			}
			_nc.append('<div class="rs-fullvideo-cover"></div>')
		});
		swapSlideProgress(opt,defimg,container)
	});			

}

//////////////////////////////////////
//	-	PROGRESS SWAP THE SLIDES -  //
/////////////////////////////////////
var swapSlideProgress = function(opt,defimg,container) {
	
	var actli = container.find('.active-revslide'),	
		nextli = container.find('.processing-revslide'),		
		actsh = actli.find('.slotholder'),
		nextsh = nextli.find('.slotholder');
	opt.tonpause = false;
    opt.cd=0;
    container.trigger('nulltimer');
    
    container.find('.tp-loader').css({display:"none"});	
   // if ( opt.sliderType =="carousel") _R.prepareCarousel(opt);
	_R.setSize(opt);
	_R.slotSize(defimg,opt);
	
   	if (_R.manageNavigation) _R.manageNavigation(opt);
   	var data={};
   	data.nextslide=nextli;
    data.currentslide=actli;
	container.trigger('revolution.slide.onbeforeswap',data);

	opt.transition = 1;
	opt.videoplaying = false;

	// IF DELAY HAS BEEN SET VIA THE SLIDE, WE TAKE THE NEW VALUE, OTHER WAY THE OLD ONE...
	if (nextli.data('delay')!=undefined) {
				opt.cd=0;
				opt.delay=nextli.data('delay');
	} else 
		opt.delay=opt.origcd;


	var ai = actli.index(),
		ni = nextli.index();
	opt.sdir = ni<ai ? 1 : 0;
	
	if (opt.sc_indicator=="arrow") {	
		if (ai==0 && ni==opt.slideamount-1) opt.sdir = 1;
		if (ai==opt.slideamount-1 && ni==0) opt.sdir = 0;	
	}

	opt.lsdir = opt.lsdir === undefined ? opt.sdir : opt.lsdir; 
	opt.dirc = opt.lsdir != opt.sdir;
	opt.lsdir = opt.sdir;

	///////////////////////////
	//	REMOVE THE CAPTIONS //
	///////////////////////////


	
	if (actli.index() != nextli.index() && opt.firststart!=1) 	
		if (_R.removeTheCaptions) _R.removeTheCaptions(actli,opt);
    
	
	if (!nextli.hasClass('rs-pause-timer-once') && !nextli.hasClass("rs-pause-timer-always")) 		
    	container.trigger('restarttimer');		
    else
    	opt.videoplaying = true;   
	
    nextli.removeClass("rs-pause-timer-once");
		
	var nexttrans,
		direction=-1,
		mtl;
		
	// SELECT SLIDER TYPE
	if ( opt.sliderType =="carousel") {									
		mtl = new punchgs.TimelineLite();
		_R.prepareCarousel(opt,mtl);		
		letItFree(container,opt,nextsh,actsh,nextli,actli,mtl);
		opt.transition = 0;
		opt.firststart = 0;
	} else {	
		mtl = new punchgs.TimelineLite({onComplete:function() {				
			letItFree(container,opt,nextsh,actsh,nextli,actli,mtl);
		}});	
		mtl.add(punchgs.TweenLite.set(nextsh.find('.defaultimg'),{opacity:0}));
		mtl.pause();

		if (opt.firststart==1) {
			punchgs.TweenLite.set(actli,{autoAlpha:0});			
			opt.firststart=0;
		}

		
		punchgs.TweenLite.set(actli,{zIndex:18});
		punchgs.TweenLite.set(nextli,{autoAlpha:0,zIndex:20});
		
				
		// IF THERE IS AN OTHER FIRST SLIDE START HAS BEED SELECTED
		if (nextli.data('differentissplayed') =='prepared') {
			nextli.data('differentissplayed','done');
			nextli.data('transition',nextli.data('savedtransition'));
			nextli.data('slotamount',nextli.data('savedslotamount'));
			nextli.data('masterspeed',nextli.data('savedmasterspeed'));
		}


		if (nextli.data('fstransition') != undefined && nextli.data('differentissplayed') !="done") {

			nextli.data('savedtransition',nextli.data('transition'));
			nextli.data('savedslotamount',nextli.data('slotamount'));
			nextli.data('savedmasterspeed',nextli.data('masterspeed'));
			nextli.data('transition',nextli.data('fstransition'));
			nextli.data('slotamount',nextli.data('fsslotamount'));
			nextli.data('masterspeed',nextli.data('fsmasterspeed'));
			nextli.data('differentissplayed','prepared');
		}

		if (nextli.data('transition')==undefined) nextli.data('transition',"random");
		
		nexttrans = 0;		
		var transtext = nextli.data('transition') !== undefined ? nextli.data('transition').split(",") : "fade",
			curtransid = nextli.data('nexttransid') == undefined ? -1 : nextli.data('nexttransid');		
		if (nextli.data('randomtransition')=="on")
			curtransid = Math.round(Math.random()*transtext.length);
		else
			curtransid=curtransid+1;

		if (curtransid==transtext.length) curtransid=0;
		nextli.data('nexttransid',curtransid);

		var comingtransition = transtext[curtransid];

		if (opt.ie) {
			if (comingtransition=="boxfade") comingtransition = "boxslide";
			if (comingtransition=="slotfade-vertical") comingtransition = "slotzoom-vertical";
			if (comingtransition=="slotfade-horizontal") comingtransition = "slotzoom-horizontal";
		}

		if (_R.isIE(8)) 
			comingtransition = 11;	
		

						
		mtl = _R.animateSlide(nexttrans, comingtransition, container,  opt, nextli, actli, nextsh, actsh,  mtl);	
		if (nextsh.data('kenburns')=="on") {
			_R.startKenBurn(nextsh,opt);			
			mtl.add(punchgs.TweenLite.set(nextsh,{autoAlpha:0}))
		}
		
		// SHOW FIRST LI && ANIMATE THE CAPTIONS
		mtl.pause();
	}

	// START PARALLAX IF NEEDED		
	if (opt.parallax.type!="off" && opt.parallax.firstgo==undefined && _R.scrollHandling) {
		opt.parallax.firstgo = true;
		opt.lastscrolltop = -999;
		_R.scrollHandling(opt);
		setTimeout(function() {
			opt.lastscrolltop = -999;
			_R.scrollHandling(opt);
		},210);
		setTimeout(function() {
			opt.lastscrolltop = -999;
			_R.scrollHandling(opt);
		},420);
	}
	
	
	if (_R.animateTheCaptions) {
		_R.animateTheCaptions(nextli, opt,null,mtl);	
	} else {
		if (mtl != undefined) setTimeout(function() {			
			mtl.resume();
		},30);
	}
	punchgs.TweenLite.to(nextli,0.001,{autoAlpha:1});

	
}


//////////////////////////////////////////
//	GIVE FREE THE TRANSITIOSN			//
//////////////////////////////////////////
var letItFree = function(container,opt,nextsh,actsh,nextli,actli,mtl) {
	
	if (opt.sliderType==="carousel") {
		// CAROUSEL SLIDER
	}  else {
		opt.removePrepare = 0;
		punchgs.TweenLite.to(nextsh.find('.defaultimg'),0.001,{zIndex:20,autoAlpha:1,onComplete:function() {
			removeSlots(container,opt,nextli,1);

		}});
		if (nextli.index()!=actli.index()) {
			punchgs.TweenLite.to(actli,0.2,{zIndex:18,autoAlpha:0,onComplete:function() {
				removeSlots(container,opt,actli,1);							
			}});
		}
	}


	container.find('.active-revslide').removeClass("active-revslide");	
	container.find('.processing-revslide').removeClass("processing-revslide").addClass("active-revslide");
	opt.act=nextli.index();
			
	
	if (opt.parallax.type=="scroll" || opt.parallax.type=="scroll+mouse" || opt.parallax.type=="mouse+scroll") {
		opt.lastscrolltop = -999;
		_R.scrollHandling(opt);
	}
	
	mtl.clear();		
	
	
	if (actsh.data('kbtl')!=undefined) {
		actsh.data('kbtl').reverse();
		actsh.data('kbtl').timeScale(25);
	}	
	if (nextsh.data('kenburns')=="on") {		
		if (nextsh.data('kbtl')!=undefined) {
			nextsh.data('kbtl').timeScale(1);	
			nextsh.data('kbtl').play();						
		}
		else
			_R.startKenBurn(nextsh,opt);						
	}

	nextli.find('.rs-background-video-layer').each(function(i) {		
		if (_ISM) return false;
		var _nc = jQuery(this)
		_R.resetVideo(_nc,opt);								
		
		punchgs.TweenLite.fromTo(_nc,1,{autoAlpha:0},{autoAlpha:1,ease:punchgs.Power3.easeInOut,delay:0.2,onComplete:function() {		
			if (_R.animcompleted) _R.animcompleted(_nc,opt);
		}});
	});

	actli.find('.rs-background-video-layer').each(function(i) {		
		if (_ISM) return false;
		var _nc = jQuery(this);
		if (_R.stopVideo) {
			_R.resetVideo(_nc,opt);
			_R.stopVideo(_nc,opt);					
		}
		punchgs.TweenLite.to(_nc,1,{autoAlpha:0,ease:punchgs.Power3.easeInOut,delay:0.2});
	});
	// TIRGGER THE ON CHANGE EVENTS
	var data={};
	data.slideIndex=nextli.index()+1;
	data.slideLIIndex=nextli.index();
	data.slide = nextli;
	data.currentslide=nextli;
	data.prevslide = actli;
	container.trigger('revolution.slide.onchange',data);
	container.trigger('revolution.slide.onafterswap',data);			
	
}


///////////////////////////
//	REMOVE THE LISTENERS //
///////////////////////////
var removeAllListeners = function(container,opt) {
	container.children().each(function() {
	  try{ jQuery(this).die('click'); } catch(e) {}
	  try{ jQuery(this).die('mouseenter');} catch(e) {}
	  try{ jQuery(this).die('mouseleave');} catch(e) {}
	  try{ jQuery(this).unbind('hover');} catch(e) {}
	})
	try{ container.die('click','mouseenter','mouseleave');} catch(e) {}
	clearInterval(opt.cdint);
	container=null;
}

///////////////////////////
//	-	countDown	-	//
/////////////////////////
var countDown = function(container,opt) {
	opt.cd=0;
	opt.loop=0;
	if (opt.stopAfterLoops!=undefined && opt.stopAfterLoops>-1)
			opt.looptogo=opt.stopAfterLoops;
	else
		opt.looptogo=9999999;

	if (opt.stopAtSlide!=undefined && opt.stopAtSlide>-1)
			opt.lastslidetoshow=opt.stopAtSlide;
	else
			opt.lastslidetoshow=999;

	opt.stopLoop="off";

	if (opt.looptogo==0) opt.stopLoop="on";

	if (opt.slideamount >1 && !(opt.stopAfterLoops==0 && opt.stopAtSlide==1) ) {
			var bt=container.find('.tp-bannertimer');

			// LISTENERS  //container.trigger('stoptimer');
			container.on('stoptimer',function() {
				
				var bt = jQuery(this).find('.tp-bannertimer');
				bt.data('tween').pause();
				if (opt.disableProgressBar=="on") bt.css({visibility:"hidden"});
				opt.sliderstatus = "paused";
			});


			container.on('starttimer',function() {
				if (opt.conthover!=1 && opt.videoplaying!=true && opt.width>opt.hideSliderAtLimit && opt.tonpause != true && opt.overnav !=true)
					if (opt.noloopanymore !== 1 && (!opt.viewPort.enable || opt.inviewport)) {								
						bt.css({visibility:"visible"});
						bt.data('tween').resume();
						opt.sliderstatus = "playing";
					}

					if (opt.disableProgressBar=="on") bt.css({visibility:"hidden"});
			});


			container.on('restarttimer',function() {				 
				var bt = jQuery(this).find('.tp-bannertimer');
				if (opt.noloopanymore !== 1 && (!opt.viewPort.enable || opt.inviewport)) {
					bt.css({visibility:"visible"});
					bt.data('tween').kill();
					bt.data('tween',punchgs.TweenLite.fromTo(bt,opt.delay/1000,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:countDownNext,delay:1}));
					opt.sliderstatus = "playing";
				}
				if (opt.disableProgressBar=="on") bt.css({visibility:"hidden"});
			});

			container.on('nulltimer',function() {
					bt.data('tween').pause(0);
					if (opt.disableProgressBar=="on") bt.css({visibility:"hidden"});
					opt.sliderstatus = "paused";
			});

			var countDownNext = function() {
				if (jQuery('body').find(container).length==0) {
					removeAllListeners(container,opt);
					clearInterval(opt.cdint);
				}

				container.trigger("revolution.slide.slideatend");

				//STATE OF API CHANGED -> MOVE TO AIP BETTER
				if (container.data('conthover-changed') == 1) {
					opt.conthover=	container.data('conthover');
					container.data('conthover-changed',0);
				}

				_R.callingNewSlide(opt,container,1);												
			}

			bt.data('tween',punchgs.TweenLite.fromTo(bt,opt.delay/1000,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:countDownNext,delay:1}));
			bt.data('opt',opt);
			container.trigger("starttimer");

			container.on('tp-mouseenter',function() {							
					if (opt.navigation.onHoverStop=="on" && (!_ISM)) {
						container.trigger('stoptimer');
						container.trigger('revolution.slide.onpause');								
					}
			});
			container.on('tp-mouseleft',function() {
					if (container.data('conthover')!=1 && opt.navigation.onHoverStop=="on" && ((opt.viewPort.enable==true && opt.inviewport) || opt.viewPort.enable==false)) {
						container.trigger('revolution.slide.onresume');
						container.trigger('starttimer');									
					}
			});
	}
}


 

//////////////////////////////////////////////////////
// * Revolution Slider - NEEDFULL FUNCTIONS
// * @version: 1.0 (30.10.2014)
// * @author ThemePunch
//////////////////////////////////////////////////////



// 	-	BLUR / FOXUS FUNCTIONS ON BROWSER 

var vis = (function(){
	    var stateKey,
	        eventKey,
	        keys = {
	                hidden: "visibilitychange",
	                webkitHidden: "webkitvisibilitychange",
	                mozHidden: "mozvisibilitychange",
	                msHidden: "msvisibilitychange"
	    };
	    for (stateKey in keys) {
	        if (stateKey in document) {
	            eventKey = keys[stateKey];
	            break;
	        }
	    }
	    return function(c) {
	        if (c) document.addEventListener(eventKey, c);
	        return !document[stateKey];
	    }
	})();

var restartOnFocus = function(opt) {
	if (opt==undefined || opt.c==undefined) return false;
    punchgs.TweenLite.delayedCall(0.3,function(){        	
        // TAB IS ACTIVE, WE CAN START ANY PART OF THE SLIDER        
        if (opt.fallbacks.nextSlideOnWindowFocus=="on") opt.c.revnext();
        opt.c.revredraw();
        if (opt.lastsliderstatus=="playing")								
		opt.c.revresume();
    });
}

var lastStatBlur = function(opt) {
	opt.lastsliderstatus = opt.sliderstatus;
	opt.c.revpause();	
	var actsh = opt.c.find('.active-revslide .slotholder'),
		nextsh = opt.c.find('.processing-revslide .slotholder');

	if (nextsh.data('kenburns')=="on") 				
		_R.stopKenBurn(nextsh,opt);

	if (actsh.data('kenburns')=="on") 				
		_R.stopKenBurn(actsh,opt);
	
	
}

var tabBlurringCheck = function(container,opt) {
	var notIE = (document.documentMode === undefined),
	    isChromium = window.chrome;

	if (notIE && !isChromium) {
	    // checks for Firefox and other  NON IE Chrome versions
	    jQuery(window).on("focusin", function () {
			restartOnFocus(opt);
	    }).on("focusout", function () {
	    	lastStatBlur(opt);	    					
	    });
	} else {
	    // checks for IE and Chromium versions
	    if (window.addEventListener) {			    	
	        // bind focus event
	        window.addEventListener("focus", function (event) {
				restartOnFocus(opt);
	        }, false);
	        // bind blur event
	        window.addEventListener("blur", function (event) {
				lastStatBlur(opt);	  
	        }, false);

	    } else {
	        // bind focus event
	        window.attachEvent("focus", function (event) {
	        	restartOnFocus(opt);
	        });
	        // bind focus event
	        window.attachEvent("blur", function (event) {
				lastStatBlur(opt);	  
	        });
	    }
	}
}


// 	-	GET THE URL PARAMETER //

var getUrlVars = function (hashdivider){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf(hashdivider) + 1).split('_');
	for(var i = 0; i < hashes.length; i++)
	{
		hashes[i] = hashes[i].replace('%3D',"=");
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}
})(jQuery);