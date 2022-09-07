
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysUserRole = app.model.define('sys_user_role', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    role_uuid: { type: DataTypes.UUID, comment: '角色uuid' },
    user_uuid: { type: DataTypes.UUID, comment: '用户uuid' },
  }, {
    indexes: [{ unique: false, fields: [ 'role_uuid' ] }, { unique: false, fields: [ 'user_uuid' ] }],
    paranoid: false,
  });
  SysUserRole.associate = function() {
    app.model.SysUser.belongsToMany(app.model.SysRole, {
      through: { model: app.model.SysUserRole, unique: false },
      foreignKey: 'user_uuid',
      sourceKey: 'uuid',
      targetKey: 'uuid',
      constraints: false,
    });
    app.model.SysRole.belongsToMany(app.model.SysUser, {
      through: { model: app.model.SysUserRole, unique: false },
      foreignKey: 'role_uuid',
      sourceKey: 'uuid',
      targetKey: 'uuid',
      constraints: false,
    });

  };
  SysUserRole.sync({ alter: true });
  return SysUserRole;
};
