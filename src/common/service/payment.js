'use strict';
var pingpp = require('pingpp')('sk_test_10unXHm9WPeD54OaT8Cubz9K');
export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
  init(...args){
    super.init(...args);
  }

 async pingxx(){
    function charges(pingpp) {
      let deferred = think.defer();
      pingpp.charges.create({
        subject: "Your Subject",
        body: "Your Body",
        amount: 100,
        order_no: "123456789",
        channel: "alipay_pc_direct",
        currency: "cny",
        client_ip: "127.0.0.1",
        app: {id: "app_eDW9GK5uLiHSHCmj"},
        extra:{success_url:"http://127.0.0.1:8360/cart/payres"}
      }, function(err, charge) {
        console.log(err);
        deferred.resolve(charge);
      });
      return deferred.promise;
    }
   return await charges(pingpp);
  }
}