'use strict';
module.exports = options => {
  return async function authAdminToken(ctx, next) {
    // 支持 options.exclude
    if (options && ctx.helper.cw._.find(options.exclude, o => ctx.url.indexOf(o) !== -1)) return await next();
    const name = new URL(`https://cmswing.com${ctx.url}`);
    // ctx.status = 401;
    const check = await ctx.service.admin.cwRbac.check(name.pathname, ctx.userInfo.id);
    if (!check) {
      ctx.body = {
        timestamp: new Date().getTime(),
        status: 403,
        error: '对不起，您无权访问此页面。',
        message: '对不起，您无权访问此页面。',
        path: ctx.url,
      };
    } else {
      await next();
    }
  };
};
