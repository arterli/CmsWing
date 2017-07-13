/********************************************
 * REVOLUTION 5.0 EXTENSION - LAYER ANIMATION
 * @version: 1.1.1 (07.09.2015)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/

(function($) {

var _R = jQuery.fn.revolution;

///////////////////////////////////////////
// 	EXTENDED FUNCTIONS AVAILABLE GLOBAL  //
///////////////////////////////////////////
jQuery.extend(true,_R, {

	// MAKE SURE THE ANIMATION ENDS WITH A CLEANING ON MOZ TRANSFORMS
 	animcompleted : function(_nc,opt) {			
		var t = _nc.data('videotype'),
			ap = _nc.data('autoplay'),
			an = _nc.data('autoplayonlyfirsttime');

		
		if (t!=undefined && t!="none")
		 if (ap==true || ap=="true" || ap=="on" ||  ap=="1sttime" || an) {				
			_R.playVideo(_nc,opt);			
			if ( an || ap=="1sttime") {
				_nc.data('autoplayonlyfirsttime',false);
				_nc.data('autoplay',"off");
			}
		  }	else 
		  if (ap=="no1sttime") 
			_nc.data('autoplay','on');		
	},

	/********************************************************
		-	PREPARE AND DEFINE STATIC LAYER DIRECTIONS -
	*********************************************************/
	handleStaticLayers : function(_nc,opt) {
		var s = parseInt(_nc.data('startslide'),0),
			e = parseInt(_nc.data('endslide'),0);
		if (s < 0)
			s=0;
		if (e <0 )
			e = opt.slideamount;
		if (s===0 && e===opt.slideamount-1)
			e = opt.slideamount+1;
		_nc.data('startslide',s);
		_nc.data('endslide',e);		
	},

	/************************************ 
		ANIMATE ALL CAPTIONS 
	*************************************/	
	animateTheCaptions : function(nextli, opt,recalled,mtl) {		
		var base_offsetx = opt.sliderType==="carousel" ? 0 : opt.width/2 - (opt.gridwidth[opt.curWinRange]*opt.bw)/2,
			base_offsety=0,
			index = nextli.data('index');


		opt.layers = opt.layers || new Object();
		opt.layers[index] = opt.layers[index] || nextli.find('.tp-caption')		
		opt.layers["static"] = opt.layers["static"] || opt.c.find('.tp-static-layers').find('.tp-caption');
			
		var allcaptions = new Array;

		opt.conh = opt.c.height();
		opt.conw = opt.c.width();
		opt.ulw = opt.ul.width();
		opt.ulh = opt.ul.height();



		/* ENABLE DEBUG MODE */
		if (opt.debugMode) {
			nextli.addClass("indebugmode");
			nextli.find('.helpgrid').remove();	
			opt.c.find('.hglayerinfo').remove();	
			nextli.append('<div class="helpgrid" style="width:'+(opt.gridwidth[opt.curWinRange]*opt.bw)+'px;height:'+(opt.gridheight[opt.curWinRange]*opt.bw)+'px;"></div>');
			var hg = nextli.find('.helpgrid');
			hg.append('<div class="hginfo">Zoom:'+(Math.round(opt.bw*100))+'% &nbsp;&nbsp;&nbsp; Device Level:'+opt.curWinRange+'&nbsp;&nbsp;&nbsp; Grid Preset:'+opt.gridwidth[opt.curWinRange]+'x'+opt.gridheight[opt.curWinRange]+'</div>')
			opt.c.append('<div class="hglayerinfo"></div>')
			hg.append('<div class="tlhg"></div>');
		}

		if (allcaptions)
			jQuery.each(allcaptions,function(i) {
				var _nc = jQuery(this);
				punchgs.TweenLite.set(_nc.find('.tp-videoposter'),{autoAlpha:1});
				punchgs.TweenLite.set(_nc.find('iframe'),{autoAlpha:0});
			})
		
		// COLLECT ALL CAPTIONS
		if (opt.layers[index])
			jQuery.each(opt.layers[index], function(i,a) { allcaptions.push(a); });
		if (opt.layers["static"])
			jQuery.each(opt.layers["static"], function(i,a) { allcaptions.push(a); });
		
		// GO THROUGH ALL CAPTIONS, AND MANAGE THEM
		if (allcaptions)
			jQuery.each(allcaptions,function(i) {	
				_R.animateSingleCaption(jQuery(this),opt,base_offsetx,base_offsety,i,recalled)
			}); 

		var bt=jQuery('body').find('#'+opt.c.attr('id')).find('.tp-bannertimer');
		bt.data('opt',opt);
		

		if (mtl != undefined) setTimeout(function() {			
			mtl.resume();
		},30);
	},

	/***************************************
		-	ANIMATE THE CAPTIONS   -
	***************************************/
	animateSingleCaption : function(_nc,opt,offsetx,offsety,i,recalled,triggerforce) {
		
		var internrecalled = recalled,
	    	staticdirection = staticLayerStatus(_nc,opt,"in",true),				
			_pw = _nc.data('_pw') || _nc.closest('.tp-parallax-wrap'),
			_lw = _nc.data('_lw') || _nc.closest('.tp-loop-wrap'),
			_mw = _nc.data('_mw') || _nc.closest('.tp-mask-wrap'),
			_responsive  = _nc.data('responsive') || "on",
			_respoffset  = _nc.data('responsive_offset') || "on",
			_ba = _nc.data('basealign') || "grid",				
			_gw = _ba==="grid" ? opt.width : opt.ulw, //opt.conw,
			_gh = _ba==="grid" ? opt.height : opt.ulh,  //opt.conh;
			rtl = jQuery('body').hasClass("rtl"); 

		

		if (!_nc.data('_pw')) {
			_nc.data('_pw',_pw);
			_nc.data('_lw',_lw);
			_nc.data('_mw',_mw);
		}

		if (opt.sliderLayout=="fullscreen") 
			offsety = _gh/2 - (opt.gridheight[opt.curWinRange]*opt.bh)/2;

		if (opt.autoHeight=="on" || (opt.minHeight!=undefined && opt.minHeight>0))
			  offsety = opt.conh/2 - (opt.gridheight[opt.curWinRange]*opt.bh)/2;;

		if (offsety<0) offsety=0;


		
		// LAYER GRID FOR DEBUGGING
		if (opt.debugMode) {
			_nc.closest('li').find('.helpgrid').css({top:offsety+"px", left:offsetx+"px"}); 
			var linfo = opt.c.find('.hglayerinfo');
			_nc.on("hover, mouseenter",function() {
				var ltxt = "",
					spa = 0;
				if (_nc.data())
					jQuery.each(_nc.data(),function(key,val) {
						if (typeof val !== "object") {
								
								ltxt = ltxt + '<span style="white-space:nowrap"><span style="color:#27ae60">'+key+":</span>"+val+"</span>&nbsp; &nbsp; ";
							
						}
					});
				linfo.html(ltxt);
			});
		}
		/* END OF DEBUGGING */

			
		var handlecaption=0,
			layervisible =  makeArray(_nc.data('visibility'),opt)[opt.curWinRange] || makeArray(_nc.data('visibility'),opt) || "on";
		
		// HIDE CAPTION IF RESOLUTION IS TOO LOW			
		if (layervisible=="off" || (_gw<opt.hideCaptionAtLimit && _nc.data('captionhidden')=="on") || (_gw<opt.hideAllCaptionAtLimit)) 
			_nc.addClass("tp-hidden-caption");											
		else
			_nc.removeClass("tp-hidden-caption")


		
		_nc.data('layertype',"html");

		if (offsetx<0) offsetx=0;

		// FALL BACK TO NORMAL IMAGES
		if (_nc.data('thumbimage')!=undefined && _nc.data('videoposter')==undefined)
				_nc.data('videoposter',_nc.data('thumbimage'))
				
		// FALL BACK TO NORMAL IMAGE IF NO VIDEO SHOULD BE PLAYED ON MOBILE DEVICES
		if (_nc.hasClass("tp-videolayer") &&  _nc.data('videoposter')!=undefined && _nc.data('posterOnMobile')=="on" && _ISM) {

			var vidw =  makeArray(_nc.data('videowidth'),opt)[opt.curWinRange] || makeArray(_nc.data('videowidth'),opt) || "auto",
				vidh =  makeArray(_nc.data('videoheight'),opt)[opt.curWinRange] || makeArray(_nc.data('videoheight'),opt) || "auto";					
			
			vidw = parseFloat(ww),
			vidh = parseFloat(hh);
			
			_nc.append('<div class="tp-videoposter" style="position:absolute;top:0px;left:0px;width:100%;height:100%;background-image:url('+_nc.data('videoposter')+'); background-size:cover;background-position:center center;"></div>');
			if (vidw!="100%") 
				_nc.css({minWidth:vidw+"px",minHeight:vidh+"px"});
			else 
				_nc.css({width:"100%",height:"100%"});										
			_nc.removeClass("tp-videolayer");							
		}
																				
		// IF IT IS AN IMAGE
		if (_nc.find('img').length>0) {
			var im = _nc.find('img');
			_nc.data('layertype',"image");
			if (im.width()==0) im.css({width:"auto"});
			if (im.height()==0) im.css({height:"auto"});


			

			if (im.data('ww') == undefined && im.width()>0) im.data('ww',im.width());
			if (im.data('hh') == undefined && im.height()>0) im.data('hh',im.height());

			var ww = im.data('ww'),
				hh = im.data('hh'),
				fuw = _ba =="slide" ? opt.ulw : opt.gridwidth[opt.curWinRange],
				fuh = _ba =="slide" ? opt.ulh : opt.gridheight[opt.curWinRange],
			
			ww =  makeArray(im.data('ww'),opt)[opt.curWinRange] || makeArray(im.data('ww'),opt) || "auto",
			hh =  makeArray(im.data('hh'),opt)[opt.curWinRange] || makeArray(im.data('hh'),opt) || "auto";
			
			var wful = ww==="full" || ww === "full-proportional",
				hful = hh==="full" || hh === "full-proportional";

			if (ww==="full-proportional") {
				var ow = im.data('owidth'),
					oh = im.data('oheight');				
				if (ow/fuw < oh/fuh) {
					ww = fuw;
					hh = oh*(fuw/ow);
				} else {
					hh = fuh;
					ww = ow*(fuh/oh);
				}				
			} else {
				ww = wful ? fuw : parseFloat(ww);
				hh = hful ? fuh : parseFloat(hh);	
			}
			

			if (ww==undefined) ww=0;
			if (hh==undefined) hh=0;

			if (_responsive!=="off") {			
				
				if (_ba!="grid" && wful) 
					im.width(ww);
				else
					im.width(ww*opt.bw);
				if (_ba!="grid" && hful) 
					im.height(hh);					
				else
					im.height(hh*opt.bh);					
			} else {
				im.width(ww);
				im.height(hh);					
			}
		} 

		if (_ba==="slide") {
			offsetx = 0;
			offsety=0;
		}

								
		// IF IT IS A VIDEO LAYER
		if (_nc.hasClass("tp-videolayer") || _nc.find('iframe').length>0 || _nc.find('video').length>0) {

			_nc.data('layertype',"video");
			_R.manageVideoLayer(_nc,opt,recalled,internrecalled);				
			if (!recalled && !internrecalled) {
				var t = _nc.data('videotype');						
				_R.resetVideo(_nc,opt);					
			}
			
			var asprat = _nc.data('aspectratio');														
			if (asprat!=undefined && asprat.split(":").length>1) 			
				_R.prepareCoveredVideo(asprat,opt,_nc);

			var im = _nc.find('iframe') ? _nc.find('iframe') : im = _nc.find('video'),
				html5vid = _nc.find('iframe') ? false : true,				
				yvcover = _nc.hasClass('coverscreenvideo');
									
			im.css({display:"block"});

			// SET WIDTH / HEIGHT 
			if (_nc.data('videowidth') == undefined) {
					_nc.data('videowidth',im.width());
					_nc.data('videoheight',im.height());
			}
			var ww =  makeArray(_nc.data('videowidth'),opt)[opt.curWinRange] || makeArray(_nc.data('videowidth'),opt) || "auto",
				hh =  makeArray(_nc.data('videoheight'),opt)[opt.curWinRange] || makeArray(_nc.data('videoheight'),opt) || "auto",
				getobj;

			ww = parseFloat(ww);
			hh = parseFloat(hh);
				
			
			// READ AND WRITE CSS SETTINGS OF IFRAME AND VIDEO FOR RESIZING ELEMENST ON DEMAND
			if (_nc.data('cssobj')===undefined) {									
				getobj = getcssParams(_nc,0);
				_nc.data('cssobj',getobj);
			} 

			var ncobj = setResponsiveCSSValues(_nc.data('cssobj'),opt);

									
			// IE8 FIX FOR AUTO LINEHEIGHT
			if (ncobj.lineHeight=="auto") ncobj.lineHeight = ncobj.fontSize+4;
						

			if (!_nc.hasClass('fullscreenvideo') && !yvcover) {
				
				punchgs.TweenLite.set(_nc,{							 						 
					 paddingTop: Math.round((ncobj.paddingTop * opt.bh)) + "px",
					 paddingBottom: Math.round((ncobj.paddingBottom * opt.bh)) + "px",
					 paddingLeft: Math.round((ncobj.paddingLeft* opt.bw)) + "px",
					 paddingRight: Math.round((ncobj.paddingRight * opt.bw)) + "px",
					 marginTop: (ncobj.marginTop * opt.bh) + "px",
					 marginBottom: (ncobj.marginBottom * opt.bh) + "px",
					 marginLeft: (ncobj.marginLeft * opt.bw) + "px",
					 marginRight: (ncobj.marginRight * opt.bw) + "px",
					 borderTopWidth: Math.round(ncobj.borderTopWidth * opt.bh) + "px",
					 borderBottomWidth: Math.round(ncobj.borderBottomWidth * opt.bh) + "px",
					 borderLeftWidth: Math.round(ncobj.borderLeftWidth * opt.bw) + "px",
					 borderRightWidth: Math.round(ncobj.borderRightWidth * opt.bw) + "px",	
					 width:(ww*opt.bw)+"px",						 
					 height:(hh*opt.bh)+"px"
				});
			} else  {
			   offsetx=0; offsety=0;
			   _nc.data('x',0)
			   _nc.data('y',0)

			   var ovhh = _gh;
			   if (opt.autoHeight=="on") ovhh = opt.conh
			   _nc.css({'width':_gw, 'height':ovhh });

			
			}
						
			if ((html5vid == false && !yvcover) || ((_nc.data('forcecover')!=1 && !_nc.hasClass('fullscreenvideo') && !yvcover))) {
				im.width(ww*opt.bw);
				im.height(hh*opt.bh);
			}					
		}	// END OF POSITION AND STYLE READ OUTS OF VIDEO

		
		
		// ALL WRAPPED REKURSIVE ELEMENTS SHOULD BE RESPONSIVE HANDLED
		_nc.find('.tp-resizeme, .tp-resizeme *').each(function() {
				calcCaptionResponsive(jQuery(this),opt,"rekursive",_responsive);
		});

		// ALL ELEMENTS IF THE MAIN ELEMENT IS REKURSIVE RESPONSIVE SHOULD BE REPONSIVE HANDLED
		if (_nc.hasClass("tp-resizeme")) 
			_nc.find('*').each(function() {
				calcCaptionResponsive(jQuery(this),opt,"rekursive",_responsive);
			});									

		// RESPONIVE HANDLING OF CURRENT LAYER
		calcCaptionResponsive(_nc,opt,0,_responsive);
		
		// _nc FRONTCORNER CHANGES
		var ncch = _nc.outerHeight(),
			bgcol = _nc.css('backgroundColor');
		sharpCorners(_nc,'.frontcorner','left','borderRight','borderTopColor',ncch,bgcol);
		sharpCorners(_nc,'.frontcornertop','left','borderRight','borderBottomColor',ncch,bgcol);
		sharpCorners(_nc,'.backcorner','right','borderLeft','borderBottomColor',ncch,bgcol);
		sharpCorners(_nc,'.backcornertop','right','borderLeft','borderTopColor',ncch,bgcol);


		if (opt.fullScreenAlignForce == "on") {
			offsetx=0;
			offsety=0;
		}
			
		var arrobj = _nc.data('arrobj');
		if (arrobj===undefined) {
			var arrobj = new Object();
			arrobj.voa = makeArray(_nc.data('voffset'),opt)[opt.curWinRange] || makeArray(_nc.data('voffset'),opt)[0];
			arrobj.hoa = makeArray(_nc.data('hoffset'),opt)[opt.curWinRange] || makeArray(_nc.data('hoffset'),opt)[0];
			arrobj.elx = makeArray(_nc.data('x'),opt)[opt.curWinRange] || makeArray(_nc.data('x'),opt)[0];
			arrobj.ely = makeArray(_nc.data('y'),opt)[opt.curWinRange] || makeArray(_nc.data('y'),opt)[0];					
		}

		
		// CORRECTION OF NEGATIVE VALUES FROM OLDER SLIDER
		//arrobj.voa = arrobj.ely==="bottom" ? arrobj.voa * -1 : arrobj.voa;
		//arrobj.hoa = arrobj.elx==="right" ? arrobj.hoa * -1 : arrobj.hoa;
							

		var voa = arrobj.voa.length==0 ? 0 : arrobj.voa,
			hoa = arrobj.hoa.length==0 ? 0 : arrobj.hoa,
			elx = arrobj.elx.length==0 ? 0 : arrobj.elx,
			ely = arrobj.ely.length==0 ? 0 : arrobj.ely,
			eow = _nc.outerWidth(true),
			eoh = _nc.outerHeight(true);

		
		// NEED CLASS FOR FULLWIDTH AND FULLHEIGHT LAYER SETTING !!
		if (eow==0 && eoh==0) {
			eow = opt.ulw;
			eoh = opt.ulh;
		}

		var  vofs= _respoffset !=="off" ? parseInt(voa,0)*opt.bw : parseInt(voa,0),			
			hofs= _respoffset !=="off" ? parseInt(hoa,0)*opt.bw : parseInt(hoa,0),
			crw = _ba==="grid" ? opt.gridwidth[opt.curWinRange]*opt.bw : _gw,
			crh = _ba==="grid" ? opt.gridheight[opt.curWinRange]*opt.bw : _gh;

					

		if (opt.fullScreenAlignForce == "on") {
			crw = opt.ulw;
			crh = opt.ulh;
		}
			
		
		// ALIGN POSITIONED ELEMENTS	
		
		
		elx = elx==="center" || elx==="middle" ? (crw/2 - eow/2) +  hofs : elx==="left" ? hofs : elx==="right" ? (crw - eow) - hofs : _respoffset !=="off"  ? elx * opt.bw : elx;
		ely = ely=="center" || ely=="middle" ? 	(crh/2 - eoh/2) + vofs : ely =="top" ? vofs : ely=="bottom" ? (crh - eoh)-vofs : _respoffset !=="off"  ? ely*opt.bw : ely;			
		
		if (rtl) 
			elx = elx + eow;
		
		// THE TRANSITIONS OF CAPTIONS
		// MDELAY AND MSPEED
												
		
		var $lts = _nc.data('lasttriggerstate'),
			$cts = _nc.data('triggerstate'),
			$start = _nc.data('start') || 100,		
			$end = _nc.data('end'),
			mdelay = triggerforce ? 0 : $start==="bytrigger" || $start==="sliderenter" ? 0 : parseFloat($start)/1000,
			calcx = (elx+offsetx),
			calcy = (ely+offsety),
			tpcapindex = _nc.css("z-Index");
		
		
		if (!triggerforce) 
			if ($lts=="reset" && $start!="bytrigger") {
				_nc.data("triggerstate","on");
				_nc.data('animdirection',"in");
				$cts = "on";
			}	else 
			if ($lts=="reset" && $start=="bytrigger") {				
				_nc.data("triggerstate","off");
				_nc.data('animdirection',"out");
				$cts = "off";			
			}  


		// SET TOP/LEFT POSITION OF LAYER
		punchgs.TweenLite.set(_pw,{zIndex:tpcapindex, top:calcy,left:calcx,overwrite:"auto"});

		if (staticdirection == 0) internrecalled = true;

		// STATIC LAYER, THINK ON THIS !!!
		if (_nc.data('timeline')!=undefined && !internrecalled) {
			if (staticdirection!=2)
				_nc.data('timeline').gotoAndPlay(0);
			internrecalled = true;
		}
		
		// KILL OUT ANIMATION
		
		if (!recalled && _nc.data('timeline_out') && staticdirection!=2 && staticdirection!=0) 	{						
				_nc.data('timeline_out').kill();
				_nc.data('outstarted',0);					
		}
		
		// TRIGGERED ELEMENTS SHOULD 
		if (triggerforce && _nc.data('timeline')!=undefined) {			
			_nc.removeData('$anims')
			_nc.data('timeline').pause(0);
			_nc.data('timeline').kill();
			if (_nc.data('newhoveranim')!=undefined) {
				_nc.data('newhoveranim').progress(0);
				_nc.data('newhoveranim').kill();
			}
			_nc.removeData('timeline');
			punchgs.TweenLite.killTweensOf(_nc);		
			_nc.unbind('hover');
			_nc.removeClass("rs-hover-ready");
			
			_nc.removeData('newhoveranim');

		}

		var $time = _nc.data('timeline') ? _nc.data('timeline').time() : 0,
			$progress = _nc.data('timeline')!==undefined ? _nc.data('timeline').progress() : 0,	
			tl = _nc.data('timeline') || new punchgs.TimelineLite({smoothChildTiming:true});

		$progress = jQuery.isNumeric($progress) ? $progress: 0;
		
		tl.pause();			
		// LAYER IS TRIGGERED ??
		
		

		if ($progress<1 && _nc.data('outstarted') != 1 || staticdirection==2 || triggerforce) {			
			var animobject = _nc;

			if (_nc.data('mySplitText') !=undefined) _nc.data('mySplitText').revert();

			if (_nc.data('splitin')!=undefined && _nc.data('splitin').match(/chars|words|lines/g) || _nc.data('splitout')!=undefined && _nc.data('splitout').match(/chars|words|lines/g)) {
				var splittarget = _nc.find('a').length>0 ? _nc.find('a') : _nc;
				_nc.data('mySplitText',new punchgs.SplitText(splittarget,{type:"lines,words,chars",charsClass:"tp-splitted",wordsClass:"tp-splitted",linesClass:"tp-splitted"}));					
				_nc.addClass("splitted");
			}

			if ( _nc.data('mySplitText') !==undefined && _nc.data('splitin') && _nc.data('splitin').match(/chars|words|lines/g)) animobject = _nc.data('mySplitText')[_nc.data('splitin')]
		
			var $a = new Object();
			


			var reverseanim = _nc.data('transform_in')!=undefined ? _nc.data('transform_in').match(/\(R\)/gi) : false;

			// BUILD ANIMATION LIBRARY AND HOVER ANIMATION
			if (!_nc.data('$anims') || triggerforce || reverseanim) {				
				var $from = newAnimObject(),
					$result = newAnimObject(),
					$hover = newHoverAnimObject(),										
					hashover = _nc.data('transform_hover')!==undefined || _nc.data('style_hover')!==undefined;				
			
				// WHICH ANIMATION TYPE SHOULD BE USED				
				$result = getAnimDatas($result,_nc.data('transform_idle'));
								
				$from = getAnimDatas($result,_nc.data('transform_in'),opt.sdir==1);		
				
				if (hashover) {

					$hover = getAnimDatas($hover,_nc.data('transform_hover'));
					$hover = convertHoverStyle($hover,_nc.data('style_hover'));

					_nc.data('hover',$hover);
				}
			
				// DELAYS
				$from.elemdelay = (_nc.data('elementdelay') == undefined) ? 0 : _nc.data('elementdelay');
				$result.anim.ease = $from.anim.ease = $from.anim.ease || punchgs.Power1.easeInOut;

				
				
	  	  		// HOVER ANIMATION
				if (hashover && !_nc.hasClass("rs-hover-ready")) {		

					_nc.addClass("rs-hover-ready");		  						
					_nc.hover(function(e) {
					 	var nc = jQuery(e.currentTarget),						 		
					 		t = nc.data('hover'),
					 		intl = nc.data('timeline');
					 		
					 	if (intl && intl.progress()==1) {						 		

						 	if (nc.data('newhoveranim')===undefined || 	nc.data('newhoveranim')==="none")						 		
						 		nc.data('newhoveranim',punchgs.TweenLite.to(nc,t.speed,t.anim));						 	
						 	else {						 		
						 		nc.data('newhoveranim').progress(0);
						 		nc.data('newhoveranim').play();
						 	}
						 }
					 },
					 function(e) {
					 	var nc = jQuery(e.currentTarget),
					 		intl = nc.data('timeline');

					 	if (intl && intl.progress()==1 && nc.data('newhoveranim')!=undefined) {							 						 		
					 		nc.data('newhoveranim').reverse();
					 	}
					 });
				}
				$a = new Object();
				$a.f = $from;
				$a.r = $result;										
				_nc.data('$anims');
			} else {
				$a = _nc.data('$anims');
			}


			
			// SET WRAPPING CONTAINER SIZES				 
			var $mask_frm = getMaskDatas(_nc.data('mask_in')),
				newtl = new punchgs.TimelineLite();
																	
			$a.f.anim.x = $a.f.anim.x * opt.bw || getBorderDirections($a.f.anim.x,opt,eow,eoh,calcy,calcx, "horizontal" );
		  	$a.f.anim.y = $a.f.anim.y * opt.bw || getBorderDirections($a.f.anim.y,opt,eow,eoh,calcy,calcx, "vertical" );					
	  	  	
			

			// IF LAYER IS NOT STATIC, OR STATIC AND NOT ANIMATED IN AT THIS LOOP
			if (staticdirection != 2 || triggerforce) {
			 
			  // SPLITED ANIMATION IS IN GAME
			  if (animobject != _nc) {	
			  	  var oldease = $a.r.anim.ease;			  	 
				  tl.add(punchgs.TweenLite.set(_nc, $a.r.anim));
				  $a.r = newAnimObject();	
				  $a.r.anim.ease = oldease;
			  }
			 
			  $a.f.anim.visibility = "hidden";		

			  
			  newtl.eventCallback("onStart",function(){			  	
			  	punchgs.TweenLite.set(_nc,{visibility:"visible"});
				// FIX VISIBLE IFRAME BUG IN SAFARI
				if (_nc.data('iframes'))
					_nc.find('iframe').each(function() {
						punchgs.TweenLite.set(jQuery(this),{autoAlpha:1});
					})
			  	punchgs.TweenLite.set(_pw,{visibility:"visible"});
			  	var data={};
			  	data.layer = _nc;
			  	data.eventtype = "enterstage";
			  	data.layertype = _nc.data('layertype');
			  	data.layersettings = _nc.data();			  	
			  	opt.c.trigger("revolution.layeraction",data)
			  });

			  newtl.eventCallback("onComplete",function() {
			  	var data={};
			  	data.layer = _nc;
			  	data.eventtype = "enteredstage";
			  	data.layertype = _nc.data('layertype');
			  	data.layersettings = _nc.data();			  	
			  	opt.c.trigger("revolution.layeraction",data);			  	
			  	_R.animcompleted(_nc,opt);
			  });

			  // SHOW ELEMENTS WITH SLIDEENTER A BIT LATER FIRST ! 
			  if (($start=="sliderenter" && opt.overcontainer))			
			  	mdelay = 0.6;
			  
			  tl.add(newtl.staggerFromTo(animobject,$a.f.speed,$a.f.anim,$a.r.anim,$a.f.elemdelay),mdelay);	
			  
			
			  // MASK ANIMATION
			  if ($mask_frm) {				  						  	
			  	var $mask_rsl = new Object();			  				  					  	
			  	$mask_rsl.ease = $a.r.anim.ease;					  	
			  	$mask_rsl.overflow = $mask_frm.anim.overflow ="hidden";
			  	$mask_rsl.x = $mask_rsl.y = 0;				  	

			  	$mask_frm.anim.x = $mask_frm.anim.x * opt.bw || getBorderDirections($mask_frm.anim.x,opt,eow,eoh,calcy,calcx,"horizontal");
	  	  		$mask_frm.anim.y = $mask_frm.anim.y * opt.bw || getBorderDirections($mask_frm.anim.y,opt,eow,eoh,calcy,calcx,"vertical");
			   	  		
			  						  
			  	tl.add(punchgs.TweenLite.fromTo(_mw,$a.f.speed,$mask_frm.anim,$mask_rsl,$from.elemdelay),mdelay);				  	
			  } else {
			  	tl.add(punchgs.TweenLite.set(_mw,{overflow:"visible"},$from.elemdelay),0);				  	
			  }		    				 
			}

			// SAVE IT TO NCAPTION BEFORE NEW STEPS WILL BE ADDED
			_nc.data('timeline',tl);
			
			// IF THERE IS ANY EXIT ANIM DEFINED
			// For Static Layers -> 1 -> In,  2-> Out  0-> Ignore  -1-> Not Static
			staticdirection = staticLayerStatus(_nc,opt,"in");

			if (($progress === 0 || staticdirection==2) &&  $end!=="bytrigger" && !triggerforce && $end!="sliderleave") 				
				if (($end!=undefined) && (staticdirection==-1 || staticdirection==2) && ($end!=="bytriger")) 			
					punchgs.TweenLite.delayedCall(parseInt(_nc.data('end'),0)/1000,_R.endMoveCaption,[_nc,_mw,_pw,opt]);
				else 
					punchgs.TweenLite.delayedCall(999999,_R.endMoveCaption,[_nc,_mw,_pw,opt]);						
			

			// SAVE THE TIMELINE IN DOM ELEMENT

			tl = _nc.data('timeline');
			
			if (_nc.data('loopanimation')=="on") callCaptionLoops(_lw,opt.bw);		
			
			
		
			
			if (($start!="sliderenter" || ($start=="sliderenter" && opt.overcontainer)) && (staticdirection==-1 || staticdirection==1 || triggerforce || (staticdirection==0 && $progress<1 && _nc.hasClass("rev-static-visbile"))))				
				if (($progress<1 && $progress>0) || 
					($progress==0 && $start!="bytrigger" && $lts!="keep") || 
					($progress==0 && $start!="bytrigger" && $lts=="keep" && $cts=="on") || 				
					($start=="bytrigger" && $lts=="keep" && $cts=="on")) 				
					tl.resume($time);			
		}
		
		//punchgs.TweenLite.set(_mw,{width:eow, height:eoh});
		if (_nc.data('loopanimation')=="on") punchgs.TweenLite.set(_lw,{minWidth:eow,minHeight:eoh});

		if (_nc.data('slidelink')!=0 && (_nc.data('slidelink')==1 || _nc.hasClass("slidelink"))) {
			punchgs.TweenLite.set(_mw,{width:"100%", height:"100%"});
			_nc.data('slidelink',1);
		} else {
			punchgs.TweenLite.set(_mw,{width:"auto", height:"auto"});
			_nc.data('slidelink',0);
		}
	},

	//////////////////////////////
	//	MOVE OUT THE CAPTIONS  //
	////////////////////////////
	endMoveCaption : function(_nc,_mw,_pw,opt) {

		_mw = _mw || _nc.data('_mw');
		_pw = _pw || _nc.data('_pw');

		// Kill TimeLine of "in Animation"
		_nc.data('outstarted',1);
		

		if (_nc.data('timeline'))
			_nc.data('timeline').pause();
		else
			if (_nc.data('_pw')===undefined) return;
		
		var tl = new punchgs.TimelineLite(),
			subtl = new punchgs.TimelineLite(),
			newmasktl = new punchgs.TimelineLite(),				
			$from = getAnimDatas(newAnimObject(),_nc.data('transform_in'),opt.sdir==1),
			$to = _nc.data('transform_out') ? getAnimDatas(newEndAnimObject(),_nc.data('transform_out'),opt.sdir==1) : getAnimDatas(newEndAnimObject(),_nc.data('transform_in'),opt.sdir==1),			
			animobject = _nc.data('splitout') && _nc.data('splitout').match(/words|chars|lines/g) ? _nc.data('mySplitText')[_nc.data('splitout')] : _nc,
			elemdelay = (_nc.data('endelementdelay') == undefined) ? 0 : _nc.data('endelementdelay'),					
			iw = _nc.innerWidth(),
			ih = _nc.innerHeight(),
			p = _pw.position();
		
		// IF REVERSE AUTO ANIMATION ENABLED
		if (_nc.data('transform_out') && _nc.data('transform_out').match(/auto:auto/g)) {			
			$from.speed = $to.speed;
			$from.anim.ease = $to.anim.ease;
			$to = $from;
		}
				
		var $mask_to = getMaskDatas(_nc.data('mask_out'));

		$to.anim.x = $to.anim.x * opt.bw || getBorderDirections($to.anim.x,opt,iw,ih,p.top,p.left,"horizontal");
		$to.anim.y = $to.anim.y * opt.bw || getBorderDirections($to.anim.y,opt,iw,ih,p.top,p.left,"vertical");
		
		subtl.eventCallback("onStart",function(){			  	
			  	var data={};
			  	data.layer = _nc;
			  	data.eventtype = "leavestage";
			  	data.layertype = _nc.data('layertype');
			  	data.layersettings = _nc.data();			  	
			  	opt.c.trigger("revolution.layeraction",data);			  				  	
		});

		subtl.eventCallback("onComplete",function(){			  	
			  	punchgs.TweenLite.set(_nc,{visibility:"hidden"});
			  	punchgs.TweenLite.set(_pw,{visibility:"hidden"});
			  	var data={};
			  	data.layer = _nc;
			  	data.eventtype = "leftstage";
			  	data.layertype = _nc.data('layertype');
			  	data.layersettings = _nc.data();			  	
			  	opt.c.trigger("revolution.layeraction",data);			  				  	
		});
				
		tl.add(subtl.staggerTo(animobject,$to.speed,$to.anim,elemdelay),0);	
				
		// MASK ANIMATION
		if ($mask_to) {				  					  			  	
			$mask_to.anim.ease = $to.anim.ease;		  	
			$mask_to.anim.overflow = "hidden";	

			$mask_to.anim.x = $mask_to.anim.x * opt.bw || getBorderDirections($mask_to.anim.x,opt,iw,ih,p.top,p.left,"horizontal");
		  	$mask_to.anim.y = $mask_to.anim.y * opt.bw || getBorderDirections($mask_to.anim.y,opt,iw,ih,p.top,p.left,"vertical");

		
			tl.add(newmasktl.to(_mw,$to.speed,$mask_to.anim,elemdelay),0);				  	
		} else {		  	
			tl.add(newmasktl.set(_mw,{overflow:"visible",overwrite:"auto"},elemdelay),0);				  	
		}
		
		_nc.data('timeline_out',tl);
	},

	//////////////////////////
	//	REMOVE THE CAPTIONS //
	/////////////////////////
	removeTheCaptions : function(actli,opt) {		
		var removetime = 0,
			index = actli.data('index'),	
			allcaptions = new Array;
		
		// COLLECT ALL CAPTIONS		
		if (opt.layers[index])
			jQuery.each(opt.layers[index], function(i,a) { allcaptions.push(a); });
		if (opt.layers["static"])
			jQuery.each(opt.layers["static"], function(i,a) { allcaptions.push(a); });
		punchgs.TweenLite.killDelayedCallsTo(_R.endMoveCaption);

		// GO THROUGH ALL CAPTIONS, AND MANAGE THEM
		if (allcaptions)
			jQuery.each(allcaptions,function(i) {
			    var _nc=jQuery(this),
			    	stat = staticLayerStatus(_nc,opt,"out");				    
				if (stat != 0 ) {  //0 == ignore		
					killCaptionLoops(_nc);
					clearTimeout(_nc.data('videoplaywait'));
					if (_R.stopVideo) _R.stopVideo(_nc,opt);												
					_R.endMoveCaption(_nc,null,null,opt)
					opt.playingvideos = [];
					opt.lastplayedvideos = [];
				}
			});		
	}
});





