/** ********************************************** **
	@Swiper Slider
	@Last Update	11:24 AM Friday, April 17, 2015
	@URL			http://nivo.dev7studios.com
	
	REQUIRED:
		CSS
		<link href="assets/plugins/slider.elastic/css/style.css" rel="stylesheet" type="text/css" />

		JS
		<script type="text/javascript" src="assets/plugins/slider.elastic/js/jquery.eislideshow.js"></script>
		<script type="text/javascript" src="assets/js/view/demo.elastic_slider.js"></script>
*************************************************** **/

	jQuery(document).ready(function() {

		if(jQuery(".ei-slider").length > 0) {
			_elasticInit();
		}

	});



	/**	_elasticInit() 
	******************************* **/
	function _elasticInit() {

		var _slider = jQuery('#ei-slider'),
			_controlNav			= _slider.attr('data-controlNav'),
			_pauseOnHover		= _slider.attr('data-pauseOnHover'),
			_thumbMaxWidth		= _slider.attr('data-tumbwidth') || 120;
			
			_controlNav 		= (_controlNav == "true") 	? true : false;
			_pauseOnHover 		= (_pauseOnHover == "true") ? true : false;

		jQuery('#ei-slider').eislideshow({
			animation			: 'center',
			autoplay			: true,
			slideshow_interval	: 3000,
			titlesFactor		: 0,
			titlespeed 			: 1200,
			titleeasing 		: 'easeOutExpo',
			easing 				: 'easeOutExpo',
			thumbMaxWidth 		: parseInt(_thumbMaxWidth),
		});

	}