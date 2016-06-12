// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
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
    async oidAction(){
      

       this.end();
    }
   async areaAction(){
        let area = await this.model("area").select();
       think.log(area);
       function totree (data, pid,m) {
           var result = [], temp;
           var length=data.length;
           for(var i=0;i<length;i++) {
               if (data[i].parent_id == pid) {
                   result.push(data[i]);
                   temp = totree(data, data[i].id,m+1);
                   if (temp.length > 0) {
                       if(m==1){
                           temp.splice(0, 0, {
                               "name":"请选择"
                           })
                       }else {
                           temp.splice(0, 0, {
                               "name":"请选择",
                               "sub":[

                               ]
                           })
                       }

                       data[i].sub = temp;
                       if(m==1){
                           data[i].type =0
                       }else {
                           data[i].type =1
                       }

                   }
               }
           }
           return result;
       }
        this.end(totree(area,0,0));
    }
   async sqlAction(){
       let order_sn = await this.model("test").test();
        this.end(order_sn);
    }
   async qiniuAction(){
        if(this.isPost()){
            var path = require('path');
            let file = this.file("file1");
            file = think.extend({},file);
            console.log(file);
            let  filePath = file.path;
            var basename = path.basename(filePath);
            console.log(basename);
            //  console.log(file);
           //  var qiniu = require("qiniu");
           //  //需要填写你的 Access Key 和 Secret Key
           //  qiniu.conf.ACCESS_KEY = 'OJD9JCXudNtPwz_bKrtdnP2uTd5BVGvEJxaiUB24';
           //  qiniu.conf.SECRET_KEY = '_Dmewmycq994GcYxG4N3WvOX0ED-5eUeeXvoOYcE';
           //
           //  //要上传的空间
           //  let bucket = 'cmswing';
           //  //上传到七牛后保存的文件名
           //  let key = 'my-nodejs-logo.png';
           //  //构建上传策略函数
           //  //noinspection JSAnnotator
           //  function uptoken(bucket, key) {
           //      var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
           //      return putPolicy.token();
           //  }
           //  //生成上传 Token
           // let  token = uptoken(bucket, key);
           //  console.log(token);
           //  //要上传文件的本地路径
           // let  filePath = file.path;
           //
           //  //构造上传函数
           //  //noinspection JSAnnotator
           //  function uploadFile(uptoken, key, localFile) {
           //      var extra = new qiniu.io.PutExtra();
           //      qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
           //          if(!err) {
           //              // 上传成功， 处理返回值
           //              console.log(ret.hash, ret.key, ret.persistentId);
           //          } else {
           //              // 上传失败， 处理返回代码
           //              console.log(err);
           //          }
           //      });
           //  }
           //
           // //调用uploadFile上传
           //  uploadFile(token, key, filePath);
            let qiniu = think.service("qiniu");
            let instance = new qiniu();
            let res = await instance.uploadpic(filePath,basename);
           this.end(res);
        }else {
            this.display()
        }

    }
    
    configAction(){
        const fs = require('fs');
        let steup = this.setup;
        let path1 = think.getPath("common", "config");
        console.log(path1);
        if(think.isDir(think.ROOT_PATH+'/src')){
            let data = "export default"+JSON.stringify(steup);
            fs.writeFileSync(think.ROOT_PATH+'/src/common/config/steup.js', data);
        }
        let data1 = "exports.__esModule = true;exports.default ="+JSON.stringify(steup);
        fs.writeFileSync(path1+'/steup.js', data1);
       // console.log(steup);
    }
    getconfigAction(){
        let get = this.config("setup.IS_QQ_LOGIN");
        this.end(get);
    }
    async getpicAction(){
        let id = this.get("id")
        let m= this.get("m")||null
        let w = this.get("w")||null
        let h = this.get("h")||null
       let pic = await get_pic(id,m,w,h)
        this.end(`<img src='${pic}'>`);
    }
    async ssAction(){
        let uuid = think.uuid()
        this.session("uuid",{uuid:uuid});
        let uuids =await this.session("uuid");
        console.log(uuids);
    }

    alidayuAction(){
        let dayu = think.adapter("alidayu", "client");
        let instance = new dayu();
        instance.send();
    }
    qiniusAction(){
        let qiniu = think.service("qiniu");
        let instance = new qiniu();
        instance.pfop();
        
        this.end();
    }
}
