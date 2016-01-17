/** ********************************************** **
	@Swiper Slider
	@Last Update	12:30 PM Sunday, April 12, 2015
	@URL			http://www.idangero.us/swiper/
	
	REQUIRED:
		CSS
		<link href="assets/plugins/swiper/dist/css/swiper.min.css" rel="stylesheet" type="text/css" />

		JS
		<script type="text/javascript" src="assets/plugins/swiper/dist/js/swiper.jquery.min.js"></script>
		<script type="text/javascript" src="assets/js/view/demo.swiper_slider.js"></script>
*************************************************** **/

	jQuery(document).ready(function() {

		if(jQuery(".swiper-container").length > 0) {
			_swipperInit();
		}

	});



	/**	_swipperInit() 
	******************************* **/
	function _swipperInit() {

		var _swiper_container 	= jQuery(".swiper-container"),
			_effect		 		= _swiper_container.attr('data-effect') 	|| 'slide',
			_autoplay	 		= _swiper_container.attr('data-autoplay') 	|| false,
			_speed		 		= _swiper_container.attr('data-speed') 		|| 1000,
			_columns	 		= _swiper_container.attr('data-columns') 	|| 1,
			_loop	 			= _swiper_container.attr('data-loop') 		|| false;

		// Force Int
		if(_autoplay != false || _autoplay != 'false') {
			_autoplay = parseInt(_autoplay);
		}

		if(_loop == "true") {
			_loop = true;
		}

		if(_effect == 'cube') {
			var swiperSlider = new Swiper(_swiper_container, {
				effect: _effect,
				grabCursor: true,
				speed: parseInt(_speed),
				cube: {
					shadow: true,
					slideShadows: true,
					shadowOffset: 20,
					shadowScale: 0.94
				}
			});
		} else {
			var swiperSlider = new Swiper(_swiper_container, {
				pagination: '.swiper-pagination',
				paginationClickable: '.swiper-pagination',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				spaceBetween: 1,
				speed: parseInt(_speed),
				loop: _loop,
				autoplay: _autoplay || false,
				effect: _effect,
				grabCursor: false,
				slidesPerView: parseInt(_columns)
			});

		}

	}