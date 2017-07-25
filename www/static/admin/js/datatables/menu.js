
/**
 * Created by Arterli on 2015/11/8.
 */
"use strict";
var oTable;
$(function () {

    oTable = initTable();
    $('#register #btn').on('click', function () {
        $('#register').parsley().validate();
        if (true === $('#register').parsley().isValid()) {
            _addFun();
        }
        return false;
    });

});
// datatable
function initTable() {
    var table = $('[data-ride="datatables"]').DataTable({
        "bProcessing": true,
        "bDestory": true,
        "serverSide": true,
        "bFilter": false,
        "bSort": false,
        paging: false,
        "ordering": false,
        "info": false,
        "ajax":{
            "url":"/admin/menu/getlist",
        },

       "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
        "sPaginationType": "full_numbers",

        "aoColumnDefs": [
            {
                "mRender": function (data, type, row) {
                        return '<a href="javascript:void(0);" class="text-info-lter"  onclick="_getlist('+row.id+')">'+data+'</a>';

                }, "bSortable": false, "aTargets": [2]
            },
            {
                "mRender": function (data, type, row) {

                    if(data==1){
                        return '<a href="javascript:void(0);" class="active" data-toggle="class" onclick="_chsta(0,'+row.id+',2)"><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>';
                    }else{
                        return '<a href="javascript:void(0);" class="active" data-toggle="class" onclick="_chsta(1,'+row.id+',2)"><i class="fa fa-check text-success text"></i><i class="fa fa-times text-danger text-active"></i></a>';

                    }
                }, "bSortable": false, "aTargets": [7]
            },
            {
                "mRender": function (data, type, row) {
                    if(data==1){
                        return '<a href="javascript:void(0);" class="active" data-toggle="class" onclick="_chsta(0,'+row.id+',1)"><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>';
                    }else{
                        return '<a href="javascript:void(0);" class="active" data-toggle="class" onclick="_chsta(1,'+row.id+',1)"><i class="fa fa-check text-success text"></i><i class="fa fa-times text-danger text-active"></i></a>';

                    }
                }, "bSortable": false, "aTargets": [8]
            },
            {
                "mRender": function (data, type, row) {
                    var url1 = "/admin/menu/edit/?id=" + data;
                    //var url2 = "/admin/uuu/roledel/id/"+data;
                    return '<a class="btn btn-default btn-xs" data-bjax="" data-target="#bjax-target"  href=' + url1 + ' onclick="_editBn()">编辑</a> ' +
                        '<a class="btn btn-default btn-xs roledel" href="javascript:void(0);" onclick="_deleteFun(' + data + ')">删除</a>';
                }, "bSortable": false, "aTargets": [9]
            },
            {
                "mRender": function (data, type, row) {

                    return '<label class="checkbox m-n i-checks"><input type="checkbox" name="post[]"><i></i></label>';
                },
                'bSortable': false,
                "aTargets": [0]
            },

        ],
        "aoColumns": [
            {"mData": ""},
            {"mData": "id"},
            {"mData": "title"},
            {"mData": "up_title"},
            {"mData": "group"},
            {"mData": "url"},
            {"mData": "sort"},
            {"mData": "is_dev"},
            {"mData": "hide"},
            {"mData": "id"}
        ],
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 位会员，共 _TOTAL_ 位",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        }
    });
    return table;
};
/**
 * 获取子菜单
 */
function _getlist(pid){
    oTable.ajax.url( '/admin/menu/getlist/?pid='+pid ).load(function(e){
        if(e.breadcrumb){
            var nav = []
            var html;
            var n=e.breadcrumb.length;
            e.breadcrumb.forEach(function(v,k){
                if(k+1 == n){
                    html='<li class="active text-xs">'+v.title+'</li>'
                }else{
                    html='<li><a href="javascript:void(0);" onclick="_getlist('+v.id+')">'+v.title+'</a></li>'
                }

                nav.push(html);
            })
            }
        //console.log(nav.join(""));
       $('.breadcrumb').html('<li><a href="javascript:void(0);" onclick="_getlist(0)"><i class="fa fa-list-ul"></i> 菜单列表</a></li>'+nav.join(""));
    });
}
/**
 * 编辑数据
 * @private
 */
function _editBn() {
    $("#bjax-target").addClass("show");
}



/**
 * 删除
 * @param id
 * @private
 */
function _deleteFun(id) {
    swal({
            title: "你确定?",
            text: "你将要删除的数据不能恢复!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的!",
            cancelButtonText: "就不!",
            closeOnConfirm: false
        },
        function(){
    $.ajax({
        url: "/admin/menu/delete",
        data: {"id": id},
        type: "post",
        success: function (backdata) {
            if (backdata) {
                oTable.ajax.reload();
                swal("删除成功!", "该数据已经被删除.", "success");
            } else {
                alert("删除失败");
            }
        }, error: function (error) {
            console.log(error);
        }
    });
        });
}

/**
 * 重置表单
 */
function resetFrom() {
    $('form').each(function (index) {
        $('form')[index].reset();
    });
}
/**
 * 改变角色状态
 */
function _chsta(status,id,key){
    $.ajax({
        url:"/admin/menu/chsta",
        data:{status:status,id:id,key:key},
        success:function(res){
            if(res){
                oTable.ajax.reload();
                toastr.success('状态更新成功！')
            }else{
                toastr.error("状态更新失败！");
            }
        }
    })


}

/*
 add this plug in
 // you can call the below function to reload the table with current state
 Datatables刷新方法
 oTable.fnReloadAjax(oTable.fnSettings());
 */
$.fn.dataTableExt.oApi.fnReloadAjax = function (oSettings) {
//oSettings.sAjaxSource = sNewSource;
    this.fnClearTable(this);
    this.oApi._fnProcessingDisplay(oSettings, true);
    var that = this;

    $.getJSON(oSettings.sAjaxSource, null, function (json) {
        /* Got the data - add it to the table */
        for (var i = 0; i < json.aaData.length; i++) {
            that.oApi._fnAddData(oSettings, json.aaData[i]);
        }
        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        that.fnDraw(that);
        that.oApi._fnProcessingDisplay(oSettings, false);
    });
}

