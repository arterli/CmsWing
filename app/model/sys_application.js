
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysApplication = app.model.define('sys_application', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '应用标识' },
    title: { type: DataTypes.STRING, comment: '应用名称' },
    intro: { type: DataTypes.STRING, comment: '简介' },
    explain: { type: DataTypes.TEXT, comment: '说明' },
    author: { type: DataTypes.STRING, comment: '作者' },
    version: { type: DataTypes.STRING, comment: '版本' },
    sys: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '是否系统' },
  },{
  indexes:[{"unique":true,"fields":["name"]}],
  paranoid: false,
});
  
  //SysApplication.sync({ alter: true });
  return SysApplication;
};
