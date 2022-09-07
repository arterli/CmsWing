
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysUser = app.model.define('sys_user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    username: { type: DataTypes.STRING, comment: '用户名' },
    password: { type: DataTypes.STRING, comment: '密码' },
    email: { type: DataTypes.STRING, comment: '邮箱' },
    mobile: { type: DataTypes.STRING, comment: '手机号' },
    state: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '状态false禁用true正常' },
    group_uuid: { type: DataTypes.UUID, comment: '组织id' },
    admin: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '系统管理员' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
  }, {
    indexes: [{ unique: false, fields: [ 'username' ] }, { unique: false, fields: [ 'group_uuid' ] }, { unique: true, fields: [ 'uuid' ] }],
    paranoid: true,
  });
  SysUser.associate = function() {
    app.model.SysUserGroup.hasMany(app.model.SysUser, {
      foreignKey: 'group_uuid',
      sourceKey: 'uuid',
      constraints: false,
    });
    app.model.SysUser.belongsTo(app.model.SysUserGroup, {
      foreignKey: 'group_uuid',
      targetKey: 'uuid',
      constraints: false,
    });

  };
  SysUser.sync({ alter: true });
  return SysUser;
};
