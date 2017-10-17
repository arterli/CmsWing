module.exports = {
  ext: 'qq', // 插件目录，必须为英文
  name: 'QQ登录', // 插件名称
  description: 'QQ登录第三方登录', // 插件描述
  isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
  version: '1.0', // 版本号
  author: 'CmsWing', // 作者
  table: ['qq'], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: 'qq.sql', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['logins'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      'QQ登录设置': [
        {
          'name': 'appid',
          'label': 'appid:',
          'type': 'text',
          'value': '101309492'
        },
        {
          'name': 'appkey',
          'label': 'appkey:',
          'type': 'text',
          'value': '98c05261f58f2fe30478bb168d143113',
          'html': `<h4>申请地址</h4>
                        <pre>https://connect.qq.com/index.html</pre>
                        <div class="post-sum">
                            <p>申请完成后会得到 APP ID 和 APP Key，对应填写到插件配置中。</p>
                        </div>
                        <h4>网站回调域</h4>
                        <pre>http(s)://host/ext/qq/index/index</pre>
                        <div class="post-sum">
                            <p>例如：你的网站是 http 就填 <code>http://www.cmswing.com/ext/qq/index/index</code> 否则就是 <code>https://www.cmswing.com/ext/qq/index/index</code>，www.cmswing.com 替换成你的网站域名，请认真按照实例填写，填错会通信失败！</p>
                        </div>`
        }
      ]
    }
  ]
};
