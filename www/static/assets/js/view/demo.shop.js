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
  jQuery('a.add-wishlist').bind('click', function(e) {
    e.preventDefault();

    var item_id = jQuery(this).attr('data-item-id');

    if (parseInt(item_id) < 1) {
      return false;
    }

    $.ajax({
      url: URL_POST,
      data: {ajax: 'true', action: 'add_to_wishlist', item_id: item_id},
      type: 'POST',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        // usualy on headers 404 or Internal Server Error
        _toastr('ERROR 404 - Item Not Added to Wishlit!', 'top-right', 'error', false);
      },

      success: function(data) {
        data = data.trim(); // remove output spaces

        // PHP RETURN: INVALID ITEM ID
        if (data == '_invalid_id_') {
          _toastr('INVALID ID - Item Not Added to Wishlit!', 'top-right', 'error', false);
        } else

        // PHP RETURN: OK, ADDED TO WISHLIST
        if (data == '_ok_') {
          _toastr('Item Added to Your Wishlit!', 'top-right', 'success', false);

          // PHP RETURN: SOMETHING ELSE THAN EXPECTED
        } else {
          // if the php output is not _invalid_id_ OR _ok_ - maybe you have a php errors/warnings
          _toastr('UNKNOWN ERROR - Item Not Added to Wishlit!', 'top-right', 'error', false);
        }
      }
    });
  });

  /** ADD TO COMPARE
		 ** *********************** **/
  jQuery('a.add-compare').bind('click', function(e) {
    e.preventDefault();

    var item_id = jQuery(this).attr('data-item-id');

    if (parseInt(item_id) < 1) {
      return false;
    }

    $.ajax({
      url: URL_POST,
      data: {ajax: 'true', action: 'add_to_compare', item_id: item_id},
      type: 'POST',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        // usualy on headers 404 or Internal Server Error
        _toastr('ERROR 404 - Item Not Added to Compare List!', 'top-right', 'error', false);
      },

      success: function(data) {
        data = data.trim(); // remove output spaces

        // PHP RETURN: INVALID ITEM ID
        if (data == '_invalid_id_') {
          _toastr('INVALID ID - Item Not Added to Compare List!', 'top-right', 'error', false);
        } else

        // PHP RETURN: OK, ADDED TO WISHLIST
        if (data == '_ok_') {
          _toastr('Item Added to Your Compare List!', 'top-right', 'success', false); // OPTIONAL: REPLACE false WITH YOUR COMPARE LINK

          // PHP RETURN: SOMETHING ELSE THAN EXPECTED
        } else {
          // if the php output is not _invalid_id_ OR _ok_ - maybe you have a php errors/warnings
          _toastr('UNKNOWN ERROR - Item Not Added to Compare List!', 'top-right', 'error', false);
        }
      }
    });
  });

  /** PRODUCT SINGLE
		 ** *********************** **/

  /**
			@COLOR SELECTOR
		**/
  jQuery('#product-color-dd li a').bind('click', function(e) {
    e.preventDefault();

    var data_val 	= jQuery(this).attr('data-val').trim();
    _color 		= jQuery(this).attr('href').trim();

    /* change visual value and hidden input */
    jQuery('#product-selected-color').css({'background-color': _color});
    jQuery('#color').val(data_val); // UPDATE HIDDEN FIELD
  });

  /**
			@SIZE SELECTOR
		**/
  jQuery('#product-size-dd li a').bind('click', function(e) {
    e.preventDefault();

    var data_val = jQuery(this).attr('data-val').trim();

    /* change visual value and hidden input */
    jQuery('#product-selected-size>span').empty().append(data_val);
    jQuery('#size').val(data_val); // UPDATE HIDDEN FIELD

    /* change visual selected */
    jQuery('#product-size-dd li').removeClass('active');
    jQuery(this).parent().addClass('active');
  });

  /**
			@QTY SELECTOR
		**/
  jQuery('#product-qty-dd li a').bind('click', function(e) {
    e.preventDefault();

    var data_val = jQuery(this).attr('data-val').trim();

    /* change visual value and hidden input */
    jQuery('#product-selected-qty>span').empty().append(data_val);
    jQuery('#qty').val(data_val); // UPDATE HIDDEN FIELD

    /* change visual selected */
    jQuery('#product-qty-dd li').removeClass('active');
    jQuery(this).parent().addClass('active');
  });

  /** 选择商品类型 */

  $('.ichecks input').on('ifChecked', function(event) {
    var pic = $(this).next('img').attr('data-src');
    if (pic) {
      $('figure').find('img').attr('src', pic);
    }
    var shoptype = $('.icheck');
    var goods_id = $("input[name='product_id']").val();
    var arr = [];
    // console.log()
    $.each(shoptype, function(k, v) {
      var item = $(this).find('input:radio:checked').val();
      if (item) {
        arr.push(item);
      }
    });
    if (arr.length == shoptype.length) {
      var aa = getsuk(arr);
      // console.log(aa.sku_price);
      console.log(arr);
      // 查询实时库存
      console.log(goods_id);
      $.ajax({
        url: '/center/cart/getstock',
        data: {id: goods_id, type: arr.join(',')},
        success: function(res) {
          var html = '';
          var html2 = '';
          if (res <= 0) {
            html = '<span class="pull-right text-danger"><i class="glyphicon glyphicon-remove"></i> 无货</span>';
            $('#stock').html(html);
            $('#out-of-stock').removeClass('hide');
            $('#in-of-stock').addClass('hide');
          } else {
            html = '<span class=" text-success" ><i class="fa fa-check"></i> 有货 <span class="badge badge-aqua btn-xs ">' + res + '</span></span>';
            $('#stock').html(html);
            $('#out-of-stock').addClass('hide');
            $('#in-of-stock').removeClass('hide');
          }
        }
      });
      $('price').text(formatCurrency(aa.sku_price));
      $('#type').val(arr);
    }
  });
  function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) { num = '0' }
    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) { cents = '0' + cents }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3));
    }
    return (((sign) ? '' : '-') + num + '.' + cents);
  }
  function getsuk(arr) {
    var suk = $('.ichecks').attr('data-icheck-info');
    suk = JSON.parse(suk);
    // wallsuk(suk.data,arr);
    var suk_;
    $.each(suk.data, function(k, v) {
      if (v.name == arr[0]) {
        if (v.ch) {
          $.each(v.ch, function(k_, v_) {
            if (v_.name == arr[1]) {
              if (v_.ch) {
                $.each(v_.ch, function(k__, v__) {
                  if (v__.name == arr[2]) {
                    suk_ = v__;
                  }
                });
              } else {
                suk_ = v_;
              }
            }
          });
        } else {
          suk_ = v;
        }
      }
    });
    return suk_;
  }
  function wallsuk(arr, arr2) {
    console.log(arr2);
    var i = 0;
    $.each(arr, function(k, v) {
      if (v.ch && v.name == arr2[i]) {
        wallsuk(v.ch, arr2);
        i = i + 1;
      } else {
        console.log(v);
      }
    });
  }

  /** 订单编辑地址 */
  // $(document).on("mouseover",".addr-list",function(e) {

  // })
  /** 省市三级联动 */
  var areas = $('#areas');
  if (areas.length > 0) {
    $('.add-addr-dialog').on('show.bs.modal', function() {
      // 初始化省
      $.ajax({
        url: '/center/address/getarea',
        data: {'pid': 0},
        success: function(msg) {
          var province_arr = ['<option value="">--- 省份/直辖市 ---</option>'];
          $.each(msg, function name(k, v) {
            province_arr.push('<option value="' + v.id + '">' + v.name + '</option>');
          });
          province_html = province_arr.join('');
          $('#province').html(province_html);
        } });
      $('#province').change(function(e) {
        var pid = $('#province option:selected').val();
        $.ajax({
          url: '/center/address/getarea',
          data: {'pid': pid},
          success: function(msg) {
            var province_arr = ['<option value="">--- 市 ---</option>'];
            $.each(msg, function name(k, v) {
              province_arr.push('<option value="' + v.id + '">' + v.name + '</option>');
            });
            province_html = province_arr.join('');
            $('#city').html(province_html);
          } });
      });

      $('#city').change(function(e) {
        var pid = $('#city option:selected').val();
        $.ajax({
          url: '/center/address/getarea',
          data: {'pid': pid},
          success: function(msg) {
            var province_arr = ['<option value="">--- 县/区 ---</option>'];
            $.each(msg, function name(k, v) {
              province_arr.push('<option value="' + v.id + '">' + v.name + '</option>');
            });
            province_html = province_arr.join('');
            $('#county').html(province_html);
          } });
      });
      /**
         * 添加收货人地址
         */

      $('form.add-addr').submit(function(e) {
        var data = $(this).serialize();
        $.ajax({
          type: 'POST',
          url: '/center/address/addaddr',
          data: data,
          success: function(msg) {
            if (msg.errno == 0) {
              _toastr(msg.data.name, 'top-right', 'success', false);
              $('.add-addr-dialog').modal('hide');
              if (msg.data.type == 1) {
                setTimeout(function() {
                  location.reload();
                }, 2000);
              } else {
                addr_add_html(msg.data.data);
              }
            } else {
              _toastr(msg.errmsg, 'top-right', 'error', false);
            }
          }
        });
        return false;
      });
    });
  }
  // 设为默认
  $(document).on('click', 'a.is_d', function(e) {
    e.preventDefault();
    var id = $(this).attr('data-addr-id');
    $.ajax({
      url: '/center/address/addrisdefault',
      data: {id: id},
      success: function(res) {
        if (res.errno == 0) {
          _toastr(res.data.name, 'top-right', 'success', false);

          addr_add_html(res.data.data);
        } else {
          _toastr(res.errmsg, 'top-right', 'error', false);
        }
      }
    });
  });

  // 编辑

  $(document).on('change', '#province1', function(e) {
    var pid = $('#province1 option:selected').val();
    $.ajax({
      url: '/center/address/getarea',
      data: {'pid': pid},
      success: function(msg) {
        var province_arr = ['<option value="">--- 市 ---</option>'];
        $.each(msg, function name(k, v) {
          province_arr.push('<option value="' + v.id + '">' + v.name + '</option>');
        });
        province_html = province_arr.join('');
        $('#city1').html(province_html);
      } });
  });

  $(document).on('change', '#city1', function(e) {
    var pid = $('#city1 option:selected').val();
    $.ajax({
      url: '/center/address/getarea',
      data: {'pid': pid},
      success: function(msg) {
        var province_arr = ['<option value="">--- 县/区 ---</option>'];
        $.each(msg, function name(k, v) {
          province_arr.push('<option value="' + v.id + '">' + v.name + '</option>');
        });
        province_html = province_arr.join('');
        $('#county1').html(province_html);
      } });
  });
  /**
         * 编辑收货人地址
         */

  $(document).on('submit', 'form.edit-addr', function(e) {
    var data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/center/address/addaddr',
      data: data,
      success: function(msg) {
        if (msg.errno == 0) {
          _toastr('编辑收货人地址成功', 'top-right', 'success', false);
          $('#ajaxModal').modal('hide');
          if (msg.data.type == 1) {
            setTimeout(function() {
              location.reload();
            }, 2000);
          } else {
            addr_add_html(msg.data.data);
          }
        } else {
          _toastr('编辑失败！', 'top-right', 'error', false);
        }
      }
    });
    return false;
  });
  // 编辑
  $(document).on('click', 'a.del', function(e) {
    e.preventDefault();
    var id = $(this).attr('data-addr-id');
    swal({
      title: '您确定要删除该收货地址吗?',
      text: '删除收货人信息!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnConfirm: false
    },
    function() {
      $.ajax({
        url: '/center/address/deladdr',
        data: {id: id},
        success: function(res) {
          if (res.errno == 0) {
            swal(res.data.name, '您选择的地址已经被删除.', 'success');
            // _toastr(res.data.name,"top-right","success",false);
            addr_add_html(res.data.data);
          } else {
            swal(res.errmsg, '您选择的地址删除失败.', 'error');
            // _toastr(res.errmsg,"top-right","error",false);
          }
        }
      });
    });
  });
  // 地址
  function _addrs(boll) {
    if (boll) {
      var val = $('.addr-list input:checked').val();
      ajaxaddr(val);
      real_freight(val);
    }

    $('.addr-list input').on('ifChecked', function(event) {
      var addr_id = $(this).val();
      // console.log(addr_id)
      ajaxaddr(addr_id);
      real_freight(addr_id);
    });
    // 获取地址
    function ajaxaddr(addr_id) {
      $.ajax({
        url: '/center/address/getaddr/?id=' + addr_id,
        success: function(res) {
          // console.log(res);
          if (res.errno == 0) {
            var val = res.data.data;
            var html = '<p class="size-14 margin-bottom-6"><strong>寄送至：</strong>' + val.province + ' ' + val.city + ' ' + val.county + ' ' + val.addr + '</p> <p class="size-14"><strong>收货人：</strong>' + val.accept_name + ' ' + val.mobile + '</p>';
            $('.showaddr').html(html);
          }
        }
      });
    }
    // 获取运费
    function real_freight(addr_id) {
      $.ajax({
        url: '/center/cart/getfare/?id=' + addr_id,
        success: function(res) {
          // console.log(res);
          // return false;
          var freight = '<span class="text-success">+</span> ￥<span class="text-danger">' + formatCurrency(res.real_freight) + '</span>';
          // console.log(html)
          $('#real_freight').html(freight);
          var order_amount = '￥' + res.order_amount;
          $('#order_amount').html(order_amount);
        }
      });
    }
  }
  _addrs(false);
  function addr_add_html(data) {
    var addrArr = [];
    $.each(data, function(k, val) {
      var checked = val.is_default == 1 ? 'checked' : '';
      var is_default = val.is_default == 1 ? '<li class="label label-info">默认地址</li>' : '';
      var is_d_btn = val.is_default == 0 ? '<a href="#" class="btn btn-default btn-xs is_d" data-addr-id = "' + val.id + '"><i class="fa fa-check white"></i> 设为默认 </a>' : '';
      var html = '<div class="icheck addr-list m-b">' +
            '<div class="item">' +
            '<input type="radio"  name="address" value="' + val.id + '" ' + checked + ' >' +
            '<label ><ul class="text-left list-inline list-separator margin-bottom-0">' + is_default + '<li>' + val.accept_name + '</li><li>' + val.province + '</li><li>' + val.city + '</li><li>' + val.county + '</li><li>' + val.addr + '</li><li>' + val.mobile + '</li></ul></label>' +
            '</div>' +
            ' <div class="item">' + is_d_btn +
            ' <a  href="/center/address/editaddrmodal/?id=' + val.id + '" class="btn btn-default btn-xs edit"  data-toggle="ajaxModal" ><i class="fa fa-edit white" ></i> 编辑 </a>' +
            ' <a href="#" class="btn btn-default btn-xs del swal"  data-addr-id = "' + val.id + '"><i class="fa fa-times white" ></i> 删除 </a>' +
            '</div></div>';
      addrArr.push(html);
    });
    $('.addr-box').html(addrArr.join(''));
    $('.addr-list input').each(function() {
      var self = $(this),
        label = self.next(),
        label_text = label.html();

      label.remove();
      self.iCheck({
        checkboxClass: 'icheckbox_sm-blue',
        radioClass: 'radio_sm-blue',
        insert: label_text
      });
    });
    _addrs(true);
  }

  /** CHECKOUT
		 ** *********************** **/
  // New Account show|hide
  jQuery('#accountswitch').bind('click', function() {
    jQuery('#newaccount').slideToggle(200);
  });

  // Shipping Address show|hide
  jQuery('#shipswitch').bind('click', function() {
    jQuery('#shipping').slideToggle(200, function() {
      // scroll down to shipping area.
      if (jQuery('#shipping').is(':visible')) {
        _scrollTo('#shipping', 150);
      }
    });
  });

  // Payment Check/Money Order
  jQuery('#payment_check').bind('click', function() {
    jQuery('#ccPayment').slideUp(200);
  });

  // Credit Card
  jQuery('#payment_card').bind('click', function() {
    jQuery('#ccPayment').slideDown(200);
  });
}
