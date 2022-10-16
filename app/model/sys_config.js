
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysConfig = app.model.define('sys_config', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '配置key' },
    label: { type: DataTypes.STRING, comment: '配置名称' },
    value: { type: DataTypes.JSON, comment: '配置value' },
  },{
  indexes:[{"unique":true,"fields":["name"]}],
  paranoid: false,
});
  
  //SysConfig.sync({ alter: true });
  return SysConfig;
};
