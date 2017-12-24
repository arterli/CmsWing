module.exports = {
  ext: 'email', // 插件目录，必须为英文
  name: '邮件', // 插件名称
  description: '对邮件扩展的封装,如果有需要可自行,配置hook', // 插件描述
  isadm: 0, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/mail/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/mail/index/index'
  version: '1.0', // 版本号
  author: '孙会鹏', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: [], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '邮件设置': [
        {
          'name': 'host', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': '邮件服务器:', // 表单的文字
          'type': 'text', // 表单的类型：text、radio、select
          'value': 'admin@163.com', // 表单的默认值
          'html': '邮箱账号'
        },
        {
          'name': 'port', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': '端口:', // 表单的文字
          'type': 'text', // 表单的类型：text、radio、select
          'value': '587', // 表单的默认值
          'html': '邮箱账号'
        },
        {
          'name': 'user', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': '邮箱账号:', // 表单的文字
          'type': 'text', // 表单的类型：text、radio、select
          'value': 'admin@163.com', // 表单的默认值
          'html': '邮箱账号'
        },
        {
          'name': 'pass',
          'label': '授权码:',
          'type': 'pass',
          'value': 'pass',
          'html': '邮箱的授权码'
        }
      ]
    }
  ]
};