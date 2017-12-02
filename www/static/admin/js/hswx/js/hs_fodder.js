 var _HS_UM  = UM.getEditor('myEditor', {
    imageUrl:'/ext/editor/adminueditor/index',
    lang:/^zh/.test(navigator.language || navigator.browserLanguage || navigator.userLanguage) ? 'zh-cn' : 'en',
    langPath:UMEDITOR_CONFIG.UMEDITOR_HOME_URL + "lang/",
    focus: true
});
// 初始化Web Uploader
var _hs_uploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: true,
    // swf文件路径
    swf: '/static/hswx/js/Uploader.swf',
    // 文件接收服务端。
    server: '/ext/attachment/adminfile/uploadpic',
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#hsfilePicker',
    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'jpg,jpeg',
        mimeTypes: 'image/jpg,image/jpeg'
    }
});
_hs_uploader.on('uploadSuccess', function(file, id) {
    $.getJSON('/admin/mpbase/wxuploadtmp',{"thumb_id":id}, function(res){
        console.log(res);
        _hs_update_item_data({"hs_image_id": id, "hs_image_src":res.hs_image_src, "thumb_media_id":res.media_id, "hs_image_wx_src":res.url});
    });
});
;$(function(){
	/**
	 * 添加一个item
	 */
	$(document).on('click', '.hs-fodder-add', function(){
		_hs_fodder_item();
	});
	
	/**
	 * 单击 hs-fodder-item 事件
	 */
	$(document).on('click', '.hs-fodder-item', function(){
		$('.hs-fodder-item').removeClass('active');
		$(this).addClass('active');
        _hs_wx_edit_fodder($(this).data("item_data"));
	});
	
	/**
	 * 删除 hs-fodder-item //.hs-igdl
	 */
	$(document).on('click', '.hs-igdl', function(){
		var item = $(this).closest('.hs-fodder-item');
		item.remove();
	});
	
	
	/**
	 * 监听标题的改变事件
	 */
	$(document).on('keyup', '.hs-um-title', function(){
		_hs_update_item_data({'title': this.value});
	});
    /**
	 * 监听作者的改变事件
	 */
	$(document).on('keyup', '.hs-um-author', function(){
		_hs_update_item_data({'author': this.value});
	});
	
	/**
	 * 监听原文链接功能
	 */
	$(document).on('click', '.hs-source-url-checkbox', function(){
        var inp = $('.hs-source-url-input');
		if($(this).is(":checked")){
			inp.show();
            _hs_update_item_data({'content_source_url':inp.val()});
		}else{
			inp.hide();
            _hs_update_item_data({'content_source_url':""});
		}
	});
    $(document).on('keyup', '.hs-source-url-input', function(){
        _hs_update_item_data({'content_source_url':this.value});
    });
	
	/**
	 * 监听编辑器内容的改变
	 */
    _HS_UM.addListener("contentChange", function(){
        var content = _HS_UM.getContent();
        _hs_update_item_data({"content": content});
    });
    
    /**
     * 监听摘要
     */
    $(document).on("keyup", "#digest", function() {
        _hs_update_item_data({"digest": this.value});
    });
    

	/**
	 * 定位于顶部
	 */
	var _hs_current_box = $('#hs-current-box');
	var current_t = _hs_current_box.offset();
	$(window).scroll(function(e){ 
		var doc_t = $(document).scrollTop();
		if(doc_t >= current_t.top){
			_hs_current_box.css({'position':'fixed', 'top':'0'});
		}else{
			_hs_current_box.css({'position':'', 'top':''});
		}
	});
});

/**
 * 布局编辑器数据
 * @param {Object} obj
 */
function _hs_wx_edit_fodder(obj){
	var _title = $(".hs-um-title");
	var _author = $('.hs-um-author');
//	var _umbody 通过百度编辑器设定
	var _source_url = $('.hs-source-url-input');
	var _source_url_c = $('.hs-source-url-checkbox');
	
	var _pic = $("#hsfileList");
	var _digest = $("#digest");
	if(obj){
		_HS_UM.setContent(obj.content);
		_title.val(obj.title).focus();
		_author.val(obj.author);
		if(obj.content_source_url){
			_source_url.val(obj.content_source_url).show();
			_source_url_c.attr("checked", true);
		}
		_pic.html('');//图片
		if(obj.hs_image_src){
			_hs_update_item_image(obj.hs_image_src);
		}
		_digest.val(obj.digest);
	}else{
		_HS_UM.setContent('');
		_title.val('').focus()
		_author.val('')
		_source_url.val('')
		_source_url_c.removeAttr('checked');
		_pic.html('');
		_digest.val('');
	}
}

/**
 * 获取编辑器数据
 */
// function _hs_wx_get_editor(){
// 	var _title = $(".hs-um-title");
// 	var _author = $('.hs-um-author');
// //	var _umbody 通过百度编辑器设定
// 	var _source_url = $('.hs-source-url-input');
// 	var _source_url_c = $('.hs-source-url-checkbox');
	
// 	var _pic = $("#hsfileList");
// 	var _digest = $("#digest");
	
