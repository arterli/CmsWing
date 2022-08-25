'use strict';
module.exports = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'cmswing2',
  username: 'root',
  password: 'root123456',
  timezone: '+08:00',
  define: {
    freezeTableName: true,
    underscored: true,
  },
};
