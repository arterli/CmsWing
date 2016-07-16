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
 async register(){
    let setup = await think.cache("setup");
    let privateKey = setup.GEETEST_KEY;//key
    let publicKey = setup.GEETEST_ID;//id
    let geetest = new Geetest(privateKey, publicKey)
    //初始
    let register=() =>{
      let deferred = think.defer();
      geetest.register(function(err, challenge) {
        if (err) {
          //network error
          deferred.resolve({
            gt: publicKey,
            success: 0
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
            success: 1
          });
        }
      })
      return deferred.promise;
    }
  return await register();
  }
// 二次服务器验证
  async validate(data){
    let setup = await think.cache("setup");
    let privateKey = setup.GEETEST_KEY;//key
    let publicKey = setup.GEETEST_ID;//id
    let geetest = new Geetest(privateKey, publicKey)
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