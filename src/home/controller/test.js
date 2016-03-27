'use strict';

import Base from './base.js';
import WechatAPI from 'wechat-api';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
      
      let get_model_field = await getmodelfield(4,66,"total_stock")
      console.log(get_model_field);
      this.end(111);
    //return this.display();
  }
  weixinAction(){
      let self = this;
      var api = new WechatAPI("wxadce60f0c68b9b58", "41318d0bc30d292f278a720758d14833");
      api.getUser("on47Ms4t43aQfpsPAQHL5VC2iDaU", function(err,res){
         // self.assign('url',res.headimgurl);
          console.log(res.headimgurl);
      });
      
     this.assign('url',"http://wx.qlogo.cn/mmopen/CjI64f6iblexHK4xia2Sf5KepCRL3geeUZa5FalTA0lvIEf6pzfAMasrVJKYiaMDJB3cnVMcFMSIWFaNIwQKAw2XosEg6qtF7Mc/0");
     this.display();
      
  }

   async payAction(){
        // let payment = think.service("payment");
        // let pay = new payment();
        // let charges = await pay.pingxx();
        // this.json(charges);
       let dd = think.RESOURCE_PATH + "/upload/pingpp/cmswing_rsa_private_key.pem"
       console.log(dd);
    }
   rsaAction(){
       // var key = new NodeRSA({b: 512});
       // var keyData = '-----BEGIN PUBLIC KEY----- ... -----BEGIN PRIVATE KEY-----';
       // key.importKey(keyData, 'pkcs8');
       this.end(11);
   }

    async geetestAction(){
        var privateKey = 'ae68a05dc013d21cad068a7f4271eca1 ';//key
        var publicKey = '4dad8be53801fa4e2e50c1be078e2187 ';//id
        var geetest = require('geetest')(privateKey, publicKey);
        //初始
        let register=(geetest) =>{
            var publicKey = '4dad8be53801fa4e2e50c1be078e2187 ';//id
            let deferred = think.defer();
            geetest.register(function(err, challenge) {
                if (err) {
                    //network error
                    deferred.resolve({
                        gt: publicKey,
                        success: false
                    });
                    return;
                }
                if(challenge) {
                    //deal with it
                    //res.json({challenge: challenge})
                    //console.log(challenge);
                    deferred.resolve({
                        challenge: challenge,
                        gt:publicKey,
                        success: true
                    });
                }
            })
            return deferred.promise;
        }

        //验证
        let validate = (geetest,data)=>{
            let deferred = think.defer();
            geetest.validate({

                challenge: data.geetest_challenge,
                validate: data.geetest_validate,
                seccode: data.geetest_seccode

            }, function (err, result) {
                console.log(result);
                var data = {status: "success"};

                if (err || !result) {
                     console.log(err);
                    data.status = "fail";
                }

                deferred.resolve(data);
            });
            return deferred.promise;
        }
        if(this.isPost()){
         let post =this.post();
            console.log(post);
            let res = await validate(geetest,post);
            console.log(res);
            return this.json(res);
        }else {
            let res = await register(geetest);
            console.log(res);
            return this.json(res);
        }


    }
    httpAction(){
        let http = require('http');

        http.get('http://127.0.0.1:8360', (res) => {
            console.log(res);
            // consume response body
            res.resume();
        }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
        });
    }
    oidAction(){
        
    }
}
