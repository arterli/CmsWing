'use strict';

import Base from './base.js';
import pingpp from 'pingpp';
import http from 'http';
import fs from 'fs';
import API from 'wechat-api';
export default class extends Base {
  async __before() {
    //网站配置
    this.setup = await this.model("setup").getset();
    this.api = new API(this.setup.wx_AppID, this.setup.wx_AppSecret);
  }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  async oauthAction(){
    //判断是否是微信浏览器
    //微信公众账号内自动登陆
    let openid = await this.session("wx_openid");
    //let openid = null;
    if(is_weixin(this.userAgent()) && think.isEmpty(openid)){
      this.cookie("cmswing_wx_url",this.http.url);
      var oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode(this.setup.wx_AppID, `http://${this.http.host}/uc/weixin/getopenid?showwxpaytitle=1`);
      //console.log(oauthUrl)
      this.redirect(oauthUrl);
    }

  }
  //用微信客户端获取getopenid
  async getopenidAction(){
    //获取用户openid
    let code =  this.get("code");
    console.log(code);
    //获取openid
    let getopenid = ()=>{
      let deferred = think.defer();
      pingpp.wxPubOauth.getOpenid(this.setup.wx_AppID, this.setup.wx_AppSecret, code, function(err, openid){
        //console.log(openid);
        deferred.resolve(openid);
        // ...
        // pass openid to extra['open_id'] and create a charge
        // ...
      });
      return deferred.promise;
    };
    let openid = await getopenid();
    think.log(think.isEmpty(openid));
    let userinfo = await getUser(this.api,openid);
    console.log(userinfo);
    //如果没有关注先跳到关注页面
    if(userinfo.subscribe==0){
      console.log(1111111111111)
      this.redirect('/uc/weixin/follow');
      return false;
    };
    userinfo.subscribe_time = userinfo.subscribe_time * 1000;

    let wx_user=await this.model("wx_user").where({openid:openid}).find();

    //存储Openid
    await this.session('wx_openid',openid);
    if(think.isEmpty(wx_user)){
      await this.model("wx_user").add(userinfo);
      this.redirect("/uc/weixin/signin");
    }else {
      await this.model("wx_user").where({openid:openid}).update(userinfo);

      //检查微信号是否跟网站会员绑定
      if(think.isEmpty(wx_user.uid)){
        //没绑定跳转绑定页面
        this.redirect("/uc/weixin/signin");

      }else {
        //更新微信头像
        let filePath=think.RESOURCE_PATH + '/upload/avatar/' + wx_user.uid;
        think.mkdir(filePath)
        await this.spiderImage(userinfo.headimgurl,filePath+'/avatar.png')
        //绑定直接登陆
        let last_login_time = await this.model("member").where({id:wx_user.uid}).getField("last_login_time",true);

        let wx_userInfo = {
          'uid': wx_user.uid,
          'username': userinfo.nickname,
          'last_login_time': last_login_time,
        };
        await this.session('webuser', wx_userInfo);
        this.redirect(this.cookie("cmswing_wx_url"));
      }
    }


  }

  /**
   * 没有关注提示关注
   */
  async followAction(){
    //console.log(this.setup)
    //创建关注二维码
    //TODO
    // let titck =await createLimitQRCode(this.api,1);
    // console.log(titck);
    let qrcod = this.api.showQRCodeURL("gQHz7zoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3JqX0p2Zm5sMnBtalQwX215eE1NAAIEjMBoVwMEAAAAAA==");
    this.assign("qrurl",qrcod);
    //think.log(qrcod);
    // this.end(qrcod);
    this.meta_title = `扫码关注`;
    //判断浏览客户端
    if(checkMobile(this.userAgent())){
      return this.display(`mobile/${this.http.controller}/${this.http.action}`);
    }else{
      return this.display();
    }
  }

  /**
   * 微信账号与网站会员绑定
   */
  async signinAction(){
    // await this.session('wx_openid',"o33lBt0Pz3rEXUARWtUUO5GxuUG0");
    let open_id;
    if(think.isEmpty(this.cookie("wx_openid"))){
      open_id = await this.session("wx_openid");
      this.cookie("wx_openid",open_id);
    }else{
      open_id = this.cookie("wx_openid");
    }

    //清除openid，如果中途失败，可重新激活注册流程
    await this.session('wx_openid',null);
    let wx_info = await this.model("wx_user").where({openid:open_id}).find();
    this.assign("wx_info",wx_info);
    this.meta_title="账号绑定";
    this.assign("openid",open_id);
    this.assign("headimgurl",wx_info.headimgurl)
    //todo
    if(checkMobile(this.userAgent())){
      return this.display(`mobile/${this.http.controller}/${this.http.action}`);
    }else{
      return this.display();
    }
    // this.end("网站会员绑定页面")
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
      //用户副表
      await this.model("customer").add({user_id:reg});
      await this.model("wx_user").where({openid:data.openid}).update({uid:reg});
      //更新微信头像
      let filePath=think.RESOURCE_PATH + '/upload/avatar/' +reg;
      think.mkdir(filePath)
      await this.spiderImage(data.headimgurl,filePath+'/avatar.png')
    }
    console.log(data);
    await this.model("member").autoLogin({id:reg}, this.ip());//更新用户登录信息，自动登陆
    let wx_userInfo = {
      'uid':reg,
      'username': data.username,
      'last_login_time': data.reg_time,
    };
    await this.session('webuser', wx_userInfo);
    //成功后储存opid,防止无限登陆
    await this.session('wx_openid',data.openid);
    this.cookie('wx_openid',null);
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
      // await this.model("action",).log("user_login", "member", res.uid, res.uid, this.ip(), this.http.url);
      //console.log(11111111111111);
      let wx_info = await this.model("wx_user").where({openid:data.openid}).find();
      await this.model("wx_user").where({openid:data.openid}).update({uid:res.uid});
      //更新微信头像
      let filePath=think.RESOURCE_PATH + '/upload/avatar/' +res.uid;
      think.mkdir(filePath)
      await this.spiderImage(data.headimgurl,filePath+'/avatar.png')
      res.username = wx_info.nickname;
      await this.session('webuser', res);
      //成功后储存opid,防止无限登陆
      await this.session('wx_openid',data.openid);
      this.cookie('wx_openid',null);
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