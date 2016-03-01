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
			$('#group_object').show();
		} else {
			$('#group_object').hide();
		}

	});
	/**
	 * 省市级联
	 */
	$('#province').on('change', function() {
		var province = $('#province').val();
		if(province != 0){
			$('#city').show();
		}else{
			$('#city').hide();
		}
	});

	/**
	 * 类型切换
	 */
	$(document).on('click', '#hs-area>li', function(){
		var pr = $(this).attr('jstab-target');
		$("#send_type").val(pr);
	});




	//dialog
	/*$('').on('click',function(){
		
		
	});
	var qunfa = new HS_Dialog();
	var title = qunfa.hs_create('选择素材','');
	qunfa.hs_show(title);*/
});