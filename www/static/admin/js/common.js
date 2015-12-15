/**
 * Created by arter on 2015/12/7.
 */

    //ajax get请求
/**
 * <a href="#" class="confirm ajax-get text-info">删除</a></td>
 *
 */


$('.ajax-get').click(function(){
    var target;
    var that = this;
    if ( $(this).hasClass('confirm') ) {
        if(!confirm('确认要执行该操作吗?')){
            return false;
        }
    }
    if ( (target = $(this).attr('href')) || (target = $(this).attr('url')) ) {
        $.get(target).success(function(data){

            if (data.errno==0) {
                if (data.data.url) {
                    toastr.success(data.data.name + ' 页面即将自动跳转~');
                }else{
                    toastr.success(data.data.name);
                }
                setTimeout(function(){
                    if (data.data.url) {
                        location.href=data.data.url;
                    }else if( $(that).hasClass('no-refresh')){
                        toastr.clear()
                    }else{
                        location.reload();
                    }
                },1000);
            }else{
                toastr.error(data.errmsg);
                setTimeout(function(){
                    if (data.data) {
                        location.href=data.data;
                    }else{
                        toastr.clear()
                    }
                },1000);
            }
        });

    }
    return false;
});



/**
 * ajax post submit请求
 * <form class = "form-horizontal">
 * <button target-form="form-horizontal" type="submit" class="ajax-post">确定</button>
 * confirm,
 */
$('.ajax-post').click(function(){

    var target,query,form;
    var target_form = $(this).attr('target-form');
    var that = this;
    var nead_confirm=false;
    if(($(this).attr('type')=='submit') || (target = $(this).attr('href')) || (target = $(this).attr('url')) ){
        form = $('.'+target_form);
        if ($(this).attr('hide-data') === 'true'){//无数据时也可以使用的功能
            form = $('.hide-data');
            query = form.serialize();
        }else if (form.get(0)==undefined){
            return false;
        }else if ( form.get(0).nodeName=='FORM' ){
            //表单验证
            $('[data-validate="parsley"]').parsley().validate();
            if(true !== $('[data-validate="parsley"]').parsley().isValid()){
                return false;
            }
            if ( $(this).hasClass('confirm') ) {
                if(!confirm('确认要执行该操作吗?')){
                    return false;
                }
            }
            if($(this).attr('url') !== undefined){
                target = $(this).attr('url');
            }else{
                target = form.get(0).action;
            }
            query = form.serialize();
        }else if( form.get(0).nodeName=='INPUT' || form.get(0).nodeName=='SELECT' || form.get(0).nodeName=='TEXTAREA') {

            form.each(function(k,v){
                if(v.type=='checkbox' && v.checked==true){

                    nead_confirm = true;
                }
            })
            if ( nead_confirm && $(this).hasClass('confirm') ) {
                if(!confirm('确认要执行该操作吗?')){
                    return false;
                }
            }
            query = form.serialize();
        }else{
            if ( $(this).hasClass('confirm') ) {
                if(!confirm('确认要执行该操作吗?')){
                    return false;
                }
            }
            query = form.find('input,select,textarea').serialize();
        }
        $(that).addClass('disabled').attr('autocomplete','off').prop('disabled',true);
        $.post(target,query).success(function(data){
            //console.log(data)
            //return false;
            if (data.errno==0) {
                if (data.data.url) {

                    toastr.success(data.data.name + ' 页面即将自动跳转~');
                }else{
                    toastr.success(data.data.info);
                }
                setTimeout(function(){
                    $(that).removeClass('disabled').prop('disabled',false);
                    if (data.data.url) {
                        location.href=data.data.url;
                    }else if( $(that).hasClass('no-refresh')){
                        toastr.clear()
                    }else{
                        location.reload();
                    }
                },1500);
            }else{
                console.log(data);
                toastr.error(data.errmsg);
                setTimeout(function(){
                    $(that).removeClass('disabled').prop('disabled',false);
                    if (data.data) {
                        location.href=data.data;
                    }else{
                        toastr.clear()
                    }
                },1500);
            }
        });
    }
    return false;
});