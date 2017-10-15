module.exports = {
  ext: 'changyan', // 插件目录，必须为英文
  name: '搜狐畅言', // 插件名称
  description: '社会化评论系统', // 插件描述
  isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
  version: '1.0', // 版本号
  author: 'CmsWing', // 作者
  table: ['changyan'], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: 'changyan.sql', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['documentDetailAfter'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '搜狐畅言设置': [
        {
          'name': 'appid',
          'label': 'APP ID:',
          'type': 'text',
          'value': 'cysYegnR2',
          'html': `在畅言申请到的 APP ID ,填写到此处。`
        },
        {
          'name': 'appkey',
          'label': 'APP KEY:',
          'type': 'text',
          'value': 'b28eb67a3a8364878ee67d33c3febdce',
          'html': `在畅言申请到的 APP KEY ,填写到此处。
                        <h4>申请地址</h4>
                        <pre>http://changyan.kuaizhan.com</pre>
                        <div class="post-sum">
                            <p>申请完成后会得到 APP ID 和 APP Key，对应填写到插件配置中。</p>
                        </div>
                        <h4>登录行为/wap登陆页地址</h4>
                        <pre>http(s)://host/ext/changyan/index/signin</pre>
                        <div class="post-sum">
                            <p>例如：你的网站是 http 就填 <code>http://www.cmswing.com/ext/changyan/index/signin</code> 否则就是 <code>https://www.cmswing.com/ext/changyan/index/signin</code>，www.cmswing.com 替换成你的网站域名，请认真按照实例填写，填错会通信失败！</p>
                        </div>
                        <h4>获取用户信息接口URL</h4>
                        <pre>http(s)://host/ext/changyan/index/getuserinfo</pre>
                        <div class="post-sum">
                            <p>例如：你的网站是 http 就填 <code>http://www.cmswing.com/ext/changyan/index/getuserinfo</code> 否则就是 <code>https://www.cmswing.com/ext/changyan/index/getuserinfo</code>，www.cmswing.com 替换成你的网站域名，请认真按照实例填写，填错会通信失败！</p>
                        </div>
                        <h4>用户退出接口URL</h4>
                        <pre>http(s)://host/ext/changyan/index/logout</pre>
                        <div class="post-sum">
                            <p>例如：你的网站是 http 就填 <code>http://www.cmswing.com/ext/changyan/index/logout</code> 否则就是 <code>https://www.cmswing.com/ext/changyan/index/logout</code>，www.cmswing.com 替换成你的网站域名，请认真按照实例填写，填错会通信失败！</p>
                        </div>`
        }
      ]
    }
  ]
};
