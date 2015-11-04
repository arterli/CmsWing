+function ($) { "use strict";

  $(function(){

  // datatable
  $('[data-ride="datatables"]').each(function() {
    var oTable = $(this).dataTable( {
      "bProcessing": true,
        "serverSide": true,
      //"ajax": "/static/js/datatables/datatable.json",
        "ajax": "/admin/user/userlist",
      "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
      "sPaginationType": "full_numbers",
        "order": [[ 1, "desc" ]],
        "aoColumnDefs": [
            { "mRender": function ( data, type, row ) {

                return "1";
            },"aTargets": [ 1 ] },
            { "mRender": function ( data, type, row ) {

                return '<a href="#" class="active" data-toggle="class"><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>';
            },"bSortable": false, "aTargets": [ 7 ] },
            { "mRender": function ( data, type, row ) {

                return '<a class="btn btn-default btn-xs" href="#">编辑</a> <a class="btn btn-default btn-xs" href="#">删除</a>';
            },"bSortable": false, "aTargets": [ 8 ] },
            {
                "mRender": function ( data, type, row ) {

                    return '<label class="checkbox m-n i-checks"><input type="checkbox" name="post[]"><i></i></label>';
                },
                'bSortable': false,
                "aTargets": [0 ]
            },
        ],
      "aoColumns": [
          { "mData": "" },
          { "mData": "" },
        { "mData": "engine" },
        { "mData": "browser" },
        { "mData": "platform" },
        { "mData": "version" },
        { "mData": "grade" },
          { "mData": "" },
          { "mData": "" }
      ],
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
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
    } );
  });

  $('#growthrate').length && $.ajax('js/datatables/growthrate.csv').done(function(re){
    var data = $.csv.toArrays(re);
      $('#growthrate').html( '<table cellpadding="0" cellspacing="0" border="0" class="table table-striped m-b-none" id="example"></table>' );
      $('#example').dataTable( {
          "aaData": data,    
          "bProcessing": true,
          "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
          "iDisplayLength": 50,
          "sPaginationType": "full_numbers",
          "aoColumnDefs": [              
              { "bSearchable": false, "bVisible": false, "aTargets": [ 1 ] },
              { "bVisible": false, "aTargets": [ 4 ] },
              {
                  "mRender": function ( data, type, row ) {
                      return data +' '+ '%';
                  },
                  "aTargets": [ 5 ]
              },
              {
                  "mRender": function ( data, type, row ) {

                      return '<i class="fa '+ (row[5] > 0 ? 'fa-sort-up text-success' : 'fa-sort-down text-danger')+'"></i>';
                  },
                  'bSortable': false,
                  "aTargets": [ 6 ]
              },
          ],
          "aoColumns": [
              { "sTitle": "Country or Area" },
              { "sTitle": "Subgroup" },
              { "sTitle": "Year" },
              { "sTitle": "source", "sClass": "center" },
              { "sTitle": "Unit", "sClass": "center" },
              { "sTitle": "Value", "sClass": "center" },
              { "sTitle": "", "sClass": "center" }
          ]
      } );  
  }); 




  });
}(window.jQuery);