'use strict';

import Base from './base.js';
import http from 'http';
import fs from 'fs';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  /**qq登陆回掉地址 */
  indexAction(){
    //auto render template file index_index.html
    if(this.setup.IS_QQ_LOGIN == 0){
      this.http.error = new Error('没有开启QQ登陆，请到后台开启！');
      return think.statusAction(702, this.http);
    }
    if(this.is_login){
      this.redirect('/user/index')
    }
    return this.display();
  }
  /**获取qq登陆信息 */
  async loginresultAction(){
    if(this.setup.IS_QQ_LOGIN == 0){
      this.http.error = new Error('没有开启QQ登陆，请到后台开启！');
      return think.statusAction(702, this.http);
    }
    if(this.is_login){
      this.redirect('/user/index')
    }
    let res = this.get();
    let qqapi = think.service("qqapi");
    let qq = new qqapi(res.access_token,res.openid);
    let userinfo =await qq.get_user_info();
    let qq_user=await this.model("qq_user").where({openid:res.openid}).find();
    if(think.isEmpty(qq_user)){
      userinfo.openid=res.openid;
      //think.log(userinfo);
      await this.model("qq_user").add(userinfo);
      this.redirect(`/uc/qq/qqlogin/id/${res.openid}`);
    }else {
      await this.model("qq_user").where({openid:res.openid}).update(userinfo);
      //检查qq号是否跟网站会员绑定
      if(think.isEmpty(qq_user.uid)){
        //没绑定跳转绑定页面
        this.redirect(`/uc/qq/qqlogin/id/${res.openid}`);

      }else {
        //更qq信头像
        let filePath=think.RESOURCE_PATH + '/upload/avatar/' + qq_user.uid;
        think.mkdir(filePath);
        //如果没有用户没有图像，使用QQ头像
        if(!think.isFile(filePath+'/avatar.png')){
          await this.spiderImage(userinfo.figureurl_qq_2||userinfo.figureurl_qq_1,filePath+'/avatar.png')
        }
        //绑定直接登陆
        let last_login_time = await this.model("member").where({id:qq_user.uid}).getField("last_login_time",true);
        let qq_userInfo = {
          'uid': qq_user.uid,
          'username': userinfo.nickname,
          'last_login_time': last_login_time,
        };
        await this.session('webuser', qq_userInfo);
        await this.model("member").autoLogin({id:qq_user.uid}, this.ip());//更新用户登录信息，自动登陆
        this.redirect("/uc/index");
      }
    }
  }
  //qq用户绑定页面
  async qqloginAction(){
    if(this.setup.IS_QQ_LOGIN == 0){
      this.http.error = new Error('没有开启QQ登陆，请到后台开启！');
      return think.statusAction(702, this.http);
    }
    if(this.is_login){
      this.redirect('/uc/index')
    }
    let openid = this.get("id");
    let qq_user=await this.model("qq_user").where({openid:openid}).find();
    this.assign("qq_user",qq_user);
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
      await this.model("qq_user").where({openid:data.openid}).update({uid:reg});
      //更新微信头像
      let filePath=think.RESOURCE_PATH + '/upload/avatar/' +reg;
      think.mkdir(filePath)
      if(!think.isFile(filePath+'/avatar.png')){
        await this.spiderImage(data.headimgurl,filePath+'/avatar.png')
      }
    }
    console.log(data);
    await this.model("member").autoLogin({id:reg}, this.ip());//更新用户登录信息，自动登陆
    let wx_userInfo = {
      'uid':reg,
      'username': data.username,
      'last_login_time': data.reg_time,
    };
    await this.session('webuser', wx_userInfo);
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
    if (0 < res.uid) {
      //记录用户登录行为
      // await this.model("action", {}, "admin").log("user_login", "member", res.uid, res.uid, this.ip(), this.http.url);
      //console.log(11111111111111);
      let qq_info = await this.model("qq_user").where({openid:data.openid}).find();
      await this.model("qq_user").where({openid:data.openid}).update({uid:res.uid});
      //更新微信头像
      let filePath=think.RESOURCE_PATH + '/upload/avatar/' +res.uid;
      think.mkdir(filePath)
      if(!think.isFile(filePath+'/avatar.png')) {
        await this.spiderImage(data.headimgurl, filePath + '/avatar.png')
      }
      res.username = qq_info.nickname;
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