
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysNavigation = app.model.define('sys_navigation', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    pid: { type: DataTypes.INTEGER, defaultValue: 0, comment: '上级导航ID' },
    title: { type: DataTypes.STRING(30), comment: '导航标题' },
    url: { type: DataTypes.STRING, comment: '导航链接' },
    sort: { type: DataTypes.INTEGER, comment: '排序' },
    target: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '是否新窗口打开' },
    status: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '状态' },
    type: { type: DataTypes.STRING, comment: '位置类型' },
  },{
  indexes:[{"unique":false,"fields":["pid"]}],
  paranoid: false,
});
  
  //SysNavigation.sync({ alter: true });
  return SysNavigation;
};
