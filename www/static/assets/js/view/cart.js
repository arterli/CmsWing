/**
 * Created by Arterli on 2016/4/10.
 */
jQuery(document).ready(function() {
    //表单验证
    $("form.form-cart").submit(function () {
       if($(this).serializeArray().length ==0){
           _toastr("至少选择一个商品!","top-right","error",false);
           return false;
       }

    })
    $("#checkAll").click(function() {
        $('input[name="ids"]').prop("checked",this.checked);
        if(this.checked){
            $(".cart-tbody tbody >tr").addClass("warning")
        }else {
            $(".cart-tbody tbody >tr").removeClass("warning")
        }
    });
    var $subBox = $("input[name='ids']");
    $subBox.click(function(){
        $("#checkAll").prop("checked",$subBox.length == $("input[name='ids']:checked").length ? true : false);
        if(this.checked){
            $(this).parents("tr").addClass("warning")
        }else {
            $(this).parents("tr").removeClass("warning")
        }
    });
    
});