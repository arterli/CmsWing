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
        tj ()
        if(this.checked){
            $(".cart-tbody tbody >tr").addClass("warning")
        }else {
            $(".cart-tbody tbody >tr").removeClass("warning")
        }
    });
    var $subBox = $("input[name='ids']");
    $subBox.click(function(){
        $("#checkAll").prop("checked",$subBox.length == $("input[name='ids']:checked").length ? true : false);
        tj ()
        if(this.checked){
            $(this).parents("tr").addClass("warning")
        }else {

            $(this).parents("tr").removeClass("warning")
        }
    });
    //通缉选中个数
    function tj () {
        var checkd = $('input[name="ids"]');
        var i=0;
        var total=0;
        $.each(checkd,function (k, v) {
           var c =  $(v).prop("checked");
            if(c){
               i=i+1;
                total =total + Number($(v).parents("tr").find("td").eq(5).attr("data-price"));
            }
        })
       
        $("#num").html(i);
        $("#total").html(formatCurrency(total))
    }
});
function formatCurrency (num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    var cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+
            num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}