/**********************************************************************************************
						-	HELPER FUNCTIONS FOR LAYER TRANSFORMS -
**********************************************************************************************/



/////////////////////////////////////
//	-	CREATE ANIMATION OBJECT	-  //
/////////////////////////////////////
var newAnimObject = function() {
	var a = new Object();
	a.anim = new Object();
	a.anim.x=0;
	a.anim.y=0;
	a.anim.z=0;
	a.anim.rotationX = 0;
	a.anim.rotationY = 0;
	a.anim.rotationZ = 0;				
	a.anim.scaleX = 1;
	a.anim.scaleY = 1;
	a.anim.skewX = 0;
	a.anim.skewY = 0;
	a.anim.opacity=1;
	a.anim.transformOrigin = "50% 50%";
	a.anim.transformPerspective = 600;
	a.anim.rotation = 0;
	a.anim.ease = punchgs.Power3.easeOut;
	a.anim.force3D = "auto";
	a.speed = 0.3;
	a.anim.autoAlpha = 1;
	a.anim.visibility = "visible";
	a.anim.overwrite = "all";  
	return a;
}

var newEndAnimObject = function() {
	var a = new Object();
	a.anim = new Object();	
	a.anim.x=0;
	a.anim.y=0;	
	a.anim.z=0;
	return a;
}

