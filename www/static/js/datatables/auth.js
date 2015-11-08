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
        var table =  $('[data-ride="datatables"]').dataTable({
            "bProcessing": true,
            "bDestory": true,
            "serverSide": true,
            "bFilter":false,
            "bSort": false,
            paging: false,
            "ordering": false,
            "info":     false,
            "ajax": "/admin/user/role",
           "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "sPaginationType": "full_numbers",

            "aoColumnDefs": [

                {
                    "mRender": function (data, type, row) {

                        return '<a href="#" class="active" data-toggle="class"><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>';
                    }, "bSortable": false, "aTargets": [4]
                },
                {
                    "mRender": function (data, type, row) {
                        var url1="/admin/user/roleedit/id/"+data;
                        //var url2 = "/admin/user/roledel/id/"+data;
                        return '<a class="btn btn-default btn-xs" data-bjax="" data-target="#bjax-target"  href='+url1+' onclick="_editBn()">编辑</a> ' +
                            '<a class="btn btn-default btn-xs roledel" href="javascript:void(0);" onclick="_deleteFun(' + data + ')">删除</a>';
                    }, "bSortable": false, "aTargets": [5]
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
                {"mData": "desc"},
                {"mData": "description"},
                {"mData": "id"},
                {"mData": "status"},
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
 * 编辑数据
 * @private
 */
function _editBn(){
    $("#bjax-target").removeClass("hide");
}
function _editFunAjax() {
alert(1)
    var id = $("#eid").val();
    var desc = $("#edesc").val();
    var description = $("#edescription").val();
    var jsonData = {
        "id": id,
        "desc": desc,
        "description": description
    };
    $.ajax({
        type: 'POST',
        url: '/admin/user/roleedit',
        data: jsonData,
        success: function (json) {
            if (json) {
                //$("#myModal").modal("hide");
                resetFrom();
                oTable.fnReloadAjax(oTable.fnSettings());
            } else {
                alert("更新失败");
            }
        }
    });
}

    function _addFun() {
        var jsonData = {
            'desc': $("#desc").val(),
            'description': $("#description").val(),
        };
       // alert(jsonData.description)
        $.ajax({
            url: "/admin/user/roleadd",
            data: jsonData,
            type: "post",
            success: function (backdata) {
                if (backdata == 1) {
                    //$("#myModal").modal("hide");
                    resetFrom();
                    oTable.fnReloadAjax(oTable.fnSettings());
                } else if (backdata == 0) {
                    alert("插入失败");
                } else {
                    alert("防止数据不断增长，会影响速度，请先删掉一些数据再做测试");
                }
            }, error: function (error) {
                console.log(error);
            }
        });
    }

    /**
     * 删除
     * @param id
     * @private
     */
    function _deleteFun(id) {

        $.ajax({
            url: "/admin/user/roledel",
            data: {"id": id},
            type: "post",
            success: function (backdata) {
                if (backdata) {
                    oTable.fnReloadAjax(oTable.fnSettings());
                } else {
                    alert("删除失败");
                }
            }, error: function (error) {
                console.log(error);
            }
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

