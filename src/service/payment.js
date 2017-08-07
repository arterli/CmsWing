// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports =  class extends think.Service {
    /**
     * init
     * @return {}         []
     */
constructor(ctx){
        super(ctx);
        this.http=ctx;
}
//发起付款
    async pingxx(channel, order_no, order_amount, ip,open_id) {
        let http_=think.config("http_")==1?"http":"https";
        let config;
        let extra = {};
        let amount = Number(order_amount) * 100;
        let setup = await think.config("setup")
        let pingpp = require('pingpp')(setup.PINGXX_LIVE_SECRET_KEY);
        pingpp.setPrivateKeyPath(think.ROOT_PATH + "/private/pingpp/cmswing_rsa_private_key.pem");
        switch (channel) {
            case 'alipay_pc_direct':
                //支付宝网页支付
                extra = {
                    success_url: `${http_}://${this.http.host}/center/pay/payres`
                }

                break;
            case 'wx_pub_qr':
                //微信网pc页扫码支付
                extra = {
                    limit_pay: null, product_id: order_no
                }

                break;
            case 'alipay_qr':
                //支付宝PC网页扫码支付
                break;
            case 'upacp_pc':
                //网银pc网页支付
                extra = {
                    result_url: `${http_}://${this.http.host}/center/pay/payres`
                }
                break;
            case 'upacp_wap':
                //网银pc网页支付
                extra = {
                    result_url: `${http_}://${this.http.host}/center/pay/payres`
                }
                break;
            case 'alipay_wap':
                //支付宝网页支付
                extra = {
                    success_url: `${http_}://${this.http.host}/center/pay/payres`
                }

                break;
            case 'bfb_wap':
                //支付宝网页支付
                extra = {
                    result_url: `${http_}://${this.http.host}/center/pay/payres`,
                    bfb_login:false
                }

                break;
                case 'wx_pub':
                // 微信公共账号支付
                extra ={
                    open_id:open_id
                }
                break;
        }
        config = {
            subject: "网站订单支付",
            body: "网站订单支付",
            amount: amount,
            order_no: order_no,
            channel: channel,
            currency: "cny",
            client_ip: ip,
            app: {id: setup.PINGXX_APP_ID},
            extra: extra
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

        return await create(pingpp, config);
    }


    async charge(id) {
        let setup = await think.config("setup")
        let pingpp = require('pingpp')(setup.PINGXX_LIVE_SECRET_KEY);
        pingpp.setPrivateKeyPath(think.ROOT_PATH + "/private/pingpp/cmswing_rsa_private_key.pem");
        function retrieve(pingpp, id) {
            let deferred = think.defer();
            pingpp.charges.retrieve(id, function (err, charge) {
                    console.log(err);
                    deferred.resolve(charge);
                }
            );
            return deferred.promise;
        }

        let res = await retrieve(pingpp, id);
        //console.log(res);
        return res;
    }
}