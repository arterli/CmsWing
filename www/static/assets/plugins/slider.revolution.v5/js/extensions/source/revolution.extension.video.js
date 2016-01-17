/********************************************
 * REVOLUTION 5.0 EXTENSION - VIDEO FUNCTIONS
 * @version: 1.0.5 (11.09.2015)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/

(function($) {

var _R = jQuery.fn.revolution,
	_ISM = _R.is_mobile();

///////////////////////////////////////////
// 	EXTENDED FUNCTIONS AVAILABLE GLOBAL  //
///////////////////////////////////////////
jQuery.extend(true,_R, {

	resetVideo : function(_nc,opt) {		
		switch (_nc.data('videotype')) {
			case "youtube":
				var player=_nc.data('player');
			 	try{
					if (_nc.data('forcerewind')=="on" && !_ISM) {
						var s = getStartSec(_nc.data('videostartat'));
						s= s==-1 ? 0 : s;
						
						_nc.data('player').seekTo(s);							
						
						_nc.data('player').pauseVideo();
					}
					
				} catch(e) {}
				if (_nc.find('.tp-videoposter').length==0)
					punchgs.TweenLite.to(_nc.find('iframe'),0.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});	
			break;

			case "vimeo":
				var f = $f(_nc.find('iframe').attr("id"));	
			 	try{
					if (_nc.data('forcerewind')=="on" && !_ISM) 	{						
						var s = getStartSec(_nc.data('videostartat')),
							ct = 0;
						s= s==-1 ? 0 : s;													
						f.api("seekTo",s);								
						f.api("pause");							
					}
					
				} catch(e) {}
				if (_nc.find('.tp-videoposter').length==0)
					punchgs.TweenLite.to(_nc.find('iframe'),0.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});
			break;

			case "html5":
				if (_ISM && _nc.data('disablevideoonmobile')==1) return false;			
		
				var jvideo = _nc.find('video'),
					video = jvideo[0];

				
				punchgs.TweenLite.to(jvideo,0.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});
				
				if (_nc.data('forcerewind')=="on" && !_nc.hasClass("videoisplaying")) {
					try{
						var s = getStartSec(_nc.data('videostartat'));					
						video.currentTime = s == -1 ? 0 : s;	
					} catch(e) {}
				}

				if (_nc.data('volume')=="mute")
					video.muted = true;			
			break;
		}
	},


	stopVideo : function(_nc,opt) {	
		
		switch (_nc.data('videotype')) {
			case "youtube":
				try{
					var player=_nc.data('player');						
					player.pauseVideo();										
				} catch(e) {}
			break;
			case "vimeo":
				try{
					var f = $f(_nc.find('iframe').attr("id"));
					f.api("pause");
					
				} catch(e) {}
			break;
			case "html5":
				var jvideo = _nc.find('video'),
					video = jvideo[0];
				video.pause();						
			break;
		}		
	},

	playVideo : function(_nc,opt) {		

		clearTimeout(_nc.data('videoplaywait'));		
		switch (_nc.data('videotype')) {
			case "youtube":				

				if (_nc.find('iframe').length==0) {
					_nc.append(_nc.data('videomarkup'));			
					addVideoListener(_nc,opt,true);
				} else {										
					if (_nc.data('player').playVideo !=undefined) {									
						_nc.data('player').playVideo();
						var s = getStartSec(_nc.data('videostartat'));
						if (s!=-1) _nc.data('player').seekTo(s);			
					} else {
						_nc.data('videoplaywait',setTimeout(function() {
							_R.playVideo(_nc,opt);
						},50));
					}
				}
			break;
			case "vimeo":		
				
				if (_nc.find('iframe').length==0) {							
					_nc.append(_nc.data('videomarkup'));			
					addVideoListener(_nc,opt,true);
					
				} else {	
						if (_nc.hasClass("rs-apiready")) {
							var id = _nc.find('iframe').attr("id"),
								f = $f(id);												
								if (f.api("play")==undefined) {																
										_nc.data('videoplaywait',setTimeout(function() {	
											
											_R.playVideo(_nc,opt);
										},50));								
								} else {																																											
									setTimeout(function() {			
									
										f.api("play");
										var s = getStartSec(_nc.data('videostartat'));										
										if (s!=-1) f.api("seekTo",s);		
									},510);	
								}																	
						} else {
							_nc.data('videoplaywait',setTimeout(function() {	
								
								_R.playVideo(_nc,opt);
							},50));
						}
				}
			break;
			case "html5":
				if (_ISM && _nc.data('disablevideoonmobile')==1) return false;			
				var jvideo = _nc.find('video'),
					video = jvideo[0],
					html5vid = jvideo.parent();

				if (html5vid.data('metaloaded') != 1) {						
					addEvent(video,'loadedmetadata',function(_nc) {								
						_R.resetVideo(_nc,opt);
						video.play();
						var s = getStartSec(_nc.data('videostartat'));
						if (s!=-1) video.currentTime = s;
					}(_nc));
				} else {		
					video.play();					
					var s = getStartSec(_nc.data('videostartat'));
					if (s!=-1) video.currentTime = s;										
				}
			break;
		}
	},

	isVideoPlaying : function(_nc,opt) {
		var ret = false;
		if (opt.playingvideos != undefined) {
			jQuery.each(opt.playingvideos,function(i,nc) {
				if (_nc.attr('id') == nc.attr('id'))					
					ret = true;													
			});
		}		
		return ret;
	},

	prepareCoveredVideo : function(asprat,opt,nextcaption) {
		var ifr = nextcaption.find('iframe, video'),
			wa = asprat.split(':')[0],
			ha = asprat.split(':')[1],
			od = opt.width/opt.height,															
			vd = wa/ha,
			nvh = (od/vd)*100,
			nvw = (vd/od)*100;					
		if (od>vd) 																
			punchgs.TweenLite.to(ifr,0.001,{height:nvh+"%", width:"100%", top:-(nvh-100)/2+"%",left:"0px",position:"absolute"});
		else 
			punchgs.TweenLite.to(ifr,0.001,{width:nvw+"%", height:"100%", left:-(nvw-100)/2+"%",top:"0px",position:"absolute"});
			
	},

	checkVideoApis : function(_nc,opt,addedApis) {		
		var httpprefix = location.protocol === 'https:' ? "https" : "http";
				
		if ((_nc.data('ytid')!=undefined  || _nc.find('iframe').length>0 && _nc.find('iframe').attr('src').toLowerCase().indexOf('youtube')>0)) opt.youtubeapineeded = true;
		if ((_nc.data('ytid')!=undefined  || _nc.find('iframe').length>0 &&  _nc.find('iframe').attr('src').toLowerCase().indexOf('youtube')>0) && addedApis.addedyt==0) {
			opt.youtubestarttime = jQuery.now();
			addedApis.addedyt=1;
			var s = document.createElement("script");								
			s.src = "https://www.youtube.com/iframe_api"; /* Load Player API*/
			var before = document.getElementsByTagName("script")[0],
				loadit = true;
			jQuery('head').find('*').each(function(){
				if (jQuery(this).attr('src') == "https://www.youtube.com/iframe_api")
				   loadit = false;
			});
			if (loadit) before.parentNode.insertBefore(s, before);

		}



		if ((_nc.data('vimeoid')!=undefined || _nc.find('iframe').length>0 && _nc.find('iframe').attr('src').toLowerCase().indexOf('vimeo')>0)) opt.vimeoapineeded = true;	
	  	if ((_nc.data('vimeoid')!=undefined || _nc.find('iframe').length>0 && _nc.find('iframe').attr('src').toLowerCase().indexOf('vimeo')>0) && addedApis.addedvim==0) {
			opt.vimeostarttime = jQuery.now();
			addedApis.addedvim=1;
			var f = document.createElement("script"),
				before = document.getElementsByTagName("script")[0],
				loadit = true;
			f.src = httpprefix+"://f.vimeocdn.com/js/froogaloop2.min.js"; /* Load Player API*/							

			jQuery('head').find('*').each(function(){
				if (jQuery(this).attr('src') == httpprefix+"://a.vimeocdn.com/js/froogaloop2.min.js")
				   loadit = false;
			});
			if (loadit)
				before.parentNode.insertBefore(f, before);
		}
		return addedApis;
	},

	manageVideoLayer : function(_nc,opt,recalled,internrecalled) {				
		// YOUTUBE AND VIMEO LISTENRES INITIALISATION		
		var vida = _nc.data("videoattributes"),
			vidytid = _nc.data('ytid'),
			vimeoid = _nc.data('vimeoid'),
			videopreload = _nc.data('videpreload'),
			videomp = _nc.data('videomp4'),
			videowebm = _nc.data('videowebm'),
			videoogv = _nc.data('videoogv'),
			videocontrols = _nc.data('videocontrols'),
			httpprefix = "http",
			videoloop = _nc.data('videoloop')=="loop" ? "loop" : _nc.data('videoloop')=="loopandnoslidestop" ? "loop" : "",
			videotype = (videomp!=undefined || videowebm!=undefined) ? "html5" : 
						(vidytid!=undefined && String(vidytid).length>1) ? "youtube" : 
						(vimeoid!=undefined && String(vimeoid).length>1) ? "vimeo" : "none",
			newvideotype = (videotype=="html5" && _nc.find('video').length==0) ? "html5" : 
						(videotype=="youtube" && _nc.find('iframe').length==0) ? "youtube" : 
						(videotype=="vimeo" && _nc.find('iframe').length==0) ? "vimeo" : "none";
						
		_nc.data('videotype',videotype);
		// ADD HTML5 VIDEO IF NEEDED
		switch (newvideotype) {
			case "html5":
				if (videocontrols!="controls") videocontrols="";								
				var apptxt = '<video style="object-fit:cover;background-size:cover;visible:hidden;width:100%; height:100%" class="" '+videoloop+' preload="'+videopreload+'">';

				//if (_nc.data('videoposter')!=undefined) apptxt = apptxt + 'poster="'+_nc.data('videoposter')+'">';
				if (videowebm!=undefined && _R.get_browser().toLowerCase()=="firefox") apptxt = apptxt + '<source src="'+videowebm+'" type="video/webm" />';
				if (videomp!=undefined) apptxt = apptxt + '<source src="'+videomp+'" type="video/mp4" />';
				if (videoogv!=undefined) apptxt = apptxt + '<source src="'+videoogv+'" type="video/ogg" />';
				apptxt = apptxt + '</video>';
				

				if (videocontrols=="controls")
					apptxt = apptxt + ('<div class="tp-video-controls">'+
											'<div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div>'+
											'<div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div>'+
											'<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div>'+
											'<div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div>'+
											'<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div>'+
										'</div>');

				_nc.data('videomarkup',apptxt)
				_nc.append(apptxt);

				// START OF HTML5 VIDEOS
				if ((_ISM && _nc.data('disablevideoonmobile')==1) ||_R.isIE(8)) _nc.find('video').remove();

				// ADD HTML5 VIDEO CONTAINER				
				_nc.find('video').each(function(i) {
					var video = this,
						jvideo = jQuery(this);

					if (!jvideo.parent().hasClass("html5vid"))
						jvideo.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:100%;height:100%; overflow:hidden;"></div>');

					var html5vid = jvideo.parent();
					if (html5vid.data('metaloaded') != 1) {
						addEvent(video,'loadedmetadata',function(_nc) {		
							htmlvideoevents(_nc,opt);
							_R.resetVideo(_nc,opt);						
						}(_nc));
					} 								
				});			
			break;
			case "youtube":
				httpprefix = "http";	
				if (location.protocol === 'https:')	
					httpprefix = "https";		
				if (videocontrols=="none") {					
			 		vida = vida.replace("controls=1","controls=0");
			 		if (vida.toLowerCase().indexOf('controls')==-1)
			 		  vida = vida+"&controls=0";
			 	}
			 	
			 	var	s = getStartSec(_nc.data('videostartat')),
			 		e = getStartSec(_nc.data('videoendat'));
							 	
			 	if (s!=-1) vida=vida+"&start="+s;
			 	if (e!=-1) vida=vida+"&end="+e;
			 	
			 	
			 	_nc.data('videomarkup','<iframe style="visible:hidden" src="'+httpprefix+'://www.youtube.com/embed/'+vidytid+'?'+vida+'" width="100%" height="100%" style="width:100%;height:100%"></iframe>');
			break;

			case "vimeo":
				if (location.protocol === 'https:')
					httpprefix = "https";
				_nc.data('videomarkup','<iframe style="visible:hidden" src="'+httpprefix+'://player.vimeo.com/video/'+vimeoid+'?'+vida+'" width="100%" height="100%" style="100%;height:100%"></iframe>');
			break;
		}
		
		//if (videotype=="vimeo" || videotype=="youtube") {
		// IF VIDEOPOSTER EXISTING
		if (_nc.data('videoposter')!=undefined && _nc.data('videoposter').length>2) {
			if (_nc.find('.tp-videoposter').length==0)
				_nc.append('<div class="tp-videoposter noSwipe" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:3;background-image:url('+_nc.data('videoposter')+'); background-size:cover;background-position:center center;"></div>');				
			if (_nc.find('iframe').length==0)
			_nc.find('.tp-videoposter').click(function() {	
				
				_R.playVideo(_nc,opt);						
									
				if (_ISM) {
					if (_nc.data('disablevideoonmobile')==1) return false;	
					punchgs.TweenLite.to(_nc.find('.tp-videoposter'),0.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut});
					punchgs.TweenLite.to(_nc.find('iframe'),0.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});
				}
			})
		} else {
			if (_nc.find('iframe').length==0 && (videotype=="youtube" || videotype=="vimeo")) {
				
				_nc.append(_nc.data('videomarkup'));
				addVideoListener(_nc,opt,false);
			}
		}
		
		// ADD DOTTED OVERLAY IF NEEDED
		if (_nc.data('dottedoverlay')!="none" && _nc.data('dottedoverlay')!=undefined && _nc.find('.tp-dottedoverlay').length!=1)
			_nc.append('<div class="tp-dottedoverlay '+_nc.data('dottedoverlay')+'"></div>');
		
		_nc.addClass("HasListener");	

		if (_nc.data('bgvideo')==1) {
			punchgs.TweenLite.set(_nc.find('video, iframe'),{autoAlpha:0});
		}
	}
	
});





