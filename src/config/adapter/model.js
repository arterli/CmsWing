/**
 * model adapter config
 * @type {Object}
 */
const isDev = think.env === 'development';
module.exports={
    type: 'mysql',
    common: {
        logConnect: isDev,
        logSql: isDev,
        logger: msg => think.logger.info(msg)
    },
    mysql: {
        database: 'cmswing1.1',
        prefix: 'cmswing_',
        encoding: 'UTF8MB4_GENERAL_CI',
        host: '127.0.0.1',
        port: '',
        user: 'root',
        password: '',
        dateStrings: true
    }
};