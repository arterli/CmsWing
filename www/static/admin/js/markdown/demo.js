var opts = {
  basePath: '',
  theme: {
    base: '/static/admin/js/markdown/epiceditor.css',
    preview: '/static/admin/js/markdown/bartik.css',
    editor: '/static/admin/js/markdown/epic-light.css'
  }
}

var editor = new EpicEditor(opts).load();