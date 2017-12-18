module.exports = {
  ext: 'mark', // 插件目录，必须为英文
  name: '图片水印', // 插件名称
  description: '为图片添加水印', // 插件描述
  isadm: 0, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/amrk/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/amrk/index/index'
  version: '1.0', // 版本号
  author: '孙会鹏', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: [], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '水印设置': [
        {
          'name': 'mark',
          'label': '图片:',
          'type': 'pic',
          'value': '960',
          'html': '水印图片'
        },
        {
          'name': 'right',
          'label': '右边距:',
          'type': 'text',
          'value': '10',
          'html': '只需要填写数字,列如:<code>10</code>'
        },
        {
          'name': 'bottom',
          'label': '下边距:',
          'type': 'text',
          'value': '10',
          'html': '只需要填写数字,列如:<code>10</code>'
        },
        {
          'name': 'left',
          'label': '最小左边距:',
          'type': 'text',
          'value': '100',
          'html': '只需要填写数字,列如:<code>100</code>'
        },
        {
          'name': 'top',
          'label': '最小上边距:',
          'type': 'text',
          'value': '100',
          'html': '只需要填写数字,列如:<code>100</code>'
        },
        {
          'name': 'state', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': '是否启用:', // 表单的文字
          'type': 'radio',
          'options': {'1': '启用', '0': '禁用'},
          'value': '0',
          'html': '选择启用后,符合条件的图片将会添加水印'
        }
      ]
    }
  ]
};