var newHoverAnimObject = function() {
	var a = new Object();
	a.anim = new Object();		
	a.speed = 0.2;						
	return a;
}

var animDataTranslator = function(val,defval) {

	if (jQuery.isNumeric(parseFloat(val))) {				
		return parseFloat(val);
	} else 
	if (val===undefined || val==="inherit") {				
		return defval;
	} else 
	if (val.split("{").length>1) {
		var min = val.split(","),
			max = parseFloat(min[1].split("}")[0]);
		min = parseFloat(min[0].split("{")[1]);
		val = Math.random()*(max-min) + min;		
	}	
	return val;	
}	

var getBorderDirections = function (x,o,w,h,top,left,direction) {		
			
	if (!jQuery.isNumeric(x) && x.match(/%]/g)) {
		x = x.split("[")[1].split("]")[0];				
		if (direction=="horizontal")
			x = (w+2)*parseInt(x,0)/100;
		else
		if (direction=="vertical")
			x = (h+2)*parseInt(x,0)/100;
	} else {


		x = x === "layer_left"  ? (0-w) : x === "layer_right" ? w : x;
		x = x === "layer_top" ? (0-h) : x==="layer_bottom" ? h : x;
		x = x === "left" || x==="stage_left" ? (0-w-left) : x === "right" || x==="stage_right" ? o.conw-left : x === "center" || x === "stage_center" ? (o.conw/2 - w/2)-left : x;
		x = x === "top" || x==="stage_top" ? (0-h-top) : x==="bottom" || x==="stage_bottom" ? o.conh-top : x === "middle" || x === "stage_middle" ? (o.conh/2 - h/2)-top : x;					
	}
	
	return x;
}

