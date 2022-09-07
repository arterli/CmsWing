
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysUserGroup = app.model.define('sys_user_group', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '分组名称' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
    desc: { type: DataTypes.STRING, comment: '分组说明' },
    puuid: { type: DataTypes.UUID, comment: '父uuid' },
    sort: { type: DataTypes.INTEGER, defaultValue: 0, comment: '排序' },
  },{
  indexes:[{"unique":true,"fields":["uuid"]},{"unique":false,"fields":["puuid"]}],
  paranoid: false,
});
  
  SysUserGroup.sync({ alter: true });
  return SysUserGroup;
};
