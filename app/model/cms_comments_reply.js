
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsCommentsReply = app.model.define('cms_comments_reply', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    content: { type: DataTypes.TEXT, comment: '回复内容' },
    comments_id: { type: DataTypes.INTEGER, comment: '评论关联id' },
    member_uuid: { type: DataTypes.UUID, comment: '用户关联uuid' },
  },{
  indexes:[{"unique":false,"fields":["comments_id"]},{"unique":false,"fields":["member_uuid"]}],
  paranoid: false,
});
  CmsCommentsReply.associate = function() {
       app.model.CmsComments.hasMany(app.model.CmsCommentsReply, {
            foreignKey: 'comments_id',
            sourceKey: 'id',
            constraints: false,
          });
           app.model.CmsCommentsReply.belongsTo(app.model.CmsComments, {
            foreignKey: 'comments_id',
            targetKey: 'id',
            constraints: false,
          });
          app.model.McMember.hasMany(app.model.CmsCommentsReply, {
            foreignKey: 'member_uuid',
            sourceKey: 'uuid',
            constraints: false,
          });
           app.model.CmsCommentsReply.belongsTo(app.model.McMember, {
            foreignKey: 'member_uuid',
            targetKey: 'uuid',
            constraints: false,
          });
          
      };
  //CmsCommentsReply.sync({ alter: true });
  return CmsCommentsReply;
};