// 	var TITLE = _title.val(),
// 		THUMB_MEDIA_ID = 0,
// 		AUTHOR = _author.val(),
// 		DIGEST = _digest.val(),
// 		SHOW_COVER_PIC = 1; //封面
// 		CONTENT = '',
// 		CONTENT_SOURCE_URL = _source_url_c.is(":checked") ? _source_url.val() : '';
// 	var _tmp = {
// 		   "title": TITLE,
// 		   "thumb_media_id": THUMB_MEDIA_ID,
// 		   "author": AUTHOR,
// 		   "digest": DIGEST,
// 		   "show_cover_pic": SHOW_COVER_PIC,
// 		   "content": CONTENT,
// 		   "content_source_url": CONTENT_SOURCE_URL
// 		}	
// 	return _tmp;
// }

/**
 * 获取当前选中的item
 */
function _hs_current_item(){
	return $('.hs-fodder-item.active');
}

/**
 * 更新当前item的标题
 * @param {String} value
 */
function _hs_update_item_title(value){
	var _item = null;
	if(arguments[1]){
		_item = arguments[1];
	}else{
		_item = _hs_current_item();
	}
	if(_item){
		_item.find('.hs-item-title-h4').html(value);
		_item.find('.hs-item-title-h4-2').html(value);
	}else{
		console.error('图文项,更新标题发生错误.');
	}
}
/**
 * 更新item的图片
 * @param {String} src
 */
function _hs_update_item_image(src){
	var _item = null;
	if(arguments[1]){
		_item = arguments[1];
	}else{
		_item = _hs_current_item();
	}
	if(_item){
		if(!src){
			_item.find('.hs-item-cover').attr('style', '');
			$('#hsfileList').html('');
		}else{
			_item.find('.hs-item-cover').css({'background-image': 'url('+src+')'});
			var $list = $('#hsfileList');
			var $img = '<img src="'+src+'" />';
        	$list.html($img);
		}
	}else{
		console.error('图文项,更新图片发生错误.');
	}
}

/**
 * 新建图文项
 */
function _hs_fodder_item(){
	var _dom = ['<div class="hs-fodder-item '+(arguments[0]==1?"":"active")+'">',
	'	<div class="hs-fodder-item-first">',
	'		<div class="hs-fodder-item-container hs-item-cover">',
	'			<i class="hs-default-wxpic"></i>',
	'			<div class="hs-item-title-h4">标题</div>',
	'		</div>',
	'		<div class="hs-fodder-item-mask">',
	'			<a class="hs-igup" href="javascript:;" alt="上移">向上</a>',
	'			<a class="hs-igdp" href="javascript:;" alt="下移">向下</a>',
	'			<a class="hs-igdl" href="javascript:;" alt="删除">删除</a>',
	'		</div>',
	'	</div>',
	'	<div class="hs-fodder-item-second">',
	'		<div class="hs-fodder-item-container">',
	'			<div class="hs-fodder-item-rpic hs-item-cover">',
	'				<i class="hs-default-wxpic-2"></i>',
	'			</div>',
	'			<div class="hs-item-title-h4-2">标题</div>',
	'		</div>',
	'		<div class="hs-fodder-item-mask">',
	'			<a class="hs-igup" href="javascript:;" alt="上移">向上</a>',
	'			<a class="hs-igdp" href="javascript:;" alt="下移">向下</a>',
	'			<a class="hs-igdl" href="javascript:;" alt="删除">删除</a>',
	'		</div>',
	'	</div>',
	'</div>'].join("");
    if(arguments[0] != 1)
	$('.hs-fodder-item').removeClass('active');
    if(arguments[1] != 1)
	_hs_wx_edit_fodder(null);//重置编辑器数据
	$('.hs-fodder-items').append(_dom);
}

/**
 * 更新整个item 的数据
 */
function _hs_update_item_data(params) {
    var _default = {
        "title": "标题",
        "thumb_media_id": "",
        "author": "",
        "digest": "",
        "show_cover_pic": 0,
        "content": "",
        "content_source_url": "",
        
        "hs_image_id":0,
        "hs_image_src":"",
        "hs_image_wx_src":""
    };
    var _item = null;
    if(arguments[1]){
        _item = arguments[1];
    }else{
        _item = _hs_current_item();
    }
    var _current_data = _item.data("item_data");
    var _data = null;
    if(_current_data){
        _data = $.extend(_current_data, params);
    }else{
        _data = $.extend(_default, params);
    }
    _item.data("item_data", _data);
    _hs_update_item_title(_data.title || "标题", _item);
    _hs_update_item_image(_data.hs_image_src, _item);
}

//查看当前数据
function _hs_query_item_data() {
    var _item = _hs_current_item();
    var _data = _item.data("item_data");
    console.log(JSON.stringify(_data));
}

//保存数据
function _hs_submit_articles() {
    var _items = $(".hs-fodder-item");
    var _hs_wx_fodder = {
        "articles": [
        //若新增的是多图文素材，则此处应还有几段articles结构
        ]
    };
    _items.each(function(k, v) {
        var d = $(v).data("item_data");
        if(d){
            _hs_wx_fodder.articles.push(d);
        }else{
            alert("第"+(k+1)+"个item项数据不完整");
            return false;
        }
    });        
    var params = JSON.stringify(_hs_wx_fodder);
    $.post('/admin/mpbase/savefodder'+(init_is_edit?"?edit_id="+init_is_edit:""), {"params":params}, function(data) {
        console.log('结果：')
        if(!data.errno){
            toastr.success(data.data.name);
            setTimeout(function(){
                location.href = '/admin/mpbase/fodderlist';
            }, 1100);
        }
    },'json');
}
