
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsDocPicture = app.model.define('cms_doc_picture', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    doc_id: { type: DataTypes.INTEGER, comment: '主表id' },
    content: { type: DataTypes.JSON, comment: '图片内容' },
    template: { type: DataTypes.STRING, comment: '详情页显示模板' },
  },{
  indexes:[{"unique":true,"fields":["doc_id"]}],
  paranoid: true,
});
  
  //CmsDocPicture.sync({ alter: true });
  return CmsDocPicture;
};
