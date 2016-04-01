'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  nums_per_page: 10,
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      database: 'cmswing',
      user: 'root',
      password: '',
      prefix: 'cmswing_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
