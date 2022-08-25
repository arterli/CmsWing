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

  // add your middleware config here
  config.middleware = [];
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
