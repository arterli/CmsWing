'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysModelsIndexes = app.model.define('sys_models_indexes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // 或 DataTypes.UUIDV1
    },
    models_uuid: {
      type: DataTypes.UUID,
    },
    unique: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '唯一',
    },
    fields: {
      type: DataTypes.TEXT,
      comment: '字段列表',
    },
    sort: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '排序',
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
  SysModelsIndexes.sync({ alter: true });
  return SysModelsIndexes;
};
