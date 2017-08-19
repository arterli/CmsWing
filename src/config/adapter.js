const fileCache = require('think-cache-file');
const fileSession = require('think-session-file');
const {File} = require('think-logger3');
const path = require('path');
//const isDev = think.env === 'development';
/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000, // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'),  // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
}

/**
 * model adapter config
 * @type {Object}
 */
exports.model = require("./adapter/model");

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs',
      //keys: ['werwer', 'werwer'],
      //signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
}

/**
 * view adapter config
 * @type {Object}
 */
exports.view = require("./adapter/view");
/**
 * 
 * @type {{type: string, file: {handle: Logger.File, backups: number, absolute: boolean, maxLogSize: number, filename}}}
 */
exports.logger = {
    type: 'file',
    file: {
        handle: File,
        backups: 10,
        absolute: true,
        maxLogSize: 50 * 1024,  //50M
        filename: path.join(think.ROOT_PATH, 'logs/xx.log')
    }
}