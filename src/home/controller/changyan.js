'use strict';

import Base from './base.js';
import crypto from 'crypto';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
    //获取用户信息接口
  getuserinfoAction(){
    //

    let cy_appkey = "e2066f1e6fc3b33e5f7f31ba1365bf63";
    let ret;
    if(this.is_login){
      ret={
          "is_login":1, //已登录，返回登录的用户信息
          "user":{
          "user_id":this.user.uid,
          "nickname":this.user.username,
          "img_url":"",
          "profile_url":"",
          "sign":this.cysign(cy_appkey,"","",this.user.username,"",this.user.uid)}
      }
    }else {
      ret={
        "is_login":0//为登录
      }
    }
    console.log(ret);
   return this.jsonp(ret);
  }
    //用户登录接口
    loginAction(){
        let cy_appkey = "e2066f1e6fc3b33e5f7f31ba1365bf63";
        let get = this.get();
        console.log(get);
        console.log(this.cysign(cy_appkey,get.cy_user_id, get.img_url, get.nickname, get.profile_url, get.user_id));
        let ret;
        if(get.user_id==''){
            if(!this.is_login){
                //没有绑定网站用户
                ret={
                    'user_id':'0',
                    'reload_page':0,
                    'js_src':[`http://${this.http.host}/static/assets/js/cy.js`]
                };
            }else {
                ret={
                  code:1,
                    user_id:this.user.uid,
                    reload_page:0
                }
            }

            console.log(ret);
            return this.jsonp(ret);
        //return this.redirect('/changyan/binduser');
        }else {
            //绑定网站用户

            if(!this.is_login){
                ret={
                    'user_id':'1',
                    'reload_page':0
            };
            }else{
                ret={
                    'user_id':this.user.uid,
                    'reload_page':1
                }
            }
            return this.jsonp(ret);
        }

    }
    //补充资料
    binduserAction(){
        return this.display();
    }
    // //签名验证
    // truesign(cy_user_id,img_url,nickname,profile_url,user_id){
    //    let toSign=`cy_user_id=${cy_user_id}&img_url=${img_url}&nickname=${nickname}&profile_url=${profile_url}&user_id=${user_id}`
    //     return crypto.createHmac('sha1', user_id).update(toSign,'utf8').digest('hex');
    // }
  //生成畅言回调签名
  cysign(key,cy_user_id, imgUrl, nickname, profileUrl, isvUserId){
      let str
      str = "img_url="+imgUrl+"&nickname="+nickname+"&profile_url="+profileUrl+"&user_id="+isvUserId;
      if(!think.isEmpty(cy_user_id)){
          str=`cy_user_id=${cy_user_id}`+ str;
      }
      return crypto.createHmac('sha1', key).update(str,'utf8').digest('hex');
  }
}