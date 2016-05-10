/* common */
;$(function(){
	/*编辑器 选项卡*/
	$(document).on('click', '.hs-js-tab [jstab-target]', function(e){
		_hs_js_tab(e);
	});
	
	/*表情*/
	var emotions_gif = [{"title":"微笑","bgPositoin":"0px 0px"},{"title":"撇嘴","bgPositoin":"-24px 0px"},{"title":"色","bgPositoin":"-48px 0px"},{"title":"发呆","bgPositoin":"-72px 0px"},{"title":"得意","bgPositoin":"-96px 0px"},{"title":"流泪","bgPositoin":"-120px 0px"},{"title":"害羞","bgPositoin":"-144px 0px"},{"title":"闭嘴","bgPositoin":"-168px 0px"},{"title":"睡","bgPositoin":"-192px 0px"},{"title":"大哭","bgPositoin":"-216px 0px"},{"title":"尴尬","bgPositoin":"-240px 0px"},{"title":"发怒","bgPositoin":"-264px 0px"},{"title":"调皮","bgPositoin":"-288px 0px"},{"title":"呲牙","bgPositoin":"-312px 0px"},{"title":"惊讶","bgPositoin":"-336px 0px"},{"title":"难过","bgPositoin":"-360px 0px"},{"title":"酷","bgPositoin":"-384px 0px"},{"title":"冷汗","bgPositoin":"-408px 0px"},{"title":"抓狂","bgPositoin":"-432px 0px"},{"title":"吐","bgPositoin":"-456px 0px"},{"title":"偷笑","bgPositoin":"-480px 0px"},{"title":"可爱","bgPositoin":"-504px 0px"},{"title":"白眼","bgPositoin":"-528px 0px"},{"title":"傲慢","bgPositoin":"-552px 0px"},{"title":"饥饿","bgPositoin":"-576px 0px"},{"title":"困","bgPositoin":"-600px 0px"},{"title":"惊恐","bgPositoin":"-624px 0px"},{"title":"流汗","bgPositoin":"-648px 0px"},{"title":"憨笑","bgPositoin":"-672px 0px"},{"title":"大兵","bgPositoin":"-696px 0px"},{"title":"奋斗","bgPositoin":"-720px 0px"},{"title":"咒骂","bgPositoin":"-744px 0px"},{"title":"疑问","bgPositoin":"-768px 0px"},{"title":"嘘","bgPositoin":"-792px 0px"},{"title":"晕","bgPositoin":"-816px 0px"},{"title":"折磨","bgPositoin":"-840px 0px"},{"title":"衰","bgPositoin":"-864px 0px"},{"title":"骷髅","bgPositoin":"-888px 0px"},{"title":"敲打","bgPositoin":"-912px 0px"},{"title":"再见","bgPositoin":"-936px 0px"},{"title":"擦汗","bgPositoin":"-960px 0px"},{"title":"抠鼻","bgPositoin":"-984px 0px"},{"title":"鼓掌","bgPositoin":"-1008px 0px"},{"title":"糗大了","bgPositoin":"-1032px 0px"},{"title":"坏笑","bgPositoin":"-1056px 0px"},{"title":"左哼哼","bgPositoin":"-1080px 0px"},{"title":"右哼哼","bgPositoin":"-1104px 0px"},{"title":"哈欠","bgPositoin":"-1128px 0px"},{"title":"鄙视","bgPositoin":"-1152px 0px"},{"title":"委屈","bgPositoin":"-1176px 0px"},{"title":"快哭了","bgPositoin":"-1200px 0px"},{"title":"阴险","bgPositoin":"-1224px 0px"},{"title":"亲亲","bgPositoin":"-1248px 0px"},{"title":"吓","bgPositoin":"-1272px 0px"},{"title":"可怜","bgPositoin":"-1296px 0px"},{"title":"菜刀","bgPositoin":"-1320px 0px"},{"title":"西瓜","bgPositoin":"-1344px 0px"},{"title":"啤酒","bgPositoin":"-1368px 0px"},{"title":"篮球","bgPositoin":"-1392px 0px"},{"title":"乒乓","bgPositoin":"-1416px 0px"},{"title":"咖啡","bgPositoin":"-1440px 0px"},{"title":"饭","bgPositoin":"-1464px 0px"},{"title":"猪头","bgPositoin":"-1488px 0px"},{"title":"玫瑰","bgPositoin":"-1512px 0px"},{"title":"凋谢","bgPositoin":"-1536px 0px"},{"title":"示爱","bgPositoin":"-1560px 0px"},{"title":"爱心","bgPositoin":"-1584px 0px"},{"title":"心碎","bgPositoin":"-1608px 0px"},{"title":"蛋糕","bgPositoin":"-1632px 0px"},{"title":"闪电","bgPositoin":"-1656px 0px"},{"title":"炸弹","bgPositoin":"-1680px 0px"},{"title":"刀","bgPositoin":"-1704px 0px"},{"title":"足球","bgPositoin":"-1728px 0px"},{"title":"瓢虫","bgPositoin":"-1752px 0px"},{"title":"便便","bgPositoin":"-1776px 0px"},{"title":"月亮","bgPositoin":"-1800px 0px"},{"title":"太阳","bgPositoin":"-1824px 0px"},{"title":"礼物","bgPositoin":"-1848px 0px"},{"title":"拥抱","bgPositoin":"-1872px 0px"},{"title":"强","bgPositoin":"-1896px 0px"},{"title":"弱","bgPositoin":"-1920px 0px"},{"title":"握手","bgPositoin":"-1944px 0px"},{"title":"胜利","bgPositoin":"-1968px 0px"},{"title":"抱拳","bgPositoin":"-1992px 0px"},{"title":"勾引","bgPositoin":"-2016px 0px"},{"title":"拳头","bgPositoin":"-2040px 0px"},{"title":"差劲","bgPositoin":"-2064px 0px"},{"title":"爱你","bgPositoin":"-2088px 0px"},{"title":"NO","bgPositoin":"-2112px 0px"},{"title":"OK","bgPositoin":"-2136px 0px"},{"title":"爱情","bgPositoin":"-2160px 0px"},{"title":"飞吻","bgPositoin":"-2184px 0px"},{"title":"跳跳","bgPositoin":"-2208px 0px"},{"title":"发抖","bgPositoin":"-2232px 0px"},{"title":"怄火","bgPositoin":"-2256px 0px"},{"title":"转圈","bgPositoin":"-2280px 0px"},{"title":"磕头","bgPositoin":"-2304px 0px"},{"title":"回头","bgPositoin":"-2328px 0px"},{"title":"跳绳","bgPositoin":"-2352px 0px"},{"title":"挥手","bgPositoin":"-2376px 0px"},{"title":"激动","bgPositoin":"-2400px 0px"},{"title":"街舞","bgPositoin":"-2424px 0px"},{"title":"献吻","bgPositoin":"-2448px 0px"},{"title":"左太极","bgPositoin":"-2472px 0px"},{"title":"右太极","bgPositoin":"-2496px 0px"}];
	var _h = [];
	$.each(emotions_gif, function(k, v) {
		_h.push('<li class="emotions_item"><i class="js_emotion_i" data-gifurl="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/'+k+'.gif" data-title="'+v.title+'" style="background-position:'+v.bgPositoin+'"></i></li>');
	});
	$('ul.emotions').html(_h.join(''));
	$(document).on('click', '.emotion_switch.js_switch', function(){
		$('.emotion_wrp').show();
	});
	$(document).on("mouseover", '.js_emotion_i', function(){
		var self = $(this);
		var gifurl = self.attr('data-gifurl');
		$('.js_emotionPreviewArea').css({ background: '#fff url('+gifurl+') center no-repeat' });
	});
	$(document).on("click", '.js_emotion_i', function(){
		var self = $(this);
		var gifurl = self.attr('data-gifurl');
		var giftitle = self.attr('data-title');
		var jsEditorArea = $('.js_editorArea');
		var tmpHtml = jsEditorArea.html();
		var htmlStart = tmpHtml.substring(0, editorSelectionChange);
		var htmlEnd = tmpHtml.substring(editorSelectionChange);
		jsEditorArea.html(htmlStart + '<img src="'+gifurl+'" alt="mo-'+giftitle+'" />' + htmlEnd);
		jsEditorArea.focus();
	});
	var hs_emotion_body = function(e){
		var t = /.*js_switch.*/.test(e.target.className);
		var p = $(e.target).closest('.emotion_wrp').length;
		//console.log(e);
		if(!t && p == 0){ $('.emotion_wrp').fadeOut(150); }
	}
	
	
	//body的click事件
	$(document).click(function(e){
		hs_emotion_body(e);
	});
});


