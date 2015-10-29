+function ($) { "use strict";

  $(function(){

  // datatable
  $('[data-ride="datatables"]').each(function() {
    var oTable = $(this).dataTable( {
      "bProcessing": true,
      "sAjaxSource": "js/datatables/datatable.json",
      "sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
      "sPaginationType": "full_numbers",
      "aoColumns": [
        { "mData": "engine" },
        { "mData": "browser" },
        { "mData": "platform" },
        { "mData": "version" },
        { "mData": "grade" }
      ]
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