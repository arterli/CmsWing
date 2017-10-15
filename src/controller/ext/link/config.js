module.exports = {
  ext: 'link', // 插件目录，必须为英文
  name: '友情链接', // 插件名称
  description: '开发团队成员信息', // 插件描述
  isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
  isindex: 1, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
  version: '1.0', // 版本号
  author: 'CmsWing', // 作者
  table: ['link'], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: 'link.sql', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['homeEnd'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '友情链接设置': [
        {
          'name': 'title',
          'label': '显示标题:',
          'type': 'text',
          'value': '友情链接'
        },
        {
          'name': 'ispost',
          'label': '是否允许申请:',
          'type': 'radio',
          'options': {'1': '允许', '0': '不允许'},
          'value': '1'
        }
      ]
    }
  ]
};
