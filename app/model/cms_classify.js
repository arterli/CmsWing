
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsClassify = app.model.define('cms_classify', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '标识' },
    title: { type: DataTypes.STRING, comment: '标题' },
    pid: { type: DataTypes.INTEGER, defaultValue: 0, comment: '上级分类ID' },
    sort: { type: DataTypes.INTEGER, defaultValue: 0, comment: '排序（同级有效）' },
    list_row: { type: DataTypes.INTEGER, defaultValue: 15, comment: '列表每页行数' },
    meta_title: { type: DataTypes.STRING, comment: 'SEO的网页标题' },
    keywords: { type: DataTypes.STRING, comment: '关键字' },
    description: { type: DataTypes.STRING, comment: '描述' },
    template_index: { type: DataTypes.STRING, comment: '频道页模板' },
    template_lists: { type: DataTypes.STRING, comment: '列表页模板' },
    template_detail: { type: DataTypes.STRING, comment: '详情页模板' },
    models_uuid: { type: DataTypes.STRING, comment: '关联模型UUID' },
    type: { type: DataTypes.STRING, comment: '允许发布的内容类型' },
    allow_publish: { type: DataTypes.INTEGER, comment: '是否允许发布内容' },
    display: { type: DataTypes.INTEGER, comment: '可见性' },
    reply: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '是否允许回复' },
    check: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '发布的文章是否需要审核' },
    sub: { type: DataTypes.TEXT, comment: '子分类' },
    status: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '状态' },
    icon: { type: DataTypes.STRING, comment: '分类图片' },
  }, {

    paranoid: false,
  });

  // CmsClassify.sync({ alter: true });
  return CmsClassify;
};
