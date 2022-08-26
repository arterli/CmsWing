/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1661321361697_9234';
  config.graphql = {
    router: '/graphql',
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
    },
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    async onPreGraphiQL(ctx) {
      console.log('ddddd', ctx.session.adminToken);
      const userInfo = ctx.helper.deToken(ctx.session.adminToken);
      console.log(userInfo);
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
  // add your middleware config here
  config.middleware = [ 'graphql' ];
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.multipart = {
    mode: 'file',
    fileExtensions: [
      '.xls',
      '.xlsx',
      '.pdf',
    ],
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.jsonp = {
    callback: 'jsonpCallback', // 识别 query 中的 `callback` 参数
    limit: 100, // 函数名最长为 100 个字符
  };
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET, PUT, POST, DELETE, PATCH',
  };
  config.swaggerdoc = require('./swagger');
  config.sequelize = require('./sequelize');
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  const uploadConfig = require('./upload.config');
  return {
    ...config,
    ...userConfig,
    ...uploadConfig,
  };
};
