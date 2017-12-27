module.exports = {
  ext: 'attachment', // 插件目录，必须为英文
  name: '附件', // 插件名称
  description: '网站附件上传管理', // 插件描述
  isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/attachment/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/attachment/index/index'
  version: '1.1', // 版本号
  author: 'cmswing', // 作者
  table: ['attachment', 'attachment_file', 'attachment_pic'], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['homeUpPic', 'homeUpPics', 'homeUpFile', 'adminUpPic', 'adminUpPics', 'adminUpFile'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      '上传设置': [
        {
          'name': 'type', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': '上传类型:', // 表单的文字
          'type': 'select', // 表单的类型：text、radio、select,textarea
          'options': {'0': '本地上传', '2': '七牛上传(id:2)'},
          'value': '0', // 表单的默认值
          'html': '非本地上传，一定要配置下面的附件前缀'
        },
        {
          'name': 'pdn',
          'label': '附件前缀:',
          'type': 'textarea',
          'value': `2@https://odhs9iog7.qnssl.com/`,
          'html': `只针对外部储存，各式为<code>id@url</code>,多个回车换行`
        }
      ]
    },
    {
      '七牛配置': [
        {
          'name': 'qn_ak',
          'label': 'AK:',
          'type': 'text',
          'value': 'OJD9JCXudNtPwz_bKrtdnP2uTd5BVGvEJxaiUB24',
          'html': `七牛云储存 AccessKey`
        },
        {
          'name': 'qn_sk',
          'label': 'SK:',
          'type': 'text',
          'value': '_Dmewmycq994GcYxG4N3WvOX0ED-5eUeeXvoOYcE',
          'html': `七牛云储存 AccessKey`
        },
        {
          'name': 'qn_bucket',
          'label': '存储空间名称:',
          'type': 'text',
          'value': 'cmswing',
          'html': `在七牛后台创建的对象储存名称
                    <div class="line line-lg"></div>
                    <h4>申请地址</h4>
                    <pre>https://www.qiniu.com/</pre>
                    <div class="post-sum">
                        <p>申请完成后会得到 AccessKey/SecretKey，在 个人中心 &gt; 密钥管理 里面查看和修改。</p>
                    </div>`
        }
      ]
    },
    {
      '水印设置': [
        {
          'name': 'mark',
          'label': '图片:',
          'type': 'pic',
          'value': '960',
          'html': '水印图片'
        },
        {
          'name': 'right',
          'label': '右边距:',
          'type': 'text',
          'value': '10',
          'html': '只需要填写数字,列如:<code>10</code>'
        },
        {
          'name': 'bottom',
          'label': '下边距:',
          'type': 'text',
          'value': '10',
          'html': '只需要填写数字,列如:<code>10</code>'
        },
        {
          'name': 'left',
          'label': '最小左边距:',
          'type': 'text',
          'value': '100',
          'html': '只需要填写数字,列如:<code>100</code>'
        },
        {
          'name': 'top',
          'label': '最小上边距:',
          'type': 'text',
          'value': '100',
          'html': '只需要填写数字,列如:<code>100</code>'
        },
        {
          'name': 'state', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': '是否启用:', // 表单的文字
          'type': 'radio',
          'options': {'1': '启用', '0': '禁用'},
          'value': '0',
          'html': '选择启用后,符合条件的图片将会添加水印'
        }
      ]
    }
  ]
};
