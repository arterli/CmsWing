'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/admin', app.middleware.admin.authAdminToken(), controller.admin.index.index);
  router.get('/admin/login', controller.admin.index.login);
  router.get('/admin/pages/:name', app.middleware.admin.authAdminToken(), controller.admin.index.getJson);
  router.post('/admin/loginPost', controller.admin.index.lginPost);
  router.get('/admin/logout', app.middleware.admin.authAdminToken(), controller.admin.index.logout);
  router.get('/admin/sys/server/restart', app.middleware.admin.authAdminToken(), controller.admin.sys.server.restart);
};
