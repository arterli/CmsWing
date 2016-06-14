
$(function () {
    'use strict';
    var plugin_path = '/static/mobile/plugins/';
    /** Load Script

     USAGE
     var pageInit = function() {}
     loadScript(plugin_path + "script.js", function);

     Load multiple scripts and call a final function
     loadScript(plugin_path + "script1.js", function(){
		loadScript(plugin_path + "script2.js", function(){
			loadScript(plugin_path + "script3.js", function(){
				loadScript(plugin_path + "script4.js", function);
			});
		});
	});
     **************************************************************** **/
    var _arr 	= {};
    function loadScript(scriptName, callback) {

        if (!_arr[scriptName]) {
            _arr[scriptName] = true;

            var body 		= document.getElementsByTagName('body')[0];
            var script 		= document.createElement('script');
            script.type 	= 'text/javascript';
            script.src 		= scriptName;

            // then bind the event to the callback function
            // there are several events for cross browser compatibility
            // script.onreadystatechange = callback;
            script.onload = callback;

            // fire the loading
            body.appendChild(script);

        } else if (callback) {

            callback();

        }

    };
    /** Form Stepper
     **************************************************************** **/
    function _stepper() {
        var _container = jQuery('input.stepper');

        if(_container.length > 0) {

            loadScript(plugin_path + 'form.stepper/jquery.stepper.min.js', function() {

                if(jQuery().stepper) {
                    jQuery(_container).each(function() {
                        var _t 		= jQuery(this),
                            _min 	= _t.attr('min') || null,
                            _max 	= _t.attr('max') || null;
                        console.log(_max);
                        _t.stepper({
                            limit:						[_min,_max],
                            floatPrecission:			_t.attr('data-floatPrecission') || 2,
                            wheel_step: 				_t.attr('data-wheelstep') 		|| 0.1,
                            arrow_step:	 				_t.attr('data-arrowstep') 		|| 0.2,
                            allowWheel: 				_t.attr('data-mousescrool') 	== "false" ? false : true,
                            UI: 						_t.attr('data-UI') 				== "false" ? false : true,
                            // --
                            type: 						_t.attr('data-type') 			|| "float",
                            preventWheelAcceleration:	_t.attr('data-preventWheelAcceleration') == "false" ? false : true,
                            incrementButton:			_t.attr('data-incrementButton') || "&blacktriangle;",
                            decrementButton:			_t.attr('data-decrementButton') || "&blacktriangledown;",
                            onStep:						null,
                            onWheel:					null,
                            onArrow:					null,
                            onButton:					null,
                            onKeyUp:					null
                        });

                    });

                }

            });

        }

    }
    /**
     * 时间戳格式化 dateformat()
     * @param extra 'Y-m-d H:i:s'
     * @param date  时间戳
     * @return  '2015-12-17 15:39:44'
     */
    /* global dateformat */
    var dateformat = function(extra, date) {
        var D = new Date(date);
        var time = {
            "Y": D.getFullYear(),
            'm': D.getMonth() + 1,
            'd': D.getDate(),
            'H': D.getHours(),
            'i': D.getMinutes(),
            's': D.getSeconds()
        }
        var key = extra.split(/\W/);
        var _date;
        $.each(key,function (k,v) {

            time[v] = time[v] < 10 ? "0" + time[v] : time[v]
            _date = extra.replace(v, time[v])
            extra = _date;
        })
        return _date;
    }
    /**
     * 将数值四舍五入(保留2位小数)后格式化成金额形式
     *
     * @param num 数值(Number或者String)
     * @return 金额格式的字符串,如'1,234,567.45'
     * @type String
     */
    /*global formatCurrency */
    var formatCurrency = function(num) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        var cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    }
function _ajx_post() {
        /**
         * ajax post submit请求
         * <form class = "form-horizontal">
         * <button target-form="form-horizontal" type="submit" class="ajax-post">确定</button>
         * confirm,
         *****************************************************************************************************************************/
        var falg = false;
        $('.ajax-post').click(function(){
           if(falg){
               return false;
           }
           
            var target,query,form;
            var target_form = $(this).attr('target-form');
            var that = this;
            var nead_confirm=true;
            if(($(this).attr('type')=='submit') || (target = $(this).attr('href')) || (target = $(this).attr('url')) ){
                form = $('.'+target_form);
                if ($(this).attr('hide-data') === 'true'){//无数据时也可以使用的功能

                    form = $('.hide-data');
                    query = form.serialize();
                }else if (form.get(0)==undefined){
                    return false;
                }else if ( form.get(0).nodeName=='FORM' ){
                    //表单验证
                    // $('[data-validate="parsley"]').parsley().validate();
                    // if(true !== $('[data-validate="parsley"]').parsley().isValid()){
                    //     return false;
                    // }
                    if ( $(this).hasClass('confirm') ) {
                        if(!confirm('确认要执行该操作吗?')){
                            return false;
                        }
                    }
                    if($(this).attr('url') !== undefined){
                        target = $(this).attr('url');
                    }else{
                        target = form.get(0).action;
                    }
                    query = form.serialize();
                }else if( form.get(0).nodeName=='INPUT' || form.get(0).nodeName=='SELECT' || form.get(0).nodeName=='TEXTAREA') {

                    form.each(function(k,v){
                        if(v.type=='checkbox' && v.checked==true){

                            nead_confirm = true;
                        }
                    })
                    if ( nead_confirm && $(this).hasClass('confirm') ) {
                        if(!confirm('确认要执行该操作吗?')){
                            return false;
                        }
                    }
                    query = form.serialize();
                }else{
                    if ( $(this).hasClass('confirm') ) {
                        if(!confirm('确认要执行该操作吗?')){
                            return false;
                        }
                    }
                    query = form.find('input,select,textarea').serialize();
                }
                $(that).addClass('disabled').attr('autocomplete','off').prop('disabled',true);
                falg = true;
                $.post(target,query).success(function(data){
                    //console.log(data)
                    //return false;
                    if (data.errno==0) {
                        if (data.data.url) {
                            $.toast(data.data.name + ' 即将跳转~');
                            // _toastr(data.data.name + ' 页面即将自动跳转~',"top-right","success",false);
                            // toastr.success(data.data.name + ' 页面即将自动跳转~');
                        }else{
                            $.toast(data.data.name);
                            // _toastr(data.data.name,"top-right","success",false);
                            //toastr.success(data.data.name);
                        }
                        setTimeout(function(){
                            $(that).removeClass('disabled').prop('disabled',false);
                            falg=false;
                            if (data.data.url) {
                                //location.href=data.data.url;
                                $.router.loadPage(data.data.url);
                            }else if( $(that).hasClass('no-refresh')){
                                //toastr.clear()
                            }else{
                                location.reload();
                            }
                        },1500);
                    }else{
                        if(data.errno==1001){
                            $.each(data.errmsg,function(i,n){
                                $.toast(n);
                                // _toastr(n,"top-right","error",false);
                                //toastr.error(n);
                            })
                        }else {
                            $.toast(data.errmsg);
                            // _toastr(data.errmsg,"top-right","error",false);
                            //toastr.error(data.errmsg);
                        }
                        console.log(data);

                        setTimeout(function(){
                            $(that).removeClass('disabled').prop('disabled',false);
                            falg=false;
                            if (data.data) {
                                $.router.loadPage(data.data);
                            }else{
                                //toastr.clear()
                            }
                        },1500);
                    }
                });
            }
            return false;
        });

}
    $(document).on("pageInit", function(e, pageId, $page) {
         //post请求
        _ajx_post();
        //_stepper
        //_stepper();
    });

    //下拉刷新页面
    $(document).on("pageInit", "#page-ptr", function(e, id, page) {
        var $content = $(page).find(".content").on('refresh', function(e) {
            // 模拟2s的加载过程
            setTimeout(function() {
                var cardHTML = '<div class="card">' +
                    '<div class="card-header">标题</div>' +
                    '<div class="card-content">' +
                    '<div class="card-content-inner">121内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                $content.find('.card-container').prepend(cardHTML);
                // $(window).scrollTop(0);
                // 加载完毕需要重置
                $.pullToRefreshDone($content);
            }, 2000);
        });
    });
    //文章封面页
    $(document).on("pageInit","#index",function (e,id,page) {
        var $content = $(page).find(".content").on('refresh',function (e) {
            location.reload();
        })
        

    })
    //视频封面页
    $(document).on("pageInit","#index_video",function (e,id,page) {
        var $content = $(page).find(".content").on('refresh',function (e) {
            location.reload();
        })


    })
    //wangzhangxiangqingye
    $(document).on("pageInit","#detail_article",function (e,id,page) {
       // $.config = {router: false}

    })
        //无限滚动
    $(document).on("pageInit", "#page-infinite-scroll-bottom", function(e, id, page) {


        var $content = $(page).find(".content").on('refresh', function(e) {
            location.reload();
        });
        /*=== 有标题 ===*/
        var myPhotoBrowserCaptions = $.photoBrowser({
            photos : [
                {
                    url: '//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg',
                    caption: 'Caption 1 Text'
                },
                {
                    url: '//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg',
                    caption: 'Second Caption Text'
                },
                // 这个没有标题
                {
                    url: '//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg',
                },
            ],
            theme: 'dark',
            type: 'standalone'
        });
        $(page).on('click','.pb-standalone-captions',function () {
            myPhotoBrowserCaptions.open();
        });
        var loading = false;
        // 每次加载添加多少条目
        var itemsPerLoad = 10;
        // 最多可加载的条目
        var maxItems = 100;
        var lastIndex = $('#page-infinite-scroll-bottom .list-container li').length;
        function addItems(data, lastIndex) {
            // 生成新条目的HTML
            var html = '';
            $.each(data, function(index,item){
                        var img = "";
                        if(item.cover_id != 0){
                           img = '<div class="item-media"><img width="80" src="'+item.img+'"></div>';
                        }
                        html += '<li><a class="item-link item-content" href="#">'
                             +img
                             +  '<div class="item-inner">'
                             + '<div class="item-title-row">'
                             +'<div class="item-title">'+item.title+'</div>'
                             +'<div class="item-after">$15</div></div>'
                             +'<div class="item-text">'+item.description+'...</div> </div> </a> </li>';

                    })
            // 添加新条目
            $('#page-infinite-scroll-bottom .infinite-scroll .list-container').append(html);
        }
        //console.log(lastIndex)
        $(page).find(".infinite-scroll").on('infinite', function() {
           // $.alert(1)
            // 如果正在加载，则退出
            if (loading) return;
            // 设置flag
            loading = true;
             //模拟1s的加载过程
                var page = Math.ceil(lastIndex/itemsPerLoad);
                //请求数据
                $.ajax({
                    type:'GET',
                    url:$(this).attr("data-url"),
                    data: { page: (page+1) },
                    success:function(data){
                        console.log(data);
                        // 重置加载flag
                        loading = false;
                        if (lastIndex >= data.count) {
                            // 加载完毕，则注销无限加载事件，以防不必要的加载
                            $.detachInfiniteScroll($('#page-infinite-scroll-bottom .infinite-scroll'));
                            // 删除加载提示符
                            $('#page-infinite-scroll-bottom .infinite-scroll-preloader').remove();
                            return;
                        }
                        // 添加新条目
                        addItems(data.data, lastIndex);
                        // 更新最后加载的序号
                        lastIndex = $('#page-infinite-scroll-bottom .list-container li').length;
                        //容器发生改变,如果是js滚动，需要刷新滚动
                        // $.refreshScroller();
                    }
                })
        });
    });
    //用户中心
    $(document).on("pageInit", "#user_index", function(e, id, page) {
        //下拉刷新
        var $content = $(page).find(".content").on('refresh', function(e) {
            location.reload();
        });
    });
    $(document).on("pageInit","#user_seting",function (e, id, page) {


            // 初始化Web Uploader
            var uploader = WebUploader.create({

                // 自动上传。
                auto: true,
                // swf文件路径
                swf: 'Uploader.swf',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#filePicker',
                // 只允许选择文件，可选。
                server: '/user/updateavatar',
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                }
            });

            // 当有文件添加进来的时候
            uploader.on( 'fileQueued', function( file ) {
               // var files = $("input[name='file']").prop('files');
                //$.popup('.popup-avatar');
            });

        uploader.on( 'uploadSuccess', function( file ) {
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $(".avatar").find("img").attr( 'src', src );
            }, 50, 50 );
            $.toast("上传成功");
        });

        uploader.on( 'uploadError', function( file ) {

            $.toast("上传出错");
        });
    // 日历
        $("#birthday").calendar({
            dateFormat: "yyyy-mm-dd",
            onChange: function(p, v, d) {
                $("input[name='birthday']").val(d);
                $.popup('.popup-info');
            }
        });
        $("#city-picker").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker open-popup open-info" data-popup=".popup-info">确认</button>\
    <h1 class="title">选择地区</h1>\
    </header>'
        });

    });
    //网站登录
    $(document).on("pageInit","#user_login",function (e, id, page) {
        //登陆
        $("#m_login .btn_login").click(function () {
            //登录验证
            var username = $("input[name='username']").val();
            var password = $("input[name='password']").val();
            if(username.length == 0){
                $.toast("用户名称不能为空！")
                return false;
            }else if(password.length == 0){
                $.toast("密码不能为空！")
                return false;
            }

            $.ajax({
                type: "POST",
                url: "/user/login",
                data: $("#m_login").serialize(),
                success: function(msg){
                    if(msg.errno < 0){
                        $.toast(msg.errmsg);
                    }else{
                        //$('#ajaxModal').remove();
                        $.toast(msg.data.name);
                        setTimeout(function(){
                            $.router.loadPage($("a.back").attr("href"));
                        },1500);
                    }
                }
            });
        })
    })
    //编辑地址
    $(document).on("pageInit","#cart_editaddrmodal",function (e, id, page) {
        $("#city-picker").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker open-popup open-info" data-popup=".popup-info">确认</button>\
    <h1 class="title">选择地区</h1>\
    </header>'
        });


    });
    //钱包
    $(document).on("pageInit","#user_account",function (e, id, page) {
        //无限加载
        var loading = false;
        var itemsPerLoad = 10;
        var lastIndex = $("#user_account .list-container li").length;
        if(lastIndex < itemsPerLoad){
            $(".infinite-scroll-preloader").remove();
            return;
        }
        function addItems(data) {
            var html = '';
            $.each(data, function(index,item){
                var img = "";
                html += '<li class=" item-content"><div class="item-inner"> <div class="item-title-row">\
                         <div class="item-title">'+formatCurrency(item.amount)+'</div>\
                         <div class="item-after">'+dateformat("Y-m-d H:i:s",item.time)+'</div></div>\
                         <div class="item-subtitle">余额:'+formatCurrency(item.amount_log)+'</div>\
                         <div class="item-text">'+item.note+'</div>\
                         </div></li>';
            })
            console.log(html)
            $('#user_account .list-container').append(html);

        }



        $("#user_account .infinite-scroll").on('infinite',function() {

            // 如果正在加载，则退出
            if (loading) return;
            console.log($(this).find(".buttons-tab > a").attr("data-type"));
            // 设置flag
            loading = true;
            var page = Math.ceil(lastIndex/itemsPerLoad);
            $.ajax({
                type:'post',
                url:$(this).find(".buttons-tab > a").attr("href"),
                data:{page:(page+1)},
                success:function (data) {
                    //console.log(data)
                    loading = false;
                    if(lastIndex >=data.count){
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        $(".infinite-scroll-preloader").remove();
                        return;
                    }
                    addItems(data.data);
                    lastIndex = $("#user_account .list-container li").length;

                }
            })
            // setTimeout(function() {
            //     loading = false;
            //
            //     if (lastIndex >= maxItems) {
            //         $.detachInfiniteScroll($('.infinite-scroll'));
            //         $('.infinite-scroll-preloader').remove();
            //         return;
            //     }
            //
            //     addItems(itemsPerLoad, lastIndex);
            //     lastIndex = $('.list-container li').length;
            // }, 1000);
        });
    })
    //充值
    $(document).on("pageInit","#user_recharge",function (e, id, page) {
        $(page).find(".recharge").on("click",function (e) {
            var data=$(page).find(".form-recharge").serialize();
            console.log(data);
            $.ajax({
                type: "POST",
                url: "/user/recharge",
                data: data,
                success:function (res) {
                    console.log(res);
                    if(res.errno==1000){
                        $.toast(res.errmsg);
                        return false;
                    }else if(res.data.url){
                        $.router.loadPage(res.data.url);
                    } else if(res.data.data){
                        $.toast(res.data.name);

                        pingpp.createPayment(res.data.data, function(result, err) {
                            console.log(result);
                            console.log(err);
                        });


                    }

                }

            })
        })

    });
    //订单
    $(document).on("pageInit","#user_order",function (e, id, page) {
        //无限加载
        var loading = false;
        var itemsPerLoad = 10;
        var lastIndex = $("#user_order .list-container div.card").length;
        if(lastIndex < itemsPerLoad){
            $(".infinite-scroll-preloader").remove();
            return;
        }
        function addItems(data) {
            var html = '';
            $.each(data, function(index,item){
                html+='<div class="card"> <input type="hidden" value="'+item.id+'" name="id'+item.id+'" class="id'+item.id+'"> <div class="card-header"><a href="#" class="link" ><i class="fa fa-eye fa-lg "> </i>&nbsp;' +item.order_no+'</a>';
                if (item.pay_status == 0 && item.delivery_status != 1 && item.status != 6 && item.status != 4){
                    html+='<span class="text-warning size-14">等待付款</span>';
                }else if((item.pay_status == 1 || item.status ==3) && item.delivery_status != 1 && item.status != 6 && item.status != 4){
                    html+='<span class="text-warning size-14">等待发货</span>';
                }else if(item.delivery_status == 1 && item.status != 6 && item.status != 4){
                    html+='<span class="text-success size-14">等待收货</span>';
                }else if(item.status == 6){
                    html+='<span class="text-danger size-14">已作废</span>';
                }else if(item.status == 4){
                    html+='<span class="text-default size-14">已完成</span>';
                }
                if(item.status == 4 || item.status== 6){
                    html+='<a href="/user/delorder/id/'+item.id+'" class="button button-light confirm ajax-post" target-form="id'+item.id+'"><i class="fa fa-trash-o "></i></a>'
                }
                html+='</div> <div class="card-content"> <div class="card-content-inner"> <div class="list-block media-list list-bg"><ul>';
                $.each(item.goods,function (k, v) {
                    html+='<li class="item-content"> ';
                    html+='<div class="item-media"> <img width="44" src="'+v.pic+'"> </div>';
                    html+='<div class="item-inner"> <div class="item-title-row"> <div class="item-title">'+v.title+'</div>';
                    html+='</div>';
                    html+='<div class="item-subtitle">';
                    if (v.type){
                        html+='<span class="text-info">['+v.type+']</span>';
                    }
                    html+='<span class="badge">x'+v.goods_nums+'</span></div> </div>';
                    html+='</li>';
                })
                html+='</ul></div></div></div>';
                html+='<div class="card-content"><div class="card-content-inner text-right"> 共'+item.nums+'件商品 订单总额：<span class="size-18">¥'+formatCurrency(item.order_amount)+'</span></div></div>';
                html+='<div class="card-footer">'+dateformat('Y-m-d H:i:s',item.create_time);
                        if(item.pay_status == 0 && item.delivery_status != 1 && item.status != 6 && item.status != 4){
                            html+=' <a class="button button-danger" href="/cart/pay/order/'+item.id+'">立即付款</a>';
                        }else if((item.pay_status == 1 || item.status ==3) && item.delivery_status != 1 && item.status != 6 && item.status != 4){
                html+='<a class="button button-warning" href="#">提醒发货</a>';
            }else if(item.delivery_status == 1 && item.status != 6 && item.status != 4){
                            html+=' <a class="button button-success confirm ajax-post" href="/user/confirmreceipt/id/'+item.id+'" target-form="id'+item.id+'">确认收货</a>';
                        }else if(item.status == 4 || item.status == 6){
                            html+='<a class="button button-primary" href="#">再次购买</a>';
                        }
                html+='</div> </div>';

            })
            //console.log(html)
            $('#user_order .list-container').append(html);
            $('.ajax-post').off('click');
            _ajx_post();

        }



        $("#user_order .infinite-scroll").on('infinite',function() {

            // 如果正在加载，则退出
            if (loading) return;
            //console.log($(this).find(".buttons-tab > a.active").attr("data-type"));
            // 设置flag
            loading = true;
            var page = Math.ceil(lastIndex/itemsPerLoad);
            $.ajax({
                type:'post',
                url:$(this).find(".buttons-tab > a.active").attr("href"),
                data:{page:(page+1)},
                success:function (data) {
                    //console.log(data)
                    loading = false;
                    if(lastIndex >=data.count){
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        $(".infinite-scroll-preloader").remove();
                        return;
                    }
                    addItems(data.data);
                    lastIndex = $("#user_order .list-container div.card").length;

                }
            })
            
        });
    });

    //订单支付
    $(document).on("pageInit","#caty_pay",function (e, id, page) {
     $(page).find(".caty_pay").click(function () {
         var order_id = $(page).find("input[name='order_id']").val();
         var payment = $(page).find("input[name='payment']:radio:checked").val();
         if(payment===undefined){
             $.toast("请选择一种支付方式");
             return;
         }
         $.ajax({
             type:"post",
             url:"/cart/pay",
             data:{order_id:order_id,payment:payment},
             success:function (res) {
                 //console.log(res);
                 if(res.errno==1000){
                     $.toast(res.errmsg);
                     return false;
                 }else if(res.data.url){
                    $.router.loadPage(res.data.url);
                 } else if(res.data.data){
                     $.toast(res.data.name);
                     pingpp.createPayment(res.data.data, function(result, err) {
                         console.log(result);
                         console.log(err);
                     });


                 }

             }

         })

     })
    })
    //购物车
    $(document).on("pageInit","#cart_index",function (e, id, page) {
       $("button.sendfrom").click(function () {
           if($('form.form-cart').serializeArray().length ==0){
               $.toast("至少选择一个商品!");
               return false;
           }
           $('form.form-cart').submit();
       })
        $("a.delall").click(function () {
            if($('form.form-cart').serializeArray().length ==0){
                $.toast("至少选择一个商品!");
                return false;
            }
            
        })
        //通缉选中个数
        function tj () {
            var checkd = $('input[name="ids"]');
            var total=0;
            var badgecorner=[];
            var url=[];
            var nums = [];
            $.each(checkd,function (k, v) {
                var c =  $(v).prop("checked");
                if(c){
                    nums.push($(v).parents("li").find("input.number").val());
                    total =total + Number($(v).parents("li").find("div.price").attr("data-price"));
                    url.push($(v).parents("li").find('input[name="ids"]').val())
                }
                badgecorner.push($(v).parents("li").find("input.number").val());
            })
            url = url.join("<>");
            var href;
            if(url.length>0){
                href = "/cart/delcart/ids/"+url;
                $("a.delall").attr("href",href);
            }else {
                href = "/cart/delcart";
                $("a.delall").attr("href",href);
            }
            if(nums.length > 0){
                $(".nums").html(eval(nums.join("+")));
            }else {
                $(".nums").html(0);
            }

            $("#total").html(formatCurrency(total))
            $("#badge-corner").html(eval(badgecorner.join("+")))
        }
        //全选
        $("#checkAll").click(function() {
            $('input[name="ids"]').prop("checked",this.checked);
            tj ()

        });
        var $subBox = $("input[name='ids']");
        $subBox.click(function(){
            $("#checkAll").prop("checked",$subBox.length == $("input[name='ids']:checked").length ? true : false);
            tj ()

        });
        //编辑
        $(page).find('button.btn-edit').click(function () {
            var hide = $(this).attr("data-hide");
            if(hide == 1){
                $("div.subinfo,div.submit").addClass("softhide");
                $("div.edit").removeClass("softhide");
                $(this).attr("data-hide",0);
                $(this).text("完成")
            }else {
                $("div.subinfo,div.submit").removeClass("softhide");
                $("div.edit").addClass("softhide");
                $(this).attr("data-hide",1);
                $(this).text("编辑")
            }
            $('input[name="ids"],#checkAll').prop("checked",false);
            tj();
        })

        function steperhtml(step,ids,self) {
            if(step==0){
                $.toast("数量最少为1");
                return;
            }
            // console.log(step);
            // console.log(ids);
            $.ajax({
                url:"/cart/stepper",
                type:"POST",
                data:{qty:step,ids:ids},
                success:function (res) {
                    if(res.errno == 0){
                        $(self).parents("li").find("div.price").attr("data-price",res.data.data.price)
                        $(self).parents("li").find("span.stock").html('<span class="text-default">有货</span>')
                        $(self).parents("li").find("span.inform").html('');
                        $(self).parents("li").find("div.price>strong").html(formatCurrency(res.data.data.price));
                        tj ();
                    }else {
                        if(res.errmsg == "请先登录"){
                            //location.href="/user/login";
                            $.router.loadPage("/user/login")
                        }else {
                            $(self).parents("li").find("span.stock").html('<span class="text-danger">无货</span>')
                        }
                        $.toast(res.errmsg);
                    }

                }
            })
        }
        //编辑数量
        $("input.number").change(function () {
            var step = $(this).val();
            var ids = $(this).parents("li").find("input[name='ids']").val();
            steperhtml(step,ids,this)
        })
    })
    //选择收货地址
    $(document).on("pageInit","#user_selectaddr",function (e, id, page) {
         var load = true;
        $(page).find("label.label-checkbox").click(function (e) {
            if(load){
                $.router.loadPage($(this).attr("data-href"));
            }
            load = false;
        })
    });
    //商城列表页
    $(document).on("pageInit","#list_shop",function (e,id,page) {
        //无限加载
        var loading = false;
        var itemsPerLoad = 10;
        var lastIndex = $("#list_shop .list-container a.col-50").length;
        if(lastIndex < itemsPerLoad){
            $(".infinite-scroll-preloader").remove();
            return;
        }
        function addItems(data) {
            var html="";
            $.each(data,function (index, item) {
                html+='<a href="'+item.url+'" class="col-50"><div class="card demo-card-header-pic margin-5">'
                html+='<div class="card-header color-white no-border no-padding" valign="bottom">'
                html+=' <img alt="" src="'+item.pics+'" class="card-cover">'
                html+='</div>'
                        html+='<div class="card-content tex-black">'
                html+='<div class="card-content-inner padding-6">'
                html+='<p class="color-danger margin-bottom-0">'
                if(item.price2){
                html+='<span class="color-gray line-through">¥'+item.price2+'</span>'
                }
                html+=' ¥'+item.price+'</p>'
                html+='<p class="margin-bottom-0 margin-top-0" style="overflow: hidden; height: 40px">'+item.title+'</p>'
                html+='</div> </div> <div class="card-footer"> <span>有货</span> <span>5 评论</span> </div> </div></a>'
            })
            $('#list_shop .list-container').append(html);
        }
        $("#list_shop .infinite-scroll").on('infinite',function () {
            //如果正在加载，退出
            if(loading) return;
            //设置flag
            loading = true;
            var page = Math.ceil(lastIndex/itemsPerLoad);
            $.ajax({
                type:'post',
                url:$(this).attr("data-url"),
                data:{page:(page+1)},
                success:function (data) {
                    loading = false;
                    if(lastIndex >= data.count){
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').remove();
                        return;
                    }
                    addItems(data.data);
                    console.log(data.data);
                    lastIndex = $("#list_shop .list-container a.col-50").length;
                }
            })
        })
    })
    //商城列表页
    $(document).on("pageInit","#list_video",function (e,id,page) {
        //无限加载
        var loading = false;
        var itemsPerLoad = 10;
        var lastIndex = $("#list_video .list-container a.col-50").length;
        if(lastIndex < itemsPerLoad){
            $(".infinite-scroll-preloader").remove();
            return;
        }
        function addItems(data) {
            var html="";
            $.each(data,function (index, item) {
                html+='<a href="'+item.url+'" class="col-50"><div class="card demo-card-header-pic margin-5">'
                html+='<div class="card-header color-white no-border no-padding" valign="bottom">'
                html+=' <img alt="" src="'+item.cover_id+'" class="card-cover">'
                html+='</div>'
                html+='<div class="card-content tex-black">'
                html+='<div class="card-content-inner padding-6">'
                html+='<p class="margin-bottom-0 margin-top-0" style="overflow: hidden; height: 20px">'+item.title+'</p>'
                html+='</div> </div> <div class="card-footer"> <span>有货</span> <span>5 评论</span> </div> </div></a>'
            })
            $('#list_video .list-container').append(html);
        }
        $("#list_video .infinite-scroll").on('infinite',function () {
            //如果正在加载，退出
            if(loading) return;
            //设置flag
            loading = true;
            var page = Math.ceil(lastIndex/itemsPerLoad);
            $.ajax({
                type:'post',
                url:$(this).attr("data-url"),
                data:{page:(page+1)},
                success:function (data) {
                    loading = false;
                    if(lastIndex >= data.count){
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').remove();
                        return;
                    }
                    addItems(data.data);
                    console.log(data.data);
                    lastIndex = $("#list_video .list-container a.col-50").length;
                }
            })
        })
    })
    $(document).on("pageInit","#detail_shop",function (e, id, page) {
        
       //  var width = $("#shop_detail").width();
       // var img = $("#shop_detail").find('img');
       //  img.load(function(){
       //      // 加载完成
       //      $.each(img,function (k,v) {
       //          if(v.width > width){
       //              $(v).css({width: "100%"})
       //          }
       //      })
       //  });
        //添加购物车
        $(page).find("#addcart").off('click');
        $(page).find("#addcart").click(function () {
            var suk = $(".popup-sku").attr("data-icheck-info");

                $.popup(".popup-sku");
        })
        $(page).find("#directcart").click(function () {
            var str={
                product_id:$("input[name='product_id']").val(),
                qty:$("#qty").val(),
                type:$("#type").val()
            }
            $.ajax({
                type: "POST",
                url: "/cart/addcart",
                data: str
            }).done(function( msg ) {

                if(msg){
                    $.toast("添加购物车成功!");
                    var n = $("#badge-corner").text();
                    $("#badge-corner").html(Number(str.qty)+Number(n));
                }else {
                    $.toast("该商品已经售罄，请选择其他商品！");
                }


                //console.log(msg);
            });
        })

        function getsuk(arr) {
            var suk = $(".popup-sku").attr("data-icheck-info");
            suk = JSON.parse(suk);
            //wallsuk(suk.data,arr);
            var suk_;
            $.each(suk.data,function (k,v) {
                if(v.name==arr[0]){
                    if(v.ch){
                        $.each(v.ch,function (k_,v_) {
                            if(v_.name == arr[1]){
                                if(v_.ch){
                                    $.each(v_.ch,function (k__,v__) {
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
        //加入购物车
        $('.sku-content input').each(function(){
            var self = $(this),
                label = self.next(),
                label_text = label.text();

            label.remove();
            self.iCheck({
                checkboxClass: 'icheckbox_sm-blue',
                radioClass: 'radio_sm-blue',
                insert: label_text
            });
        });

        $('.sku-content input').on("ifChecked",function (e) {
            var pic = $(this).attr('data-pic');
            if(pic){
                $(".popup-sku .goods-pic > img").attr("src",pic)
            }

            var shoptype = $(".icheck");
            var goods_id = $("input[name='product_id']").val();
            var arr =[]
            //console.log()
            $.each(shoptype,function(k,v) {

                var item = $(this).find('input:radio:checked').val()
                if(item){
                    arr.push(item);
                }
            })
            if(arr.length == shoptype.length){
                var aa = getsuk(arr)
                //console.log(aa.sku_price);
                console.log(arr);
                //查询实时库存
                console.log(goods_id);
                $.ajax({
                    url:"/cart/getstock",
                    data:{id:goods_id,type:arr.join(",")},
                    success:function (res) {
                        var html =""
                        var html2 =""
                        if(res <= 0){
                            html = '<span class=" text-danger"><i class="glyphicon glyphicon-remove"></i> 无货</span>'
                            $("#stock").html(html);
                            $("#out-of-stock").removeClass("hide");
                            $("#in-of-stock").addClass("hide")

                        }else {
                            html = '<span class=" text-success" ><i class="fa fa-check"></i> 有货 <span class="badge badge-aqua btn-xs ">'+res+'</span></span>'
                            $("#stock").html(html);
                            $("#out-of-stock").addClass("hide");
                            $("#in-of-stock").removeClass("hide")

                        }
                    }
                })
                $(".sku_price").text(formatCurrency(aa.sku_price));
                $("#type").val(arr);
            }
        })
        var flg = false;
        //添加购物车
        $("#real_cart").click(function () {
            if(flg){
                $.toast("正在提交！");
                return false;
            }
            flg = true;
            var shoptype = $(".icheck");
            var arr =[]
            $.each(shoptype,function(k,v) {
                //console.log(this)
                var item = $(this).find('input:radio:checked').val()
                if(item){
                    arr.push(item);
                }
            })
            if(arr.length != shoptype.length){
                $.toast("请选择商品规格!");
                return false;
            }
            var str={
                product_id:$("input[name='product_id']").val(),
                qty:$("#qty").val(),
                type:$("#type").val()
            }
            $.ajax({
                type: "POST",
                url: "/cart/addcart",
                data: str
            }).done(function( msg ) {

                if(msg){
                    $.toast("添加购物车成功!");
                    var n = $("#badge-corner").text();
                    $("#badge-corner").html(Number(str.qty)+Number(n));
                    flg = false;
                }else {
                    $.toast("该商品已经售罄，请选择其他商品！");
                    flg = false;
                }


                //console.log(msg);
            });
        })
    })
    $.init();
});