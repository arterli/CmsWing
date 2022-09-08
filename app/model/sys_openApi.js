
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysOpenApi = app.model.define('sys_openApi', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    open_uuids: { type: DataTypes.TEXT, comment: '开放接口节点' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
  },{
  indexes:[{"unique":true,"fields":["uuid"]}],
  paranoid: false,
});
  
  //SysOpenApi.sync({ alter: true });
  return SysOpenApi;
};
