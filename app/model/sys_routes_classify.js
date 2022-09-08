
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysRoutesClassify = app.model.define('sys_routes_classify', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING(20), comment: '分类名称' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
    middleware: { type: DataTypes.STRING(1000), comment: '在 Router 里面可以配置多个 Middleware' },
    remarks: { type: DataTypes.STRING, comment: '备注' },
    sort: { type: DataTypes.INTEGER, defaultValue: 0, comment: '越小越靠前' },
    sys: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '是否系统' },
  },{
  indexes:[{"unique":true,"fields":["uuid"]}],
  paranoid: false,
});
  
  //SysRoutesClassify.sync({ alter: true });
  return SysRoutesClassify;
};
