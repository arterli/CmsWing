'use strict';
import Geetest from 'geetest';
export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
  init(http){
    super.init(http);
  }
  //初始化
 async register(type){
    let setup = await think.cache("setup");
     let privateKey,publicKey
     if(type == 'mobile'){
         privateKey = setup.GEETEST_KEY_M;//key
         publicKey = setup.GEETEST_ID_M;//id
     }else {
         privateKey = setup.GEETEST_KEY;//key
         publicKey = setup.GEETEST_ID;//id

     }

     let geetest = new Geetest({
         geetest_id: publicKey,
         geetest_key: privateKey
     });
    //初始
        let register=() =>{
             let deferred = think.defer();
             // 向极验申请一次验证所需的challenge
             geetest.register(function (err,data) {
                 console.log(data);
                 deferred.resolve({
                     gt: geetest.geetest_id,
                     challenge: data.challenge,
                     success: data.success
                 });
             });
             return deferred.promise;
         }


  return await register();
  }
// 二次服务器验证
  async validate(data,type){
    let setup = await think.cache("setup");
      let privateKey,publicKey;
      if(type == 'mobile'){
          privateKey = setup.GEETEST_KEY_M;//key
          publicKey = setup.GEETEST_ID_M;//id
      }else {
          privateKey = setup.GEETEST_KEY;//key
          publicKey = setup.GEETEST_ID;//id

      }

      let geetest = new Geetest({
          geetest_key: privateKey,
          geetest_id: publicKey
      });
    //验证
    let validate = (data)=>{
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
    return await validate(data);
  }
}