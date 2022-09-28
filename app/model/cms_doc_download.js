
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsDocDownload = app.model.define('cms_doc_download', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    doc_id: { type: DataTypes.INTEGER, comment: '主表id' },
    content: { type: DataTypes.JSON, comment: '下载内容' },
    desc: { type: DataTypes.TEXT, comment: '下载介绍' },
  },{
  indexes:[{"unique":true,"fields":["doc_id"]}],
  paranoid: true,
});
  
  //CmsDocDownload.sync({ alter: true });
  return CmsDocDownload;
};
