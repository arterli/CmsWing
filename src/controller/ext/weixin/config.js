module.exports = {
  ext: 'weixin', // 插件目录，必须为英文
  name: '微信扫码登录', // 插件名称
  description: '通过接入微信的开放平台来实现网站的扫码登录', // 插件描述
  isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/weixin/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/weixin/index/index'
  version: '1.0', // 版本号
  author: 'NickMa', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['logins'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '微信扫码登录设置': [
        {
          'name': 'appid', // 配置在表单中的键名 ,这个会是this.config('appid')
          'label': 'AppID:', // 表单的文字
          'type': 'text', // 表单的类型：text、radio、select
          'value': 'wx85ee8ad668c3d09b', // 表单的默认值
          'html': '填写在微信开放平台上获取的网站应用的AppID'
        },
        {
          'name': 'secret', // 配置在表单中的键名 ,这个会是this.config('secret')
          'label': 'AppSecret:', // 表单的文字
          'type': 'text', // 表单的类型：text、radio、select
          'value': '', // 表单的默认值
          'html': `<h4>申请地址</h4>
                    <pre>https://open.weixin.qq.com/</pre>
                    <div class="post-sum">
                        <p>申请完成后会得到 AppID 和 AppSecret，对应填写到插件配置中。</p>
                    </div>
                    <h4>授权回调URL</h4>
                    <pre>http(s)://host/ext/weixin/index/index</pre>
                    <div class="post-sum">
                        <p>例如：你的网站是 http 就填 <code>http://www.cmswing.com/ext/weixin/index/index</code> 否则就是 <code>https://www.cmswing.com/ext/weixin/index/index</code>，www.cmswing.com 替换成你的网站域名，请认真按照实例填写，填错会通信失败！</p>
                    </div>`
        }
      ]
    }
  ]
};