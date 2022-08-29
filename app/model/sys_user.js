'use strict';
const moment = require('moment');
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysUser = app.model.define('sys_user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    username: {
      type: DataTypes.STRING,
      comment: '用户名',
    },
    password: {
      type: DataTypes.STRING,
      comment: '密码',
    },
    email: {
      type: DataTypes.STRING,
      comment: '邮箱',
    },
    mobile: {
      type: DataTypes.STRING,
      comment: '手机号',
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '状态0禁用,1正常,-1删除',
    },
    org_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '组织id',
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '系统管理员',
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    paranoid: true,
  });
  // User.associate = function() {
  //   app.model.Admin.User.belongsTo(app.model.Admin.Org, { foreignKey: 'org_id', targetKey: 'id', constraints: false });
  // };
  SysUser.sync({ alter: true });
  return SysUser;
};
