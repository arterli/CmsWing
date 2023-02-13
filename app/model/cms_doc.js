
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsDoc = app.model.define('cms_doc', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    user_uuid: { type: DataTypes.UUID, comment: '作者uuid' },
    title: { type: DataTypes.STRING, comment: '内容标题' },
    classify_id: { type: DataTypes.INTEGER, defaultValue: 0, comment: '分类ID' },
    classify_sub: { type: DataTypes.JSON, comment: '子分类' },
    description: { type: DataTypes.STRING(1000), comment: '描述' },
    root: { type: DataTypes.INTEGER, defaultValue: 0, comment: '根节点' },
    pid: { type: DataTypes.INTEGER, defaultValue: 0, comment: '所属ID' },
    models_uuid: { type: DataTypes.UUID, comment: '模型UUID' },
    type: { type: DataTypes.INTEGER, defaultValue: 2, comment: '内容类型（1-目录，2-主题，3-段落）' },
    position: { type: DataTypes.STRING, comment: '推荐位(1-列表推荐，2-频道页推荐，4-首页推荐）' },
    ext_link: { type: DataTypes.STRING, comment: '如果填写链接,会跳转到这个链接,不填不跳转' },
    cover_url: { type: DataTypes.STRING, comment: '封面' },
    display: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '可见性' },
    deadline: { type: DataTypes.DATE, comment: '截止时间' },
    view: { type: DataTypes.INTEGER, defaultValue: 0, comment: '浏览量' },
    level: { type: DataTypes.INTEGER, defaultValue: 0, comment: '优先级（越高排序越靠前）' },
    status: { type: DataTypes.INTEGER, defaultValue: 1, comment: '数据状态（0-禁用，1-正常，2-待审核，3-草稿）' },
    template: { type: DataTypes.STRING, comment: '模版详情' },
    tags: { type: DataTypes.STRING, comment: '标签' },
    sort: { type: DataTypes.INTEGER, defaultValue: 0, comment: '排序同级有效越小越靠前' },
  },{
  indexes:[{"unique":false,"fields":["classify_id"]},{"unique":false,"fields":["pid"]},{"unique":false,"fields":["models_uuid"]}],
  paranoid: true,
});
  CmsDoc.associate = function() {
       app.model.CmsClassify.hasMany(app.model.CmsDoc, {
            foreignKey: 'classify_id',
            sourceKey: 'id',
            constraints: false,
          });
           app.model.CmsDoc.belongsTo(app.model.CmsClassify, {
            foreignKey: 'classify_id',
            targetKey: 'id',
            constraints: false,
          });
          app.model.CmsDoc.hasOne(app.model.CmsDocArticle, {
            foreignKey: 'doc_id',
            sourceKey: 'id',
            constraints: false,
          });
           app.model.CmsDocArticle.belongsTo(app.model.CmsDoc, {
            foreignKey: 'doc_id',
            targetKey: 'id',
            constraints: false,
          });
          app.model.CmsDoc.hasOne(app.model.CmsDocDownload, {
            foreignKey: 'doc_id',
            sourceKey: 'id',
            constraints: false,
          });
           app.model.CmsDocDownload.belongsTo(app.model.CmsDoc, {
            foreignKey: 'doc_id',
            targetKey: 'id',
            constraints: false,
          });
          app.model.CmsDoc.hasOne(app.model.CmsDocPicture, {
            foreignKey: 'doc_id',
            sourceKey: 'id',
            constraints: false,
          });
           app.model.CmsDocPicture.belongsTo(app.model.CmsDoc, {
            foreignKey: 'doc_id',
            targetKey: 'id',
            constraints: false,
          });
          app.model.SysUser.hasMany(app.model.CmsDoc, {
            foreignKey: 'user_uuid',
            sourceKey: 'uuid',
            constraints: false,
          });
           app.model.CmsDoc.belongsTo(app.model.SysUser, {
            foreignKey: 'user_uuid',
            targetKey: 'uuid',
            constraints: false,
          });
          
      };
  //CmsDoc.sync({ alter: true });
  return CmsDoc;
};
