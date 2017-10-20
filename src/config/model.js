/**
 * model adapter config
 * @type {Object}
 */
const fileCache = require('think-cache-file');
const mysql = require('think-model-mysql');
const isDev = think.env === 'development';
const path = require('path');
module.exports = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql, // Adapter handle
    user: 'root', // 用户名
    password: 'root', // 密码
    database: 'cmswing', // 数据库
    host: '127.0.0.1', // host
    port: 3306, // 端口
    connectionLimit: 1, // 连接池的连接个数，默认为 1
    prefix: 'cmswing_', // 数据表前缀，如果一个数据库里有多个项目，那项目之间的数据表可以通过前缀来区分
    cache: { // 额外的缓存配置
      type: 'file',
      handle: fileCache,
      cachePath: path.join(think.ROOT_PATH, 'runtime/cache') // absoulte path is necessarily required
    }
  }
};