/* common end */
/**
 * 选项卡 （点击事件绑定在 [jstab-target]上 ）
 * @param {Event} e
 */
function _hs_js_tab(e) {
	var t = e.currentTarget;
	var self = $(t);
	var hsjsTab = self.closest(".hs-js-tab");
	hsjsTab.find('[jstab-target]').removeClass('active');
	self.addClass('active');
	var target = self.attr('jstab-target');
	var desAll = hsjsTab.find('[jstab-des]');
	for (var i = 0; i < desAll.length; i++) {
		var des = desAll[i];
		var desAttr = des.getAttribute('jstab-des');
		if (desAttr == target) {
			des.style.display = "block";
		} else {
			des.style.display = "none";
		}
	}
	//是否有回调
	if (arguments[1]) {
		arguments[1]();
	}
}
/***/
var editorSelectionChange = 0;
try {
	var r = +(new Date);
	"use strict";
	var i = function() {
			return document.selection ? document.selection : (window.getSelection || document.getSelection)();
		},
		s = function(e, t, n) {
			if (!n && e === t) return !1;
			if (e.compareDocumentPosition) {
				var r = e.compareDocumentPosition(t);
				if (r == 20 || r == 0) return !0;
			} else if (e.contains(t)) return !0;
			return !1;
		},
		o = function(e, t) {
			var n = t.commonAncestorContainer || t.parentElement && t.parentElement() || null;
			return n ? s(e, n, !0) : !1;
		},
		u = function(e) {
			var t = i();
			if (!t) return null;
			var n = t.getRangeAt ? t.rangeCount ? t.getRangeAt(0) : null : t.createRange();
			return n ? e ? o(e, n) ? n : null : n : null;
		},
		a = function(e) {
			try{
				return e.parentElement ? e.parentElement : e.commonAncestorContainer;
			}catch(e){
				return document.createElement('DIV');
			}
		};
/*	n.exports = {
		getSelection: i,
		getRange: u,
		containsRange: o,
		parentContainer: a
	};*/
	
	document.onselectionchange = function(e) {
		var selection = i();
		var parentContainer = a(selection.anchorNode);
		if(/.*js_editorArea.*/.test(parentContainer.className)){
			//console.log(true);
			var range = u();
			editorSelectionChange = range.endOffset;
			console.log(editorSelectionChange);
		}else{
			//console.log(false); 
		}
	}
} catch (f) {
	
}

