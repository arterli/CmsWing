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
    let key;
    if(!think.isEmpty(setup.SMS_Key)){
      key = setup.SMS_Key.split("|");
      console.log(key);
      if(think.isEmpty(key[0])||think.isEmpty(key[1])){
        return {result: { errno: '1000', errmsg: '请在后台配合正确的凭着'}}
      };

    }else {
      return {result: { errno: '1000', errmsg: '请在后台配合正确的凭着'}}
    }
    let client = new TopClient({
      'appkey': key[0],
      'appsecret': key[1],
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