///////////////////////////////////////////////////
// ANALYSE AND READ OUT DATAS FROM HTML CAPTIONS //
///////////////////////////////////////////////////
var getAnimDatas = function(frm,data,reversed) {		
	var o = new Object();
	o = jQuery.extend(true,{},o, frm);
	if (data === undefined) 
		return o;		

	var customarray = data.split(';');	
	if (customarray)	
		jQuery.each(customarray,function(index,pa) {
			var p = pa.split(":")
			var w = p[0],
				v = p[1];
			
			
			if (reversed && v!=undefined && v.length>0 && v.match(/\(R\)/)) {							
				v = v.replace("(R)","");
				v = v==="right" ? "left" : v==="left" ? "right" : v==="top" ? "bottom" : v==="bottom" ? "top" : v;	
				if (v[0]==="[" && v[1]==="-") v = v.replace("[-","[");
				else
				if (v[0]==="[" && v[1]!=="-") v = v.replace("[","[-");	
				else
				if (v[0]==="-") v = v.replace("-","");
				else
				if (v[0].match(/[1-9]/)) v="-"+v;
								
			}
			
			if (v!=undefined) {
				v = v.replace(/\(R\)/,'');
				if (w=="rotationX" || w=="rX") o.anim.rotationX = animDataTranslator(v,o.anim.rotationX)+"deg";			
				if (w=="rotationY" || w=="rY") o.anim.rotationY = animDataTranslator(v,o.anim.rotationY)+"deg";
				if (w=="rotationZ" || w=="rZ") o.anim.rotation = animDataTranslator(v,o.anim.rotationZ)+"deg";					
				if (w=="scaleX" || w=="sX") o.anim.scaleX = animDataTranslator(v,o.anim.scaleX);
				if (w=="scaleY" || w=="sY") o.anim.scaleY = animDataTranslator(v,o.anim.scaleY);
				if (w=="opacity" || w=="o") o.anim.opacity = animDataTranslator(v,o.anim.opacity);
				if (w=="skewX" || w=="skX") o.anim.skewX = animDataTranslator(v,o.anim.skewX);
				if (w=="skewY" || w=="skY") o.anim.skewY = animDataTranslator(v,o.anim.skewY);
				if (w=="x") o.anim.x = animDataTranslator(v,o.anim.x);
				if (w=="y") o.anim.y = animDataTranslator(v,o.anim.y);
				if (w=="z") o.anim.z = animDataTranslator(v,o.anim.z);
				if (w=="transformOrigin" || w=="tO") o.anim.transformOrigin = v.toString();
				if (w=="transformPerspective" || w=="tP") o.anim.transformPerspective=parseInt(v,0);
				if (w=="speed" || w=="s") o.speed = parseFloat(v)/1000;									
				if (w=="ease" || w=="e") o.anim.ease = v;
			}

		})	
	
	return o;
}



