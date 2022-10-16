
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsTemplate = app.model.define('cms_template', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '模板名称' },
    path: { type: DataTypes.STRING, comment: '模板目录' },
    author: { type: DataTypes.STRING, comment: '作者' },
    sys: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '系统模板' },
    isu: { type: DataTypes.BOOLEAN, defaultValue: false, comment: '正在使用' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
    version: { type: DataTypes.STRING, comment: '版本号' },
  }, {
    indexes: [{ unique: true, fields: [ 'uuid' ] }],
    paranoid: false,
  });
  CmsTemplate.associate = function() {
    app.model.CmsTemplate.hasMany(app.model.CmsTemplateList, {
      foreignKey: 'template_uuid',
      sourceKey: 'uuid',
      constraints: false,
    });
    app.model.CmsTemplateList.belongsTo(app.model.CmsTemplate, {
      foreignKey: 'template_uuid',
      targetKey: 'uuid',
      constraints: false,
    });

  };
  // CmsTemplate.sync({ alter: true });
  return CmsTemplate;
};