//////////////////////////////////////////////////////
// * Revolution Slider - VIDEO / API FUNCTIONS		//
// * @version: 1.0 (30.10.2014)						//
// * @author ThemePunch								//
//////////////////////////////////////////////////////

function getStartSec(st) {						
	return st == undefined ? -1 :jQuery.isNumeric(st) ? st : st.split(":").length>1 ? parseInt(st.split(":")[0],0)*60 + parseInt(st.split(":")[1],0) : st;
};

// 	-	VIMEO ADD EVENT /////
var addEvent = function(element, eventName, callback) {
	if (element.addEventListener)
		element.addEventListener(eventName, callback, false);
	else
		element.attachEvent(eventName, callback, false);
};

var getVideoDatas = function(p,t,d) {
	var a = {};
	a.video = p;
	a.videotype = t;
	a.settings = d;
	return a;
}


var addVideoListener = function(_nc,opt,startnow) {
	
	var ifr = _nc.find('iframe'),
		frameID = "iframe"+Math.round(Math.random()*100000+1),
		loop = _nc.data('videoloop'),
		pforv = loop != "loopandnoslidestop";

	loop = loop =="loop" ||  loop =="loopandnoslidestop";

	// CARE ABOUT ASPECT RATIO
	if (_nc.data('forcecover')==1) {
		_nc.removeClass("fullscreenvideo").addClass("coverscreenvideo");			
		var asprat = _nc.data('aspectratio');														
		if (asprat!=undefined && asprat.split(":").length>1) 			
			_R.prepareCoveredVideo(asprat,opt,_nc);

	}

	// IF LISTENER DOES NOT EXIST YET			
	ifr.attr('id',frameID);		

	if (startnow) _nc.data('startvideonow',true);

	if (_nc.data('videolistenerexist')!==1) {	
		switch (_nc.data('videotype')) {
			// YOUTUBE LISTENER
			case "youtube":

				var player = new YT.Player(frameID, {
					events: {
						"onStateChange": function(event) {
							var embedCode = event.target.getVideoEmbedCode(),
							 	ytcont = jQuery('#'+embedCode.split('id="')[1].split('"')[0]),
							 	container = ytcont.closest('.tp-simpleresponsive'),
							 	_nc = ytcont.parent(),
							 	player = ytcont.parent().data('player');
							if (event.data == YT.PlayerState.PLAYING) {
								punchgs.TweenLite.to(_nc.find('.tp-videoposter'),0.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut});
								punchgs.TweenLite.to(_nc.find('iframe'),0.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});							
								if (_nc.data('volume')=="mute") {
									  player.mute();
								 } else {
									  player.unMute();
									  player.setVolume(parseInt(_nc.data('volume'),0) || 75);
								}

								opt.videoplaying=true;									
								addVidtoList(_nc,opt);									
								container.trigger('stoptimer');									
								opt.c.trigger('revolution.slide.onvideoplay',getVideoDatas(player,"youtube",_nc.data()));													
							} else {							
								if (event.data==0 && loop) {
									player.playVideo();
									var s = getStartSec(_nc.data('videostartat'));
									if (s!=-1) player.seekTo(s);									
								}
								if ((event.data==0 || event.data==2) && _nc.data('showcoveronpause')=="on" && _nc.find('.tp-videoposter').length>0) {										
									punchgs.TweenLite.to(_nc.find('.tp-videoposter'),0.3,{autoAlpha:1,force3D:"auto",ease:punchgs.Power3.easeInOut});
									punchgs.TweenLite.to(_nc.find('iframe'),0.3,{autoAlpha:0,ease:punchgs.Power3.easeInOut});																			
								} 
								if ((event.data!=-1 && event.data!=3)) {
									opt.videoplaying=false;
									remVidfromList(_nc,opt);
									container.trigger('starttimer');
									opt.c.trigger('revolution.slide.onvideostop',getVideoDatas(player,"youtube",_nc.data()));
								} 
								if (event.data==0 && _nc.data('nextslideatend')==true) {
									opt.c.revnext();
									remVidfromList(_nc,opt);
								} else {
									remVidfromList(_nc,opt);
									opt.videoplaying=false;
									container.trigger('starttimer');
									opt.c.trigger('revolution.slide.onvideostop',getVideoDatas(player,"youtube",_nc.data()));
								}
							}
						},
						'onReady': function(event) {	

							var embedCode = event.target.getVideoEmbedCode(),
								ytcont = jQuery('#'+embedCode.split('id="')[1].split('"')[0]),
								_nc = ytcont.parent(),
								videorate = _nc.data('videorate'),
								videostart = _nc.data('videostart');

							_nc.addClass("rs-apiready");
							if (videorate!=undefined)
								event.target.setPlaybackRate(parseFloat(videorate));
							
							// PLAY VIDEO IF THUMBNAIL HAS BEEN CLICKED
							_nc.find('.tp-videoposter').unbind("click");
							_nc.find('.tp-videoposter').click(function() {										
								 if (!_ISM) {
									 player.playVideo();
								}
							})

							if (_nc.data('startvideonow')) {
								
								_nc.data('player').playVideo();	
								var s = getStartSec(_nc.data('videostartat'));
								if (s!=-1) _nc.data('player').seekTo(s);
								//_nc.find('.tp-videoposter').click();
							}
							_nc.data('videolistenerexist',1);					
						}
					}
				});			
				_nc.data('player',player);
			break;

			// VIMEO LISTENER
			case "vimeo":
				var isrc = ifr.attr('src'),
					queryParameters = {}, queryString = isrc,
					re = /([^&=]+)=([^&]*)/g, m;
				// Creates a map with the query string parameters
				while (m = re.exec(queryString)) {
					queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
				}
				if (queryParameters['player_id']!=undefined)
					isrc = isrc.replace(queryParameters['player_id'],frameID);
				else
					isrc=isrc+"&player_id="+frameID;
				try{ isrc = isrc.replace('api=0','api=1'); } catch(e) {}
				isrc=isrc+"&api=1";
				ifr.attr('src',isrc);
				
			
				var player = _nc.find('iframe')[0],
					vimcont = jQuery('#'+frameID),
					f = $f(frameID);				

				f.addEvent('ready', function(){	
					
					_nc.addClass("rs-apiready");
					f.addEvent('play', function(data) {							
						_nc.data('nextslidecalled',0);
						punchgs.TweenLite.to(_nc.find('.tp-videoposter'),0.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut});
						punchgs.TweenLite.to(_nc.find('iframe'),0.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});							
						opt.c.trigger('revolution.slide.onvideoplay',getVideoDatas(f,"vimeo",_nc.data()));
						opt.videoplaying=true;
						addVidtoList(_nc,opt);
						if (pforv) 
							opt.c.trigger('stoptimer');
						if (_nc.data('volume')=="mute")
						  f.api('setVolume',"0")
						else
						  f.api('setVolume',(parseInt(_nc.data('volume'),0)/100 || 0.75));

					});

					f.addEvent('playProgress',function(data) {					
						var et = getStartSec(_nc.data('videoendat'))							
						

						if (et!=0 && (Math.abs(et-data.seconds) <0.3 && et>data.seconds) && _nc.data('nextslidecalled') != 1) {																
							if (loop) {								
								
								f.api("play");								
								var s = getStartSec(_nc.data('videostartat'));
								if (s!=-1) f.api("seekTo",s);				
							} else {									
								if (_nc.data('nextslideatend')==true) {				
									_nc.data('nextslidecalled',1);			
									opt.c.revnext();							
								}
								f.api("pause");
							}
						}
					});

					f.addEvent('finish', function(data) {
							remVidfromList(_nc,opt);
							opt.videoplaying=false;
							opt.c.trigger('starttimer');
							opt.c.trigger('revolution.slide.onvideostop',getVideoDatas(f,"vimeo",_nc.data())); 
							if (_nc.data('nextslideatend')==true)
								opt.c.revnext();

					});

					f.addEvent('pause', function(data) {

							if (_nc.find('.tp-videoposter').length>0 && _nc.data('showcoveronpause')=="on") {
								punchgs.TweenLite.to(_nc.find('.tp-videoposter'),0.3,{autoAlpha:1,force3D:"auto",ease:punchgs.Power3.easeInOut});
								punchgs.TweenLite.to(_nc.find('iframe'),0.3,{autoAlpha:0,ease:punchgs.Power3.easeInOut});
							} 
							opt.videoplaying=false;
							remVidfromList(_nc,opt);
							opt.c.trigger('starttimer');
							opt.c.trigger('revolution.slide.onvideostop',getVideoDatas(f,"vimeo",_nc.data())); 
					});
					
					
					
					_nc.find('.tp-videoposter').unbind("click");
					_nc.find('.tp-videoposter').click(function() {							 
						 if (!_ISM) { 
						 	
						 	f.api("play");
						 	return false;
						 }
					})
					if (_nc.data('startvideonow')) {	
						
							f.api("play");
							var s = getStartSec(_nc.data('videostartat'));
							if (s!=-1) f.api("seekTo",s);					
					}
					_nc.data('videolistenerexist',1);
				});
			break;
		}
	} else {
		var s = getStartSec(_nc.data('videostartat'));
		switch (_nc.data('videotype')) {
			// YOUTUBE LISTENER
			case "youtube":
				if (startnow) {
					_nc.data('player').playVideo();	
					if (s!=-1) _nc.data('player').seekTo()
				}
			break;
			case "vimeo":
				if (startnow) {
					var f = $f(_nc.find('iframe').attr("id"));	
					f.api("play");					
					if (s!=-1) f.api("seekTo",s);					
				}
			break;
		}
	}
}


