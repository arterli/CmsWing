'use strict';
module.exports = options => {
  return async function rbac(ctx, next) {
    // 支持 options.exclude
    if (options && ctx.helper._.find(options.exclude, o => ctx.url.indexOf(o) !== -1)) return await next();
    const name = new URL(`https://cmswing.com${ctx.url}`);
    // ctx.status = 401;
    const check = await ctx.service.sys.rbac.check(name.pathname, ctx.userInfo.uuid);
    if (!check) {
      ctx.body = {
        status: 403,
        msg: '对不起，您无权访问此页面。',
        data: {
          path: ctx.url,
        },
      };
    } else {
      await next();
    }
  };
};
