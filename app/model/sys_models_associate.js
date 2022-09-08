
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysModelsAssociate = app.model.define('sys_models_associate', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    type: { type: DataTypes.ENUM, values: ["HasOne","BelongsTo","HasMany","BelongsToMany"], comment: '关联类型' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
    models_uuid: { type: DataTypes.UUID, comment: 'models_uuid' },
    parent_uuid: { type: DataTypes.UUID, comment: '父表' },
    targetKey: { type: DataTypes.UUID, comment: '父键' },
    through_uuid: { type: DataTypes.UUID, comment: '中间表' },
    throughKey: { type: DataTypes.UUID, comment: '中间键' },
    child_uuid: { type: DataTypes.UUID, comment: '子表' },
    foreignKey: { type: DataTypes.UUID, comment: '子键' },
    constraints: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '约束' },
    sort: { type: DataTypes.INTEGER, defaultValue: 0, comment: '排序' },
  },{
  indexes:[{"unique":true,"fields":["uuid"]},{"unique":false,"fields":["models_uuid"]}],
  paranoid: false,
});
  
  //SysModelsAssociate.sync({ alter: true });
  return SysModelsAssociate;
};
