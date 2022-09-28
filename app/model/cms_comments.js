
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsComments = app.model.define('cms_comments', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    content: { type: DataTypes.TEXT, comment: '内容' },
    member_uuid: { type: DataTypes.UUID, comment: '用户关联uuid' },
    doc_id: { type: DataTypes.INTEGER, comment: '文档关联id' },
  },{
  indexes:[{"unique":false,"fields":["doc_id"]},{"unique":false,"fields":["member_uuid"]}],
  paranoid: false,
});
  CmsComments.associate = function() {
       app.model.McMember.hasMany(app.model.CmsComments, {
            foreignKey: 'member_uuid',
            sourceKey: 'uuid',
            constraints: false,
          });
           app.model.CmsComments.belongsTo(app.model.McMember, {
            foreignKey: 'member_uuid',
            targetKey: 'uuid',
            constraints: false,
          });
          app.model.CmsDoc.hasMany(app.model.CmsComments, {
            foreignKey: 'doc_id',
            sourceKey: 'id',
            constraints: false,
          });
           app.model.CmsComments.belongsTo(app.model.CmsDoc, {
            foreignKey: 'doc_id',
            targetKey: 'id',
            constraints: false,
          });
          
      };
  //CmsComments.sync({ alter: true });
  return CmsComments;
};
