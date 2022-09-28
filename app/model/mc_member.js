
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const McMember = app.model.define('mc_member', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    username: { type: DataTypes.STRING, comment: '用户名' },
    password: { type: DataTypes.STRING, comment: '密码' },
    email: { type: DataTypes.STRING, comment: '邮箱' },
    mobile: { type: DataTypes.STRING, comment: '手机' },
    state: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '状态' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'UUid' },
    third: { type: DataTypes.JSON, comment: '第三方扩展' },
    avatar: { type: DataTypes.STRING, comment: '头像' },
  },{
  indexes:[{"unique":true,"fields":["uuid"]}],
  paranoid: false,
});
  
  //McMember.sync({ alter: true });
  return McMember;
};
