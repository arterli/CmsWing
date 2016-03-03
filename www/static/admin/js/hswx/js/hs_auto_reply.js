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
	function _hs_keywords_item(item_k, item_match){
		return ['<div class="keywords_item">',
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
	 */
	function _hs_html_keywords_rule_li(rule_n, rule_name){
		return ['<li class="keywords_rule_item" id="Js_ruleItem_403335945">',
				'        <div class="keywords_rule_hd no_extra" style="-webkit-transition: all, 1s;">',
				'            <div class="info">',
				'                <em class="keywords_rule_num">规则'+rule_n+':</em>',
				'                <strong class="keywords_rule_name">'+rule_name+'</strong>',
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
	 * 添加关键字
	 * */
	$(document).on('click', '.keywords_add_btn', function(){
		var exist = $(this).attr('aria-describedby');
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
		$(this).popover('show');
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
        var rul = '规则名称';
        $.get('/admin/mpbase2/createkrule',{'rule_name':rul}, function(data) {
            if(data > 0){
                ruleList.append(_hs_html_keywords_rule_li(++n, rul));
            }else{
                toastr.error('添加规则失败');
            }
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
		$(this.parentNode).remove();
		if(tip){
			tip.show();
		}
	});
	
	/**
	 * 确定添加胶囊
	 * */
	$(document).on('click', '.hs-submit-kv', function(){
		var cf = $(this).closest('.hs-form-horizontal');
		var ek = cf.find('[name=hsKeywordsRuleText]').val();
		var em = cf.find('[name=hsKeywordsRule]:checked').val();
		if(ek == ''){
			
		}else{
			var target = $(this).closest('.keywords_info');
			var target_tip = target.find('.hs-keyword-none-tip');
			var target_item_list = target.find('.keywords_item_list');
			var emar = ['模糊','全匹配'];
			var _html_jn = _hs_keywords_item(ek, emar[em]);
			target_tip.hide();
			target_item_list.append(_html_jn);
			_hs_hide_popver();
		}
	});
	
	/**
	 * 取消添加胶囊
	 * */
	$(document).on('click', '.hs-cancel-kv', function(){
		_hs_hide_popver();
	});
	
	/**
	 * body的click事件
	 */
	$(document).click(function(e){
		//to do someing...
		_hs_hide_popver(e);
	});
	
	/**
	 * 关闭popover
	 * @param {Object} e
	 */
	function _hs_hide_popver(e){
		if(e){
			var el = e.target;
			if(!/.*keywords_add_btn.*/.test(el.className)){
				var _el = $(el);
				if(_el.closest('.popover').length == 0){
					$('.popover').remove();
					$('.keywords_add_btn').removeAttr('aria-describedby');
				}
			}
		}else{
			$('.popover').remove();
			$('.keywords_add_btn').removeAttr('aria-describedby');
		}
	}
	
});