/**
 * 自定义菜单JS文件
 */
$(function() {

	createMenu();

	/**
	 * 录入菜单数据到表单
	 * @param button
	 */
	function menuItemAdd(button){
		$('input[name=hs_menu_name_input]').val(button['name']);
		$('#menu_id').val(button['m_id']);
		$('#sort').val(button['sort']);
		$('#menu_f_id').val(button['pid']);
		$('#menu_type').val(button['type']);
		$('.hs_menu_name ').html(button['name']);
		$('#add_id').val(button['id']);//菜单ID,不存在即是未保存的数据
		//未完待续
	}
	function createMenu() {

		var buttons = menu.menu.button;
		if(buttons.length>0){
			$('#menu_id').val(buttons[0].id);
		}
		var domMenu = [];
		if(buttons.length == 0){
			console.log(buttons.length);
			domMenu = ['<li class="hs_first_li2 hs_menu_add_click hs_add_child_menu hs_menu_add_father" style="width:274px;">',
						'<span style="text-align: center;font-size: 20px;">',
						'<span style=";font-weight: bold;" class="glyphicon glyphicon-plus" aria-hidden="true">',
						'</span>添加菜单</span>',
						'</li>',
						];
		}
		else if (buttons.length == 1) {
			console.log("fdhsfhdsf");
			var subbutton = buttons[0].sub_button;
			var subbuts = buttons[0].sub_button.length;

			//编辑菜单属性数据
			menuItemAdd(buttons[0]);
			if (subbuts == 0) {
				domMenu.push('<li sort="' + buttons[0].sort + '" id="' + buttons[0].m_id + '" class="hs_father_menu"> <span>' + buttons[0].name + '</span>');
				domMenu.push('<div f_id="'+buttons[0].m_id +'"  class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative_one">');
				domMenu.push('<ul class="hs_sub_pre_menu_list">');
				domMenu.push('<li f_id="'+buttons[0].m_id +'" class="hs_add_child_menu  hs_icon_add_child_menu" style="width:135px;"><i class="hs_icon14_menu_add "></i></li>');
				domMenu.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div></li>');
			} else {
				var childMenu = [];
				for (var x = 0; x < subbuts; x++) {
					childMenu.push('<li class="hs_add_child_menu" style="width:135px;">' + subbutton[x].name + '</li>');
				}
				domMenu = ['<li sort="'+buttons[0].sort+'" id="' + buttons[0].m_id + '" class="hs_father_menu"> <span>' + buttons[0].name + '</span>',
					'<div class="hs_menu_child_three  hs_menu_child_relative_one">',
					'<ul class="hs_sub_pre_menu_list">',
					 childMenu.join(""),
					'<li f_id="'+buttons[0].m_id+'"  class="hs_add_child_menu  hs_icon_add_child_menu " style="width:135px;"><i class="hs_icon14_menu_add"></i></li>',
					'</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div>',
					'</li>'
				];
			}
			if (buttons.length == 1) {
				domMenu.push('<li class="hs_add_child_menu  hs_menu_add_father" style="width:135px;"><i class="hs_icon14_menu_add"></i></li>');
			}
		} else {
			//循环创建子菜单
			menuItemAdd(buttons[0]);
			for (var i = 0; i < buttons.length; i++) {
				var subbut = buttons[i].sub_button;
				if (subbut.length == 0) {
					if (i == 0) {
						domMenu.push('<li sort="' + buttons[i].sort + '" id="' + buttons[i].m_id + '" class="hs_father_menu_all hs_father_menu_active"> <span>' + buttons[i].name + '</span>');
						domMenu.push('<div f_id="'+buttons[i].m_id +'"  class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative">');
						domMenu.push('<ul class="hs_sub_pre_menu_list">');
						domMenu.push('<li f_id="'+buttons[i].m_id +'" class="hs_add_child_menu  hs_icon_add_child_menu"><i class="hs_icon14_menu_add "></i></li>');
						domMenu.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div></li>');
					} else {
						domMenu.push('<li sort="' + buttons[i].sort + '" id="' + buttons[i].m_id + '" class="hs_father_menu_all"> <span>' + buttons[i].name + '</span></li>');
					}
				} else {
					if(i == 0){
						var childMenu = [];
						for(x in subbut){
							childMenu.push('<li f_id="'+buttons[i].m_id+'" sort="'+subbut[x].sort+'" id="'+subbut[x].m_id+'" class="hs_add_child_menu">' + subbut[x].name + '</li>');
						}
						domMenu.push('<li sort="' + buttons[i].sort + '" id="' + buttons[i].m_id + '" class="hs_father_menu_all hs_father_menu_active"> <span>' +  buttons[i].name + '</span>');
						domMenu.push('<div f_id="'+buttons[i].m_id +'"  class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative">');
						domMenu.push('<ul class="hs_sub_pre_menu_list">');
						domMenu.push(childMenu.join(""));
						domMenu.push('<li f_id="' +buttons[i].m_id+'" class="hs_add_child_menu  hs_icon_add_child_menu"><i class="hs_icon14_menu_add "></i></li>');
						domMenu.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div>');
					}else{
						domMenu.push('<li sort="' + buttons[i].sort + '" id="' + buttons[i].m_id + '" class="hs_father_menu_all"> <span>' + buttons[i].name + '</span></li>');
					}
				}
			}
			if (buttons.length == 2) {
				domMenu.push('<li class="hs_father_menu_all hs_menu_add_father"><i class="hs_icon14_menu_add"></i></li>');
			}
		}
		$('.hs_pre_menu_list').html(domMenu.join(""));
	}

	///**
	// *  切换到选中的子菜单
	// */
	//$(document).on('click','.hs_add_child_menu',function(){
	//	alert("maweitao");
	//	var type = $('#menu_is_new_add').val();
	//	console.log(type);
	//	if(type == ''){
	//		createMenu();
	//		return;
	//	}
	//	var obj = $(this);
	//	obj.addClass('hs_father_menu_active');
	//	$('.hs_menu_hd').find('h4').html(obj.text());
	//	$('input[name=hs_menu_name_input]').val(obj.text());
	//	$('#menu_id').val(obj.attr('id'));
	//	$('#menu_f_id').val(obj.attr('f_id'))
    //
	//});

	/**
	 * 切换菜单类型，消息或者链接
	 */
	$('input[name=menu_type]').on('click', function() {

		var obj = $(this);
		if (obj.val() == '0') {
			$('.hs_menu_weburl').addClass('hs_menu_hidden');
			$('.hs_menu_message_content').removeClass('hs_menu_hidden');
			$('#menu_type').val('click');
		} else if (obj.val() == '1') {
			$('.hs_menu_weburl').removeClass('hs_menu_hidden');
			$('.hs_menu_message_content').addClass('hs_menu_hidden');
			$('#menu_type').val('view');
		}
	});

	/**
	 * 一级菜单添加事件
	 */
	$(document).on('click', '.hs_menu_add_father',function() {

		var time = new Date().getTime();
		var length = menu.menu.button.length;
		var buttons = menu.menu.button;
		var sort = length+1;//要添加菜单的当前排序号

		var data = {
			"m_id": time,
			"pid": "0",
			"type": "",
			"name": "菜单名称",
			"sort": (length+1),
			"sub_button": []
		};
		menu.menu.button.push(data);
		console.log(JSON.stringify(menu));
		console.log(JSON.stringify(data));

		var domMenu = [];
        if(length == 0){
			 domMenu = ['<li id="' + time + '" class="hs_father_menu hs_father_menu_active"> <span>' + '菜单名称' + '</span>',
				'<div class="hs_menu_child_three  hs_menu_child_relative_one">',
				'<ul class="hs_sub_pre_menu_list">',
				'<li class="hs_add_child_menu" style="width: 135px;"><i class="hs_icon14_menu_add"></i></li>',
				'</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div>',
				'</li>',
				'<li class="hs_father_menu hs_menu_add_father"><i class="hs_icon14_menu_add"></i></li>'];
		}else{
			for(var x=0;x<length;x++){
				domMenu.push('<li sort="'+buttons[x].sort+'"  id="' + buttons[x].m_id + '" class="hs_father_menu_all"><span>' + buttons[x].name + '</span></li>');
			}
			domMenu.push('<li sort="'+sort+'"  id="' + time + '" class="hs_father_menu_all hs_father_menu_active"><span>' + '菜单名称' + '</span>');
			domMenu.push('<div class="hs_menu_child_three  hs_menu_child_relative">');
			domMenu.push('<ul class="hs_sub_pre_menu_list">');
			domMenu.push('<li f_id="'+buttons[x].m_id+'" class="hs_add_child_menu hs_icon_add_child_menu"><i class="hs_icon14_menu_add"></i></li>');
			domMenu.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div></li>');
			if(length == 1){
 				domMenu.push('<li class="hs_father_menu_all hs_menu_add_father"><i class="hs_icon14_menu_add"></i></li>');
			}
			//未完待续
		//<span style="text-align: center;font-size: 20px;"><span style=";font-weight: bold;" class="glyphicon glyphicon-plus" aria-hidden="true"></span>添加菜单</span>
		}
		$(".hs_menu_name").html("菜单名称");
		$('input[name=hs_menu_name_input]').val('菜单名称');
		$('#sort').val(length+1);
		$('#menu_id').val(time);
		$('#menu_f_id').val('0');
		$('#add_id').val('');

		$('#hs_pre_menu_list').html(domMenu.join(""));
	});

	/**
	 * 素材类型切换监听
	 */
	$(document).on('click','.hs_menu_message_content .hs-etap-nav li',function(){
		var obj = $(this);
		var type = obj.attr('jstab-target');
		if(type == 'imgtextArea' || type == 'imageArea' || type == 'audioArea' || type == 'videoArea'){
			$("#menu_type").val('media_id');
		}
	});

	/**
	 * 事件类型切换
	 */
	$(document).on('click','input[name=menu_type]',function(e){


	});

	/**
	 * 同步微信菜单数据
	 */
		$(document).on('keyup','input[name=hs_menu_name_input]',function(){
			var obj = $(this);
			$('#hs_menu_form_area h4').html(obj.val());
			var menu_id = $('#menu_id').val();
			$('#'+menu_id).find('span').html(obj.val());
	});

	/**
	 * 保存微信菜单
	 */
	$(document).on('click','.hs_save_btn',function(){

		var data = {};
		data.id = $('#menu_id').val();

		data.sort = $('#sort').val();
		data.url = $('#menu_news_url').val();
		data.name = $('input[name=hs_menu_name_input]').val();
		data.pid = $('#menu_f_id').val();
		data.type = $('#menu_type').val();

        //post提交菜单数据
		$.post('/admin/mpbase/addselfmenu',data,function(res){
			if(res == '1'){
				alert('添加成功！');
				window.location.reload(true);
			}else{
				alert('添加失败!');
			}
		})
	});

	/**
	 * 添加二级菜单
	 */
	$(document).on('click', '.hs_icon_add_child_menu', function(e) {

		var obj = $(this);
		var fbtn = getFatherButtonById(obj.attr('f_id'));//当前一级菜单
		console.log(obj.attr('f_id'));
		var childs = fbtn.sub_button.length;//当前一级菜单的二级菜单数量
		var childbuttons = fbtn.sub_button;
		var name = '子菜单名称';
		var m_id = new Date().getTime();
		var sort = fbtn.sub_button.length+1;
		var pid = obj.attr('f_id');
		var type = '';
		var url = '';
		var dom = [];
		if(menu.menu.button.length == 1){
             if(childs == 0 ){
				 dom.push('<span>'+fbtn.name+'</span>');
				 dom.push('<div class="hs_menu_child  hs_menu_child_relative_one">');
				 dom.push('<ul class="hs_sub_pre_menu_list">');
				 dom.push('<li f_id="'+pid+'"  id="'+m_id+'" class="hs_add_child_menu" style="width:135px;"><span>'+name+'</span></li>');
				 dom.push('<li class="hs_add_child_menu" style="width:135px;"><i class="hs_icon14_menu_add"></i></li>');
				 dom.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div></li>');
			 }else{
				 dom.push('<span>'+fbtn.name+'</span>');
				 dom.push('<div class="hs_menu_child  hs_menu_child_relative_one">');
				 dom.push('<ul class="hs_sub_pre_menu_list">');
				 for(var x=0;x<childs;x++){
					 dom.push('<li sort="' +childbuttons[x].sort +'" f_id"'+ childbuttons[x].pid + '" id="' + childbuttons[x].m_id + '" class="hs_father_menu" style="width:135px;"><span>' + childbuttons[x].name + '</span></li>');
				 }
				 dom.push('<li f_id="'+ pid + '" id="' + m_id + '" class="hs_father_menu hs_father_menu_active" style="width:135px;"style="width:135px;"><span>' + name + '</span></li>');
				 dom.push('<li class="hs_add_child_menu  hs_icon_add_child_menu " style="width: 135px;"><i class="hs_icon14_menu_add"></i></li>');
				 dom.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div></li>');
				 //dom.push('<li class="hs_father_menu hs_menu_add_father"><i class="hs_icon14_menu_add"></i></li>');
			 }
		}else{
			if(childs == 0){
				 dom.push('<span>'+fbtn.name+'</span>');
				 dom.push('<div class="hs_menu_child_three  hs_menu_child_relative">');
				 dom.push('<ul class="hs_sub_pre_menu_list">');
				 dom.push('<li f_id"'+ pid + '" id="' + m_id + '" class="hs_father_menu hs_father_menu_active"><span>' + name + '</span></li>');
				 dom.push('<li class="hs_add_child_menu"><i class="hs_icon14_menu_add"></i></li>');
				 dom.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div></li>');
			 }else{
				dom.push('<span>'+fbtn.name+'</span>');
				dom.push('<div class="hs_menu_child_three  hs_menu_child_relative">');
				dom.push('<ul class="hs_sub_pre_menu_list">');
				for(var x=0;x<childs;x++){
					dom.push('<li f_id"'+ childbuttons[x].pid + '" id="' + childbuttons[x].m_id + '" class="hs_father_menu"><span>' + childbuttons[x].name + '</span></li>');
				}
				dom.push('<li f_id"'+ pid + '" id="' + m_id + '" class="hs_father_menu hs_father_menu_active"><span>' + name + '</span></li>');
				dom.push('<li class="hs_add_child_menu"><i class="hs_icon14_menu_add"></i></li>');
				dom.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div></li>');
			}
		}
		$('#'+pid).empty();
		$('#'+pid).append(dom.join(""));
		$('input[name=hs_menu_name_input]').val(name);
		$('#menu_id').val(m_id);
		$('#sort').val(sort);
		$('#menu_f_id').val(pid);
		$('#menu_type').val('');
		$('.hs_menu_name ').html(name);
		//未完待续
		e.stopPropagation();
	});

	function isNewMenuAdd(){
		var obj = $('#menu_is_new_add').val();
		if(obj == '' || obj == ''){

		}

	}

	/**
	 *  根据菜单ID获取一级菜单详情
	 */
	function getFatherButtonById(menu_id){

		var menus = menu.menu.button;
		var button = {};
		for(var x=0;x<menus.length;x++){
			if(menus[x].m_id == menu_id){
				button = menus[x];
				break;
			}
		}
		return button;
	}

	///**
	//  * 选中切换到子菜单
	//  */
	//$(document).on('click','.hs_add_child_menu',function(e){
	//	e.stopPropagation();
	//});

	/**
	 * 一级菜单切换事件监听
	 */
	$(document).on('click', '#hs_pre_menu_list>li:not(.hs_menu_add_father)', function(){

		var obj = $(this);
		if(menu.menu.button.length == 0){
			return;
		}else{
			var sort = obj.attr('sort');
			$('#hs_pre_menu_list>li').removeClass('hs_father_menu_active');
			$('#hs_pre_menu_list>li div').remove();
			obj.addClass('hs_father_menu_active');
			var divd = obj.find('div');
			divd.addClass('hs_menu_child_relative');
			$('#menu_id').val(obj.attr('id'));
			$('#hs_menu_form_area .hs_menu_name_input').val(obj.find('span').text());
			$('.hs_menu_name ').html(obj.find('span').text());
			var d = showChildMenu(sort);
			obj.append(d.join(""));  //1457489513207
			console.log(obj.attr('id'));
			var button = getFatherButtonById(obj.attr('id'));
			if(button.sub_button.length > 0){
				$('.hs_menu_message_content').hide();
				$('div').remove('.hs_father_menu_tips');
				$('.hs_menu_form_bd ').append('<div class="hs_father_menu_tips">'+'已添加子菜单，仅可设置菜单名称'+'</div>');
				$('input[name=menu_type]').attr('disabled','disabled');
			}else{
				$('.hs_menu_message_content').show();
				$('div').remove('.hs_father_menu_tips');
				$('input[name=menu_type]').attr('disabled','false');
			}
		}
	});

	/**
	 * show点击一级菜单的所有二级菜单
	 * @param {Object} sort
	 */
	function showChildMenu(sort) {

		var button;
		var menus = menu.menu.button;
		for (x in menus) {
			if (menus[x].sort == sort) {
				button = menus[x];
			}
		}
		return buildChildMenuDom(button, menus);
	}

	/**
	 * 构建二级菜单DOM结构
	 * @param {Object} button
	 */
	function buildChildMenuDom(button, buttons) {

		var dom = [];
		var subbuts = button.sub_button;

		//没有子菜单的情况
		if (subbuts.length == 0) {
			if (buttons.length< 2) {
				dom = ['<div f_id="'+button.m_id+'" class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative_one">',
					'<ul class="hs_sub_pre_menu_list"><li f_id="'+button.m_id+'" class="hs_add_child_menu hs_icon_add_child_menu" style="width:135px;">',
					'<i class="hs_icon14_menu_add"></i></li></ul>',
					'<i class="hs_arrow hs_arrow_out"></i>',
					'<i class="hs_arrow hs_arrow_in"></i></div>'
				];
			} else {
				dom = ['<div f_id="'+button.m_id+'" class="hs_menu_child hs_child_menu_module hs_menu_child_relative">',
					'<ul class="hs_sub_pre_menu_list"><li f_id="' + button.m_id+'"  class="hs_add_child_menu hs_icon_add_child_menu">',
					'<i class="hs_icon14_menu_add"></i></li></ul>',
					'<i class="hs_arrow hs_arrow_out"></i>',
					'<i class="hs_arrow hs_arrow_in"></i></div>'
				];
			}
		}else {
			var childMenu = [];
			if(buttons.length < 2 ){
				alert("maweitao");
				for(x in subbuts){
					childMenu.push('<li f_id="'+button.m_id+'" sort="'+subbuts[x].sort+'" id="'+subbuts[x].m_id+'" class="hs_add_child_menu" style="width:135px;">' + subbuts[x].name + '</li>');
				}
				dom.push('<div f_id="'+button.m_id+'" class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative_one">');
				dom.push('<ul class="hs_sub_pre_menu_list">');
				dom.push(childMenu.join(""));
				dom.push('<li f_id="'+button.m_id+'" class="hs_add_child_menu hs_icon_add_child_menu" style="width:135px;"><i class="hs_icon14_menu_add "></i></li></ul>');
				dom.push('<i class="hs_arrow hs_arrow_out"></i>');
				dom.push('<i class="hs_arrow hs_arrow_in"></i></div>');
			}else{
				var childMenu = [];
				for(var x in subbuts){
					childMenu.push('<li f_id="'+button.m_id+'" sort="'+subbuts[x].sort+'" id="'+ subbuts[x].m_id +'" class="hs_add_child_menu">' + subbuts[x].name + '</li>');
				}
				dom.push('<div f_id="'+button.m_id +'"  class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative">');
				dom.push('<ul class="hs_sub_pre_menu_list">');
				dom.push(childMenu.join(""));
				dom.push('<li f_id="' +button.m_id +'"  class="hs_add_child_menu  hs_icon_add_child_menu"><i class="hs_icon14_menu_add"></i></li>');
				dom.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div>');
			}
		}
		return dom;
	}

	/**
	 * 删除微信菜单
     */
	$(document).on('click', '.hs_del_menu_link', function() {

		alert('确定删除！');
		var menu_id = $("#menu_id").val();
		var f_id = $("#menu_f_id").val();
		var data = {
			"m_id":menu_id,
			"pid":f_id
 		};
		//异步请求删除数据
		$.post('/admin/mpbase/delselfmenu',data,function(res){
			if(res == '1'){
				alert('删除成功！');
				window.location.reload(true);
			}else {
				alert('删除失败!');
			}
		})
	});

	/**
	 * ajax提交数据
	 * @param data
	 */
	function ajaxaddmenudata(data){

		//ajax提交菜单数据
		$.ajax({
			type: "POST",
			url: "/admin/mpbase/ajaxaddmenu",
			data: data,
			async: false,
			success: function(msg){

			}
		});
	}
})
