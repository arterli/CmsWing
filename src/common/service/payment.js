'use strict';
var pingpp = require('pingpp')('sk_test_10unXHm9WPeD54OaT8Cubz9K');
export default class extends think.service.base {
    /**
     * init
     * @return {}         []
     */
    init(http) {
        super.init(http);
        this.http = http;
    }
//发起付款
    async pingxx(channel, order_no, order_amount, ip) {
        let config;
        let setup = await think.cache("setup")
        let amount = Number(order_amount)*100;
        switch (channel) {
            case 'alipay_pc_direct':
                config = {
                    subject: "网站订单支付",
                    body: "网站订单支付",
                    amount: amount,
                    order_no: order_no,
                    channel: "alipay_pc_direct",
                    currency: "cny",
                    client_ip: ip,
                    app: {id: setup.PINGXX_APP_ID},
                    extra: {success_url: `http://${this.http.host}/cart/payres`}
                }
                break;
        }
        //console.log(config);
        function create(pingpp, config) {
            let deferred = think.defer();
            pingpp.charges.create(config, function (err, charge) {
                //console.log(err);
                deferred.resolve(charge);
            });
            return deferred.promise;
        }

        return await create(pingpp,config);
    }
    async charge(id){
        function retrieve(pingpp,id) {
            let deferred = think.defer();
            pingpp.charges.retrieve(id, function(err, charge) {
                //console.log(err);
                deferred.resolve(charge);
                }
            );
            return deferred.promise;
        }
        return await retrieve(pingpp,id);
    }
}