
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysModels = app.model.define('sys_models', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
    name: { type: DataTypes.STRING(50), comment: '模型名称' },
    desc: { type: DataTypes.STRING, comment: '模型说明' },
    oldName: { type: DataTypes.STRING(50), comment: '改变后的模型名称' },
    paranoid: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '偏执表' },
  }, {
    indexes: [{ unique: true, fields: [ 'uuid' ] }, { unique: false, fields: [ 'name' ] }],
    paranoid: false,
  });
  SysModels.associate = function() {
    app.model.SysModels.hasMany(app.model.SysModelsFields, {
      foreignKey: 'models_uuid',
      sourceKey: 'uuid',
      constraints: false,
    });
    app.model.SysModelsFields.belongsTo(app.model.SysModels, {
      foreignKey: 'models_uuid',
      targetKey: 'uuid',
      constraints: false,
    });
    app.model.SysModels.hasMany(app.model.SysModelsIndexes, {
      foreignKey: 'models_uuid',
      sourceKey: 'uuid',
      constraints: false,
    });
    app.model.SysModelsIndexes.belongsTo(app.model.SysModels, {
      foreignKey: 'models_uuid',
      targetKey: 'uuid',
      constraints: false,
    });
    app.model.SysModels.hasMany(app.model.SysModelsAssociate, {
      foreignKey: 'models_uuid',
      sourceKey: 'uuid',
      constraints: false,
    });
    app.model.SysModelsAssociate.belongsTo(app.model.SysModels, {
      foreignKey: 'models_uuid',
      targetKey: 'uuid',
      constraints: false,
    });

  };
  SysModels.sync({ alter: true });
  return SysModels;
};
