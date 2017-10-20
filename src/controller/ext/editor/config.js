module.exports = {
  ext: 'editor', // 插件目录，必须为英文
  name: '编辑器', // 插件名称
  description: '用于增强整站长文本的输入和显示', // 插件描述
  isadm: 0, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/editor/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/editor/index/index'
  version: '1.0', // 版本号
  author: 'cmswing', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['adminEdit', 'homeEdit', 'pageHeader', 'pageFooter', 'pageContent'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '后台编辑器设置': [
        {
          'name': 'type', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': '编辑器类型:', // 表单的文字
          'type': 'select', // 表单的类型：text、radio、select
          'options': {'1': '普通文本', '2': '富文本', '3': 'Markdown'},
          'value': '2' // 表单的默认值
        },
        {
          'name': 'wysiwyg',
          'label': '富文本编辑器:',
          'type': 'select',
          'options': {'1': 'Ueditor(百度编辑器)', '2': 'wangEditor'},
          'value': '1',
          'html': '只有类型为<code>富文本</code>时才会生效。'
        },
        {
          'name': 'markdownpreview',
          'label': 'markdown预览:',
          'type': 'radio',
          'options': {'1': '开启', '0': '关闭'},
          'value': '1',
          'html': '启用后，双列同步预览,只有类型为<code>Markdown</code>时才会生效。'
        },
        {
          'name': 'height',
          'label': '编辑器高度',
          'type': 'text',
          'value': '500px'
        }
      ]
    }
  ]
};
