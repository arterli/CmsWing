'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,

  adapter: {
    mysql: {
      host: '192.168.1.120',
      port: '3306',
      database: 'cmswing',
      user: 'root',
      password: '123456',
      prefix: 'cmswing_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
