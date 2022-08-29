'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/admin', app.middleware.sys.authAdminToken(), controller.sys.index.index);
  router.get('/admin/login', controller.sys.index.login);
  router.get(/^\/admin\/pages\/(.*)$/, app.middleware.sys.authAdminToken(), controller.sys.index.getJson);
  router.post('/admin/loginPost', controller.sys.index.lginPost);
  router.get('/admin/logout', app.middleware.sys.authAdminToken(), controller.sys.index.logout);
  router.get('/admin/sys/server/restart', app.middleware.sys.authAdminToken(), controller.sys.server.restart);
};
