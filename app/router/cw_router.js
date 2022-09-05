'use strict';
module.exports = app => {
  app.router.post('更新字段', '/admin/sys/models/updateFields', app.middleware.sys.authAdminToken(), 'sys.models.updateFields');
  app.router.get('获取索引', '/admin/sys/models/indexes', app.middleware.sys.authAdminToken(), 'sys.models.indexes');
  app.router.post('更新索引', '/admin/sys/models/updateIndexes', app.middleware.sys.authAdminToken(), 'sys.models.updateIndexes');
  app.router.get('获取关联模型', '/admin/sys/models/associate', app.middleware.sys.authAdminToken(), 'sys.models.associate');
  app.router.post('更新关联模型', '/admin/sys/models/updateAssociate', app.middleware.sys.authAdminToken(), 'sys.models.updateAssociate');
  app.router.post('添加模型', '/admin/sys/models/addModels', app.middleware.sys.authAdminToken(), 'sys.models.addModels');
  app.router.get('路由列表', '/admin/sys/routes/routesList', app.middleware.sys.authAdminToken(), 'sys.routes.routesList');
  app.router.post('添加路由', '/admin/sys/routes/addRoutes', app.middleware.sys.authAdminToken(), 'sys.routes.addRoutes');
  app.router.post('编辑路由', '/admin/sys/routes/editRoutes', app.middleware.sys.authAdminToken(), 'sys.routes.editRoutes');
  app.router.get('删除路由', '/admin/sys/routes/delRoutes', app.middleware.sys.authAdminToken(), 'sys.routes.delRoutes');
  app.router.get('获取上级路由', '/admin/sys/routes/topRoutes', app.middleware.sys.authAdminToken(), 'sys.routes.topRoutes');

};
