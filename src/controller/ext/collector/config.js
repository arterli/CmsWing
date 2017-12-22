module.exports = {
  ext: 'collector', // 插件目录，必须为英文
  name: '采集器', // 插件名称
  description: '采集数据入库接口', // 插件描述
  isadm: 1, // 是否有后台管理，1：有，0：没有，入口地址:'/ext/collector/admin/index'
  isindex: 0, // 是否需要前台访问，1：需要，0：不需要,入口地址:'/ext/collector/index/index'
  version: '1.0', // 版本号
  author: 'arterli', // 作者
  table: ['collector'], // 插件包含的 数据库表，不包含表前缀，如：cmswing_ext_table 就是 table，多个['table','table_2']没有留空数组。
  sql: '', // 插件安装的时候会找个名字的sql文件导入，默认 插件目录名.sql;
  hooks: [], // 挂载的钩子，数组格式，如['hooks1', 'hooks2'],不挂载留空：[]
  setting: []
};