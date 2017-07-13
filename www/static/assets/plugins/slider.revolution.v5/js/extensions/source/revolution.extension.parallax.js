/********************************************
 * REVOLUTION 5.0 EXTENSION - PARALLAX
 * @version: 1.0.1 (17.08.2015)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/

(function($) {

var _R = jQuery.fn.revolution,
	_ISM = _R.is_mobile();

jQuery.extend(true,_R, {	
	checkForParallax : function(container,opt) {
		
		var _ = opt.parallax;

		if (_ISM && _.disable_onmobile=="on") return false;
		
		opt.li.each(function() {
			var li = jQuery(this);
			for (var i = 1; i<=10;i++)
				li.find('.rs-parallaxlevel-'+i).each(function() {
					var pw = jQuery(this),
						tpw = pw.closest('.tp-parallax-wrap');												
					tpw.data('parallaxlevel',_.levels[i-1])
					tpw.addClass("tp-parallax-container");								
				});
		})

		

		if (_.type=="mouse" || _.type=="scroll+mouse" || _.type=="mouse+scroll") {
		

			container.mouseenter(function(event) {

				var currslide = container.find('.active-revslide');
						var t = container.offset().top,
							l = container.offset().left,
							ex = (event.pageX-l),
							ey =  (event.pageY-t);
						currslide.data("enterx",ex);
						currslide.data("entery",ey);

			})

			container.on('mousemove.hoverdir, mouseleave.hoverdir',function(event) {

				var currslide = container.find('.active-revslide');
				switch (event.type) {

					case "mousemove":

							if (_.origo=="enterpoint") {
								var	t = container.offset().top,
									l = container.offset().left;

								if (currslide.data("enterx") ==undefined)  currslide.data("enterx",(event.pageX-l));
								if (currslide.data("entery") ==undefined)  currslide.data("entery",(event.pageY-t));										
									
								var mh = currslide.data("enterx"),
									mv = currslide.data("entery"),
									diffh = (mh - (event.pageX  - l)),
									diffv = (mv - (event.pageY - t)),
									s = _.speed/1000 || 0.4;
							} else {
								var	t = container.offset().top,
									l = container.offset().left,
									diffh = (opt.conw/2 - (event.pageX-l)),
									diffv = (opt.conh/2 - (event.pageY-t)),
									s = _.speed/1000 || 3;
							}
							
							currslide.find(".tp-parallax-container").each(function() {
								var pc = jQuery(this),
									pl = parseInt(pc.data('parallaxlevel'),0)/100,
									offsh =	diffh * pl,
									offsv =	diffv * pl;
								
								if (_.type=="scroll+mouse" || _.type=="mouse+scroll")
									punchgs.TweenLite.to(pc,s,{force3D:"auto",x:offsh,ease:punchgs.Power3.easeOut,overwrite:"all"});
								else
									punchgs.TweenLite.to(pc,s,{force3D:"auto",x:offsh,y:offsv,ease:punchgs.Power3.easeOut,overwrite:"all"});
							})

					break;
					case "mouseleave":
							currslide.find(".tp-parallax-container").each(function() {
								var pc = jQuery(this);
								if (_.type=="scroll+mouse" || _.type=="mouse+scroll")
									punchgs.TweenLite.to(pc,1.5,{force3D:"auto",x:0,ease:punchgs.Power3.easeOut});
								else
									punchgs.TweenLite.to(pc,1.5,{force3D:"auto",x:0,y:0,ease:punchgs.Power3.easeOut});
							})
					break;
				}
			});

			if (_ISM)
				window.ondeviceorientation = function(event) {
				  var 	y = Math.round(event.beta  || 0),
				  		x = Math.round(event.gamma || 0);

				  var currslide = container.find('.active-revslide');

				  if (jQuery(window).width() > jQuery(window).height()){
				  		var xx = x;
				  		x = y;
				  		y = xx;
				  }

					var curh = 360/container.width() * x,
				  		curv = 180/container.height() * y;

				  currslide.find(".tp-parallax-container").each(function() {
						var pc = jQuery(this),
							pl = parseInt(pc.data('parallaxlevel'),0)/100,
							offsh =	curh * pl,
							offsv =	curv * pl;
						punchgs.TweenLite.to(pc,0.2,{force3D:"auto",x:offsh,y:offsv,ease:punchgs.Power3.easeOut});
					})
				 }
		}
		
		/*if (_.type=="scroll" || _.type=="scroll+mouse" || _.type=="mouse+scroll") 
			if (_ISM && opt.parallax.disable_onmobile=="on") 
				return false;
			else*/
		_R.scrollTicker(opt,container);
		

	},

	scrollTicker : function(opt,container) {
		if (opt.scrollTicker!=true) {
			opt.scrollTicker = true;				
			punchgs.TweenLite.ticker.fps(150);
			punchgs.TweenLite.ticker.addEventListener("tick",function() {_R.scrollHandling(opt);},container,true,1);
		}
	},



	//	-	SET POST OF SCROLL PARALLAX	-
	scrollHandling : function(opt) {	
		


		opt.lastwindowheight = opt.lastwindowheight || jQuery(window).height();

		var t = opt.c.offset().top,
			st = jQuery(window).scrollTop(),					
			b = new Object(),
			_v = opt.viewPort,
			_ = opt.parallax;

		if (opt.lastscrolltop==st) return false;
		opt.lastscrolltop = st;

		b.top = (t-st);		
		b.h = opt.conh==0 ? opt.c.height() : opt.conh;		
		b.bottom = (t-st) + b.h;

		var proc = b.top<0 ? b.top / b.h : b.bottom>opt.lastwindowheight ? (b.bottom-opt.lastwindowheight) / b.h : 0;
		opt.scrollproc = proc;

		if (_R.callBackHandling)
			_R.callBackHandling(opt,"parallax","start");

		var area = 1-Math.abs(proc);
		area = area<0 ? 0 : area;
				
		if (_v.enable) {

		 	if (1-_v.visible_area<=area) {
				if (!opt.inviewport) {
					opt.inviewport = true;
					_R.enterInViewPort(opt);
				}
			} else {
				if (opt.inviewport) {
					opt.inviewport = false;
					_R.leaveViewPort(opt);
				}
			}
		}
		// SCROLL BASED PARALLAX EFFECT 
		if (_ISM && opt.parallax.disable_onmobile=="on") return false;

		var pt = new punchgs.TimelineLite();
		pt.pause();

		if (_.type=="scroll" || _.type=="scroll+mouse" || _.type=="mouse+scroll") 
			opt.c.find(".tp-parallax-container").each(function(i) {
				var pc = jQuery(this),
					pl = parseInt(pc.data('parallaxlevel'),0)/100,
					offsv =	proc * -(pl*opt.conh);
				pc.data('parallaxoffset',offsv);
				pt.add(punchgs.TweenLite.set(pc,{force3D:"auto",y:offsv}),0);
			});		
		opt.c.find('.tp-revslider-slidesli .slotholder, .tp-revslider-slidesli .rs-background-video-layer').each(function() {

			var t = jQuery(this),
				l = t.data('bgparallax') || opt.parallax.bgparallax;				
				l = l == "on" ? 1 : l;				
				if (l!== undefined || l !== "off") {
					var pl = opt.parallax.levels[parseInt(l,0)-1]/100,
					offsv =	proc * -(pl*opt.conh);		
					if (jQuery.isNumeric(offsv))	
						pt.add(punchgs.TweenLite.set(t,{position:"absolute",top:"0px",left:"0px",backfaceVisibility:"hidden",force3D:"true",y:offsv+"px",overwrite:"auto"}),0);
				}
		});

		if (_R.callBackHandling)
			_R.callBackHandling(opt,"parallax","end");
		
		
		pt.play(0);
	}
		
});



//// END OF PARALLAX EFFECT	
})(jQuery);