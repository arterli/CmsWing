'use strict';

import Base from './base.js';
import WechatAPI from 'wechat-api';
import NodeRSA from 'node-rsa';
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
       var key = new NodeRSA({b: 512});
       var keyData = '-----BEGIN PUBLIC KEY----- ... -----BEGIN PRIVATE KEY-----';
       key.importKey(keyData, 'pkcs8');
       this.end(11);
   }
}
