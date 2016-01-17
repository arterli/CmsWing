/********************************************
 * REVOLUTION 5.0 EXTENSION - ACTIONS
 * @version: 1.0.2 (18.08.2015)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/

(function($) {

var _R = jQuery.fn.revolution;

///////////////////////////////////////////
// 	EXTENDED FUNCTIONS AVAILABLE GLOBAL  //
///////////////////////////////////////////
jQuery.extend(true,_R, {
	checkActions : function(_nc,opt,as) {
		checkActions_intern(_nc,opt,as);
	}		
});

//////////////////////////////////////////
//	-	INITIALISATION OF ACTIONS 	-	//
//////////////////////////////////////////
var checkActions_intern = function(_nc,opt,as) {
if (as)				
	jQuery.each(as,function(i,a) {		
		a.delay = parseInt(a.delay,0)/1000;
		_nc.addClass("noSwipe")
		_nc.on(a.event,function() {			
			var tnc = jQuery("#"+a.layer);
			if (a.action=="stoplayer" || a.action=="togglelayer" || a.action=="startlayer") {
				if (tnc.length>0) 												
					if (a.action=="startlayer" || (a.action=="togglelayer" && tnc.data('animdirection')!="in")) {
						tnc.data('animdirection',"in");
						var otl = tnc.data('timeline_out'),
							base_offsetx = opt.sliderType==="carousel" ? 0 : opt.width/2 - (opt.gridwidth[opt.curWinRange]*opt.bw)/2,
							base_offsety=0;																		
						if (otl!=undefined) otl.pause(0).kill();																		
						if (_R.animateSingleCaption) _R.animateSingleCaption(tnc,opt,base_offsetx,base_offsety,0,false,true);	
						var tl = tnc.data('timeline');
						tnc.data('triggerstate',"on");																														
						punchgs.TweenLite.delayedCall(a.delay,function() {
							tl.play(0);
						},[tl]);								
					} else 

					if (a.action=="stoplayer" || (a.action=="togglelayer" && tnc.data('animdirection')!="out")) {
						tnc.data('animdirection',"out");
						tnc.data('triggered',true);
						tnc.data('triggerstate',"off");
						if (_R.stopVideo) _R.stopVideo(tnc,opt);
						if (_R.endMoveCaption)												
						punchgs.TweenLite.delayedCall(a.delay,_R.endMoveCaption,[tnc,null,null,opt]);														
					}															
			} else 	
			punchgs.TweenLite.delayedCall(a.delay,function() {
				switch (a.action) {
					case "scrollbelow":		

						_nc.addClass("tp-scrollbelowslider");
						_nc.data('scrolloffset',a.offset);
						_nc.data('scrolldelay',a.delay);						
						var off=getOffContH(opt.fullScreenOffsetContainer) || 0,
							aof = parseInt(a.offset,0) || 0;									 
						off =  off - aof || 0;							
						jQuery('body,html').animate({scrollTop:(opt.c.offset().top+(jQuery(opt.li[0]).height())-off)+"px"},{duration:400});																											
					break;
					case "callback":
						eval(a.callback);							
					break;
					case "jumptoslide":	
						switch (a.slide.toLowerCase()) {
							case "+1":
							case "next":
								opt.sc_indicator="arrow";
								_R.callingNewSlide(opt,opt.c,1);					
							break;
							case "previous":
							case "prev":
							case "-1":									
								opt.sc_indicator="arrow";
								_R.callingNewSlide(opt,opt.c,-1);																		
							break;
							default:
								var ts = jQuery.isNumeric(a.slide) ?  parseInt(a.slide,0) : a.slide;
								_R.callingNewSlide(opt,opt.c,ts);									
							break;
						}												
					break;
					case "simplelink":						
						window.open(a.url,a.target);
					break;
					case "toggleslider":								
						if (opt.sliderstatus=="playing")
							opt.c.revpause();
						else
							opt.c.revresume();								
					break;
					case "pauseslider":								
						opt.c.revpause();								
					break;
					case "playslider":								
						opt.c.revresume();								
					break;
					case "playvideo":							
						if (tnc.length>0)									
							_R.playVideo(tnc,opt);									
					break;
					case "stopvideo":						
						if (tnc.length>0)										
							if (_R.stopVideo) _R.stopVideo(tnc,opt);									
					break;
					case "togglevideo":
						if (tnc.length>0) 				
						
							if (!_R.isVideoPlaying(tnc,opt))
								_R.playVideo(tnc,opt);
							else
								if (_R.stopVideo) _R.stopVideo(tnc,opt);		
					break;
					case "simulateclick":
						if (tnc.length>0) tnc.click();										
					break;
					case "toggleclass":
						if (tnc.length>0) 								
							if (!tnc.hasClass(a.classname))
								tnc.addClass(a.classname);
							else
								tnc.removeClass(a.classname);									
					break;
				}
			},[tnc,opt,a,_nc]);
		});		
		switch (a.action) {					
			case "togglelayer":
			case "startlayer":
			case "playlayer":
			case "stoplayer":
				var tnc = jQuery("#"+a.layer);		
					if (tnc.data('start')!="bytrigger")	{
						tnc.data('triggerstate',"on");						
						tnc.data('animdirection',"in");						
					}	
			break;

		}
	})		
}


var getOffContH = function(c) {
	if (c==undefined) return 0;		
	if (c.split(',').length>1) {
		oc = c.split(",");
		var a =0;
		if (oc)
			jQuery.each(oc,function(index,sc) {
				if (jQuery(sc).length>0)
					a = a + jQuery(sc).outerHeight(true);							
			});
		return a;
	} else {
		return jQuery(c).height();
	}
	return 0;
}

})(jQuery);