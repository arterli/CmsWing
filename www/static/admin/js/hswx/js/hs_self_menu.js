/**
 * 自定义菜单JS文件
 */
$(function() {

	createMenu();
	function createMenu() {
		
		//initMenuJSON();
		//var menuJSON = readJSON();
		var menu = {"menu":{"button":[]}};

		var buttons = menu.menu.button;
		if(buttons.length>0){
			$('#menu_id').val(buttons[0].id);
		}
		var domMenu = [];
		if(buttons.length == 0){
			domMenu = ['<li class="hs_first_li2 hs_menu_add_click hs_add_child_menu hs_menu_add_father" style="width:274px;">',
						'<span style="text-align: center;font-size: 20px;">',
						'<span style=";font-weight: bold;" class="glyphicon glyphicon-plus" aria-hidden="true">',
						'</span>添加菜单</span>',
						'</li>',
						];
		}
		if (buttons.length == 1) {
			var subbutton = buttons[0].sub_button;
			var subbuts = buttons[0].sub_button.length;
			if (subbuts == 0) {
				domMenu.push('<li sort="' + buttons[0].sort + '" id="' + buttons[0].id + '" class="hs_father_menu"> <span>' + buttons[0].name + '</span></li>');

			} else {
				var childMenu = ['<div class="hs_menu_child_three  hs_menu_child_relative">',
					'<ul class="hs_sub_pre_menu_list">'
				];
				domMenu = ['<li id="' + buttons[0].id + '" class="hs_father_menu"> <span>' + buttons[0].name + '</span>',
					'<div class="hs_menu_child_three  hs_menu_child_relative">',
					'<ul class="hs_sub_pre_menu_list"><li class="hs_add_child_menu">菜单名称</li>',
					'<li class="hs_add_child_menu"><i class="hs_icon14_menu_add"></i></li>',
					'</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div>',
					'</li>',
					'<li class="hs_father_menu hs_menu_add_father"><i class="hs_icon14_menu_add"></i></li>'
				];
				for (var x = 0; x < subbuts; x++) {
					childMenu.push('<li class="hs_add_child_menu">' + subbutton[x].name + '</li>');
				}
				childMenu.push(['</ul> <i class="hs_arrow hs_arrow_out"></i>',
					'<i class="hs_arrow hs_arrow_in"></i>',
					'</div>',
					'</li>',
				].join(""));
				domMenu.push(childMenu.join(""));
				domMenu.push('<li class="hs_father_menu_all hs_menu_add_father hs_menu_add_last"><i class="hs_icon14_menu_add"></i></li>');
				$('.hs_pre_menu_list').empty();
				$('.hs_pre_menu_list').append(domMenu.join(""));
			}
			domMenu.push('<li class="hs_father_menu hs_menu_add_father"><i class="hs_icon14_menu_add"></i></li>');
		} else {
			//循环创建子菜单
			for (var i = 0; i < buttons.length; i++) {
				var subbut = buttons[i].sub_button;
				if (subbut.length == 0) {
					if (i == 0) {
						domMenu.push('<li sort="' + buttons[i].sort + '" id="' + buttons[i].id + '" class="hs_father_menu_all hs_father_menu_active"> <span>' + buttons[0].name + '</span>');
						domMenu.push('<div f_id="'+buttons[i].id +'"  class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative">');
						domMenu.push('<ul class="hs_sub_pre_menu_list">');
						domMenu.push('<li f_id="'+buttons[i].id +'" class="hs_add_child_menu  hs_icon_add_child_menu"><i class="hs_icon14_menu_add "></i></li>');
						domMenu.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div></li>');
					} else {
						domMenu.push('<li sort="' + buttons[i].sort + '" id="' + buttons[i].id + '" class="hs_father_menu_all"> <span>' + buttons[0].name + '</span></li>');
					}
				} else {
					if(i == 0){
						var childMenu = [];
						for(x in subbut){
							childMenu.push('<li f_id="'+buttons[i].id+'" sort="'+subbut[x].sort+'" id="'+subbut[x].id+'" class="hs_add_child_menu">' + subbut[x].name + '</li>');
						}
						domMenu.push('<li sort="' + buttons[i].sort + '" id="' + buttons[i].id + '" class="hs_father_menu_all hs_father_menu_active"> <span>' + buttons[0].name + '</span>');
						domMenu.push('<div f_id="'+buttons[i].id +'"  class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative">');
						domMenu.push('<ul class="hs_sub_pre_menu_list">');
						domMenu.push(childMenu.join(""));
						domMenu.push('<li class="hs_add_child_menu  hs_icon_add_child_menu"><i class="hs_icon14_menu_add "></i></li>');
						domMenu.push('</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div>');
					}else{
						domMenu.push('<li sort="' + buttons[i].sort + '" id="' + buttons[i].id + '" class="hs_father_menu_all"> <span>' + buttons[0].name + '</span></li>');
					}
				}
			}
			if (buttons.length == 2) {
				domMenu.push('<li class="hs_father_menu_all hs_menu_add_father"><i class="hs_icon14_menu_add"></i></li>');
			}
		}
		$('.hs_pre_menu_list').html(domMenu.join(""));
	}

	/**
	 * 切换菜单类型，消息或者链接 
	 */
	$('input[name=menu_type]').on('click', function() {

		var obj = $(this);
		if (obj.val() == '0') {
			$('.hs_menu_weburl').addClass('hs_menu_hidden');
			$('.hs_menu_message_content').removeClass('hs_menu_hidden');
		} else if (obj.val() == '1') {
			$('.hs_menu_weburl').removeClass('hs_menu_hidden');
			$('.hs_menu_message_content').addClass('hs_menu_hidden');
		}
	});

	/**
	 * 一级菜单添加事件
	 */
	$(document).on('click', '.hs_menu_add_father',function() {
		var time = new Date().getTime();
		var length = menu.menu.button.length;
		var sort = length+1;//要添加菜单的当前排序号

		domMenu = ['<li id="' + time + '" class="hs_father_menu hs_father_menu_active"> <span>' + '菜单名称' + '</span>',
					'<div class="hs_menu_child_three  hs_menu_child_relative_one">',
					'<ul class="hs_sub_pre_menu_list">',
					'<li class="hs_add_child_menu" style="width: 135px;"><i class="hs_icon14_menu_add"></i></li>',
					'</ul><i class="hs_arrow hs_arrow_out"></i><i class="hs_arrow hs_arrow_in"></i></div>',
					'</li>',
					'<li class="hs_father_menu hs_menu_add_father"><i class="hs_icon14_menu_add"></i></li>'];
		menuItem = {
			"id": time,
			"type": "",
			"sort": sort,
			"name": "菜单名称",
			"key": "",
			"sub_button": []
		};
		$('#hs_pre_menu_list').html(domMenu.join(""));
		$('.hs_menu_name_input').val('菜单名称');
		$('#menu_id').val(time);
	});

	/**
	 * 同步编辑数据
	 */
	$(document).on('keyup','input[name=hs_menu_name_input]',function(){
		var obj = $(this);
		$('#hs_menu_form_area h4').html(obj.val());
		var menu_id = $('#menu_id').val();
		$('#'+menu_id).find('span').html(obj.val());
	});

	///**
	// * 保存微信菜单
	// */
	$(document).on('click','.hs_save_btn',function(){

		var data = {};
		data.id = $('#menu_id').val();
		data.sort = 1;
		data.name = $('input[name=hs_menu_name_input]').val();
		data.pid = $('#menu_f_id').val();
        //post提交菜单数据
		$.post('/admin/mpbase/addselfmenu',data,function(res){

		})
	});

	/**
	 * 添加二级菜单 
	 */
	$(document).on('click', '.hs_icon_add_child_menu', function(e) {
		
		var obj = $(this);
		var menu = readJSON();//获取所有菜单数据结构
		var sort = 0;         //新建的二级菜单排序字段
		var time = new Date().getTime();
			
		for(x in menu.menu.button){
			if(menu.menu.button[x].id == obj.attr('f_id')){
				sort = menu.menu.button[x].sub_button.length+1;
				var item = {
							    "id" :time,
				                "type": "",
				                "sort": sort,
				                "name": "子菜单名称",
				                "key": ""
				           };
				menu.menu.button[x].sub_button.push(item);
				break;
			}
		}
		saveJSON(menu);
		createMenu();
		e.stopPropagation();
	});
	
	/**
	  * 选中切换到子菜单 
	  */
	$(document).on('click','.hs_add_child_menu',function(e){
		
		e.stopPropagation();
	});

	/**
	 * 一级菜单切换事件监听
	 */
	$(document).on('click', '#hs_pre_menu_list>li:not(.hs_menu_add_father)', function(){
		 
		var menu = readJSON();
		var obj = $(this);
		if(menu.menu.button.length == 0){
			return;
		}else{
			var sort = obj.attr('sort');
			$('#hs_pre_menu_list>li').removeClass('hs_father_menu_active');
			$('#hs_pre_menu_list>li div').remove()
			obj.addClass('hs_father_menu_active');
			var divd = obj.find('div');
			divd.addClass('hs_menu_child_relative');
			$('#menu_id').val(obj.attr('id'));
			$('#hs_menu_form_area .hs_menu_name_input').val(obj.find('span').text());
			var d = showChildMenu(sort);
			obj.append(d);
		}
	});
	
	 

	/**
	 * show点击一级菜单的所有二级菜单 
	 * @param {Object} sort
	 */
	function showChildMenu(sort) {

		var button; 
		var menu = readJSON().menu.button;
		for (x in menu) {
			if (menu[x].sort == sort) {
				button = menu[x];
			}
		}
		return buildChildMenuDom(button, menu);
	}

	/**
	 * 构建二级菜单DOM结构
	 * @param {Object} button
	 */
	function buildChildMenuDom(button, buttons) {

		console.log(button);
		var dom = [];
		var subbuts = button.sub_button;
		
		//没有子菜单的情况
		if (subbuts.length == 0) {
			if (buttons.length < 2) {
				dom = ['<div f_id="'+button.id+'" class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative_one">',
					'<ul class="hs_sub_pre_menu_list"><li  class="hs_add_child_menu" style="width:135px;">',
					'<i class="hs_icon14_menu_add"></i></li></ul>',
					'<i class="hs_arrow hs_arrow_out"></i>',
					'<i class="hs_arrow hs_arrow_in"></i></div>'
				].join("");
			} else {
				dom = ['<div f_id="'+button.id+'" class="hs_menu_child_three hs_child_menu_module hs_menu_child_relative">',
					'<ul class="hs_sub_pre_menu_list"><li  class="hs_add_child_menu">',
					'<i class="hs_icon14_menu_add"></i></li></ul>',
					'<i class="hs_arrow hs_arrow_out"></i>',
					'<i class="hs_arrow hs_arrow_in"></i></div>'
				].join("");
			}
		}else {
        	var childMenu = [];
			for(x in subbuts){
				childMenu.push('<li f_id="'+button.id+'" sort="'+subbuts[x].sort+'" id="'+subbuts[x].id+'" class="hs_add_child_menu">' + subbuts[x].name + '</li>');
			}
			dom.push('<div f_id="'+button.id+'" class="hs_menu_child_three hs_child_menu_module  hs_menu_child_relative">');
			dom.push('<ul class="hs_sub_pre_menu_list">');
			dom.push(childMenu.join(""));
			dom.push('<li  class="hs_add_child_menu"><i class="hs_icon14_menu_add"></i></li></ul>');
			dom.push('<i class="hs_arrow hs_arrow_out"></i>');
			dom.push('<i class="hs_arrow hs_arrow_in"></i></div>')
		}
		return dom;
	}

	/**
	 * 删除微信菜单
    */
	$(document).on('click', '.hs_del_menu_link', function() {

		alert('确定删除！');
		var menuid = $('#menu_id').val();
		var menu = readJSON();
		for (x in menu.menu.button) {
			if (menu.menu.button[x].id == menuid) {
				menu.menu.button.splice(x, 1);
				break;
			}
		}
		for(var x=0;x<menu.menu.button.length;x++){
			menu.menu.button[x].sort = (x+1);
		}
		saveJSON(menu);
		createMenu();
	});
})
