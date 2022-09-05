'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysModelsAssociate = app.model.define('sys_models_associate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'id',
    },
    type: {
      type: DataTypes.ENUM('HasOne', 'BelongsTo', 'HasMany', 'BelongsToMany'),
      allowNull: false,
      comment: '类型',
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // 或 DataTypes.UUIDV1
    },
    models_uuid: {
      type: DataTypes.UUID,
    },
    parent_uuid: {
      type: DataTypes.UUID,
      comment: '父表',
    },
    through_uuid: {
      type: DataTypes.UUID,
      comment: '中间表',
    },
    child_uuid: {
      type: DataTypes.UUID,
      comment: '子表',
    },
    targetKey: {
      type: DataTypes.UUID,
      comment: '父键',
    },
    foreignKey: {
      type: DataTypes.UUID,
      comment: '子键',
    },
    throughKey: {
      type: DataTypes.UUID,
      comment: '中间键',
    },
    constraints: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '约束',
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
  SysModelsAssociate.sync({ alter: true });
  return SysModelsAssociate;
};