/////////////////////////////////
// BUILD MASK ANIMATION OBJECT //
/////////////////////////////////
var getMaskDatas = function(d) {		
	if (d === undefined)
		return false;

	var o = new Object();	
	o.anim = new Object();
	var s = d.split(';')
	if (s)
		jQuery.each(s,function(index,param) {
			param = param.split(":")
			var w = param[0],
				v = param[1];
			if (w=="x") o.anim.x = v;
			if (w=="y") o.anim.y = v;
			if (w=="s") o.speed = parseFloat(v)/1000;
			if (w=="e" || w=="ease") o.anim.ease = v;	
		});

	return o;
}
	



////////////////////////
// SHOW THE CAPTION  //
///////////////////////

var makeArray = function(obj,opt,show) {
	
	if (obj==undefined) obj = 0;

	if (!jQuery.isArray(obj) && jQuery.type(obj)==="string" && (obj.split(",").length>1 || obj.split("[").length>1)) {
		obj = obj.replace("[","");
		obj = obj.replace("]","");
		var newobj = obj.match(/'/g) ? obj.split("',") : obj.split(",");
		obj = new Array();
		if (newobj)
			jQuery.each(newobj,function(index,element) {
				element = element.replace("'","");
				element = element.replace("'","");
				obj.push(element);
			})
	} else {
		var tempw = obj;			
		if (!jQuery.isArray(obj) ) {
			obj = new Array();				
			obj.push(tempw);				
		} 
	}

	var tempw = obj[obj.length-1]; 

	if (obj.length<opt.rle) {
		for (var i=1;i<=opt.curWinRange;i++) {
			obj.push(tempw);
		}
	}
	return obj;
}


/* CREATE SHARP CORNERS */
function sharpCorners(nc,$class, $side,$borderh,$borderv,ncch,bgcol) {
	var a = nc.find($class);
	a.css('borderWidth',ncch+"px");
	a.css($side,(0-ncch)+'px');
	a.css($borderh,'0px solid transparent');
	a.css($borderv,bgcol);
}





var staticLayerStatus = function(_nc,opt,dir,dontmod) {
	
	var a = -1;		
	if (_nc.hasClass("tp-static-layer")) {	
		var s = parseInt(_nc.data('startslide'),0),
			e = parseInt(_nc.data('endslide'),0),
			pi = opt.c.find('.processing-revslide').index(),
			ai = pi!=-1 ? pi : opt.c.find('.active-revslide').index();
			
		ai = ai == -1 ? 0 : ai;			
		
		
		if (dir==="in") {				
			// IF STATIC ITEM CURRENTLY NOT VISIBLE
			if (!_nc.hasClass("rev-static-visbile")) {
				// IF ITEM SHOULD BECOME VISIBLE			
					
				if ((s<=ai && e>=ai) || (s == ai) || (e == ai)){						
					if (!dontmod) {
						_nc.addClass("rev-static-visbile");
						_nc.removeClass("rev-static-hidden");
					}
					a = 1;
				} else 
					a = 0;

			// IF STATIC ITEM ALREADY VISIBLE
			} else {
				if ((e==ai) || (s > ai) || (e < ai)) 
					a = 2;					
				else 
					a = 0;					
			}		
		} else {				
			// IF STATIC ITEM CURRENTLY NOT VISIBLE
			if (_nc.hasClass("rev-static-visbile")) {					
				if ((s > ai) ||
					(e < ai)) {
					a = 2;
					if (!dontmod) {
						_nc.removeClass("rev-static-visbile");
						_nc.addClass("rev-static-hidden");
					}
				} else {
					a = 0;
				}
			} else {
				a = 2;
			}
		}
	}
			
	return a; // 1 -> In,  2-> Out  0-> Ignore  -1-> Not Static
}
	


var convertHoverStyle = function(t,s) {
	if (s===undefined) return t;
	s = s.replace("c:","color:");
	s = s.replace("bg:","background-color:");
	s = s.replace("bw:","border-width:");
	s = s.replace("bc:","border-color:");
	s = s.replace("br:","borderRadius:");
	s = s.replace("bs:","border-style:");
	s = s.replace("td:","text-decoration:");
	var sp = s.split(";");
	if (sp)
		jQuery.each(sp,function(key,cont){
			var attr = cont.split(":");
			if (attr[0].length>0)
				t.anim[attr[0]] = attr[1];		
		})			

	return t;

}
////////////////////////////////////////////////
//	-	GET CSS ATTRIBUTES OF ELEMENT	-	  //
////////////////////////////////////////////////
var getcssParams = function(nc,level) {
	
	var obj = new Object(),
		gp = false,
		pc;
	
	// CHECK IF CURRENT ELEMENT SHOULD RESPECT REKURSICVE RESIZES, AND SHOULD OWN THE SAME ATTRIBUTES FROM PARRENT ELEMENT
	if (level=="rekursive") {
		pc = nc.closest('.tp-caption');		
		if (pc && nc.css("fontSize") === pc.css("fontSize")) 
			gp = true;
	}

	obj.basealign = nc.data('basealign') || "grid";
	obj.fontSize = gp ? pc.data('fontsize')===undefined ?  parseInt(pc.css('fontSize'),0) || 0 : pc.data('fontsize')  :  nc.data('fontsize')===undefined ?  parseInt(nc.css('fontSize'),0) || 0 : nc.data('fontsize'); 
	obj.fontWeight = gp ? pc.data('fontweight')===undefined ?  parseInt(pc.css('fontWeight'),0) || 0 : pc.data('fontweight')  :  nc.data('fontweight')===undefined ?  parseInt(nc.css('fontWeight'),0) || 0 : nc.data('fontweight'); 
	obj.whiteSpace = gp ? pc.data('whitespace')===undefined ?  pc.css('whitespace') || "normal" : pc.data('whitespace')  :  nc.data('whitespace')===undefined ?  nc.css('whitespace') || "normal" : nc.data('whitespace'); 
			
	obj.lineHeight = gp ? pc.data('lineheight')===undefined ? parseInt(pc.css('lineHeight'),0) || 0 : pc.data('lineheight')  :  nc.data('lineheight')===undefined ? parseInt(nc.css('lineHeight'),0) || 0 : nc.data('lineheight');
	obj.letterSpacing = gp ? pc.data('letterspacing')===undefined ? parseFloat(pc.css('letterSpacing'),0) || 0 : pc.data('letterspacing') : nc.data('letterspacing')===undefined ? parseFloat(nc.css('letterSpacing')) || 0 : nc.data('letterspacing');
				
	obj.paddingTop = nc.data('paddingtop')===undefined ? parseInt(nc.css('paddingTop'),0) || 0 : nc.data('paddingtop');
	obj.paddingBottom = nc.data('paddingbottom')===undefined ? parseInt(nc.css('paddingBottom'),0) || 0 : nc.data('paddingbottom');
	obj.paddingLeft = nc.data('paddingleft')===undefined ? parseInt(nc.css('paddingLeft'),0) || 0 : nc.data('paddingleft');
	obj.paddingRight = nc.data('paddingright')===undefined ? parseInt(nc.css('paddingRight'),0) || 0 : nc.data('paddingright');

	obj.marginTop = nc.data('margintop')===undefined ? parseInt(nc.css('marginTop'),0) || 0 : nc.data('margintop');
	obj.marginBottom = nc.data('marginbottom')===undefined ? parseInt(nc.css('marginBottom'),0) || 0 : nc.data('marginbottom');
	obj.marginLeft = nc.data('marginleft')===undefined ? parseInt(nc.css('marginLeft'),0) || 0 : nc.data('marginleft');
	obj.marginRight = nc.data('marginright')===undefined ? parseInt(nc.css('marginRight'),0) || 0 : nc.data('marginright');

	obj.borderTopWidth = nc.data('bordertopwidth')===undefined ? parseInt(nc.css('borderTopWidth'),0) || 0 : nc.data('bordertopwidth');
	obj.borderBottomWidth = nc.data('borderbottomwidth')===undefined ? parseInt(nc.css('borderBottomWidth'),0) || 0 : nc.data('borderbottomwidth');
	obj.borderLeftWidth = nc.data('borderleftwidth')===undefined ? parseInt(nc.css('borderLeftWidth'),0) || 0 : nc.data('borderleftwidth');
	obj.borderRightWidth = nc.data('borderrightwidth')===undefined ? parseInt(nc.css('borderRightWidth'),0) || 0 : nc.data('borderrightwidth');

	if (level!="rekursive") {
		obj.color = nc.data('color')===undefined ? "nopredefinedcolor" : nc.data('color');
		obj.whiteSpace = gp ? pc.data('whitespace')===undefined ? pc.css('whiteSpace') || "nowrap" : pc.data('whitespace') : nc.data('whitespace')===undefined ? nc.css('whiteSpace') || "nowrap" : nc.data('whitespace');
		
		obj.minWidth = nc.data('width')===undefined ? parseInt(nc.css('minWidth'),0) || 0 : nc.data('width');
		obj.minHeight = nc.data('height')===undefined ? parseInt(nc.css('minHeight'),0) || 0 : nc.data('height');

		if (nc.data('videowidth')!=undefined && nc.data('videoheight')!=undefined) {
			var vwid = nc.data('videowidth'),
				vhei = nc.data('videoheight');
			vwid = vwid==="100%" ? "none" : vwid;
			vhei = vhei==="100%" ? "none" : vhei;
			nc.data('width',vwid);
			nc.data('height',vhei);
		}
		
		obj.maxWidth = nc.data('width')===undefined ? parseInt(nc.css('maxWidth'),0) || "none" : nc.data('width');
		obj.maxHeight = nc.data('height')===undefined ? parseInt(nc.css('maxHeight'),0) || "none" : nc.data('height');
		
		obj.wan = nc.data('wan')===undefined ? parseInt(nc.css('-webkit-transition'),0) || "none" : nc.data('wan');
		obj.moan = nc.data('moan')===undefined ? parseInt(nc.css('-moz-animation-transition'),0) || "none" : nc.data('moan');
		obj.man = nc.data('man')===undefined ? parseInt(nc.css('-ms-animation-transition'),0) || "none" : nc.data('man');
		obj.ani = nc.data('ani')===undefined ? parseInt(nc.css('transition'),0) || "none" : nc.data('ani');
	}

	obj.styleProps = nc.css(["background-color",							 
							 "border-top-color",
							 "border-bottom-color",
							 "border-right-color",
							 "border-left-color",							
							 "border-top-style",
							 "border-bottom-style",
							 "border-left-style",
							 "border-right-style",							
							 "border-left-width",
							 "border-right-width",
							 "border-bottom-width",
							 "border-top-width",							 
							 "color",							 
							 "text-decoration",
							 "font-style",
							 "border-radius"]);		 
	return obj;
}

// READ SINGLE OR ARRAY VALUES OF OBJ CSS ELEMENTS
var setResponsiveCSSValues = function(obj,opt) {
	var newobj = new Object();
	if (obj)
		jQuery.each(obj,function(key,val){			
			newobj[key] = makeArray(val,opt)[opt.curWinRange] || obj[key];
		})
	return newobj;
}

var minmaxconvert = function(a,m,r,fr) {
	
	a = jQuery.isNumeric(a) ? (a * m)+"px" : a;
	a = a==="full" ? fr : a==="auto" || a==="none" ? r : a;
	return a;

}

/////////////////////////////////////////////////////////////////
//	-	CALCULATE THE RESPONSIVE SIZES OF THE CAPTIONS	-	  //
/////////////////////////////////////////////////////////////////
var calcCaptionResponsive = function(nc,opt,level,responsive) {
	var getobj;

	if (nc.data('cssobj')===undefined) {									
		getobj = getcssParams(nc,level);
		nc.data('cssobj',getobj);
	} else 
		getobj = nc.data('cssobj');

	var obj = setResponsiveCSSValues(getobj,opt);
	
	var bw=opt.bw,
		bh=opt.bh;

	if (responsive==="off") {
		bw=1;
		bh=1;
	}
																	
	// IE8 FIX FOR AUTO LINEHEIGHT
	if (obj.lineHeight=="auto") obj.lineHeight = obj.fontSize+4;

						
	if (!nc.hasClass("tp-splitted")) {

		nc.css("-webkit-transition", "none");
	    nc.css("-moz-transition", "none");
	    nc.css("-ms-transition", "none");
	    nc.css("transition", "none");
	   
	    var hashover = nc.data('transform_hover')!==undefined || nc.data('style_hover')!==undefined;
	    if (hashover) punchgs.TweenLite.set(nc,obj.styleProps);
		
		punchgs.TweenLite.set(nc,{

			 fontSize: Math.round((obj.fontSize * bw))+"px",
			 fontWeight: obj.fontWeight,
			 letterSpacing:Math.floor((obj.letterSpacing * bw))+"px",
			 paddingTop: Math.round((obj.paddingTop * bh)) + "px",
			 paddingBottom: Math.round((obj.paddingBottom * bh)) + "px",
			 paddingLeft: Math.round((obj.paddingLeft* bw)) + "px",
			 paddingRight: Math.round((obj.paddingRight * bw)) + "px",
			 marginTop: (obj.marginTop * bh) + "px",
			 marginBottom: (obj.marginBottom * bh) + "px",
			 marginLeft: (obj.marginLeft * bw) + "px",
			 marginRight: (obj.marginRight * bw) + "px",			 
			 borderTopWidth: Math.round(obj.borderTopWidth * bh) + "px",
			 borderBottomWidth: Math.round(obj.borderBottomWidth * bh) + "px",
			 borderLeftWidth: Math.round(obj.borderLeftWidth * bw) + "px",
			 borderRightWidth: Math.round(obj.borderRightWidth * bw) + "px",
			 lineHeight: Math.round(obj.lineHeight * bh) + "px",
			 overwrite:"auto"});

		if (level!="rekursive") {
			
			
			
			var winw = obj.basealign =="slide" ? opt.ulw : opt.gridwidth[opt.curWinRange],
				winh = obj.basealign =="slide" ? opt.ulh : opt.gridheight[opt.curWinRange],
				maxw = minmaxconvert(obj.maxWidth,bw,"none",winw),
				maxh = minmaxconvert(obj.maxHeight,bh,"none",winh),
				minw = minmaxconvert(obj.minWidth,bw,"0px",winw),
				minh = minmaxconvert(obj.minHeight,bh,"0px",winh);
										
			punchgs.TweenLite.set(nc,{
				 maxWidth:maxw,
				 maxHeight:maxh,
				 minWidth:minw,
				 minHeight:minh,
				 whiteSpace:obj.whiteSpace,					 
				 overwrite:"auto"
			});
			if (obj.color!="nopredefinedcolor") 				
				punchgs.TweenLite.set(nc,{color:obj.color,overwrite:"auto"});
			
		}

		setTimeout(function() {
			nc.css("-webkit-transition", nc.data('wan'));
		    nc.css("-moz-transition", nc.data('moan'));
		    nc.css("-ms-transition", nc.data('man'));
		    nc.css("transition", nc.data('ani'));

		},30);									
	}
}


//////////////////////
//	CAPTION LOOPS	//
//////////////////////
var callCaptionLoops = function(el,factor) {

	// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS
	if (el.hasClass("rs-pendulum")) {			
		if (el.data('loop-timeline')==undefined) {
			el.data('loop-timeline',new punchgs.TimelineLite);
			var startdeg = el.data('startdeg')==undefined ? -20 : el.data('startdeg'),
				enddeg = el.data('enddeg')==undefined ? 20 : el.data('enddeg'),
				speed = el.data('speed')==undefined ? 2 : el.data('speed'),
				origin = el.data('origin')==undefined ? "50% 50%" : el.data('origin'),
				easing = el.data('easing')==undefined ? punchgs.Power2.easeInOut : el.data('ease');

				
			startdeg = startdeg * factor;
			enddeg = enddeg * factor;

			el.data('loop-timeline').append(new punchgs.TweenLite.fromTo(el,speed,{force3D:"auto",rotation:startdeg,transformOrigin:origin},{rotation:enddeg,ease:easing}));
			el.data('loop-timeline').append(new punchgs.TweenLite.fromTo(el,speed,{force3D:"auto",rotation:enddeg,transformOrigin:origin},{rotation:startdeg,ease:easing,onComplete:function() {
				el.data('loop-timeline').restart();
			}}));
		}

	}

	// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS
	if (el.hasClass("rs-rotate")) {			
		if (el.data('loop-timeline')==undefined) {
			el.data('loop-timeline',new punchgs.TimelineLite);
			var startdeg = el.data('startdeg')==undefined ? 0 : el.data('startdeg'),
				enddeg = el.data('enddeg')==undefined ? 360 : el.data('enddeg');
				speed = el.data('speed')==undefined ? 2 : el.data('speed'),
				origin = el.data('origin')==undefined ? "50% 50%" : el.data('origin'),
				easing = el.data('easing')==undefined ? punchgs.Power2.easeInOut : el.data('easing');

			startdeg = startdeg * factor;
			enddeg = enddeg * factor;

			el.data('loop-timeline').append(new punchgs.TweenLite.fromTo(el,speed,{force3D:"auto",rotation:startdeg,transformOrigin:origin},{rotation:enddeg,ease:easing,onComplete:function() {
				el.data('loop-timeline').restart();
			}}));
		}

	}

	// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS
	if (el.hasClass("rs-slideloop")) {			
		if (el.data('loop-timeline')==undefined) {
			el.data('loop-timeline',new punchgs.TimelineLite);
			var xs = el.data('xs')==undefined ? 0 : el.data('xs'),
				ys = el.data('ys')==undefined ? 0 : el.data('ys'),
				xe = el.data('xe')==undefined ? 0 : el.data('xe'),
				ye = el.data('ye')==undefined ? 0 : el.data('ye'),
				speed = el.data('speed')==undefined ? 2 : el.data('speed'),
				easing = el.data('easing')==undefined ? punchgs.Power2.easeInOut : el.data('easing');

				xs = xs * factor;
				ys = ys * factor;
				xe = xe * factor;
				ye = ye * factor;

			el.data('loop-timeline').append(new punchgs.TweenLite.fromTo(el,speed,{force3D:"auto",x:xs,y:ys},{x:xe,y:ye,ease:easing}));
			el.data('loop-timeline').append(new punchgs.TweenLite.fromTo(el,speed,{force3D:"auto",x:xe,y:ye},{x:xs,y:ys,onComplete:function() {
				el.data('loop-timeline').restart();
			}}));
		}
	}

	// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS
	if (el.hasClass("rs-pulse")) {			
		if (el.data('loop-timeline')==undefined) {
			el.data('loop-timeline',new punchgs.TimelineLite);
			var zoomstart = el.data('zoomstart')==undefined ? 0 : el.data('zoomstart'),
				zoomend = el.data('zoomend')==undefined ? 0 : el.data('zoomend'),
				speed = el.data('speed')==undefined ? 2 : el.data('speed'),
				easing = el.data('easing')==undefined ? punchgs.Power2.easeInOut : el.data('easing');

			el.data('loop-timeline').append(new punchgs.TweenLite.fromTo(el,speed,{force3D:"auto",scale:zoomstart},{scale:zoomend,ease:easing}));
			el.data('loop-timeline').append(new punchgs.TweenLite.fromTo(el,speed,{force3D:"auto",scale:zoomend},{scale:zoomstart,onComplete:function() {
				el.data('loop-timeline').restart();
			}}));
		}
	}

	if (el.hasClass("rs-wave")) {			
		if (el.data('loop-timeline')==undefined) {
			el.data('loop-timeline',new punchgs.TimelineLite);

			var angle= el.data('angle')==undefined ? 10 : parseInt(el.data('angle'),0),
				radius = el.data('radius')==undefined ? 10 : parseInt(el.data('radius'),0),
				speed = el.data('speed')==undefined ? -20 : el.data('speed'),
				origin = el.data('origin')==undefined ? "50% 50%" : el.data('origin'),
				ors = origin.split(" "),
				oo = new Object();

				if (ors.length>=1) {
					oo.x = ors[0];
					oo.y = ors[1];
				} else {
					oo.x = "50%";
					oo.y = "50%";
				}

				angle = angle*factor;
				radius = radius * factor;

			var  yo = (0-el.height()/2) + (radius*(-1+(parseInt(oo.y,0)/100))),
				 xo = (el.width())*(-0.5+(parseInt(oo.x,0)/100)), 
				 angobj=	{a:0, ang : angle, element:el, unit:radius, xoffset:xo, yoffset:yo};


				el.data('loop-timeline').append(new punchgs.TweenLite.fromTo(angobj,speed,
											{	a:360	},
											{	a:0,
												force3D:"auto",
												ease:punchgs.Linear.easeNone,
												onUpdate:function() {

													var rad = angobj.a * (Math.PI / 180);
										            punchgs.TweenLite.to(angobj.element,0.1,{force3D:"auto",x:angobj.xoffset+Math.cos(rad) * angobj.unit, y:angobj.yoffset+angobj.unit * (1 - Math.sin(rad))});

												},
												onComplete:function() {
													el.data('loop-timeline').restart();
												}
											}
											));
		}
	}
}

var killCaptionLoops = function(nextcaption) {
	// SOME LOOPING ANIMATION ON INTERNAL ELEMENTS
	nextcaption.find('.rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave').each(function() {
		var el = jQuery(this);
		if (el.data('loop-timeline')!=undefined) {
				el.data('loop-timeline').pause();
				el.data('loop-timeline',null);
			}
		});
}

})(jQuery);