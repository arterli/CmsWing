/**
 * 独立模型配置
 *
 * @type {{}}
 */

module.exports = {
  ext: 'demo', // 模型目录，必须为英文
  name: '插件实例', // 插件名称
  description: '插件实例', // 插件描述
  isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/demo/admin/index'
  isindex: 1, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/demo/index/index'
  version: '1.0', // 版本号
  author: 'CmsWing', // 作者
  table: ['demo'], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: 'demo.sql', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: [], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      'demo设置': [
        {
          'name': 'shezhi1', // 配置在表单中的键名 ,这个会是this.config('ext.demo.shezhi1')
          'label': '设置1', // 表单文字
          'type': 'text', // 目前支持 text、radio、select
          'value': '设置1的值' // 表单的默认值
        },
        {
          'name': 'ispost',
          'label': '是否允许申请:',
          'type': 'radio',
          'options': {'1': '允许', '0': '不允许'}, // 设置项 type 为 radio和select 才会有
          'value': '1'
        },
        {
          'name': 'width',
          'label': '显示宽度:',
          'type': 'select',
          'options': {'1': '1格', '2': '2格', '4': '4格'},
          'value': '2'
        }
      ]
    }
  ]
};