/**
 * 弹出框
 */
function HS_Dialog(settings){
	/*<div class="dialog_wrp ui-draggable" style="width: 846px; margin-left: -423px; margin-top: -289.5px;">
		<div class="dialog">
			<div class="dialog_hd">
				<h3>选择图片</h3>
				<a href="javascript:;" onclick="return false" class="icon16_opr closed pop_closed">关闭</a>
			</div>
			<div class="dialog_bd"></div>
			<div class="dialog_ft">
	            <span class="btn btn_disabled btn_input js_btn_p"><button type="button" class="js_btn" data-index="0">确定</button></span>
	            <span class="btn btn_default btn_input js_btn_p"><button type="button" class="js_btn" data-index="1">取消</button></span>
			</div>
		</div>
	</div>*/
	this._mask = new HS_Mask();
	this.hs_create = function(title, body){
		var tmp = [
				'<div class="dialog">',
				'	<div class="dialog_hd">',
				'		<h3>'+title+'</h3>',
				'		<a href="javascript:;" onclick="return false" class="icon16_opr closed pop_closed">关闭</a>',
				'	</div>',
				'	<div class="dialog_bd">'+body+'</div>',
				'	<div class="dialog_ft">',
				'		<button type="button" class="hs-btn hs-dialog-submit" data-index="0">确定</button>',
				'		<button type="button" class="hs-btn hs-dialog-cancel" data-index="1">取消</button>',
				'	</div>',
				'</div>'].join("");
		var _DIV = this._div = document.createElement('div');
		_DIV.className = "dialog_wrp ui-draggable";
		_DIV.style.width = '846px';
		_DIV.style.marginLeft = '-423px';
		_DIV.style.marginTop = '-289.5px';
		_DIV.innerHTML = tmp;
		return _DIV;
	}
	this.hs_show = function(_div){
		this._mask.createInBody();
		if(!_div){
			_div = this.hs_create();
		}
		document.body.appendChild(_div);
	}
	this.hs_remove = function(){
		var obj = this._div;//document.querySelector('.dialog_wrp');
		var _p = obj.parentNode;
		_p.removeChild(obj);
		this._mask.remove();
	}
}

/**
 * 遮罩层
 */
