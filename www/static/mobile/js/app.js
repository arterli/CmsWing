
$(function () {
    'use strict';
    /**
     * ajax post submit请求
     * <form class = "form-horizontal">
     * <button target-form="form-horizontal" type="submit" class="ajax-post">确定</button>
     * confirm,
     *****************************************************************************************************************************/
    function _ajax_post() {
        $('.ajax-post').click(function(){

            var target,query,form;
            var target_form = $(this).attr('target-form');
            var that = this;
            var nead_confirm=false;
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
                            if (data.data.url) {
                                location.href=data.data.url;
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
                            if (data.data) {
                                location.href=data.data;
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
    //ajax get请求
    /**
     * <a href="#" class="confirm ajax-get text-info" >删除</a></td>
     *
     */

    function _ajax_get() {
        $(document).on('click','.ajax-get',function(){
            var target;
            var that = this;
            if ( $(this).hasClass('confirm') ) {
                if(!confirm('确认要执行该操作吗?')){
                    return false;
                }
            }
            if ( (target = $(this).attr('href')) || (target = $(this).attr('url')) ) {
                $.get(target).success(function(data){
                    if (data.errno==0) {
                        if (data.data.url) {
                            $.toast(data.data.name + ' 页面即将自动跳转~');
                        }else{
                            $.toast(data.data.name);
                        }
                        setTimeout(function(){
                            if (data.data.url) {
                                location.href=data.data.url;
                            }else if( $(that).hasClass('no-refresh')){
                                //toastr.clear()
                            }else{
                                location.reload();
                            }
                        },1500);
                    }else{

                        $.toast(data.errmsg);
                        setTimeout(function(){
                            if (data.data) {
                                location.href=data.data;
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
        var lastIndex = $('.list-container li').length;
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
            $('.infinite-scroll .list-container').append(html);
        }
        //console.log(lastIndex)
        $(page).on('infinite', function() {
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
                    url:HREF,
                    data: { page: (page+1) },
                    success:function(data){
                        console.log(data);
                        // 重置加载flag
                        loading = false;
                        if (lastIndex >= data.count) {
                            // 加载完毕，则注销无限加载事件，以防不必要的加载
                            $.detachInfiniteScroll($('.infinite-scroll'));
                            // 删除加载提示符
                            $('.infinite-scroll-preloader').remove();
                            return;
                        }
                        // 添加新条目
                        addItems(data.data, lastIndex);
                        // 更新最后加载的序号
                        lastIndex = $('.list-container li').length;
                        //容器发生改变,如果是js滚动，需要刷新滚动
                        $.refreshScroller();
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
        _ajax_post();
    });

    //编辑地址
    $(document).on("pageInit","#cart_editaddrmodal",function (e, id, page) {
        $("#city-picker").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker open-popup open-info" data-popup=".popup-info">确认</button>\
    <h1 class="title">选择地区</h1>\
    </header>'
        });
        _ajax_post();
        _ajax_get();

    });
    $.init();
});