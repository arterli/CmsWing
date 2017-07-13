/** ********************************************** **
	@Music 			Demo [usage example]
	@Last Update	2:00 PM Saturday, August 08, 2015
*************************************************** **/

	jQuery(document).ready(function() {

		_music();

	});



	/**	_shop() 
	******************************* **/
	function _music() {


		/** AUDIO PLAYER
		 ** *********************** **/
		loadScript(plugin_path + 'mediaelement/mediaelement-and-player.min.js', function() { // load mediaelement plugin first!

			/* global mejs, _wpmejsSettings */
			(function ($) {
				// add mime-type aliases to MediaElement plugin support
				mejs.plugins.silverlight[0].types.push('video/x-ms-wmv');
				mejs.plugins.silverlight[0].types.push('audio/x-ms-wma');

				jQuery(function () {
					var settings = {};

					if ( typeof _wpmejsSettings !== 'undefined' ) {
						settings = _wpmejsSettings;
					}

					settings.success = settings.success || function (mejs) {
						var autoplay, loop;

						if ( 'flash' === mejs.pluginType ) {
							autoplay = mejs.attributes.autoplay && 'false' !== mejs.attributes.autoplay;
							loop = mejs.attributes.loop && 'false' !== mejs.attributes.loop;

							autoplay && mejs.addEventListener( 'canplay', function () {
								mejs.play();
							}, false );

							loop && mejs.addEventListener( 'ended', function () {
								mejs.play();
							}, false );
						}
					};

					jQuery('audio,video').mediaelementplayer(settings);
				});

			}(jQuery));




			/** ********************************* PLAYER REWRITE ********************************** **/
			var theplayer 	= jQuery('audio').closest('.music-float-top-player, .music-top-player');
				control 	= jQuery('audio').parent('.mejs-mediaelement').siblings('.mejs-controls');
			
			// play pause next previous button
			var play_control = jQuery('<div class="music-play-control"></div>');
			control.prepend(play_control);
			
			var previous = jQuery('<div class="music-previous-button"></div>');
			previous.click(function(){
				theplayer.siblings('.music-player-list').children('.active').prev().trigger('click');
			});
			previous.append('<i class="fa fa-backward"></i>');
			previous.appendTo(play_control);
			
			var play = control.children('.mejs-playpause-button');
			play.children('button').remove();
			play.append('<i class="fa"></i>');
			play.appendTo(play_control)
			
			var next = jQuery('<div class="music-next-button"></div>');
			next.click(function(){
				theplayer.siblings('.music-player-list').children('.active').next().trigger('click');
			});
			next.append('<i class="icon-forward"></i>')
			next.appendTo(play_control);
			
			// time elapse 
			var time_rail = control.children('.mejs-time-rail');
			var time_elapse = jQuery('<div class="music-time-elapse">(</div>');
			time_elapse.appendTo(time_rail);
			time_elapse.append(control.children('.mejs-currenttime-container'));
			time_elapse.append(jQuery('<span class="music-seperator"> / </span>'));
			time_elapse.append(control.children('.mejs-duration-container'));
			time_elapse.append(')');
			
			// title and album thumbnail 
			theplayer.children('.music-top-player-title').prependTo(time_rail);
			theplayer.children('.music-top-player-thumbnail').appendTo(time_rail);

			// download section	
			theplayer.children('.music-top-player-download').each(function(){
				jQuery(this).children('.top-player-list').click(function(){
					theplayer.siblings('.music-player-list').slideToggle();
					return false;
				});
				jQuery(this).appendTo(control);
			});
			
			// volumn bar
			var volume_bar = jQuery('<div class="music-volumn-bar"></div>');
			control.append(volume_bar);
			control.children('.mejs-volume-button').appendTo(volume_bar);
			control.children('.mejs-horizontal-volume-slider').appendTo(volume_bar);	

			// close bar
			var open_bar = jQuery('#music-open-float-player');
			var close_bar = jQuery('<div id="music-player-close" class="music-hide-float-bar"></div>');
			close_bar.append('<i class="glyphicon glyphicon-remove"></i>');
			control.append(close_bar);
			/** ******************************************************************************* **/




			/** *********************************** PLAYLIST ********************************** **/
			function _playlist() {
				jQuery(".music-player-list>li").click(function(){
					if( jQuery(this).hasClass('active') ) return;

					// case for album category page
					jQuery('.music-player-list li').eq(jQuery(this).index()).each(function(){
						jQuery(this).addClass('active');
						jQuery(this).siblings().removeClass('active');
					});
					
					jQuery(this).addClass('active').siblings().removeClass('active');
				
					var file = [];
					if( jQuery(this).attr('data-mp3') ){
						file.push({src: jQuery(this).attr('data-mp3'), type:'audio/mpeg'});
					}
					if( jQuery(this).attr('data-ogg') ){
						file.push({src: jQuery(this).attr('data-ogg'), type:'audio/ogg'});
					}
					if( jQuery(this).attr('data-wav') ){
						file.push({src: jQuery(this).attr('data-wav'), type:'audio/wav'});
					}
					
					var top_player = jQuery(this).parent('.music-player-list').siblings('.music-top-player, .music-float-top-player');
					var song_title = (jQuery(this).attr('data-title'))? jQuery(this).attr('data-title'): jQuery(this).html();
					top_player.find('.music-top-player-title').html(song_title);
					
					if( jQuery(this).attr('data-download') ){
						top_player.find('.top-player-download').attr('href', jQuery(this).attr('data-download')).show();
					}else{
						top_player.find('.top-player-download').hide();
					}
					if( jQuery(this).attr('data-apple') ){
						top_player.find('.top-player-apple').attr('href', jQuery(this).attr('data-apple')).show();
					}else{
						top_player.find('.top-player-apple').hide();
					}
					if( jQuery(this).attr('data-amazon') ){
						top_player.find('.top-player-amazon').attr('href', jQuery(this).attr('data-amazon')).show();
					}else{
						top_player.find('.top-player-amazon').hide();
					}
					
					top_player.find('audio:first').each(function(){
						var temp_player;
						if( typeof(this.player) == 'undefined' ){
							temp_player = this;
						}else{
							temp_player = this.player;
						}			
					
						temp_player.pause();
						temp_player.setSrc(file);
						temp_player.load();
						temp_player.play();
					});

				});
			}	_playlist();
			/** ******************************************************************************* **/



			/** ******************************** SELECT ALBUM ********************************* **/
			// select album 
			jQuery('.music-play-album').click(function(){
				jQuery('.music-album-playing').removeClass('music-album-playing');
				jQuery(this).addClass('music-album-playing');
			
				var float_player 	= jQuery('#music-player');
				var play_list 		= float_player.find('.music-player-list');
				
				if( jQuery(this).siblings('.music-album-thumbnail').html() ){
					float_player.find('.music-top-player-thumbnail').html( jQuery(this).siblings('.music-album-thumbnail').html() );
				}

				play_list.html( jQuery(this).siblings('.music-album-list').html() );
				play_list.children('li').gdlr_play_list();
				play_list.children('li:first').trigger('click');
			});

			// single album
			jQuery('.music-album-song-list li .music-list-icon').click(function(){
				jQuery(".music-album-song-list li").removeClass('active');
				jQuery(this).closest('li').addClass('active');

				var float_player 	= jQuery('#music-player');
				var play_list 		= float_player.find('#music-player-list');

				play_list.children().eq(jQuery(this).parent().index()).trigger('click');
			});
			/** ******************************************************************************* **/




			/** ********************************* ALBUM PLAY ********************************** **/
			jQuery('.album-play').click(function() {

				jQuery('.album-play').removeClass('active');
				jQuery(this).addClass('active');
			
				var float_player 	= jQuery('#music-player');
				var play_list 		= float_player.find('#music-player-list');
				
				// if( jQuery(this).siblings('.music-top-player-thumbnail').html() ){
					jQuery('.music-top-player-thumbnail').html(jQuery(this).siblings('.music-album-thumbnail').html());
				// }

				play_list.html( jQuery(this).siblings('.music-album-list').html() );
				// play_list.attr('id', 'music-player-list');

				_playlist();
				play_list.children('li:first').trigger('click');
			});
			/** ******************************************************************************* **/




			// play audio - [bottom player]
			jQuery("#music-player .mejs-playpause-button").bind("click", function(e) {
				e.preventDefault();

				if(jQuery(this).hasClass('mejs-pause')) {
					jQuery(".music-player-list>li").removeClass('active');
					jQuery(".music-album-song-list li").removeClass('active');
				}
			});

			// show player [bottom player]
			jQuery("#music-player-open").bind("click", function(e) {
				e.preventDefault();
				
				jQuery("#music-player-open").animate({"bottom":"-70px"}, 400);
				jQuery("#music-player").animate({"bottom":"0px"}, 400);
			});

			// hide player [bottom player]
			jQuery("#music-player-close").bind("click", function(e) {
				e.preventDefault();
				
				jQuery("#music-player").animate({"bottom":"-160px"}, 400);
				jQuery("#music-player-open").animate({"bottom":"6px"}, 400);
			});

		});
	}