var crypto = require('crypto');

/**
 * hash
 *
 * @param {String} method hash method, e.g.: 'md5', 'sha1'
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
exports.hash = function hash(method, s, format) {
  var sum = crypto.createHash(method);
  var isBuffer = Buffer.isBuffer(s);
  if (!isBuffer && typeof s === 'object') {
    s = JSON.stringify(sortObject(s));
  }
  sum.update(s, isBuffer ? 'binary' : 'utf8');
  return sum.digest(format || 'hex');
};

/**
 * md5 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
exports.md5 = function md5(s, format) {
  return exports.hash('md5', s, format);
};

exports.YYYYMMDDHHmmss = function(d, options) {
  d = d || new Date();
  if (!(d instanceof Date)) {
    d = new Date(d);
  }

  var dateSep = '-';
  var timeSep = ':';
  if (options) {
    if (options.dateSep) {
      dateSep = options.dateSep;
    }
    if (options.timeSep) {
      timeSep = options.timeSep;
    }
  }
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return d.getFullYear() + dateSep + month + dateSep + date + ' ' +
        hours + timeSep + mintues + timeSep + seconds;
};

exports.checkRequired = function(params, keys) {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  for (var i = 0, l = keys.length; i < l; i++) {
    var k = keys[i];
    if (!params.hasOwnProperty(k)) {
      var err = new Error('`' + k + '` required');
      err.name = 'ParameterMissingError';
      return err;
    }
  }
};

exports.getApiResponseName = function(apiName) {
  var reg = /\./g;
  if (apiName.match('^taobao')) { apiName = apiName.substr(7) }
  return apiName.replace(reg, '_') + '_response';
};
