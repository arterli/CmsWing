'use strict';
/**
 * base adapter
 */
let TopClient = require('./topclient').TopClient;
export default class extends think.adapter.base {
  /**
   * init
   * @return {[]}         []
   */
  init(...args){
    super.init(...args);
  }
  async send(info){
    let setup = await think.model("setup",think.config("db"),"admin").getset();
    let client = new TopClient({
      'appkey': setup.SMS_AppKey,
      'appsecret': setup.SMS_AppSecret,
      'REST_URL': 'http://gw.api.taobao.com/router/rest'
    });
    let execute =()=> {
      let deferred = think.defer();
      client.execute('alibaba.aliqin.fc.sms.num.send', info, function(error, response) {
        if (!error){
          deferred.resolve(response);
        }else {
          deferred.resolve(error);
        }

      })
      return deferred.promise;
    }
    return await execute();
  }
}