function HS_Mask(){
	this._maskDom = '<iframe frameborder="0" style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;top:0px;left:0px;width:100%;height:100%;" src="about:blank"></iframe>';
	this.createInBody = function(){
		var _DIV = document.createElement('div');
		_DIV.className = "mask ui-draggable";
		_DIV.innerHTML = this._maskDom;
		document.body.appendChild(_DIV);
	};
	this.remove = function(){
		var _maskObj = document.querySelector('.mask');
		var _p = _maskObj.parentNode;
		_p.removeChild(_maskObj);
	}
}

function _hs_dom_fodder_item(obj){
	var _dom = ['<div class="hs-fodder-item">',
	'        <div class="hs-fodder-item-first">',
	'            <div class="hs-fodder-item-container hs-item-cover" style="background-image:url('+obj.hs_image_src+')">',
	'                <i class="hs-default-wxpic"></i>',
	'                <div class="hs-item-title-h4">'+(obj.title?obj.title:'标题')+'</div>',
	'            </div>',
	'            <div class="hs-fodder-item-mask">',
	'                <a class="hs-igup" href="javascript:;" alt="上移">向上</a>',
	'                <a class="hs-igdp" href="javascript:;" alt="下移">向下</a>',
	'                <a class="hs-igdl" href="javascript:;" alt="删除">删除</a>',
	'            </div>',
	'        </div>',
	'        <div class="hs-fodder-item-second">',
	'            <div class="hs-fodder-item-container">',
	'                <div class="hs-fodder-item-rpic hs-item-cover" style="background-image:url('+obj.hs_image_src+')">',
	'                    <i class="hs-default-wxpic-2"></i>',
	'                </div>',
	'                <div class="hs-item-title-h4-2">'+(obj.title?obj.title:'标题')+'</div>',
	'            </div>',
	'            <div class="hs-fodder-item-mask">',
	'                <a class="hs-igup" href="javascript:;" alt="上移">向上</a>',
	'                <a class="hs-igdp" href="javascript:;" alt="下移">向下</a>',
	'                <a class="hs-igdl" href="javascript:;" alt="删除">删除</a>',
	'            </div>',
	'        </div>',
	'    </div>'].join("");
	return _dom;
}


function hs_show_dialog(type){
    var noop = function(){};
    var options = {
        submit:noop,
        cancel:noop
    }
    if(arguments[1]){
        for(var k in arguments[1]){
            options[k] = arguments[1][k];
        }
    }
	var in_imgtext = function(){
		$.ajax({
            type:'GET',
            url:'/admin/mpbase/asyncfodderlist',
            async:false,
            data:'',
            dataType:'json',
            success:function(data){
                // var it = [];
                var it1 = [], it2 = [];
                for(var i = 0; i < data.data.length; i++){
                    var obj = null;
                    if(data.data[i].material_content){
                        var arts = JSON.parse(data.data[i].material_content);
                        var art = [];
                        for(var k = 0; k < arts.articles.length; k++){
                            var itm = _hs_dom_fodder_item(arts.articles[k]);
                            art.push(itm);
                        }
                        //it.push('<div class="hs-fodder-items hs-fodder-list-col" id="material_'+data.data[i].id+'">'+art.join('')+'</div>');
                        if(i%2 == 0){
                            it1.push('<div class="hs-fodder-items hs-fodder-list-col" id="material_'+data.data[i].id+'">'+art.join('')+'</div>');
                        }else{
                            it2.push('<div class="hs-fodder-items hs-fodder-list-col" id="material_'+data.data[i].id+'">'+art.join('')+'</div>');
                        }
                    }
                }
                var divstart = '<div class="hs-fodder-bigcol">', divend = '</div>';
                var d = new HS_Dialog();
                var h = d.hs_create("选择图文", '<div style="width:80%;margin:auto;padding:30px 0;overflow:hidden;">'+divstart+it1.join('')+divend+divstart+it2.join('')+divend+'</div>');
                d.hs_show(h);
                var sel_id = '';
                $('.hs-fodder-list-col').click(function(){
                    sel_id = $(this).attr('id');
                    $('.hs-fodder-list-col').removeClass('active');
                    $(this).addClass('active');
                    //d.hs_remove();
                });
                $('.dialog_hd .pop_closed').click(function(){
                    d.hs_remove();
                });
                $('.dialog_ft [data-index=0]').click(function(e){
                    options['submit'](e, d, sel_id);
                    d.hs_remove();
                });
                $('.dialog_ft [data-index=1]').click(function(e){
                    options['cancel'](e);
                    d.hs_remove();
                });
            }
        });
	}
	switch(type){
		case 'imgtext':
			in_imgtext();
		break;
		default: return false; break;
	}
}
