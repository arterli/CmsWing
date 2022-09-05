
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysRoutes = app.model.define('sys_routes', {
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, comment: 'uuid' },
    name: { type: DataTypes.STRING, comment: '名称' },
    path: { type: DataTypes.STRING, comment: '路由 URL 路径' },
    icon: { type: DataTypes.STRING, comment: '配置菜单的图标' },
    verb: { type: DataTypes.ENUM, values: ["head","options","get","put","post","patch","del","redirect","resources"], defaultValue: 'get', comment: '用户触发动作，支持 get，post 等所有 HTTP 方法' },
    middleware: { type: DataTypes.STRING, comment: '在 Router 里面可以配置多个 Middleware' },
    ignoreMiddleware: { type: DataTypes.STRING, comment: '排除模块统一设置的middleware' },
    controller: { type: DataTypes.STRING, comment: '控制器' },
    action: { type: DataTypes.STRING, comment: '控制器方法' },
    admin: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '控制器/页面' },
    role: { type: DataTypes.BOOLEAN, defaultValue: true, comment: '是否为角色权限节点' },
    class_uuid: { type: DataTypes.UUID, comment: '关联classify的uuid' },
    puuid: { type: DataTypes.UUID, comment: '路由父uuid' },
    sort: { type: DataTypes.INTEGER, defaultValue: 0, comment: '排序' },
    linkType: { type: DataTypes.ENUM, values: ["schemaApi","link"], defaultValue: 'schemaApi', comment: '链接类型' },
    link: { type: DataTypes.STRING, comment: '页面地址' },
  },{
  indexes:[{"unique":true,"fields":["uuid"]},{"unique":false,"fields":["puuid"]}],
  paranoid: false,
});
  SysRoutes.associate = function() {
        app.model.SysRoutes.belongsTo(app.model.SysRoutesClassify, {
            foreignKey: 'class_uuid',
            targetKey: 'uuid',
            constraints: false,
          });
          app.model.SysRoutesClassify.hasMany(app.model.SysRoutes, {
            foreignKey: 'class_uuid',
            sourceKey: 'uuid',
            constraints: false,
          });
          
      };
  SysRoutes.sync({ alter: true });
  return SysRoutes;
};
