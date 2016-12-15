'use strict';

import Base from './base.js';
import http from 'http';
import fs from 'fs';
export default class extends Base {
  /**
   * 新浪授权回掉地址
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //检测是否开启微博登陆
      if(this.setup.IS_SINA_LOGIN == 0){
          this.http.error = new Error('没有开启微博登陆，请到后台开启！');
          return think.statusAction(702, this.http);
      }
      //检测是否登陆
      if(this.is_login){
          return this.redirect('/uc/index')
      }
      let http_;
      if(this.config().http_==1){
          http_="http://"
      }else {
          http_ ="https://"
      }
      let redirectURI = `${http_}${this.http.host}/uc/sina/index`;
      //检查是否回掉code，如果没有跳转授权接口
      if(think.isEmpty(this.get("code"))){

          return this.redirect(`https://api.weibo.com/oauth2/authorize?client_id=${this.setup.SINA_APPKEY}&redirect_uri=${redirectURI}&response_type=code`)
      }else {
        let code = this.get("code");
          let SINA = think.service("sina");
          let sina = new SINA(code,redirectURI);
          let token =await sina.gettoken();
          console.log(token);
          let userinfo = await sina.getuserinfo(token.access_token,token.uid);
          let sina_user=await this.model("sina_user").find(userinfo.id);
          console.log(sina_user);
          if(think.isEmpty(sina_user)){
              await this.model("sina_user").add(userinfo);
              return this.redirect(`/uc/sina/login/id/${userinfo.id}`);
          }else {
              await this.model("sina_user").where({id:userinfo.id}).update(userinfo);
              //检查微博号是否跟网站会员绑定
              if(think.isEmpty(sina_user.uid)||sina_user.uid==0){
                  //没绑定跳转绑定页面
                 return this.redirect(`/uc/sina/login/id/${userinfo.id}`);

              }else {
                  //更新头像
                  let filePath=think.RESOURCE_PATH + '/upload/avatar/' + sina_user.uid;
                  think.mkdir(filePath);
                  //如果没有用户没有图像，使用微博头像
                  if(!think.isFile(filePath+'/avatar.png')){
                      await this.spiderImage(userinfo.avatar_large||userinfo.avatar_hd,filePath+'/avatar.png')
                  }
                  //绑定直接登陆
                  let last_login_time = await this.model("member").where({id:sina_user.uid}).getField("last_login_time",true);
                  let sina_userInfo = {
                      'uid': sina_user.uid,
                      'username': sina_user.screen_name,
                      'last_login_time': last_login_time,
                  };
                  await this.session('webuser', sina_userInfo);
                  await this.model("member").autoLogin({id:sina_user.uid}, this.ip());//更新用户登录信息，自动登陆
                 return this.redirect("/uc/index");
              }
          }

      }
  }
    //用户绑定页面
    async loginAction(){
        if(this.setup.IS_SINA_LOGIN == 0){
            this.http.error = new Error('没有开启微博登陆，请到后台开启！');
            return think.statusAction(702, this.http);
        }
        if(this.is_login){
            this.redirect('/uc/index')
        }
        let id = this.get("id");
        let sina_user=await this.model("sina_user").find(id);
        console.log(sina_user);
        this.assign("sina_user",sina_user);
        this.meta_title="账号绑定"
        if(checkMobile(this.userAgent())){
            return this.display(`mobile/${this.http.controller}/${this.http.action}`);
        }else{
            return this.display();
        }
    }
    /**完善资料绑定 */
    async organizingAction(){
        let data = this.post();
        //验证
        let res;
        if(think.isEmpty(data.username)){
            return this.fail("用户昵称不能为空！");
        }else{
            res = await this.model("member").where({username:ltrim(data.username)}).find();
            if(!think.isEmpty(res)){
                return this.fail("用户昵称已存在，请重新填写！")
            }
        }
        if(think.isEmpty(data.mobile)){
            return this.fail("手机号码不能为空！")
        }else{
            res = await this.model("member").where({mobile:data.mobile}).find();
            if(!think.isEmpty(res)){
                return this.fail("手机号码已存在，请重新填写！")
            }
        }
        if(think.isEmpty(data.email)){
            return this.fail("电子邮箱不能为空！")
        }else{
            res = await this.model("member").where({email:data.email}).find();
            if(!think.isEmpty(res)){
                return this.fail("电子邮箱已存在，请重新填写！")
            }
        }
        if(think.isEmpty(data.password) && think.isEmpty(data.password2)){
            return this.fail("密码不能为空！")
        }else{

            if(data.password != data.password2){
                return this.fail("两次输入的密码不一致，请重新填写！")
            }
        }
        data.status = 1;
        data.reg_time = new Date().valueOf();
        data.reg_ip = _ip2int(this.ip());
        data.password = encryptPassword(data.password);
        let reg = await this.model("member").add(data);
        if(!think.isEmpty(reg)){
            //添加用户副表
            await this.model("sina_user").where({id:data.openid}).update({uid:reg});
            //更新微信头像
            let filePath=think.RESOURCE_PATH + '/upload/avatar/' +reg;
            think.mkdir(filePath)
            if(!think.isFile(filePath+'/avatar.png')){
                await this.spiderImage(data.headimgurl,filePath+'/avatar.png')
            }
        }
        console.log(data);
        await this.model("member").autoLogin({id:reg}, this.ip());//更新用户登录信息，自动登陆
        let sina_userInfo = {
            'uid':reg,
            'username': data.username,
            'last_login_time': data.reg_time,
        };
        await this.session('webuser', sina_userInfo);
        return this.success({name:"绑定成功",url:"/uc/index"});


    }
    /**登录绑定 */
    async logonbindingAction(){
        let data = this.post();
        //console.log(data);
        let username = this.post('username');
        let password = this.post('password');
        password = encryptPassword(password);
        console.log(data);

        let res = await this.model("member").signin(username, password, this.ip(), 5,0);
        console.log(res);
        if (0 < res.uid) {
            //记录用户登录行为
            // await this.model("action", {}, "admin").log("user_login", "member", res.uid, res.uid, this.ip(), this.http.url);
            //console.log(11111111111111);
            let sina_info = await this.model("sina_user").where({id:data.openid}).find();
            console.log(sina_info);
            await this.model("sina_user").where({id:data.openid}).update({uid:res.uid});
            //更新微信头像
            let filePath=think.RESOURCE_PATH + '/upload/avatar/' +res.uid;
            think.mkdir(filePath)
            if(!think.isFile(filePath+'/avatar.png')) {
                await this.spiderImage(data.headimgurl, filePath + '/avatar.png')
            }
            res.username = sina_info.screen_name;
            await this.session('webuser', res);
            //TODO 用户密钥
            return this.success({name:"绑定成功",url:"/uc/index"});
        } else { //登录失败
            let fail;
            switch (res) {
                case -1:
                    fail = '用户不存在或被禁用';
                    break; //系统级别禁用
                case -2:
                    fail = '密码错误';
                    break;
                default:
                    fail = '未知错误';
                    break; // 0-接口参数错误（调试阶段使用）
            }
            this.fail(fail);
        }
    }
    /**
     * 更新微信头像
     */
    spiderImage(imgUrl,filePath) {
        let deferred = think.defer();
        http.get(imgUrl, function (res) {
            var imgData = "";
            res.setEncoding("binary");
            res.on("data", function (chunk) {
                imgData += chunk;
            });

            res.on("end", function () {
                fs.writeFileSync(filePath, imgData, "binary");
                deferred.resolve(filePath);
            });
        });
        return deferred.promise;
    }
}