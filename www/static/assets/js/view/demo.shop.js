/** ********************************************** **
	@Shop Demo [usage example]
	@Last Update	10:19 AM Wednesday, May 13, 2015
*************************************************** **/

	jQuery(document).ready(function() {

		_shop();

	});



	/**	_shop() 
	******************************* **/
	function _shop() {


	
		/* ******************* PHP URL TO POST *************** */
		var URL_POST = 'php/view/demo.shop.php'; // CHANGE IT!
		/* *************************************************** */




		/** ADD TO WISHLIST 
		 ** *********************** **/
		jQuery("a.add-wishlist").bind("click", function(e) {
			e.preventDefault();

			var item_id = jQuery(this).attr('data-item-id');

			if(parseInt(item_id) < 1) {
				return false;
			}

			$.ajax({
				url: 	URL_POST,
				data: 	{ajax:"true", action:'add_to_wishlist', item_id:item_id},
				type: 	"POST",
				error: 	function(XMLHttpRequest, textStatus, errorThrown) {

					// usualy on headers 404 or Internal Server Error
					_toastr("ERROR 404 - Item Not Added to Wishlit!","top-right","error",false);

				},

				success: function(data) {
					data = data.trim(); // remove output spaces


					// PHP RETURN: INVALID ITEM ID
					if(data == '_invalid_id_') {

						_toastr("INVALID ID - Item Not Added to Wishlit!","top-right","error",false);

					} else
					

					
					// PHP RETURN: OK, ADDED TO WISHLIST
					if(data == '_ok_') {

						_toastr("Item Added to Your Wishlit!","top-right","success",false);



					// PHP RETURN: SOMETHING ELSE THAN EXPECTED
					} else {
						// if the php output is not _invalid_id_ OR _ok_ - maybe you have a php errors/warnings
						_toastr("UNKNOWN ERROR - Item Not Added to Wishlit!","top-right","error",false);
					}

				}
			});
			
		});






		/** ADD TO COMPARE
		 ** *********************** **/
		jQuery("a.add-compare").bind("click", function(e) {
			e.preventDefault();

			var item_id = jQuery(this).attr('data-item-id');

			if(parseInt(item_id) < 1) {
				return false;
			}

			$.ajax({
				url: 	URL_POST,
				data: 	{ajax:"true", action:'add_to_compare', item_id:item_id},
				type: 	"POST",
				error: 	function(XMLHttpRequest, textStatus, errorThrown) {

					// usualy on headers 404 or Internal Server Error
					_toastr("ERROR 404 - Item Not Added to Compare List!","top-right","error",false);

				},

				success: function(data) {
					data = data.trim(); // remove output spaces


					// PHP RETURN: INVALID ITEM ID
					if(data == '_invalid_id_') {

						_toastr("INVALID ID - Item Not Added to Compare List!","top-right","error",false);

					} else
					

					
					// PHP RETURN: OK, ADDED TO WISHLIST
					if(data == '_ok_') {

						_toastr("Item Added to Your Compare List!","top-right","success",false); // OPTIONAL: REPLACE false WITH YOUR COMPARE LINK



					// PHP RETURN: SOMETHING ELSE THAN EXPECTED
					} else {
						// if the php output is not _invalid_id_ OR _ok_ - maybe you have a php errors/warnings
						_toastr("UNKNOWN ERROR - Item Not Added to Compare List!","top-right","error",false);
					}

				}
			});
			
		});





		/** PRODUCT SINGLE
		 ** *********************** **/

		/**
			@COLOR SELECTOR 
		**/
		jQuery("#product-color-dd li a").bind("click", function(e) {
			e.preventDefault();

			var data_val 	= jQuery(this).attr('data-val').trim();
				_color 		= jQuery(this).attr('href').trim();

			/* change visual value and hidden input */
			jQuery("#product-selected-color").css({"background-color":_color});
			jQuery("#color").val(data_val); // UPDATE HIDDEN FIELD
		});


		/**
			@SIZE SELECTOR 
		**/
		jQuery("#product-size-dd li a").bind("click", function(e) {
			e.preventDefault();

			var data_val = jQuery(this).attr('data-val').trim();

			/* change visual value and hidden input */
			jQuery("#product-selected-size>span").empty().append(data_val);
			jQuery("#size").val(data_val); // UPDATE HIDDEN FIELD

			/* change visual selected */
			jQuery("#product-size-dd li").removeClass('active');
			jQuery(this).parent().addClass('active');
		});


		/**
			@QTY SELECTOR 
		**/
		jQuery("#product-qty-dd li a").bind("click", function(e) {
			e.preventDefault();
			
			var data_val = jQuery(this).attr('data-val').trim();

			/* change visual value and hidden input */
			jQuery("#product-selected-qty>span").empty().append(data_val);
			jQuery("#qty").val(data_val); // UPDATE HIDDEN FIELD

			/* change visual selected */
			jQuery("#product-qty-dd li").removeClass('active');
			jQuery(this).parent().addClass('active');
		});




		/** CHECKOUT
		 ** *********************** **/
		// New Account show|hide
		jQuery("#accountswitch").bind("click", function() {
			jQuery('#newaccount').slideToggle(200);
		});

		// Shipping Address show|hide
		jQuery("#shipswitch").bind("click", function() {
			jQuery('#shipping').slideToggle(200, function() {

				// scroll down to shipping area.
				if(jQuery('#shipping').is(":visible")) {
					_scrollTo('#shipping', 150);
				}
			
			});
		});

		// Payment Check/Money Order
		jQuery("#payment_check").bind("click", function() {
			jQuery("#ccPayment").slideUp(200);
		});

		// Credit Card
		jQuery("#payment_card").bind("click", function() {
			jQuery("#ccPayment").slideDown(200);
		});
	}