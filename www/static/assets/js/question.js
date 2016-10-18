/**
 * Created by Arterli on 2016/10/10.
 */
$(function () {
    if($("#detail").length>0){
        //载入编辑器
        var editor = new wangEditor('detail');
        // 上传图片
        editor.config.uploadImgUrl = '/uc/file/uploadpic/type/path';
        editor.config.uploadImgFileName = 'file';
        editor.create();
        editor.clear();
    }

    //tags
    $('#keywords').tagsInput({
        autocomplete_url:'/admin/public/getkeyword',
        autocomplete:{selectFirst:true,width:'100px',autoFill:true},
        width:'auto',
        height:'43px',
        defaultText:'add a tag',
    });
    //下啦组件改造
    var question_select = $(".question_select");
     var ul = $(".question_select .dropdown-menu")
    var li = $(".question_select .dropdown-menu>li");
    $(document).on("click",".question_select .dropdown-menu>li",function () {
        var v = $(this).attr("data-value");
        var n = $(this).text();
        console.log(v);
        $(this).parents(".question_select").find("span.name").text(n);
        $(this).parents(".question_select").find("input").val(v);
        var isajax = $(this).parents().is("#group");
        //alert(isajax);
        //alert(v)
        if(!isajax){
            $.ajax({
                url:"/mod/question/ajax/getgroups/cid/"+v,
                success:function (res) {
                    if(res){
                        var li ="";
                            li += '<li data-value="0"><a href="javascript:;">不分组</a></li>';
                        $.each(res,function (k,v) {
                            li += '<li data-value="'+v.id+'"><a href="javascript:;">'+v.name+'</a></li>'
                        })
                        $("#group ul").html(li);
                        //console.log(li);
                        $("#group").removeClass("hide");
                    }else {
                        $("#group").addClass("hide");
                        $("#group").find("input").val(0)
                    }
                }
            })
        }

    })

//回复
//     <li class="comment comment-reply">
//
//         <!-- avatar -->
//         <img class="avatar" src="/static/assets/images/demo/people/300x300/3-min.jpg" width="50" height="50" alt="avatar">
//
//         <!-- comment body -->
//     <div class="comment-body">
//         <a href="#" class="comment-author">
//         <small class="text-muted pull-right"> 4 分钟前 </small>
//     <span>二狗子</span>
//     </a>
//     <p>
//     足协原本的意思是让高洪波率队打完40强赛的比赛，然后再重新选择新帅。但因为高洪波率队出线，足协最终让高洪波继续执教。 <i class="fa fa-smile-o green"></i>
//         </p>
//         </div><!-- /comment body -->
//
//     <!-- options -->
//     <ul class="list-inline size-11 margin-top-10">
//         <li>
//         <a href="#" class="text-success"><i class="fa fa-thumbs-up"></i> 赞同</a>
//         </li>
//         <li class="pull-right">
//         <a href="#" class="text-danger">删除</a>
//         </li>
//         <li class="pull-right">
//         <a href="#" class="text-primary">编辑</a>
//         </li>
//         </ul><!-- /options -->
//
//         </li>
//
//         <li class="comment comment-reply">
//
//         <!-- avatar -->
//         <img class="avatar" src="/static/assets/images/demo/people/300x300/4-min.jpg" width="50" height="50" alt="avatar">
//
//         <!-- comment body -->
//     <div class="comment-body">
//         <a href="#" class="comment-author">
//         <small class="text-muted pull-right"> 一个月前 </small>
//         <span>Simona Doe</span>
//     </a>
//     <p>
//     足协原本的意思是让高洪波率队打完40强赛的比赛，然后再重新选择新帅。但因为高洪波率队出线，足协最终让高洪波继续执教。 <i class="fa fa-smile-o green"></i>
//         </p>
//         </div><!-- /comment body -->
//
//     <!-- options -->
//     <ul class="list-inline size-11 margin-top-10">
//         <li>
//         <a href="#" class="text-success"><i class="fa fa-thumbs-up"></i> 赞同</a>
//         </li>
//         <li class="pull-right">
//         <a href="#" class="text-danger">删除</a>
//         </li>
//         <li class="pull-right">
//         <a href="#" class="text-primary">编辑</a>
//         </li>
//         </ul><!-- /options -->
//
//         </li>
//         <li>
//         <div class="input-group">
//         <input id="btn-input" type="text" class="form-control" placeholder="Type your message...">
//         <span class="input-group-btn">
//         <button class="btn btn-primary" id="btn-chat">
//         <i class="fa fa-reply"></i> 评论
//         </button>
//         </span>
//         </div>
//         </li>
    function addhtml(id) {
        var rhtml = "";
        //ajax
        $.ajax({
            url:"/mod/question/ajax/ajaxanswercomments/answer_id/"+id,
            success:function (res) {
                var count = (res.data).length;
                if(count>0){
                    $.each(res.data,function (k,v) {
                        rhtml+='<li class="comment comment-reply">'+
                            '<img class="avatar" src="/uc/index/avatar/uid/'+v.uid+'" width="50" height="50" alt="avatar">'+
                            '<div class="comment-body">'+
                            '<a href="#" class="comment-author">'+
                            '<small class="text-muted pull-right">'+v.time+'</small>'+
                            '<span>'+v.username+'</span>'+
                            '</a>'+
                            '<p>'+v.message+'</p>'+
                            '</div>';
                                if(res.is_login){
                                    rhtml+=  '<ul class="list-inline size-11 margin-top-10">'+
                            '<li>'+
                            '<a href="#" class="text-info"><i class="fa fa-reply"></i> 回复</a>'+
                            '</li>';
                        if(res.is_login==v.uid){
                        rhtml+='<li class="pull-right">'+
                            '<a href="#" class="text-danger">删除</a>'+
                            '</li>';
                        }
                        rhtml+=  '</li></ul>';
                                }
                        rhtml+= '</li>';
                    })
                }else {
                    rhtml += '<div class="alert alert-mini alert-warning margin-bottom-10 text-center">'+
                        '暂无评论'+
                        '</div>';
                }
                if(res.is_login){
                    rhtml +=' <li>'+
                        '<div class="input-group">'+
                        '<input id="btn-input-'+id+'" type="text" class="form-control" placeholder="评论一下...">'+
                        '<span class="input-group-btn">'+
                        '<button class="btn btn-primary btn-chat" id="btn-chat-'+id+'" data-btn-id="'+id+'">'+
                        '<i class="fa fa-reply"></i> 评论'+
                        '</button>'+
                        '</span>'+
                        '</div>'+
                        '</li>';
                }

                $('#comment-reply-'+id).html(rhtml);
                $('#comment-reply-'+id).addClass("isopen");
                $("#count-"+id).text(count);
            }
        })
    }
    $(".comment-reply").on("click",function () {
        var rid = $(this).attr("data-comment");
        //alert(rid)
        var id = rid.split("-")[2];
        var isopen = $('#'+rid).is(".isopen");
        if(isopen){
            $('#'+rid).html("");
            $('#'+rid).removeClass("isopen")
        }else {

            addhtml(id)
        }

    })
    //提交评论
    $(document).on("click",'.btn-chat',function () {
        var id = $(this).attr("data-btn-id");
        var val = $("#btn-input-"+id).val();
        if(val.length==0){
            _toastr("评论不能为空!","top-right","error",false);
            return false;
        }
        $.ajax({
            type:"post",
            url:"/mod/question/ajax/ajaxanswercommentspost",
            data:{answer_id:id,message:val},
            success:function (data) {
                if (data.errno==0) {
                        _toastr(data.data.name,"top-right","success",false);
                        addhtml(id)
                }else{

                        _toastr(data.errmsg,"top-right","error",false);

                }
            }
        })
        //alert(id)
    })
});