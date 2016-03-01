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

        /**选择商品类型 */
        
        $('input').on('ifChecked', function(event){
            var shoptype = $(".icheck");
            var arr =[]
           $.each(shoptype,function(k,v) {
            //console.log(this)
               var item = $(this).find('input:radio:checked').val()
               if(item){
                   arr.push(item); 
               }
            })
            if(arr.length == shoptype.length){
                var aa = getsuk(arr)
               // console.log(aa.sku_price);
                $("price").text(formatCurrency(aa.sku_price));
                $("#type").val(arr);
            } 
       });
        function formatCurrency (num) {  
        num = num.toString().replace(/\$|\,/g,'');  
        if(isNaN(num))  
            num = "0";  
        var sign = (num == (num = Math.abs(num)));  
        num = Math.floor(num*100+0.50000000001);  
        var cents = num%100;  
        num = Math.floor(num/100).toString();  
        if(cents<10)  
        cents = "0" + cents;  
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
        num = num.substring(0,num.length-(4*i+3))+','+  
        num.substring(num.length-(4*i+3));  
        return (((sign)?'':'-') + num + '.' + cents);  
    }  
       function getsuk(arr) {
           var suk = $(".ichecks").attr("data-icheck-info");
           suk = JSON.parse(suk);
           //wallsuk(suk.data,arr);
           var suk_;
           $.each(suk.data,function (k,v) {
               if(v.name==arr[0]){
                  if(v.ch){
                      $.each(v.ch,function (k_,v_) {
                          if(v_.name == arr[1]){
                             if(v_.ch){
                                 $.each(v.ch,function (k__,v__) {
                          if(v__.name == arr[2]){
                             
                             suk_ = v__;
                          }
                      })
                             }else{
                                  suk_ = v_;
                             }  
                             
                          }
                      })
                  }else{
                     suk_ = v;
                  }
               }
           })
           return suk_;
       }
        function wallsuk(arr,arr2) {
             console.log(arr2);
               var i = 0
               $.each(arr,function (k,v) {

                   if(v.ch && v.name == arr2[i]){ 
                       wallsuk(v.ch,arr2);
                      i=i+1;
                   }else {
                       console.log(v);
                   }
             
               })
           }



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