'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysModelsFields = app.model.define('sys_models_fields', {
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
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '字段名',
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '字段说明说明',
    },
    type: {
      type: DataTypes.ENUM('STRING',
        'TEXT',
        'BOOLEAN',
        'INTEGER',
        'BIGINT',
        'FLOAT',
        'DOUBLE',
        'DECIMAL',
        'ENUM',
        'DATE',
        'DATEONLY',
        'UUID',
        'JSON'),
      allowNull: false,
      comment: '类型',
    },
    enumValue: {
      type: DataTypes.TEXT,
      comment: '枚举值',
    },
    uuidtype: {
      type: DataTypes.STRING(50),
      comment: 'uuid类型',
    },
    booleantype: {
      type: DataTypes.STRING(50),
      comment: 'BOOLEAN类型',
    },
    defaultValue: {
      type: DataTypes.STRING,
      comment: '默认值',
    },
    lengths: {
      type: DataTypes.INTEGER,
      comment: '长度',
    },
    point: {
      type: DataTypes.INTEGER,
      comment: '小数点',
    },
    primaryKey: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '主键',
    },
    defaulttonow: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '默认当前时间',
    },
    allowNull: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '必选',
    },
    where: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '查询',
    },
    add: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '增加',
    },
    edit: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '编辑',
    },
    autoIncrement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '自动递增',
    },
    unsigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '无符号',
    },
    zerofill: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '零填充',
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
  }, {
    indexes: [
      {
        unique: false,
        fields: [ 'name' ],
      },
      {
        unique: true,
        fields: [ 'uuid' ],
      },
    ],
    // paranoid: true,
  });

  SysModelsFields.sync({ alter: true });
  return SysModelsFields;
};
