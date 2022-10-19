/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const fs = require('fs-extra');
const path = require('path');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.remoteConfig = {
    async handler(ctx) {
      let data;
      try {
        data = await ctx.model.SysConfig.findAll();
      } catch (error) {
        const { RECORDS } = await fs.readJson(path.join(appInfo.baseDir, 'app/core/initData/sys_config.json'), { throws: false });
        data = RECORDS;
      }

      const cdata = {};
      for (const v of data) {
        if (v.name === 'egg') {
          for (const key in v.value) {
            if (Object.hasOwnProperty.call(v.value, key)) {
              cdata[key] = v.value[key];
            }
          }
        } else {
          cdata[v.name] = v.value;
        }
      }
      return cdata;
    },
  };
  // add your middleware config here
  config.middleware = [ 'graphql' ];
  config.multipart = {
    mode: 'file',
  };
  config.graphql = {
    router: '/graphql-dev',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    // 是否设置默认的Query和Mutation, 默认关闭
    defaultEmptySchema: false,
    // graphQL 路由前的拦截器
    async onPreGraphQL(ctx) { // console.log(ctx); return { a: 1 };
      const userInfo = ctx.helper.deToken(ctx.session.adminToken);
      if (!userInfo || !userInfo?.admin) {
        throw new Error('response status is not 200');
      }
    },
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    async onPreGraphiQL(ctx) {
      const userInfo = ctx.helper.deToken(ctx.session.adminToken);
      if (!userInfo || !userInfo?.admin) {
        ctx.redirect('/admin/login');
      }
      // ctx.redirect('/admin/login');
    },
    // apollo server的透传参数，参考[文档](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#parameters)
    // apolloServerOptions: {
    //   rootValue,
    //   formatError,
    //   formatResponse,
    //   mocks,
    //   schemaDirectives,
    //   introspection,
    //   playground,
    //   debug,
    //   validationRules,
    //   tracing,
    //   cacheControl,
    //   subscriptions,
    //   engine,
    //   persistedQueries,
    //   cors,
    // },
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.swaggerdoc = require('./swagger');
  config.sequelize = require('./sequelize');
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
