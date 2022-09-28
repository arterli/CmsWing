/* eslint-disable no-undef */
$(function() {
  $('input.class-sub-input').on('change', function() {
    classifyUpdate();
  });

  function classifyUpdate() {
    let url = '';
    const qarr = [];
    $('.classify-sub').each(function(i) {
      // console.log(this)
      url = $(this).data('url');
      const inputs = $(this).find('input');
      const name = $(this).data('name');
      // console.log(inputs)
      const idarr = [];
      $(inputs).each(function(m) {
        const checked = $(this).is(':checked');
        const val = $(this).val();
        // console.log(checked)
        if (checked) {
          idarr.push(val);
        }
      });
      if (idarr.length > 0) {
        qarr.push(`${name}-${idarr.join(',')}`);
      }
    });
    const query = qarr.length > 0 ? '?sub=' + qarr.join('|') : '';
    // console.log(query)
    window.location.href = url + query;
  }
});
