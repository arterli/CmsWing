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
    const setup = think.config('setup');
    let key;
    if (!think.isEmpty(setup.SMS_Key)) {
      key = setup.SMS_Key.split('|');
      console.log(key);
      if (think.isEmpty(key[0]) || think.isEmpty(key[1])) {
        return {result: { errno: '1000', errmsg: '请在后台配合正确的凭着'}};
      };
    } else {
      return {result: { errno: '1000', errmsg: '请在后台配合正确的凭着'}};
    }
    const client = new TopClient({
      'appkey': key[0],
      'appsecret': key[1],
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
