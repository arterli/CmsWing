module.exports = {
  ext: 'atlas', // 插件目录，必须为英文
  name: '图集', // 插件名称
  description: '用于图片模型多图上传', // 插件描述
  isadm: 0, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/atlas/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/atlas/index/index'
  version: '1.1', // 版本号
  author: 'cmswing', // 作者
  table: [], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: ['adminAtlas','homeAtlas'], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: []
};