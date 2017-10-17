// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const TopClient = require('./topClient').TopClient;
module.exports = class extends think.Service {
  /**
   * init
   * @return {[]}         []
   */
  constructor(...args) {
    super(...args);
  }
  async send(info) {
    const appkey = think.config('ext.dayu.appkey');
    const appsecret = think.config('ext.dayu.appsecre');
    const client = new TopClient({
      'appkey': appkey,
      'appsecret': appsecret,
      'REST_URL': 'http://gw.api.taobao.com/router/rest'
    });
    const execute = () => {
      const deferred = think.defer();
      client.execute('alibaba.aliqin.fc.sms.num.send', info, function(error, response) {
        if (!error) {
          deferred.resolve(response);
        } else {
          deferred.resolve(error);
        }
      });
      return deferred.promise;
    };
    return await execute();
  }
};
