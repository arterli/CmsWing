module.exports = {
  ext: 'dayu', // 插件目录，必须为英文
  name: '阿里大于', // 插件名称
  description: '阿里大于', // 插件描述
  isadm: 0, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
  version: '1.0', // 版本号
  author: 'CmsWing', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['smsRegistration'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '阿里大于设置': [
        {
          'name': 'appkey',
          'label': 'App Key:',
          'type': 'text',
          'value': '23381127',
          'html': `在阿里大于申请到的 App Key ,填写到此处`
        },
        {
          'name': 'appsecre',
          'label': 'App Secre:',
          'type': 'text',
          'value': 'f5e5c8900a4f29f15df438809cbff5252',
          'html': `在阿里大于申请到的 App Secret ,填写到此处。`
        },
        {
          'name': 'qianming',
          'label': '短信签名',
          'type': 'text',
          'value': '酷翼cms',
          'html': '在相应的短信后台获取<br>短信示例：【阿里大鱼】 验证码${number}，您正进行支付宝的身份验证，打死不告诉别人！ <br>短信签名：阿里大鱼 <br>短信模板: 验证码${number}，您正进行支付宝的身份验证，打死不告诉别人！'
        },
        {
          'name': 'product',
          'label': '变量${product}',
          'type': 'text',
          'value': 'CmsWing',
          'html': '设置模版的时候填入的值，会替换${product}'
        },
        {
          'name': 'zhuce',
          'label': '用户注册验证码模版ID',
          'type': 'text',
          'value': 'SMS_10281005',
          'html': `在短信渠道后台申请
                   实例：验证码\$\{code\}，您正在注册成为\$\{product\}用户，感谢您的支持！
                   <h4>申请地址</h4>
                   <pre>https://dayu.aliyun.com</pre>
                   <div class="post-sum">
                   <p>申请完成后会得到 App Key 和 App Secret，对应填写到插件配置中，在阿里大于后台 应用管理-&gt;应用列表-&gt;设置 查看。</p>
                   </div>`
        }
      ]
    }
  ]
};