/////////////////////////////////////////	HTML5 VIDEOS 	///////////////////////////////////////////	

var htmlvideoevents = function(_nc,opt,startnow) {

	if (_ISM && _nc.data('disablevideoonmobile')==1) return false;			
	var jvideo = _nc.find('video'),
		video = jvideo[0],
		html5vid = jvideo.parent(),
		loop = _nc.data('videoloop'),
		pforv = loop != "loopandnoslidestop";

	loop = loop =="loop" ||  loop =="loopandnoslidestop";

	html5vid.data('metaloaded',1);
	// FIRST TIME LOADED THE HTML5 VIDEO

	
								
	
	//PLAY, STOP VIDEO ON CLICK OF PLAY, POSTER ELEMENTS
	if (jvideo.attr('control') == undefined ) {
		if (_nc.find('.tp-video-play-button').length==0 && !_ISM)
			_nc.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>');
		_nc.find('video, .tp-poster, .tp-video-play-button').click(function() {
			if (_nc.hasClass("videoisplaying"))
				video.pause();
			else
				video.play();
		})
	}

	// PRESET FULLCOVER VIDEOS ON DEMAND
	if (_nc.data('forcecover')==1 || _nc.hasClass('fullscreenvideo'))  {
		if (_nc.data('forcecover')==1) {
			html5vid.addClass("fullcoveredvideo");	
			var asprat = _nc.data('aspectratio');				
			_R.prepareCoveredVideo(asprat,opt,_nc);
		}
		else
			html5vid.addClass("fullscreenvideo");				
	}


	// FIND CONTROL BUTTONS IN VIDEO, AND ADD EVENT LISTENERS ON THEM
	var playButton = _nc.find('.tp-vid-play-pause')[0],
		muteButton = _nc.find('.tp-vid-mute')[0],
		fullScreenButton = _nc.find('.tp-vid-full-screen')[0],
		seekBar = _nc.find('.tp-seek-bar')[0],
		volumeBar = _nc.find('.tp-volume-bar')[0];

	if (playButton!=undefined) {
		// Event listener for the play/pause button
		addEvent(playButton,"click", function() {
			if (video.paused == true) 
				video.play();
			else
				video.pause();
		});

		// Event listener for the mute button
		addEvent(muteButton,"click", function() {
			if (video.muted == false) {
				video.muted = true;
				muteButton.innerHTML = "Unmute";
			} else {
				video.muted = false;
				muteButton.innerHTML = "Mute";
			}
		});

		// Event listener for the full-screen button
		addEvent(fullScreenButton,"click", function() {
			if (video.requestFullscreen) {
				video.requestFullscreen();
			} else if (video.mozRequestFullScreen) {
				video.mozRequestFullScreen(); // Firefox
			} else if (video.webkitRequestFullscreen) {
				video.webkitRequestFullscreen(); // Chrome and Safari
			}
		});


		// Event listener for the seek bar
		addEvent(seekBar,"change", function() {							
			var time = video.duration * (seekBar.value / 100);							
			video.currentTime = time;											

		});

		// Update the seek bar as the video plays
		addEvent(video,"timeupdate", function() {						
			var value = (100 / video.duration) * video.currentTime,
				et = getStartSec(_nc.data('videoendat')),
				cs  =video.currentTime;	
			seekBar.value = value;						
			if (et!=0 && (Math.abs(et-cs) <=0.3 && et>cs) && _nc.data('nextslidecalled') != 1) {
				if (loop) {
					video.play();
					var s = getStartSec(_nc.data('videostartat'));
					if (s!=-1) video.currentTime = s;				
				} else {
					if (_nc.data('nextslideatend')==true) {				
						_nc.data('nextslidecalled',1);			
						opt.c.revnext();							
					}
					video.pause();
				}
			}
		});

		// Pause the video when the seek handle is being dragged
		addEvent(seekBar,"mousedown", function() {
			_nc.addClass("seekbardragged");
			video.pause();

		});

		// Play the video when the seek handle is dropped
		addEvent(seekBar,"mouseup", function() {
			_nc.removeClass("seekbardragged");
			video.play();

		});

		// Event listener for the volume bar
		addEvent(volumeBar,"change", function() {
			// Update the video volume
			video.volume = volumeBar.value;
		});
	}


	// VIDEO EVENT LISTENER FOR "PLAY"
	addEvent(video,"play",function() {


		_nc.data('nextslidecalled',0);

		if (_nc.data('volume')=="mute")
			  video.muted=true;

		_nc.addClass("videoisplaying");

		addVidtoList(_nc,opt);

		if (!pforv) {				
			opt.videoplaying=false;
			opt.c.trigger('starttimer');
			opt.c.trigger('revolution.slide.onvideostop',getVideoDatas(video,"html5",_nc.data()));
		} else {				
			opt.videoplaying=true;
			opt.c.trigger('stoptimer');
			opt.c.trigger('revolution.slide.onvideoplay',getVideoDatas(video,"html5",_nc.data()));				
		}

		punchgs.TweenLite.to(_nc.find('.tp-videoposter'),0.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut});
		punchgs.TweenLite.to(_nc.find('video'),0.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});	

		var playButton = _nc.find('.tp-vid-play-pause')[0],
			muteButton = _nc.find('.tp-vid-mute')[0];
		if (playButton!=undefined)
			playButton.innerHTML = "Pause";
		if (muteButton!=undefined && video.muted)
			muteButton.innerHTML = "Unmute";
	});

	// VIDEO EVENT LISTENER FOR "PAUSE"
	addEvent(video,"pause",function() {
		
		if (_nc.find('.tp-videoposter').length>0 && _nc.data('showcoveronpause')=="on" && !_nc.hasClass("seekbardragged")) {
			punchgs.TweenLite.to(_nc.find('.tp-videoposter'),0.3,{autoAlpha:1,force3D:"auto",ease:punchgs.Power3.easeInOut});
			punchgs.TweenLite.to(_nc.find('video'),0.3,{autoAlpha:0,ease:punchgs.Power3.easeInOut});
		} 
		
		_nc.removeClass("videoisplaying");
		opt.videoplaying=false;
		remVidfromList(_nc,opt);
		opt.c.trigger('starttimer');
		opt.c.trigger('revolution.slide.onvideostop',getVideoDatas(video,"html5",_nc.data()));
		var playButton = _nc.find('.tp-vid-play-pause')[0];
		if (playButton!=undefined)
			playButton.innerHTML = "Play";					
	});

	// VIDEO EVENT LISTENER FOR "END"
	addEvent(video,"ended",function() {		
		remVidfromList(_nc,opt);
		opt.videoplaying=false;
		remVidfromList(_nc,opt);
		opt.c.trigger('starttimer');
		opt.c.trigger('revolution.slide.onvideostop',getVideoDatas(video,"html5",_nc.data()));
		if (_nc.data('nextslideatend')==true)
			opt.c.revnext();
		_nc.removeClass("videoisplaying");
		
		
	});		
}



var addVidtoList = function(_nc,opt) {
	
	if (opt.playingvideos == undefined) opt.playingvideos = new Array();		
	
	// STOP OTHER VIDEOS
	if (_nc.data('stopallvideos')) {		
		if (opt.playingvideos != undefined && opt.playingvideos.length>0) { 
			opt.lastplayedvideos = jQuery.extend(true,[],opt.playingvideos);
			jQuery.each(opt.playingvideos,function(i,_nc) {
				_R.stopVideo(_nc,opt);
			});
		}			
	}	
	opt.playingvideos.push(_nc);		
}


var remVidfromList = function(_nc,opt) {		
	if (opt.playingvideos != undefined)
		opt.playingvideos.splice(jQuery.inArray(_nc,opt.playingvideos),1);		
}
	

})(jQuery);