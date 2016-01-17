/** ********************************************** **
	@Ajax Portfolio
	@Last Update	Wednesday, April 22, 2015
*************************************************** **/
	jQuery(window).ready(function() {
		_portfolioAjaxOpen();
	});


/** Ajax Page Open
 **************************************************************** **/
	function _portfolioAjaxOpen() {

		jQuery("a.portfolio-ajax-page").bind("click", function(e) {
			e.preventDefault();

			// Get href URL
			var _href = jQuery(this).attr('href');

			//  Continue if href is not empty!
			if(_href != '' && _href != "#") {

				// Hide if already open
				if(jQuery("#portfolio_ajax_container").is(":visible")) {
					jQuery("#portfolio_ajax_container").append('<span class="overlay light-4"><span><i class="fa fa-refresh fa-spin"></i><span></span>');
				}

				// LOAD AJAX CONTENT
				jQuery.ajax({
					url: 	_href,
					data: 	{ajax:"true"},
					type: 	'GET',

					// Error
					error: 	function(XMLHttpRequest, textStatus, errorThrown) {

						alert(errorThrown); // usualy on headers 404 or Internal Server Error

					},

					// Success
					success: function(data) {
						jQuery('html,body').stop().animate({scrollTop: jQuery("#portfolio_ajax_container").offset().top - 120}, 800, 'easeInOutExpo');

						jQuery("#portfolio_ajax_container .overlay").fadeOut();
						jQuery("#portfolio_ajax_container").empty().append(data);

						jQuery("#portfolio_ajax_container").slideDown(500, function() {

							/** 
								REINIT PLUGINS
								Required for ajax pages (owl carousel, tooltips, etc)
							*/
							Init(true);

							// Init Close Button
							_portfolioAjaxClose();

							// Reinint Portfolio Open for next/prev buttons
							_portfolioAjaxOpen(true);
						});

					}

				});

			}

		});

	}



/** Ajax Page Close
 **************************************************************** **/
	function _portfolioAjaxClose() {
		jQuery("a.portfolio-ajax-close").bind("click", function(e) {
			e.preventDefault();

			jQuery("#portfolio_ajax_container").slideUp(500).empty();
			jQuery("a.portfolio-ajax-page").unbind();
			_portfolioAjaxOpen();

		});
	}