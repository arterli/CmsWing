/*!
 * ======================================================
 * FeedBack Template For MUI (http://dev.dcloud.net.cn/mui)
 * =======================================================
 * @version:1.0.0
 * @author:cuihongbao@dcloud.io
 */
(function() {
	var index = 1;
	var starIndex = 0;
	var feedback = {
		question: document.getElementById('title'),
		contact: document.getElementById('detail'),
		submitBtn: document.getElementById('submit')
	};
	var url = $(".validate").attr("action");
	/**
	 *提交成功之后，恢复表单项
	 */
	feedback.clearForm = function() {
		feedback.question.value = '';
		feedback.contact.value = '';
	};

	// feedback.newPlaceholder();
	feedback.submitBtn.addEventListener('click', function(event) {
		if (feedback.question.value == '') {
			return mui.toast('信息填写不符合规范');
		}
		var data = $(".validate").serialize();
		mui.ajax(url,{
			data:data,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if(data.errno == 0){
					// mui.toast(data.data.name);
					// mui.back();
					mui.alert("发布成功，点击确定关闭","提示","确定",function () {
			          feedback.clearForm();
						mui.openWindow({url: data.data.url})
		               });
				}else {
					mui.toast(data.errmsg);
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				console.log(type);
			}
		});

	})
// 	feedback.send = function(content) {
// 		feedback.uploader = plus.uploader.createUpload(url, {
// 			method: 'POST'
// 		}, function(upload, status) {
// //			plus.nativeUI.closeWaiting()
// 			console.log("upload cb:"+upload.responseText);
// 			if(status==200){
// 				var data = JSON.parse(upload.responseText);
// 				//上传成功，重置表单
// 				if (data.ret === 0 && data.desc === 'Success') {
// //					mui.toast('反馈成功~')
// 					console.log("upload success");
// //					feedback.clearForm();
// 				}
// 			}else{
// 				console.log("upload fail");
// 			}
//
// 		});
// 		//添加上传数据
// 		mui.each(content, function(index, element) {
// 			if (index !== 'images') {
// 				console.log("addData:"+index+","+element);
// //				console.log(index);
// 				feedback.uploader.addData(index, element)
// 			}
// 		});
// 		//添加上传文件
// 		mui.each(feedback.files, function(index, element) {
// 			var f = feedback.files[index];
// 			console.log("addFile:"+JSON.stringify(f));
// 			feedback.uploader.addFile(f.path, {
// 				key: f.name
// 			});
// 		});
// 		//开始上传任务
// 		//feedback.uploader.start();
// 		mui.alert("感谢反馈，点击确定关闭","问题反馈","确定",function () {
// 			feedback.clearForm();
// 			mui.back();
// 		});
// //		plus.nativeUI.showWaiting();
// 	};
	
	 //应用评分
	 mui('.icons').on('tap','i',function(){
	  	var index = parseInt(this.getAttribute("data-index"));
	  	var parent = this.parentNode;
	  	var children = parent.children;
	  	if(this.classList.contains("mui-icon-star")){
	  		for(var i=0;i<index;i++){
  				children[i].classList.remove('mui-icon-star');
  				children[i].classList.add('mui-icon-star-filled');
	  		}
	  	}else{
	  		for (var i = index; i < 5; i++) {
	  			children[i].classList.add('mui-icon-star')
	  			children[i].classList.remove('mui-icon-star-filled')
	  		}
	  	}
	  	starIndex = index;
  });
  	//选择发帖/栏目和分组
	mui('.mui-popover').on('tap','li',function(e){
		var id = $(this).closest(".mui-popover").attr("id");
		var name = $(this).text();
		var value = $(this).attr('data-value');
		//mui.alert(id);
		$('a[href="#'+id+'"]').find("span").first().text(name);
		$('a[href="#'+id+'"]').find("input").val(value);
		var isajax = $('a[href="#'+id+'"]').hasClass("cate");
		if(isajax){
			$.ajax({
				url:"/mod/question/ajax/getgroups/?cid="+value,
				success:function (res) {
					if(res){
						var li ="";
						li += '<li class="mui-table-view-cell" data-value="0"><a href="javascript:;">不分组</a></li>';
						$.each(res,function (k,v) {
							li += '<li class="mui-table-view-cell" data-value="'+v.id+'"><a href="javascript:;">'+v.name+'</a></li>'
						})
						$("#group ul").html(li);
						//console.log(li);
						$('a[href="#group"]').show();
					}else {
						$('a[href="#group"]').hide();
						$('a[href="#group"]').find("input").val(0)
					}
				}
			})
		}
		//document.getElementById("question").value = document.getElementById("question").value + this.children[0].innerHTML;
	    mui('#'+id).popover('toggle')
	}) 
})();