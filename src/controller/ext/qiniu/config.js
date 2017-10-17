module.exports = {
  ext: 'qiniu', // 插件目录，必须为英文
  name: '七牛云储存', // 插件名称
  description: '七牛云储存', // 插件描述
  isadm: 0, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/devteam/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/devteam/index/index'
  version: '1.0', // 版本号
  author: 'CmsWing', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: [], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '七牛云储存设置': [
        {
          'name': 'is',
          'label': '开启七牛云储存:',
          'type': 'radio',
          'options': {'1': '开启', '0': '关闭'},
          'value': '1',
          'html': `开启前先填写七牛的AccessKey/SecretKey，确保无误， <a href="http://www.qiniu.com/" target="_blank" class="text-info">申请地址</a></span>`
        },
        {
          'name': 'ak',
          'label': 'AK:',
          'type': 'text',
          'value': 'OJD9JCXudNtPwz_bKrtdnP2uTd5BVGvEJxaiUB24',
          'html': `七牛云储存 AccessKey`
        },
        {
          'name': 'sk',
          'label': 'SK:',
          'type': 'text',
          'value': '_Dmewmycq994GcYxG4N3WvOX0ED-5eUeeXvoOYcE',
          'html': `七牛云储存 AccessKey`
        },
        {
          'name': 'bucket',
          'label': '存储空间名称:',
          'type': 'text',
          'value': 'cmswing',
          'html': `在七牛后台创建的对象储存名称`
        },
        {
          'name': 'domain',
          'label': '存储空间名称:',
          'type': 'text',
          'value': 'odhs9iog7.qnssl.com',
          'html': `七牛空间域名如：7xt6v5.com1.z0.glb.clouddn.com 不带http(s)://
                        <div class="line line-lg"></div>
                        <h4>申请地址</h4>
                        <pre>https://www.qiniu.com/</pre>
                        <div class="post-sum">
                            <p>申请完成后会得到 AccessKey/SecretKey，在 个人中心 &gt; 密钥管理 里面查看和修改。</p>
                        </div>`
        }
      ]
    }
  ]
};
