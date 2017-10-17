module.exports = {
  ext: 'geetest', // 插件目录，必须为英文
  name: '极验(geetest)', // 插件名称
  description: '极验(geetest)', // 插件描述
  isadm: 0, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/sysinfo/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/sysinfo/index/index'
  version: '1.0', // 版本号
  author: 'CmsWing', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['signinBefore', 'signinView', 'loginBefore', 'loginView'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '极验(geetest)设置': [
        {
          'name': 'id', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': 'ID:', // 表单的文字
          'type': 'text', // 表单的类型：text、radio、select
          'value': 'a0ccb2093b56b13431205fcd98bf2e77', // 表单的默认值
          'html': `在极验申请到的 ID ,填写到此处`
        },
        {
          'name': 'key',
          'label': 'KEY:',
          'type': 'text',
          'value': '80f1eea5c0fae877fc8270c946b6fb66',
          'html': `在极验申请到的 KEY ,填写到此处`
        },
        {
          'name': 'isl',
          'label': '前台登录验证:',
          'type': 'radio',
          'options': {'1': '开启', '0': '关闭'},
          'value': '1',
          'html': `是否开启、关闭前台登录验证码。`
        },
        {
          'name': 'isa',
          'label': '后台登录验证:',
          'type': 'radio',
          'options': {'1': '开启', '0': '关闭'},
          'value': '1',
          'html': `是否开启、关闭前台登录验证码。
          <h4>申请地址</h4>
                        <pre>http://www.geetest.com/</pre>
                        <div class="post-sum">
                            <p>申请完成后会得到 ID 和 KEY，对应填写到插件配置中。</p>
                        </div>`
        }
      ]
    }
  ]
};
