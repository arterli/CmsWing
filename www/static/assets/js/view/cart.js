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
    function steperhtml(step,ids,self) {
        if(step==0){
            return;
        }
        // console.log(step);
        // console.log(ids);
        $.ajax({
            url:"/center/cart/stepper",
            type:"POST",
            data:{qty:step,ids:ids},
            success:function (res) {
                if(res.errno == 0){
                    $(self).parents("tr").find("td").eq(5).attr("data-price",res.data.data.price)
                    $(self).parents("tr").find(".stepper-wrap").next().html('<span class="text-default">有货</span>')
                    $(self).parents("tr").find(".inform").html('');
                    $(self).parents("tr").find(".price").html(formatCurrency(res.data.data.price));
                    tj ();
                }else {
                    if(res.errmsg == "请先登录"){
                        $('[data-toggle="ajaxModal"]').eq(0).trigger("click");
                    }else {
                        $(self).parents("tr").find(".inform").html('<a class="btn btn-default btn-xs margin-bottom-6" href="#"> 到货通知 </a>');
                        $(self).parents("tr").find(".stepper-wrap").next().html('<span class="text-danger">无货</span>')
                    }
                    _toastr(res.errmsg,"top-right","error",false);
                }

            }
        })
    }
    //编辑数量
    $("input.stepper").change(function () {
        var step = $(this).val();
        var ids = $(this).parents("tr").find("input[name='ids']").val();
        steperhtml(step,ids,this)
    })
    $(document).on("click",".stepper-btn-wrap > a",function () {
        var step = $(this).parent().prev().val();
        var ids = $(this).parents("tr").find("input[name='ids']").val();
        steperhtml(step,ids,this)
    })

    //通缉选中个数
    function tj () {
        var checkd = $('input[name="ids"]');
        var total=0;
        var url=[];
        var nums = [];
        $.each(checkd,function (k, v) {
           var c =  $(v).prop("checked");
            if(c){
                nums.push($(v).parents("tr").find("input.stepper").val());
                total =total + Number($(v).parents("tr").find("td").eq(5).attr("data-price"));
                url.push($(v).parents("tr").find('input[name="ids"]').data("val"))
            }
        })
         url = url.join("<>");
        var href;
        if(url.length>0){
             href = "/center/cart/delcart/?ids="+url;
            $("a.delall").attr("href",href);
        }else {
             href = "/center/cart/delcart";
            $("a.delall").attr("href",href);
        }
        if(nums.length > 0){
            $(".nums").html(eval(nums.join("+")));
        }else {
            $(".nums").html(0);
        }

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