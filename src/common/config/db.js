'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
      
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      database: 'cmswing',
      user: 'root',
      password: '',
      prefix: 'cmswing_',
      encoding: 'UTF8MB4_GENERAL_CI'
    },
    mongo: {

    }
  }
};
