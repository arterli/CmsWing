
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsDocArticle = app.model.define('cms_doc_article', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    doc_id: { type: DataTypes.INTEGER, comment: '主表id' },
    content: { type: DataTypes.TEXT, comment: '文章内容' },
  },{
  indexes:[{"unique":true,"fields":["doc_id"]}],
  paranoid: true,
});
  
  //CmsDocArticle.sync({ alter: true });
  return CmsDocArticle;
};
