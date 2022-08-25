'use strict';
module.exports = options => {
  return async function authAdminToken(ctx, next) {
    // 支持 options.exclude
    if (options && ctx.helper._.find(options.exclude, o => ctx.url.indexOf(o) !== -1)) return await next();
    const token = ctx.session.adminToken || ctx.get('token');
    const userInfo = ctx.helper.deToken(token);
    if (userInfo) {
      ctx.userInfo = userInfo;
      await next();
    } else {
      if (ctx.get('Content-Type')) {
        ctx.body = {
          status: 401,
          msg: '未登录',
          data: { isLogin: false },
        };
      } else {
        ctx.session.adminToken = null;
        ctx.redirect('/admin/login');
      }
    }

  };
};
