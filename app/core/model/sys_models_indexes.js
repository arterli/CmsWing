
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysModelsIndexes = app.model.define('sys_models_indexes', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
    models_uuid: { type: DataTypes.UUID, comment: '关联模型uuid' },
    unique: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '唯一' },
    fields: { type: DataTypes.TEXT, comment: '索引字段' },
    sort: { type: DataTypes.INTEGER, comment: '排序' },
  }, {
    indexes: [{ unique: true, fields: [ 'uuid' ] }, { unique: false, fields: [ 'models_uuid' ] }],
    paranoid: false,
  });

  SysModelsIndexes.sync({ alter: true });
  return SysModelsIndexes;
};
