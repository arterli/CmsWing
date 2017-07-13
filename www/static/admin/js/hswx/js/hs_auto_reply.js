$(function(){
    
	/*添加关键字弹出窗*/
	function _hs_keywords_add(kv, ot){
		return ['<div class="hs-kvs-add hs-form-horizontal">',
		'	<div class="hs-form-row">',
		'		<label class="hs-form-label"><em class="hs-form-required">*</em>关键词：</label>',
		'		<div class="hs-form-control">',
		'			<input type="text" name="hsKeywordsRuleText" class="hs-input" value="'+kv+'" />',
		'		</div>',
		'	</div>',
		'	<div class="hs-form-row">',
		'		<label class="hs-form-label"><em class="hs-form-required">*</em>规则：</label>',
		'		<div class="hs-form-control">',
		'			<label class="hs-radio hs-inline"><input type="radio" name="hsKeywordsRule" value="1" '+(ot==1?"checked":"")+' />全匹配</label>',
		'			<label class="hs-radio hs-inline"><input type="radio" name="hsKeywordsRule" value="0" '+(ot==0?"checked":"")+'/>模糊</label>',
		'		</div>',
		'	</div>',
		'	<div class="hs-form-actions">',
		'		<button type="button" class="hs-btn hs-submit-kv">确定</button>',
		'		<button type="button" class="hs-btn hs-cancel-kv">取消</button>',
		'	</div>',
		'</div>'].join("");
	}
	
	
	/**
	 * 关键字，胶囊样式
	 * @param {String} item_k
	 * @param {String} item_match
	 */
	function _hs_keywords_item(item_k, item_match, kid){
		return ['<div class="keywords_item" data-kid="'+kid+'">',
		'<a href="javascript:;" class="hs-remove-kvs hs-closed"></a>',
		'	<span class="hs-ik">'+item_k+'</span><span class="hs-iv">'+item_match+'</span>',
		'</div>'].join('');
	}
		
	var _hs_kv_recli = ['<li>',
		'   <div class="hs-reply-content"><span class="hs-kv-rectype">文</span>nsdfasdf</div>',
		'   <div class="hs-reply-opts">',
		'   <a class="js-edit-it" href="javascript:;">编辑</a> - <a class="js-delete-it" href="javascript:;">删除</a>',
		'   </div>',
		'</li>'].join("");

	/**
	 * 添加关键词规则
	 * @param {String} rule_n
	 * @param {String} rule_name
     * @param {String} rid* 
	 */
	function _hs_html_keywords_rule_li(rule_n, rule_name, rid){
		return ['<li class="keywords_rule_item" id="'+rid+'">',
				'        <div class="keywords_rule_hd no_extra" style="-webkit-transition: all, 1s;">',
				'            <div class="info">',
				'                <em class="keywords_rule_num">规则'+rule_n+':</em>',
				'                <strong class="keywords_rule_name">'+rule_name+'</strong>',
                '                <div class="hs-reply-opts">',
                '                    <a class="js-edit-rule" data-id="'+rid+'" href="javascript:;">编辑</a> - <a class="js-delete-rule" data-id="'+rid+'" href="javascript:;">删除</a>',
                '                </div>',
				'            </div>',
				'        </div>',
				'        <div class="keywords_rule_bd keywords_rule_overview">',
				'        	<!--关键词-->',
				'        	<div class="keywords_info keywords">',
				'        		<strong class="keywords_info_title">关键词：</strong>',
				'        		<div class="hs-keyword-container">',
				'        			<div class="hs-keyword-none-tip">没有关键词！</div>',
				'	        		<div class="keywords_item_list">',
				'	        		</div>',
				'	        	</div>',
				'        		<a class="keywords_add_btn" href="javascript:;">添加一个关键词</a>',
				'        	</div>',
				'        	<!--关键词回复-->',
				'        	<div class="keywords_info reply">',
				'        		<strong class="keywords_info_title">回复：</strong>',
				'        		<div class="hs-keyword-container">',
				'        			<div class="hs-keyword-none-tip">没有任何回复！</div>',
				'        			<ol class="hs-kv-recol">',
				'        			</ol>',
				'        		</div>',
				'        		<a class="keywords_addrec_btn" href="javascript:;">添加一条回复</a>',
				'        	</div>',
				'        	<!--竖线-->',
				'        	<div class="hs-clearfix hs-cutline"></div>',
				'        </div>',
				'    </li>'].join("");
	}
    
    /**
     *
     */
    function _hs_html_editor_keywords(){
        return ['<!--*****-->',
                '<div class="emotion_editor">',
                '	<!--<div class="edit_area js_editorArea" style="display: none;"></div>-->',
                '	<div class="edit_area js_editorArea" contenteditable="true" style="overflow-y: auto; overflow-x: hidden;"></div>',
                '	<div class="editor_toolbar">',
                '		<a href="javascript:void(0);" class="icon_emotion emotion_switch js_switch">表情</a>',
                '		<p class="editor_tip opr_tips">，按下Shift+Enter键换行</p>',
                '		<p class="editor_tip js_editorTip">还可以输入<em>600</em>字</p>',
                '		<div class="emotion_wrp js_emotionArea">',
                '			<span class="hook">',
                '				<span class="hook_dec hook_top"></span>',
                '			<span class="hook_dec hook_btm"></span>',
                '			</span>',
                '			<ul class="emotions" onselectstart="return false;"></ul>',
                '			<span class="emotions_preview js_emotionPreviewArea"></span>',
                '		</div>',
                '	</div>',
                '</div>',
                '<!--*****-->'].join("");
    }
	/**
	 * 添加关键字
	 * */
	$(document).on('click', '.keywords_add_btn', function(){
		/*var exist = $(this).attr('aria-describedby');
		if(exist){
			return false;
		}
		var _hs_keywords_add_dom = _hs_keywords_add("", 1);
		$(this).popover({
			content: _hs_keywords_add_dom,
			html: true,
			placement: 'bottom',
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-inner popover-keyword"><div class="popover-content"></div></div></div>',
		})
		$(this).on('hide.bs.popover', function () {
		  return false;
		});
		$(this).popover('show');*/
        var self = this;
        var d = new HS_Dialog();
        var dh = d.hs_create('新建关键字', _hs_html_editor_keywords());
        d.hs_show(dh);
        var dialog = $(d._div);
        var ruleid = $(self).closest('.keywords_rule_item').attr('id');
        $('.hs-dialog-submit[data-index=0]').click(function(){
           var val = dialog.find('.edit_area').html();
           var typ = 1;
           if(!val){
               toastr.error('关键字不能为空');
               return false;
           }
           d.hs_remove();
           $.post('/admin/mpbase/ruleedit',{'name':val, type: typ, 'ruleid': ruleid, 'edittype': 1 },
               function(data){
                   if(data > 0){
                       toastr.success('添加成功');
                       var cf = $(self).closest('.hs-form-horizontal');
                        var ek = val;
                        var em = typ;
                        var target = $(self).closest('.keywords_info');
                        var target_tip = target.find('.hs-keyword-none-tip');
                        var target_item_list = target.find('.keywords_item_list');
                        var emar = ['模糊','全匹配'];
                        var _html_jn = _hs_keywords_item(ek, emar[em], data);
                        target_tip.hide();
                        target_item_list.append(_html_jn);
                   }else if(data == -1){
                       toastr.error('关键字重复');
                   }else{ toastr.error('添加失败'); }
               }, 'json'
           );
        });
        $('.dialog_hd .pop_closed').click(function(){
            d.hs_remove();
        });
        $('.dialog_ft [data-index=1]').click(function(){
            d.hs_remove();
        });
        
	});
	
	/**
	 * 添加回复内容
	 * */
	/*$('.keywords_addrec_btn').popover({
		content: _hs_keywords_add_dom,
		enabled: true,
		html: true,
		placement: 'bottom',
		template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-inner popover-keyword"><div class="popover-content"></div></div></div>'
	});*/
	
	/**
	 * 添加关键字规则
	 * */
	$(document).on('click', '#hs_js_keywords_rule_add', function(){
		var ruleList = $("#Js_ruleList");
		var n = ruleList.children('li').length;
        var rul = '未命名规则';
        $.get('/admin/mpbase/createkrule',{'rule_name':rul}, function(data) {
            if(data.errno == 0){
                ruleList.append(_hs_html_keywords_rule_li(++n, rul, data.data.ruleid));
            }else{
                toastr.error(data.errmsg);
            }
        });
	});
    
    /**
     * 删除关键字规则
     */  
	$(document).on('click', '.js-delete-rule', function () {
        if(confirm('确定要删除该规则?')){
            var self = this;
            var ruleid = self.getAttribute('data-id');
            if(ruleid){
                $.post('/admin/mpbase/ruledelete',{ruleid:ruleid},
                    function(data) {
                        if(data.errno == 0){
                            toastr.success(data.data.name);
                            window.location.reload();
                        }else{
                            toastr.error(data.errmsg);
                        }    
                    }
                );
            }
        }
    });
    
    /** 
     * 编辑规则名称 
     */
    $(document).on('click', '.js-edit-rule', function(){
        var currname = $(this).closest('.info').find('.keywords_rule_name').html();
        var ruleid = this.getAttribute('data-id');
        var d = new HS_Dialog();
        var h = d.hs_create('规则名称', '<div class="hs-form-control" style="margin:100px 0 120px 0;text-align:center;"><span>规则名称：</span><input type="text" name="rulename" value="'+currname+'" ></div>');
        d.hs_show(h);
        $('.dialog_ft [data-index=0]').click(function(){
            var rulename = $('[name=rulename]').val();
            if(rulename){
                $.post('/admin/mpbase/ruleeditname', {ruleid:ruleid, rulename:rulename},
                    function(data){
                        if(data.errno == 0){
                            toastr.success(data.data.name);
                            setTimeout(function(){
                                location.reload();
                            }, 1100);
                        }else{
                            toastr.error(data.errmsg);
                        }
                    }
                );
                d.hs_remove();
            }else{
                toastr.error('规则名称不能为空');
            }
        });
        $('.dialog_hd .pop_closed').click(function(){
            d.hs_remove();
        });
        $('.dialog_ft [data-index=1]').click(function(){
            d.hs_remove();
        });
    });

    
	/**
	 * 删除关键字
	 * */
	$(document).on('click', '.keywords_item .hs-remove-kvs', function(){
		var len = $(this.parentNode.parentNode).children('.keywords_item').length;
		var tip = null;
		if(len == 1){
			tip = $(this).closest('.hs-keyword-container').find('.hs-keyword-none-tip');
		}
        var kid = this.parentNode.getAttribute('data-kid');
        var ruleid = $(this).closest('.keywords_rule_item').attr('id');
        var thisitem = $(this.parentNode);
        if(kid){
            $.post('/admin/mpbase/ruleedit', { edittype:1, kid:kid, ruleid:ruleid },
                function(data){
                    if(data > 0){
                        toastr.success('关键字删除成功');
                        thisitem.remove();
                        if(tip){
                            tip.show();
                        }
                    }else{ toastr.error('关键字删除失败'); }
                }
            );
        }else{
            toastr.error('关键字删除失败');   
        }
	});
	
	/**
	 * 确定添加胶囊
	 * */
	// $(document).on('click', '.hs-submit-kv', function(){
	// 	var cf = $(this).closest('.hs-form-horizontal');
	// 	var ek = cf.find('[name=hsKeywordsRuleText]').val();
	// 	var em = cf.find('[name=hsKeywordsRule]:checked').val();
	// 	if(ek == ''){
			
	// 	}else{
	// 		var target = $(this).closest('.keywords_info');
	// 		var target_tip = target.find('.hs-keyword-none-tip');
	// 		var target_item_list = target.find('.keywords_item_list');
	// 		var emar = ['模糊','全匹配'];
	// 		var _html_jn = _hs_keywords_item(ek, emar[em]);
	// 		target_tip.hide();
	// 		target_item_list.append(_html_jn);
	// 		_hs_hide_popver();
	// 	}
	// });
	
	/**
	 * 取消添加胶囊
	 * */
	// $(document).on('click', '.hs-cancel-kv', function(){
	// 	_hs_hide_popver();
	// });
	
	/**
	 * body的click事件
	 */
	// $(document).click(function(e){
	// 	//to do someing...
	// 	_hs_hide_popver(e);
	// });
	
	/**
	 * 关闭popover
	 * @param {Object} e
	 */
	// function _hs_hide_popver(e){
	// 	if(e){
	// 		var el = e.target;
	// 		if(!/.*keywords_add_btn.*/.test(el.className)){
	// 			var _el = $(el);
	// 			if(_el.closest('.popover').length == 0){
	// 				$('.popover').remove();
	// 				$('.keywords_add_btn').removeAttr('aria-describedby');
	// 			}
	// 		}
	// 	}else{
	// 		$('.popover').remove();
	// 		$('.keywords_add_btn').removeAttr('aria-describedby');
	// 	}
	// }
	
    
    /**
     * 添加回复
     */  
    $(document).on('click', '.keywords_addrec_btn', function(){
        var self = this;
        var rulediv = $(self).closest('.keywords_rule_item');
        var ruleid = rulediv.attr('id');
        if(!ruleid){
            toastr.error('该规则存在错误，回复添加失败');
            return false;
        }
        var d = new HS_Dialog();
        var dh = d.hs_create('新建回复', _hs_reply_editor());
        d.hs_show(dh);
        var dialog = $(d._div);
        $('.hs-dialog-submit[data-index=0]').click(function(){
            var active = dialog.find('.hs-etap-one.active').attr('jstab-target');
            var params = {};
            params.ruleid = ruleid;
            //根据类型取值
            switch(active){
                case 'textArea': 
                    params.type = 'text';
                    var tmp_content = dialog.find('.edit_area').html();
                    if(tmp_content){
                        params.content = tmp_content;
                    }else{
                        toastr.error('文本内容不能为空');
                        return false;
                    }
                break;
                case 'imageArea': 
                    alert('image暂未开放'); return false;
                break;
                case 'audioArea': 
                    alert('audio暂未开放'); return false;
                break;
                case 'videoArea': 
                    alert('video暂未开放'); return false;
                break;
            }
            $.post('/admin/mpbase/creater', params,
                function (data) {
                    if(data.errno == 0){
                        params.rid = data.data.rid;
                        toastr.success(data.data.name);
                        var reply_panel = $(self).closest('.reply');
                        reply_panel.find('.hs-keyword-none-tip').hide();
                        reply_panel.find('.hs-kv-recol').append(_hs_reply_bar(params));
                        d.hs_remove();
                    }else{
                        toastr.error(data.errmsg);
                    }
                }
            );
        });
        $('.dialog_hd .pop_closed').click(function(){
            d.hs_remove();
        });
        $('.dialog_ft [data-index=1]').click(function(){
            d.hs_remove();
        });
    });
    
    /**
     * 删除回复 
     */
    $(document).on('click', '.js-delete-it', function() {
        if(!confirm('确定要删除吗？')){ 
            return false;
        }
        var self = this;
        var rulediv = $(self).closest('.keywords_rule_item');
        var ruleid = rulediv.attr('id');
        var rid = self.getAttribute('data-rid');
        $.post('/admin/mpbase/deleter', { ruleid:ruleid, rid:rid },
            function (data) {
                if(data.errno == 0){
                    toastr.success(data.data.name);
                    if($(self).closest('li').siblings().length == 0){
                        var reply_panel = $(self).closest('.reply');
                        reply_panel.find('.hs-keyword-none-tip').show();
                    }
                    $(self).closest('li').remove();
                }else{
                    toastr.fail(data.errmsg);
                }
            }
        );
    });
    
    /**
     * 编辑回复 
     */
    $(document).on('click', '.js-edit-it', function() {
        var self = this;
        // var rulediv = $(self).closest('.keywords_rule_item');
        // var ruleid = rulediv.attr('id');
        var ruleid = self.getAttribute('data-rid');
        var rtype = self.getAttribute('data-rtype');
        var editorInit = { rid: ruleid, rtype: rtype };
        
        var d = new HS_Dialog();
        var dh = d.hs_create('编辑回复', _hs_reply_editor(editorInit));
        d.hs_show(dh);
        var dialog = $(d._div);
        $('.hs-dialog-submit[data-index=0]').click(function(){
            var active = dialog.find('.hs-etap-one.active').attr('jstab-target');
            var params = {};
            params.ruleid = ruleid;
            //根据类型取值
            switch(active){
                case 'textArea': 
                    params.type = 'text';
                    var tmp_content = dialog.find('.edit_area').html();
                    if(tmp_content){
                        params.content = tmp_content;
                    }else{
                        toastr.error('文本内容不能为空');
                        return false;
                    }
                break;
                case 'imageArea': 
                    alert('image暂未开放'); return false;
                break;
                case 'audioArea': 
                    alert('audio暂未开放'); return false;
                break;
                case 'videoArea': 
                    alert('video暂未开放'); return false;
                break;
            }
            $.post('/admin/mpbase/editreply', params,
                function (data) {
                    if(data.errno == 0){
                        toastr.success(data.data.name);
                        setTimeout(function(){
                            location.reload();
                        }, 1100);
                        d.hs_remove();
                    }else{
                        toastr.error(data.errmsg);
                    }
                }
            );
        });
        $('.dialog_hd .pop_closed').click(function(){
            d.hs_remove();
        });
        $('.dialog_ft [data-index=1]').click(function(){
            d.hs_remove();
        });
    });
    
    //弹出编辑
    function _hs_reply_editor(){
        var obj = {
            rtype: null,
            rid: 0,
            rdom: ''
        }
        if(arguments[0]){
            obj.rtype = arguments[0].rtype;
            obj.rid = arguments[0].rid;
            switch (obj.rtype){
                case 'text':
                    obj.rdom = $('[data-rid='+obj.rid+']').closest('li').find('.reply-dom').text();
                break;
            }
        }
        return ['<div class="hs-ui-beditor hs-js-tab hs-auto">',
        '	<div class="hs-etap-nav">',
        '		<ul>',
        '			<li jstab-target="textArea" class="hs-etap-one hs-etap-text '+ (obj.type ? obj.type == 'text' ? 'active':'':'active') +'">',
        '				<a href="javascript:void(0);" onclick="return false;">&nbsp;<i class="hs-etap-icon"></i><span class="hs-etap-title">文字</span></a>',
        '			</li>',
        '			<li jstab-target="imageArea" class="hs-etap-one hs-etap-image">',
        '				<a href="javascript:void(0);" onclick="return false;">&nbsp;<i class="hs-etap-icon"></i><span class="hs-etap-title">图片</span></a>',
        '			</li>',
        '			<li jstab-target="audioArea" class="hs-etap-one hs-etap-audio">',
        '				<a href="javascript:void(0);" onclick="return false;">&nbsp;<i class="hs-etap-icon"></i><span class="hs-etap-title">语音</span></a>',
        '			</li>',
        '			<li jstab-target="videoArea" class="hs-etap-one hs-etap-video">',
        '				<a href="javascript:void(0);" onclick="return false;">&nbsp;<i class="hs-etap-icon"></i><span class="hs-etap-title">视频</span></a>',
        '			</li>',
        '		</ul>',
        '	</div>',
        '	<div class="hs-etap-panel">',
        '		<div jstab-des="textArea" class="hs-etap-content" style="'+ (obj.type ? obj.type == 'text' ? '':'display:none':'') +'">',
        '			<div class="hs-etap-textArea hs-inner">',
        '				<!--*****-->',
        '				<div class="emotion_editor">',
        '					<!--<div class="edit_area js_editorArea" style="display: none;"></div>-->',
        '					<div class="edit_area js_editorArea" contenteditable="true" style="overflow-y: auto; overflow-x: hidden;">'+obj.rdom+'</div>',
        '					<div class="editor_toolbar">',
        '						<a href="javascript:void(0);" class="icon_emotion emotion_switch js_switch">表情</a>',
        '						<p class="editor_tip opr_tips">，按下Shift+Enter键换行</p>',
        '						<p class="editor_tip js_editorTip">还可以输入<em>600</em>字</p>',
        '						<div class="emotion_wrp js_emotionArea">',
        '							<span class="hook">',
        '								<span class="hook_dec hook_top"></span>',
        '							<span class="hook_dec hook_btm"></span>',
        '							</span>',
        '							<ul class="emotions" onselectstart="return false;"></ul>',
        '							<span class="emotions_preview js_emotionPreviewArea"></span>',
        '						</div>',
        '					</div>',
        '				</div>',
        '				<!--*****-->',
        '			</div>',
        '		</div>',
        '		<div jstab-des="imageArea" class="hs-etap-content" style="display: none;">',
        '			<div class="hs-etap-imageArea hs-inner">',
        '				<div class="hs-con-cover">',
        '					<div class="hs-media-cover" onclick="">',
        '						<span class="hs-create-access">',
        '			                <a href="javascript:;">',
        '	                            <i class="hs-icon36 hs-icon36-add"></i>',
        '	                            <strong>从素材库中选择</strong>',
        '	                        </a>',
        '			            </span>',
        '					</div>',
        '					<div class="hs-media-cover">',
        '						<span class="hs-create-access">',
        '			                <a href="javascript:;">',
        '                                <i class="hs-icon36 hs-icon36-add"></i>',
        '                                <strong>上传图片</strong>',
        '                            </a>',
        '			            </span>',
        '					</div>',
        '				</div>',
        '			</div>',
        '		</div>',
        '		<div jstab-des="audioArea" class="hs-etap-content" style="display: none;">',
        '			<div class="hs-etap-audioArea hs-inner">',
        '				<div class="hs-con-cover">',
        '					<div class="hs-media-cover">',
        '						<span class="hs-create-access">',
        '			                <a href="javascript:;">',
        '	                            <i class="hs-icon36 hs-icon36-add"></i>',
        '	                            <strong>从素材库中选择</strong>',
        '	                        </a>',
        '			            </span>',
        '					</div>',
        '					<div class="hs-media-cover">',
        '						<span class="hs-create-access">',
        '			                <a href="javascript:;">',
        '                                <i class="hs-icon36 hs-icon36-add"></i>',
        '                                <strong>新建语音</strong>',
        '                            </a>',
        '			            </span>',
        '					</div>',
        '				</div>',
        '			</div>',
        '		</div>',
        '		<div jstab-des="videoArea" class="hs-etap-content" style="display: none;">',
        '			<div class="hs-etap-videoArea hs-inner">',
        '				<div class="hs-con-cover">',
        '					<div class="hs-media-cover">',
        '						<span class="hs-create-access">',
        '			                <a href="javascript:;">',
        '	                            <i class="hs-icon36 hs-icon36-add"></i>',
        '	                            <strong>从素材库中选择</strong>',
        '	                        </a>',
        '			            </span>',
        '					</div>',
        '					<div class="hs-media-cover">',
        '						<span class="hs-create-access">',
        '			                <a href="javascript:;">',
        '                                <i class="hs-icon36 hs-icon36-add"></i>',
        '                                <strong>新建视频</strong>',
        '                            </a>',
        '			            </span>',
        '					</div>',
        '				</div>',
        '			</div>',
        '		</div>',
        '	</div>',
        '</div>'].join("");
    }
    
    /**
     * 添加回复条数
     */
    function _hs_reply_bar(param){
        var t = c = '';
        console.log(param);
        var rid = param.rid;
        var rtype = param.type;
        //根据类型赋值
        switch(param.type){
            case 'text': 
                t = '文本'
                c = param.content;
            break;
            case 'imageArea': 
                alert('image');
            break;
            case 'audioArea': 
                alert('audio');
            break;
            case 'videoArea': 
                alert('video');
            break;
        }
        return ['<li>',
        '	<div class="hs-reply-content"><span class="hs-kv-rectype">'+t+'</span><span class="reply-dom">'+c+'</span></div>',
        '	<div class="hs-reply-opts">',
        '		<a class="js-edit-it" data-rid="'+rid+'" data-rtype="'+rtype+'" href="javascript:;">编辑</a> - <a class="js-delete-it" data-rid="'+rid+'" href="javascript:;">删除</a>',
        '	</div>',
        '</li>'].join("");
    }
    
    
    /**
     * 关注自动回复
     */
    /**
     * 调用模态窗
     */
    $(document).on('click','#news-dialog',function(){
        hs_show_dialog('imgtext',{
            'submit':function(e,d,i){
                console.log(i);
                var media_id = i.substr(9);
                $("#me_id").val(media_id);
                $('[jstab-des="newsArea"]').attr("data-me_id",media_id)
                var dialog = $(d._div);
                var newsed = dialog.find('#'+i);
                var del = '<a id="newsdel" class="clearfix" href="#">删除</a>'
                if(newsed){
                    $('#newssed').show();
                    $('#newssed').html(newsed).append(del);
                    $('#newsxz').hide();
                }else{
                    $('#newsxz').show();
                    $('#newssed').hide();
                }
            }
        });
    });

    /**
     * 点击删除选中的图文
     */
    $(document).on('click','#newsdel',function(){
        $('#newsxz').show();
        $('#newssed').hide();
        $('#newssed').html('');
        $('[jstab-des="newsArea"]').attr("data-me_id",null)
    });

    //图文选择DIV隐藏
    //$('#newssed').hide();
   /* var send_type = $('#send_type').val();
    $('#hs-area>li').removeClass('active')
    $('#hs-area>li[jstab-target='+send_type+']').addClass('active');*/

    /**
     * 自动回复内容类型获取
     */
    $(document).on('click', '#hs-area>li', function(){
        var pr = $(this).attr('jstab-target');
        $("#send_type").val(pr);
        $("#id").val($(this).attr("data-id"));
        var panel = ".hs-etap-panel>[jstab-des="+pr+"]";
        $("#me_id").val($(panel).attr("data-me_id"));
    });
    /**
     * 获取编辑器内容
     */
    $(document).on('blur', '#edit_content', function(){
        var content = $(this).html();
        $("#editor_content").val(content);
    });


});