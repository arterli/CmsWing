/* eslint-disable no-undef */
$(function() {
  $('input.class-sub-input').on('change', function() {
    classifyUpdate();
  });

  function classifyUpdate() {
    let url = '';
    const qarr = [];
    $('.classify-sub').each(function(i) {
      url = $(this).data('url');
      const inputs = $(this).find('input');
      const name = $(this).data('name');
      const idarr = [];
      $(inputs).each(function(m) {
        const checked = $(this).is(':checked');
        const val = $(this).val();
        if (checked) {
          idarr.push(val);
        }
      });
      if (idarr.length > 0) {
        qarr.push(`${name}-${idarr.join(',')}`);
      }
    });
    const query = qarr.length > 0 ? '?sub=' + qarr.join('|') : '';
    window.location.href = url + query;
  }
});
