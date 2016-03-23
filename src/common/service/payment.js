'use strict';

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
        let amount = Number(order_amount)*100;
        let setup = await think.cache("setup")
        let pingpp = require('pingpp')(setup.PINGXX_LIVE_SECRET_KEY);
        pingpp.setPrivateKeyPath(think.RESOURCE_PATH + "/upload/pingpp/cmswing_rsa_private_key.pem");
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
            case 'wx_pub_qr':
                config = {
                    subject: "网站订单支付",
                    body: "网站订单支付",
                    amount: amount,
                    order_no: order_no,
                    channel: "wx_pub_qr",
                    currency: "cny",
                    client_ip: ip,
                    app: {id: setup.PINGXX_APP_ID},
                    extra: {limit_pay: null,product_id:order_no}
                }
                break;
            case 'alipay_qr':
                config = {
                    subject: "网站订单支付",
                    body: "网站订单支付",
                    amount: amount,
                    order_no: order_no,
                    channel: "alipay_qr",
                    currency: "cny",
                    client_ip: ip,
                    app: {id: setup.PINGXX_APP_ID}
                }
                break;
            case 'upacp_pc':
                config = {
                    subject: "网站订单支付",
                    body: "网站订单支付",
                    amount: amount,
                    order_no: order_no,
                    channel: "upacp_pc",
                    currency: "cny",
                    client_ip: ip,
                    app: {id: setup.PINGXX_APP_ID},
                    extra: {result_url: `http://${this.http.host}/cart/payres`}
                }
                break;
        }
        console.log(config);
        function create(pingpp, config) {
            let deferred = think.defer();
            pingpp.charges.create(config, function (err, charge) {
                console.log(err);
                deferred.resolve(charge);
            });
            return deferred.promise;
        }

        return await create(pingpp,config);
    }
    async charge(id){
        let setup = await think.cache("setup")
        let pingpp = require('pingpp')(setup.PINGXX_LIVE_SECRET_KEY);
        pingpp.setPrivateKeyPath(think.RESOURCE_PATH + "/upload/pingpp/cmswing_rsa_private_key.pem");
        function retrieve(pingpp,id) {
            let deferred = think.defer();
            pingpp.charges.retrieve(id, function(err, charge) {
                console.log(err);
                deferred.resolve(charge);
                }
            );
            return deferred.promise;
        }
        let res = await retrieve(pingpp,id);
        //console.log(res);
        return res;
    }
}