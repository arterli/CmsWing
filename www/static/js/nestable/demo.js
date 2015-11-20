$(document).ready(function()
{

    // activate Nestable for list 1
    $('#nestable1').nestable({
        group: 1
    });
    
    // activate Nestable for list 2
    $('#nestable2').nestable({
        group: 1
    });
    $('#nestable1').nestable().on('change', function(){
        var r = $('.dd').nestable('serialize');
        $("#xx").html(JSON.stringify(r));    //改变排序之后的数据
    });
    var $expand = false;
    $('#nestable-menu').on('click', function(e)
    {
        if ($expand) {
            $expand = false;
            $('.dd').nestable('expandAll');
        }else {
            $expand = true;
            $('.dd').nestable('collapseAll');
        }
    });

    $('#nestable3').nestable();

});