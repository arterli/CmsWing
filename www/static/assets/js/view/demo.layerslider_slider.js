/** ********************************************** **
	@Swiper Slider
	@Last Update	11:24 AM Friday, April 17, 2015
	@URL			http://nivo.dev7studios.com
	
	REQUIRED:
		CSS
		<link href="assets/plugins/slider.layerslider/css/layerslider.css" rel="stylesheet" type="text/css" />

		JS
		<script type="text/javascript" src="assets/plugins/slider.layerslider/js/layerslider_pack.js"></script>
		<script type="text/javascript" src="assets/js/view/demo.layerslider_slider.js"></script>
*************************************************** **/

	jQuery(document).ready(function() {

		if(jQuery(".layerslider").length > 0) {
			_layersliderInit();
		}

	});


	/**	_layersliderInit() 
	******************************* **/
	function _layersliderInit() {
	
		if(jQuery().layerSlider && jQuery("div.layerslider").length > 0) {
			jQuery("div.layerslider").each(function() {
				jQuery(this).layerSlider(layer_options);
			});
		}

	}