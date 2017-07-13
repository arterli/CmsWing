/**
 * 群发消息
 */
$(function() {
	/**
	 * 微信用户分组
	 */
	
	$('#group_type').on('change', function() {
		var type_class = $(this).val();
		if (type_class == 1) {
			$('#group_id').show();
		} else {
			$('#group_id').hide();
		}

	});
	/**
	 * 省市级联
	 */
	$('#province').on('change', function() {
		var province = $('#province').val();
		var provincetext = $('#province>option:selected').text();
		if(province != 0){
			$('#city').show();
			$("#provincetext").val(provincetext);
		}else{
			$('#city').hide();
		}
	});
	/**
	 * 获取city值
	 */
	$('#city').on('change', function() {
		var citytext = $('#city>option:selected').text();
		$("#citytext").val(citytext);
	});

	/**
	 * 类型切换
	 */
	$(document).on('click', '#hs-area>li', function(){
		var pr = $(this).attr('jstab-target');
		$("#send_type").val(pr);
	});
	/**
	 * 获取编辑器内容
	 */
	$(document).on('blur', '#edit_content', function(){
		var content = $(this).html();
		$("#editor_content").val(content);
	});

	/**
	 * 调用模态窗
	 */
	$(document).on('click','#news-dialog',function(){
		hs_show_dialog('imgtext',{
			'submit':function(e,d,i){
				console.log(i);
				var media_id = i.substr(9);
				$("#me_id").val(media_id);
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
	});

	//图文选择DIV隐藏
	$('#newssed').hide();

	//dialog
	/*$('').on('click',function(){
		
		
	});
	var qunfa = new HS_Dialog();
	var title = qunfa.hs_create('选择素材','');
	qunfa.hs_show(title);*/
});