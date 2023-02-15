'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 后台生成 web路由
  require('./router/cw_router')(app);
  const { router, controller } = app;
  router.get('/admin', app.middleware.sys.authAdminToken(), controller.sys.index.index);
  router.get('/admin/login', controller.sys.index.login);
  router.post('/admin/loginPost', controller.sys.index.lginPost);
  router.get('/admin/logout', app.middleware.sys.authAdminToken(), controller.sys.index.logout);
  router.post('/graphql', controller.sys.index.graphql);
  router.post('/graphql/:model', controller.sys.index.graphql);
  router.post('/upload', controller.sys.objectStorage.upload);
  router.post('/upload/:sessionKey', controller.sys.objectStorage.upload);
  router.get('/admin/sys/config/:name', app.middleware.sys.authAdminToken(), controller.sys.config.info);
  router.post('/admin/sys/config/:name/update', app.middleware.sys.authAdminToken(), controller.sys.config.edit);
  router.get(/^\/pages\/(.*)$/, app.middleware.sys.authAdminToken(), controller.sys.index.getJson);
  router.get('/admin/site.json', app.middleware.sys.authAdminToken(), controller.sys.index.site);
  router.get('/admin/sys/server/getMiddleware', app.middleware.sys.authAdminToken(), controller.sys.server.getMiddleware);
  router.get('/admin/sys/server/getController', app.middleware.sys.authAdminToken(), controller.sys.server.getController);
  router.get('/admin/sys/server/getAction', app.middleware.sys.authAdminToken(), controller.sys.server.getAction);
  router.get('/admin/sys/server/restart', app.middleware.sys.authAdminToken(), controller.sys.server.restart);
  router.get('/admin/sys/gitee', controller.sys.index.gitee);
  router.get('/admin/sys/sysInfo', controller.sys.index.sysInfo);
  router.get('/admin/sys/team', controller.sys.index.team);
  router.get('/cmswingceshi', controller.home.index);
};
