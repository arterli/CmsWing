
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysRole = app.model.define('sys_role', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '角色名称' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
    desc: { type: DataTypes.STRING, comment: '角色说明' },
    r_uuids: { type: DataTypes.TEXT, comment: '路由节点' },
    g_uuids: { type: DataTypes.TEXT, comment: 'graphql节点' },
    state: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '状态' },
  }, {
    indexes: [{ unique: true, fields: [ 'uuid' ] }],
    paranoid: false,
  });

  SysRole.sync({ alter: true });
  return SysRole;
};
