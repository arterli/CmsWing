module.exports = {
  ext: 'videojj', // 插件目录，必须为英文
  name: 'videojj视频播放器', // 插件名称
  description: '用于显示一些服务器的信息', // 插件描述
  isadm: 0, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/sysinfo/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/sysinfo/index/index'
  version: '1.0', // 版本号
  author: 'CmsWing', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['videoPlayer'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: [
    {
      'video++设置': [
        {
          'name': 'appkey', // 配置在表单中的键名 ,这个会是this.config('title')
          'label': 'APPKey:', // 表单的文字
          'type': 'text', // 表单的类型：text、radio、select
          'value': 'VJa72yR7W', // 表单的默认值
          'html': '必填，请在控制台查看应用标识'
        },
        {
          'name': 'vnewsEnable',
          'label': '是否开启新闻推送',
          'type': 'radio',
          'options': {'1': '是', '0': '否'},
          'value': '1',
          'html': `是否开启新闻推送功能，默认为是
                        <h4>申请地址</h4>
                        <pre>http://videojj.com</pre>
                        <div class="post-sum">
                            <p>申请完成后会得到 APP Key，对应填写到插件配置中，播放器 可以在“控制台-&gt;项目看板-&gt;应用管理-&gt;播放器设置” &gt;进行设置。</p>
                        </div>`
        }
      ]
    }
  ]
};
