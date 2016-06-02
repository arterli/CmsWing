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
  send(){
    let client = new TopClient({
      'appkey': '23381127',
      'appsecret': '92c5495dab01640530d3da88f4537d5e',
      'REST_URL': 'http://gw.api.taobao.com/router/rest'
    });
    client.execute('alibaba.aliqin.fc.sms.num.send', {
      'extend':'123456',
      'sms_type':'normal',
      'sms_free_sign_name':'酷翼cms',
      'sms_param':'{\"code\":\"1234\",\"product\":\"cmswing\"}',
      'rec_num':'18681851637',
      'sms_template_code':'SMS_10281005'
    }, function(error, response) {
      if (!error) console.log(response);
      else console.log(error);
    })
  }
}