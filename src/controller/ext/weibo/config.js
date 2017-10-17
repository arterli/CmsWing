module.exports = {
  ext: 'weibo', // 插件目录，必须为英文
  name: '新浪微博登录', // 插件名称
  description: '新浪微博登录', // 插件描述
  isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
  version: '1.0', // 版本号
  author: 'CmsWing', // 作者
  table: ['weibo'], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: 'weibo.sql', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['logins'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '新浪微博登录设置': [
        {
          'name': 'appkey',
          'label': 'App Key:',
          'type': 'text',
          'value': '3868482864',
          'html': '在微博开放平台申请到的 App Key ,填写到此处'
        },
        {
          'name': 'appsecre',
          'label': 'App Secre:',
          'type': 'text',
          'value': 'ec0c3346d244d91c6e0189b4448fb326',
          'html': `在微博开放平台申请到的 App Secret ,填写到此处
                        <div class="line line-lg"></div>
                        <h4>申请地址</h4>
                        <pre>http://open.weibo.com/</pre>
                        <div class="post-sum">
                            <p>申请时选择 微链接-&gt;网站接入，申请完成后会得到 App Key 和 App Secret，对应填写到插件配置中。</p>
                        </div>
                        <h4>授权回调页</h4>
                        <pre>http(s)://host/ext/weibo/index/index</pre>
                        <div class="post-sum">
                            <p>例如：你的网站是 http 就填 <code>http://www.cmswing.com/ext/weibo/index/index</code> 否则就是 <code>https://www.cmswing.com/ext/weibo/index/index</code>，www.cmswing.com 替换成你的网站域名，请认真按照实例填写，填错会通信失败！</p>
                        </div>
                        <div class="post-sum">
                            <p>首次填写在 网站信息-&gt;高级信息 里面，如果找不到填写的地方可到 授权管理-&gt;授权机制 里面查看。</p>
                        </div>
                        <h4>取消授权回调页</h4>
                        <pre>http(s)://host/ext/weibo/index/out</pre>
                        <div class="post-sum">
                            <p>例如：你的网站是 http 就填 <code>http://www.cmswing.com/ext/weibo/index/out</code> 否则就是 <code>https://www.cmswing.com/ext/weibo/index/out</code>，www.cmswing.com 替换成你的网站域名，请认真按照实例填写，填错会通信失败！</p>
                        </div>
                        <div class="post-sum">
                            <p>首次填写在 网站信息-&gt;高级信息 里面，如果找不到填写的地方可到 授权管理-&gt;授权机制 里面查看。</p>
                        </div>`
        }
      ]
    }
  ]
};
