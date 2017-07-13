/** ********************************************** **
	@Swiper Slider
	@Last Update	11:24 AM Friday, April 17, 2015
	@URL			http://nivo.dev7studios.com
	
	REQUIRED:
		CSS
		<link href="assets/plugins/slider.nivo/nivo-slider.css" rel="stylesheet" type="text/css" />

		JS
		<script type="text/javascript" src="assets/plugins/slider.nivo/jquery.nivo.slider.pack.js"></script>
		<script type="text/javascript" src="assets/js/view/demo.nivo_slider.js"></script>
*************************************************** **/

	jQuery(document).ready(function() {

		if(jQuery(".nivoSlider").length > 0) {
			_nivoInit();
		}

	});



	/**	_nivoInit() 
	******************************* **/
	function _nivoInit() {

		var _slider = jQuery('.nivoSlider'),
			_controlNav			= _slider.attr('data-controlNav'),
			_pauseOnHover		= _slider.attr('data-pauseOnHover');
			
			_controlNav 		= (_controlNav == "true") 	? true : false;
			_pauseOnHover 		= (_pauseOnHover == "true") ? true : false;

		_slider.nivoSlider({
			effect: 		'random',
			slices: 		15,
			boxCols: 		12,
			boxRows: 		6,
			animSpeed: 		500,
			pauseTime: 		6000,
			directionNav: 	true,
			controlNav: 	_controlNav,
			pauseOnHover: 	_pauseOnHover,
			prevText: 		'<i class="fa fa-angle-left"></i>',
			nextText: 		'<i class="fa fa-angle-right"></i>',
			afterLoad: function(){
				// jQuery('#slider').find('.nivo-caption').addClass('slider-caption-bg');
			}
		});

	}
